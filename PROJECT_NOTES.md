# AIRMATE FS35-SRD133 BLE 控制项目 · 全记录

> 本文件是项目的完整技术沉淀，供换账号 / 后续维护者快速接手。
> 与 `README.md` 互补：README 是「协议逆向文档」，本文件是「项目全景 + 关键决策 + 踩坑记录」。

---

## 1. 一句话概括

通过解包微信小程序「慧居管家」（`wx9b6f*******eede`）拿到官方协议源码，完整还原了 AIRMATE FS35-SRD133 风扇的 BLE 控制协议，并实现网页版 + CLI 两种控制器。

---

## 2. 项目定性（重要）

**这不是传统黑盒逆向，是「解包 + 读代码复用」。**

| 阶段 | 动作 | 性质 |
|------|------|------|
| 1 | 抓 BLE 广播、回放状态帧、试协议族（ruide/bofei）| 真·逆向（黑盒，失败）|
| 2 | 解包 `wxapkg`（`wedecode` + Node 20）| 逆向（对包格式）|
| 3 | 读 `protocol/bofei/fan.js` 拿到命令帧 | 读代码，零逆向 |
| 4 | 翻译成 Python 脚本 | 代码复用 |

协议字节没有任何一个是通过抓包/推测反推的，全部来自官方源码。

---

## 3. 设备信息

```text
Name:     airmate-fan
广播UUID: 0000af51-0000-1000-8000-00805f9b34fb  (AF51 = bofei 协议族)
型号标识: 0x2A = FS35150SR-DC-1（市场型号 FS35-SRD133）
GATT:     AE20 服务 / AE21 写入命令 / AE22 notify 状态
```

---

## 4. 协议核心

### 4.1 命令帧（写 AE21，5 字节，无 checksum）

```text
AA [type] [opcode] [param] 55
```

**必须 `response=True` 写入**（微信小程序默认写响应模式，`response=False` 会被设备协议层丢弃——这是整个项目最大的坑）。

| 功能 | 命令帧 |
|------|--------|
| 初始化 | `AA FC 01 02 55` |
| 查询状态 | `AA FC 01 01 55` |
| 开机 | `AA 01 01 01 55` |
| 关机 | `AA 01 01 00 55` |
| 风速 N 档 (1~12) | `AA 01 03 [N] 55`（N=01~0C）|
| 标准风 | `AA 01 05 00 55` |
| 自然风 | `AA 01 05 07 55` |
| 自然风档位 | `AA 01 08 01/02/03 55`（3 档）|
| 睡眠风 | `AA 01 05 06 55` |
| 睡眠风档位 | `AA 01 08 21/22 55`（2 档）|
| 暴风 | `AA 01 05 03 55` |
| 左右摆头 开/关 | `AA 01 07 01/00 55` |
| 语音 开/关 | `AA 01 11 01/00 55` |
| 屏显 开/关 | `AA 01 0A 00/01 55`（反的！开=00 关=01）|
| 定时 N 小时 (0~15) | `AA 01 10 [N] 55` |

### 4.2 三条关键协议注意点

1. **屏显（和氛围灯）open/close 值反着来**：开=00，关=01，官方特殊设计。
2. **暴风无独立档位**：网页版统一映射为「标准风第 13 档」。
3. **档位命令操作码是 `AA 01 08`**，区别于普通风速的 `AA 01 03`。自然风 3 档、睡眠风 2 档。

### 4.3 状态帧（AE22 notify，15 字节）

```text
AA FC [type] [10字节数据] [checksum] 55
checksum = (sum(frame[1:13]) + 4) & 0xFF   ← 早期漏了 +4，已修正
```

| 字节 | 含义 |
|------|------|
| Byte[3] | 电源 01=开 00=关 |
| Byte[4] | 风速 01~0C |
| Byte[5] | 功能位（**1-based**）：语音=0x02 负离子=0x04 屏显=0x08 氛围灯=0x10 |
| Byte[6] | 定时 0~0F |
| Byte[8] | 风模式（0-based）：0x40自然风 0x20睡眠风 0x08暴风 |
| Byte[9] | 自然风档位：一=0x04 二=0x08 三=0x10 |
| Byte[10] | 摆头 bit0=左右摆头开 |
| Byte[12] | 睡眠风档位：一=0x02 二=0x04 |

**bit 映射关键差异**：Byte[5] 功能位是 **1-based**（bit1 起），其它 bit 字段都是 **0-based**（bit0 起）。这是最容易搞错的地方。

---

## 5. 文件清单

| 文件 | 用途 |
|------|------|
| `web_server.py` | **网页版控制器（主交付物）**：可视化风扇 + 档位滑块 + 风模式切换 + 乐观更新 |
| `control_airmate_v2.py` | CLI 交互式控制器 |
| `monitor_airmate.py` | 状态监听（实时 AE22 + 解析）|
| `scan_airmate.py` | 扫描附近 BLE |
| `inspect_airmate.py` | 枚举 GATT |
| `detect_airmate.py` | 探测广播 UUID + 完整 GATT |
| `huiju-decoded/` | 解包的小程序源码，协议核心在 `protocol/bofei/fan.js`（35KB）+ `commandWords.js`（108KB）|
| `README.md` | 协议逆向文档 |
| `requirements.txt` | 依赖（仅 bleak）|

---

## 6. 关键踩坑记录

1. **命令帧格式错误**：一直假设 AE21 命令帧 = AE22 状态帧的 15 字节结构，实际命令帧是 5 字节短帧。
2. **写入模式错误**：`response=False` 设备不响应，必须 `response=True`。
3. **协议族判断**：先试 ruide（`55 AA ... A5`），实际是 bofei（`AA ... 55`），靠广播 AF51 UUID 确认。
4. **bit 映射**：Byte[5] 误当 0-based，官方代码确认是 1-based（语音=0x02 屏显=0x08）。
5. **风速显示错误**：自然风/睡眠风档位在 Byte[9]/Byte[12]，不是 Byte[4]。
6. **checksum 漏 +4**：早期 `sum(frame[1:13])`，实际要 `+4`。
7. **wedecode 崩溃**：node v26 与 vm2 不兼容，需 node@20。

---

## 7. 网页版（web_server.py）实现要点

- **技术栈**：Python 标准库 HTTP 服务 + bleak（BLE）+ 原生 JS 前端，无额外 Web 依赖。
- **可视化风扇**：两种扇叶样式切换（正叶/斜叶），Web Animations API 平滑调速（累计角度，避免动画重置跳变）。
- **档位滑块**：横线 + 刻度点 + 原点，分段可点。
- **乐观更新**：UI 立即响应 → 失败回滚 → 冷却期防抖。
- **BLE 写入串行化**：`asyncio.Lock` 防止并发写入冲突。
- **风模式切换**：标准风/自然风/睡眠风/暴风，切换时立即切换档位列表。
- 已知坑：浏览器翻译插件会干扰点击和文字渲染（非代码问题）。

### 7.1 前端样式迭代记录（2026-08-20）

本轮重点重做了网页版可视化的扇叶图案与控件样式，全部集中在 `static/`（`index.html` / `style.css` / `app.js`）。

**扇叶 SVG 重设计**
- 斜叶（样式 B）原本图案不好看，最终采用用户提供的五叶风扇 SVG 参考：5 片 `.blade-slanted` div，每片内部 `<g transform="translate(512 512)"><g transform="rotate(...) scale(0.92)">` 含 `blade-fill` + `blade-highlight` 两个 path。
- 关键参数：viewBox `0 0 1024 1024`、根部 `translate(512 512)` 居中、`scale(0.92)` 控制整体缩放与白色间隙宽度（先试过 0.82，最终 0.92，缩小后叶片间隙更宽更透气）。
- 正叶（样式 A）原本是另一套图案，已**完全替换为与斜叶一模一样的 SVG 结构**（仅 class 改为 `blade-fill-a` / `blade-highlight-a`，渐变 id 改为 `bldGradA`），两种样式视觉一致。
- 旋转角度：-90 / -18 / 54 / 126 / 198（每片间隔 72°，共五叶）。
- 注意：外层 CSS 不再额外 rotate，避免与 SVG 内部 rotate 叠加导致错位。

**语音功能前端隐藏（保留后端）**
- 用户实机语音模块因容易误识别已被**拆线**，故前端隐藏语音开关。
- `index.html` 语音开关整段用 `<!-- -->` 注释，备注「本设备的语音模块因容易误识别已被用户拆线，但功能本身是支持的」。
- `app.js` 同步注释了 `$('voice').onchange` 事件绑定与 `paintUI` 里的 `$('voice').checked = uiState.voice;`，避免元素不存在报错。
- 后端 `web_server.py` 的 `/api/voice` 和 `cmd_voice` **未动**，功能仍在，仅前端不暴露。

**控件样式统一**
- `mode-btn`（风模式按钮）与 `timer-select`（定时选择框）统一为玻璃材质（`backdrop-filter` 毛玻璃）+ `--radius-md`（16px）圆角，消除此前圆角/材质不一致的割裂感。
- 抽了 CSS 变量统一管理（背景用 `--glass-bg`、模糊用 `--glass-blur`），下拉箭头用内联灰色 SVG `background-image`，去掉系统原生箭头。

**提交**
- git 提交 `e4e626b`：「feat: 拆分web前端...重设计斜叶风扇SVG」（含本轮前端改动）。
- 目录讨论：`control_airmate_v2.py` 与 `web_server.py` 互不 import，是两份独立控制器；暂未移动，仍留在 `controllers/`。

---

## 8. 已裁剪功能（实机确认不支持）

上下摆头、摆头角度、负离子、氛围灯、预约、加湿、童锁 —— 该型号实机均不支持，正确裁剪（非遗漏）。

官方虽定义但这些功能命令（供参考，本型号不用）：
- 负离子 `AA 01 0F 01/00 55`
- 氛围灯 `AA 01 0B 00/01 55`（反的）
- 童锁 `AA 01 0E 01/00 55`

---

## 9. 状态与进度

```text
GATT 结构          100%
AE22 状态解析       100%
checksum 算法       100%
型号定位            100%
AE21 命令格式       100%
完整控制协议        100%
```

**协议已完全破解，风扇可完整控制。**

### 9.1 目录整理讨论（2026-08-20）

- `control_airmate_v2.py` 与 `web_server.py` 互不 import，是两份独立控制器；用户曾询问是否把 CLI 版移到 `tools/`，结论：**保持现状**（CLI 是控制器非调试工具，语义上留在 `controllers/` 更合理），暂未移动。

---

## 10. Docker 化与部署（2026-08-20）

**目的**：把网页控制器 + 蓝牙软件栈（bluez/dbus）打包成多架构镜像，部署到**任意带有蓝牙适配器（`hci0`）的 Linux 服务器/盒子/树莓派**上，通过浏览器远程控制风扇。容器自带蓝牙用户态，不要求宿主预装 bluez；硬件（蓝牙适配器）由宿主提供。

### 新增文件
- `Dockerfile`：基于 `python:3.11-slim`，`apt` 装 `bluez` + `dbus` + `libglib2.0-0`，使容器内 `bleak` 可自行起 `bluetoothd`，不依赖宿主装 bluez。COPY `controllers/ static/ tools/`，ENTRYPOINT 指向 `docker-entrypoint.sh`。
- `docker-entrypoint.sh`：启动前确保 `/run/dbus/system_bus_socket` 存在（必要时自起 `dbus-daemon`），自起 `bluetoothd`（若宿主未运行），再 `exec python controllers/web_server.py`。
- `docker-compose.yml`：`network_mode: host` + `privileged: true` + 挂载 `/run/dbus:/run/dbus`、`/dev/bus/usb:/dev/bus/usb`。已 `docker compose config` 校验通过。
- `.dockerignore`：排除 `huiju-decoded/`、`generated-images/`、`venv/`、`*.pid`、`fan.log`、`.git`、所有 `*.md` 等，避免无关文件进镜像。
- `publish.sh`：改造为适配本项目——多架构 `buildx`（`linux/amd64,linux/arm64`）构建 `yinheng1989/airmate-fan` 并 `--push`，末尾给部署提示。

### 部署靶机蓝牙核实（RK3588/iStoreOS 现状记录）

在一台可用的 RK3588 设备 iStoreOS 24.10.8（aarch64）上做过环境摸底：

1. Docker `27.3.1` + Compose `v2.39.1` ✅，架构 `aarch64` ✅（镜像 arm64 匹配，可直接跑）。
2. `lsusb` **无任何蓝牙适配器**（仅 ML307R 4G 模块、VL817 SATA、Microdia 摄像头）。
3. 宿主**无 bluez**（`hciconfig`/`bluetoothctl` 均不存在）。
4. `/lib/modules/6.6.144/` **无 `kernel/net/bluetooth/` 与 `kernel/drivers/bluetooth/`**，且 `/lib/firmware` 无 bcm/rtlbt/hci 固件 → **固件未编译蓝牙支持**。
5. `/dev/ttyUSB1/2` 是 4G 模块 AT 口，非蓝牙。

**结论：这台 RK3588 设备无蓝牙硬件、固件也未带蓝牙驱动，暂不适合做风扇控制的部署靶机**——但 Docker 镜像本身不依赖它，换一台有蓝牙的机器即可使用。

### 该设备的后续可行路径（未实施，仅记录，非 Docker 必要条件）
- 采购 **USB 蓝牙适配器**（推荐 Realtek RTL8761B/BTUSB 免驱方案），插上后需 OpenWRT 固件提供 `kmod-bluetooth` + `kmod-btusb` + 对应固件。
- 或刷一个**集成了蓝牙驱动**的 OpenWRT/iStoreOS 固件。

### 状态
- Docker 化文件已就绪（可构建/推送），多架构镜像可在有蓝牙的 x86_64/arm64 服务器直接部署。
- 蓝牙控制链路**尚未在真机端到端验证**（待选一台有 `hci0` 的机器：`docker compose up` 后网页控风扇）。
- 网页 UI 本身可在任意有 Docker 的机器上 `docker compose up` 验证（控真机需蓝牙）。
