const $ = id => document.getElementById(id);

// 定时选项 0~15
const timerSelect = $('timerSelect');
for (let i = 0; i <= 15; i++) {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = i === 0 ? '取消定时' : i + ' 小时';
  timerSelect.appendChild(opt);
}

async function api(cmd, data = {}) {
  const res = await fetch('/api/' + cmd, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// ===== 本地 UI 状态（乐观更新：点击后立即生效，失败再回滚） =====
let uiState = {
  power: false, speed: 0, mode: '', swing: false,
  voice: false, display: false, timer: 0, raw: '',
};
let currentStyle = 'a';
let pendingOps = 0;       // 进行中的异步指令数
let coolDownUntil = 0;    // 冷却截止时间戳：指令完成后短时间内不接收服务端覆盖

// 轮询状态
async function poll() {
  try {
    const res = await fetch('/api/state');
    const state = await res.json();
    render(state);
  } catch (e) {}
  setTimeout(poll, 1500);
}

function render(state) {
  const connected = state.connected;
  $('connDot').className = 'dot ' + (connected ? 'on' : 'off');
  $('connText').textContent = connected ? '已连接' : '未连接';

  // raw 原始帧始终更新（服务端回传，不受乐观值影响）
  const s = state.status || {};
  uiState.raw = s.raw || '';

  // 冷却期内（指令刚完成，等待设备回传新状态）不覆盖本地，避免"闪一下切回"
  const now = Date.now();
  if (pendingOps === 0 && now >= coolDownUntil) {
    uiState.power = !!s.power;
    uiState.speed = s.speed || 0;
    uiState.mode = s.mode || '';
    uiState.swing = !!s.swing;
    uiState.voice = !!s.voice;
    uiState.display = !!s.display;
    uiState.timer = s.timer || 0;
  }
  // powerHint 仅用于错误提示，连接状态由顶部 connText 承担
  if (state.error) {
    $('powerHint').textContent = state.error;
  }

  // 用本地 uiState 重绘 UI
  paintUI();
}

function modeKey(m) {
  return { '自然风': 'nature', '睡眠风': 'sleep', '暴风': 'storm' }[m] || '';
}

// 根据 uiState 重绘所有控件（风扇 + 滑条 + 按钮 + 开关）
function paintUI() {
  updateSpeedRange();
  updateFan(uiState.power, uiState.speed, uiState.mode);

  if (uiState.speed > 0) {
    $('speedVal').textContent = uiState.speed;
    positionThumb(uiState.speed);
  }
  document.querySelectorAll('.mode-btn').forEach(b => {
    let active = false;
    const m = b.dataset.mode;
    if (m === 'storm') {
      // 暴风按钮：标准风模式下第13档时高亮
      active = (uiState.mode === '标准' && uiState.speed === STORM_GEAR);
    } else if (m === 'normal') {
      // 标准风按钮：标准风模式下且非暴风时高亮
      active = (uiState.mode === '标准' && uiState.speed !== STORM_GEAR);
    } else {
      active = (m === modeKey(uiState.mode));
    }
    b.className = 'mode-btn' + (active ? ' active' : '');
  });
  $('swing').checked = uiState.swing;
  $('voice').checked = uiState.voice;
  $('display').checked = uiState.display;
  $('rawText').textContent = uiState.raw || '';
}

// 风扇动画：根据开关和风速控制旋转（用 Web Animations API 平滑调速，不重置角度）
let fanAnimation = null;   // 当前旋转动画实例
let fanAngle = 0;          // 当前累计旋转角度
let fanSpeed = 0;          // 当前转速（用于判断是否需要调速）

function updateFan(power, speed, mode) {
  const wrap = $('fanWrap');
  const blades = $('fanBlades');
  const status = $('fanStatus');

  // 保留 style-a/style-b class，只切换 on/off
  wrap.classList.toggle('on', power);

  if (power && speed > 0) {
    const duration = Math.max(0.4, 3.2 - speed * 0.22);
    if (fanSpeed !== speed || !fanAnimation) {
      // 记录当前角度（动画已转的角度）
      if (fanAnimation) {
        const progress = fanAnimation.effect.getComputedTiming().progress || 0;
        fanAngle = (fanAngle + progress * 360) % 360;
        fanAnimation.cancel();
      }
      fanSpeed = speed;
      // 从当前角度继续旋转
      fanAnimation = blades.animate(
        [
          { transform: 'rotate(' + fanAngle + 'deg)' },
          { transform: 'rotate(' + (fanAngle + 360) + 'deg)' }
        ],
        { duration: duration * 1000, iterations: Infinity, easing: 'linear' }
      );
    }
    // 暴风 = 标准风第13档
    if (mode === '标准' && speed === STORM_GEAR) {
      status.textContent = '暴风';
    } else if (mode && mode !== '标准') {
      status.textContent = mode + ' · ' + speed + ' 档';
    } else {
      status.textContent = '标准风 · ' + speed + ' 档';
    }
  } else {
    // 关机/待机：记录当前角度后停止
    if (fanAnimation) {
      const progress = fanAnimation.effect.getComputedTiming().progress || 0;
      fanAngle = (fanAngle + progress * 360) % 360;
      fanAnimation.cancel();
      fanAnimation = null;
    }
    fanSpeed = 0;
    blades.style.transform = 'rotate(' + fanAngle + 'deg)';
    status.textContent = power ? '待机' : '已关机';
  }
}

// 乐观更新：立即改 UI → 发指令 → 失败回滚
async function optimistic(cmd, data, applyFn) {
  const backup = { ...uiState };   // 备份旧状态
  applyFn();                       // 立即更新 uiState 并重绘
  pendingOps++;
  try {
    const r = await api(cmd, data);
    if (!r.ok) {
      // 失败：回滚并提示
      uiState = backup;
      paintUI();
      showError(r.msg || '指令失败');
    }
  } catch (e) {
    uiState = backup;
    paintUI();
    showError('网络错误，请重试');
  } finally {
    pendingOps--;
    // 指令完成后进入冷却期，给设备时间回传新状态，避免轮询用旧状态覆盖
    coolDownUntil = Date.now() + 1800;
  }
}

// 错误提示（短暂显示，3 秒后隐藏）
let errorTimer = null;
function showError(msg) {
  $('powerHint').textContent = '⚠ ' + msg;
  $('powerHint').style.color = 'var(--danger)';
  if (errorTimer) clearTimeout(errorTimer);
  errorTimer = setTimeout(() => {
    $('powerHint').style.color = '';
    $('powerHint').textContent = '';
  }, 3000);
}

// ===== 事件绑定（全部乐观更新） =====
$('fanWrap').onclick = () => optimistic('power', {}, () => {
  uiState.power = !uiState.power;
  if (!uiState.power) uiState.speed = 0;
  paintUI();
});

// 模式 → 档位范围
// 标准风：13档 = 1~12 普通风速 + 第13档暴风
// 自然风：3档，睡眠风：2档
const MODE_GEAR_RANGE = {
  '自然风': { min: 1, max: 3, key: 'nature' },
  '睡眠风': { min: 1, max: 2, key: 'sleep' },
  '标准':   { min: 1, max: 13, key: '' },
};
const STORM_GEAR = 13;  // 标准风模式下第13档 = 暴风

// ===== 分段档位滑块 =====
let gearCount = 12;  // 当前档位数

function getGearRange() {
  return MODE_GEAR_RANGE[uiState.mode] || MODE_GEAR_RANGE['标准'];
}

function initGearDots() {
  const dotsEl = $('gearDots');
  dotsEl.innerHTML = '';
  const r = getGearRange();
  gearCount = r.max - r.min + 1;
  for (let i = 0; i < gearCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'gear-dot';
    dot.style.left = (i / (gearCount - 1) * 100) + '%';
    dotsEl.appendChild(dot);
  }
  positionThumb(uiState.speed);
}

// 更新原点位置 + 高亮刻度
function positionThumb(gear) {
  const r = getGearRange();
  const idx = Math.max(0, Math.min(gearCount - 1, gear - r.min));
  const pct = idx / (gearCount - 1) * 100;
  $('gearThumb').style.left = pct + '%';
  document.querySelectorAll('.gear-dot').forEach((d, i) => {
    d.className = 'gear-dot' + (i <= idx ? ' active' : '');
  });
}

function updateSpeedRange() {
  initGearDots();
}

// 从坐标计算最近的档位（用 .gear-inner 内容区作为基准）
function gearFromClientX(clientX) {
  const inner = document.querySelector('.gear-inner');
  const rect = inner.getBoundingClientRect();
  let ratio = (clientX - rect.left) / rect.width;
  ratio = Math.max(0, Math.min(1, ratio));
  const r = getGearRange();

  // 边界吸附：接近左右两端时，直接落到首档/末档，避免分辨率误差导致点不到
  const threshold = 0.06;  // 两端 6% 区域吸附
  if (ratio >= 1 - threshold) {
    return r.max;
  }
  if (ratio <= threshold) {
    return r.min;
  }

  const idx = Math.round(ratio * (gearCount - 1));
  return r.min + idx;
}

// 档位变化统一处理：更新 UI + 防抖发指令
let speedDebounceTimer = null;
function applyGear(gear, immediate = false) {
  uiState.speed = gear;
  $('speedVal').textContent = gear;
  positionThumb(gear);
  updateFan(uiState.power, gear, uiState.mode);

  const send = () => {
    const r = getGearRange();
    if (r.key === 'nature' || r.key === 'sleep') {
      // 自然风/睡眠风：发档位命令
      optimistic('gear', { mode: r.key, value: gear }, () => { paintUI(); });
    } else if (gear === STORM_GEAR) {
      // 标准风第13档 = 暴风
      optimistic('mode', { value: 'storm' }, () => { paintUI(); });
    } else {
      // 标准风 1~12 档：发普通风速命令
      optimistic('speed', { value: gear }, () => { paintUI(); });
    }
  };

  if (immediate) { send(); return; }
  if (speedDebounceTimer) clearTimeout(speedDebounceTimer);
  speedDebounceTimer = setTimeout(send, 300);
}

// 拖拽交互：pointerdown 记录拖拽，pointermove 实时跟随，pointerup 结束
let dragging = false;
let dragGear = 0;

$('gearSlider').addEventListener('pointerdown', e => {
  dragging = true;
  dragGear = gearFromClientX(e.clientX);
  applyGear(dragGear);
  // 阻止默认行为，避免移动端滚动/文本选择干扰
  e.preventDefault();
});
$('gearSlider').addEventListener('pointermove', e => {
  if (!dragging) return;
  dragGear = gearFromClientX(e.clientX);
  applyGear(dragGear);
});
$('gearSlider').addEventListener('pointerup', e => {
  if (!dragging) return;
  dragging = false;
  // 松手用拖拽过程中的最终档位发指令（不重新计算，避免 transition/坐标偏差）
  if (speedDebounceTimer) clearTimeout(speedDebounceTimer);
  applyGear(dragGear, true);
});
$('gearSlider').addEventListener('pointercancel', () => { dragging = false; });

document.querySelectorAll('.mode-btn').forEach(b => {
  b.onclick = () => {
    const modeKeyName = b.dataset.mode;
    if (modeKeyName === 'storm') {
      // 暴风 = 标准风模式下的第13档
      optimistic('mode', { value: 'storm' }, () => {
        uiState.mode = '标准';
        uiState.speed = STORM_GEAR;
        updateSpeedRange();
        paintUI();
      });
    } else if (modeKeyName === 'normal') {
      // 标准风：保留当前档位数值（如自然风2档 → 标准风2档），并发送对应风速命令
      const targetSpeed = (uiState.speed && uiState.speed <= 12) ? uiState.speed : 1;
      optimistic('mode', { value: 'normal' }, () => {
        uiState.mode = '标准';
        uiState.speed = targetSpeed;
        updateSpeedRange();
        paintUI();
      });
      // 发送标准风对应的风速命令（普通风速命令）
      setTimeout(() => {
        optimistic('speed', { value: targetSpeed }, () => { paintUI(); });
      }, 150);
    } else {
      const modeName = { nature: '自然风', sleep: '睡眠风' }[modeKeyName] || '';
      optimistic('mode', { value: modeKeyName }, () => {
        uiState.mode = modeName;
        uiState.speed = 1;
        updateSpeedRange();
        paintUI();
      });
    }
  };
});

$('swing').onchange = e => {
  const v = e.target.checked;
  optimistic('swing', { value: v }, () => {
    uiState.swing = v;
    paintUI();
  });
};
$('voice').onchange = e => {
  const v = e.target.checked;
  optimistic('voice', { value: v }, () => {
    uiState.voice = v;
    paintUI();
  });
};
$('display').onchange = e => {
  const v = e.target.checked;
  optimistic('display', { value: v }, () => {
    uiState.display = v;
    paintUI();
  });
};
$('timerBtn').onclick = () => {
  const v = +$('timerSelect').value;
  optimistic('timer', { value: v }, () => {
    uiState.timer = v;
    paintUI();
  });
};

// 扇叶样式切换（localStorage 记住选择）
const STYLE_KEY = 'fan_blade_style';
function applyFanStyle(style) {
  currentStyle = style;
  $('fanWrap').classList.remove('style-a', 'style-b');
  $('fanWrap').classList.add('style-' + style);
  document.querySelectorAll('.style-btn').forEach(b => {
    b.className = 'style-btn' + (b.dataset.style === style ? ' active' : '');
  });
  try { localStorage.setItem(STYLE_KEY, style); } catch (e) {}
}
document.querySelectorAll('.style-btn').forEach(b => {
  b.onclick = () => applyFanStyle(b.dataset.style);
});

// 初始化：读取记住的扇叶样式 + 生成档位刻度点
(function() {
  let saved = 'a';
  try { saved = localStorage.getItem(STYLE_KEY) || 'a'; } catch (e) {}
  applyFanStyle(saved);
})();
initGearDots();

poll();
