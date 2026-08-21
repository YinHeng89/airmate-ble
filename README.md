# AIRMATE FS35-SRD133 BLE 协议逆向分析记录

> 目标设备：AIRMATE FS35-SRD133
> BLE 名称：`airmate-fan`
> 目标：通过 BLE 实现对风扇的程序化控制
> 环境：macOS + Python + Bleak（网页版 / CLI）；macOS + Xcode + SwiftUI（iOS App）
> 状态：**协议已 100% 破解，可完整控制风扇；同时提供 网页版 / CLI / iOS App 三端控制器**

## 项目总览

| 端 | 入口 | 说明 |
|----|------|------|
| 网页版 | `controllers/web_server.py` | 可视化风扇 + 档位滑块 + 风模式切换，局域网任意浏览器访问 |
| 命令行 | `controllers/control_airmate_v2.py` | 交互式 CLI 控制器 |
| iOS App | `ios/AirmateFan`（SwiftUI） | 原生 App，复刻网页版 UI，含扇叶动画 / 滑块 / 震动反馈 / 扫描超时 |

协议原理与各端共用同一套 BLE 帧格式，详见下文第 2~5 节。iOS App 专属说明见第 7 章。

---

## 0. 最终结论（先说结果）

经过反编译微信小程序「慧居管家」（`wx9b6f*******eede`）拿到官方协议源码，成功破解了完整的控制协议。

**设备真实身份**：广播 UUID `0000af51` → `FS35150SR-DC-1`（市场型号 `FS35-SRD133`），属于 bofei（博飞）协议族。

**之前一直卡住的根因**（两个关键错误）：

1. **命令帧格式错误**：一直假设 AE21 命令帧 = AE22 状态帧的 15 字节结构（`AA FC 03 ...`），实际命令帧是 **5 字节短帧**（`AA [type] [opcode] [param] 55`），两者完全不同。

2. **写入模式错误**：必须用 `response=True`（写响应模式）写入，之前用 `response=False`（写无响应）导致设备协议层丢弃命令。微信小程序 `writeBLECharacteristicValue` 默认就是写响应模式。

---

## 1. 设备基本信息

```text
Name:     airmate-fan
UUID:     26B178AC-4C1D-5F6E-16E2-38098F6F2C50
广播UUID: 0000af51-0000-1000-8000-00805f9b34fb  (AF51 = bofei 协议族)
型号标识: 0x2A = FS35150SR-DC-1
```

macOS 下 Bleak 使用 CoreBluetooth 提供的 UUID，不是传统 BLE MAC 地址。

---

## 2. GATT 服务

```text
Service: 0000ae20-0000-1000-8000-00805f9b34fb

AE21: 0000ae21-0000-1000-8000-00805f9b34fb
      read, write   ← 命令入口

AE22: 0000ae22-0000-1000-8000-00805f9b34fb
      notify        ← 状态上报
```

---

## 3. 命令协议（写入 AE21）

命令帧为 **5 字节**，格式：

```text
AA [type] [opcode] [param] 55
```

无 checksum。**必须用 `response=True` 写入。**

### 完整命令表（FS35150SR-DC-1 实际支持）

| 功能 | 命令帧 |
|------|--------|
| 初始化 | `AA FC 01 02 55` |
| 查询状态 | `AA FC 01 01 55` |
| 开机 | `AA 01 01 01 55` |
| 关机 | `AA 01 01 00 55` |
| 风速 N 档 (1~12) | `AA 01 03 [N] 55`（N 为十六进制 01~0C） |
| 标准风 | `AA 01 05 00 55` |
| 自然风 | `AA 01 05 07 55` |
| 自然风档位 | 一档 `AA 01 08 01 55`、二档 `AA 01 08 02 55`、三档 `AA 01 08 03 55` |
| 睡眠风 | `AA 01 05 06 55` |
| 睡眠风档位 | 一档 `AA 01 08 21 55`、二档 `AA 01 08 22 55` |
| 暴风 | `AA 01 05 03 55` |
| 暴风 关 | `AA 01 05 F3 55` |
| 左右摆头 开 | `AA 01 07 01 55` |
| 左右摆头 关 | `AA 01 07 00 55` |
| 语音 开 | `AA 01 11 01 55` |
| 语音 关 | `AA 01 11 00 55` |
| 屏显 开 | `AA 01 0A 00 55` |
| 屏显 关 | `AA 01 0A 01 55` |
| 定时 N 小时 (0~15) | `AA 01 10 [N] 55` |

> 注意：
> 1. 屏显（和氛围灯）的 open/close 值是反的（开=00，关=01），这是官方协议的特殊设计。
> 2. 暴风没有独立档位，在网页版里统一映射为「标准风第 13 档」。
> 3. 自然风有 3 档、睡眠风有 2 档，档位命令用 `AA 01 08` 操作码（区别于普通风速的 `AA 01 03`）。

### 连接初始化流程

```text
连接
  ↓
订阅 AE22 notify
  ↓
写 initial:     AA FC 01 02 55  → 设备回初始化帧 AA FC 04 ...
  ↓
写 searchState: AA FC 01 01 55  → 设备回状态帧   AA FC 03 ...
```

---

## 4. 状态协议（AE22 notify）

状态帧为 **15 字节**，格式：

```text
AA FC [type] [10字节数据] [checksum] 55
```

### 帧结构

```text
Byte[0]  = AA          帧头
Byte[1]  = FC          帧头
Byte[2]  = type        03=状态帧, 04=初始化帧
Byte[3]  = 电源        01=开, 00=关
Byte[4]  = 风速        01~0C (12档，普通/暴风模式)
Byte[5]  = 功能位      语音=0x02, 负离子=0x04, 屏显=0x08, 氛围灯=0x10 (1-based bit)
Byte[6]  = 定时        0~0F 小时
Byte[7]  = 预约        (本型号无)
Byte[8]  = 风模式位    0x40=自然风, 0x20=睡眠风, 0x08=暴风
Byte[9]  = 自然风档位  一档=0x04, 二档=0x08, 三档=0x10
Byte[10] = 摆头        0x01=左右摆头开
Byte[11] = 摆头角度    (本型号无)
Byte[12] = 睡眠风档位  一档=0x02, 二档=0x04
Byte[13] = checksum
Byte[14] = 55          帧尾
```

### checksum 算法

```python
checksum = (sum(frame[1:13]) + 4) & 0xFF
```

（早期记录里写的 `sum(frame[1:13])` 漏掉了 `+4`，现已修正并通过 8 组真实帧验证）

---

## 5. 典型状态帧示例

```text
开机 + 风速 8:  AA FC 03 01 08 0B 00 00 01 00 00 00 00 18 55
开机 + 风速 5:  AA FC 03 01 05 0B 00 00 01 00 00 00 00 15 55
关机:          AA FC 03 00 05 03 00 00 01 00 00 00 00 0C 55
摇头开启:      AA FC 03 01 05 0B 00 00 01 00 01 00 00 16 55
初始化帧:      AA FC 04 2A 0C 0A 0F 0F 68 1C 01 00 06 ED 55
```

初始化帧 `AA FC 04` 里的关键信息：
- `Byte[3] = 0x2A` → 型号 `FS35150SR-DC-1`
- `Byte[4] = 0x0C` → 风速最大 12 档
- `Byte[6]/[7] = 0x0F` → 定时/预约最大 15 小时
- `Byte[8] = 0x68` → 风模式能力位（自然风/睡眠风/暴风）

---

## 6. 功能清单（实机确认）

| 功能 | 支持 | 说明 |
|------|------|------|
| 开关机 | ✅ | `AA 01 01 01/00 55` |
| 标准风 | ✅ | 1~12 档（网页版统一为 13 档，第 13 档=暴风） |
| 自然风 | ✅ | 3 档（一/二/三档） |
| 睡眠风 | ✅ | 2 档（一/二档） |
| 暴风 | ✅ | 独立模式，无档位 |
| 左右摆头 开/关 | ✅ | 无角度档 |
| 语音 | ✅ | 语音播报开关 |
| 屏显 | ✅ | 屏幕开关 |
| 定时 0~15 小时 | ✅ | |
| 上下摆头 / 摆头角度 | ❌ | |
| 负离子 / 氛围灯 / 预约 / 加湿 / 童锁 | ❌ | |

---

## 7. 脚本说明

| 脚本 | 用途 |
|------|------|
| `controllers/web_server.py` | **网页版控制器**（推荐，可视化风扇 + 完整功能） |
| `controllers/control_airmate_v2.py` | 命令行交互式控制器（与 web_server 互不依赖，独立实现） |
| `tools/monitor_airmate.py` | 状态监听（实时显示 AE22 notify + 解析 + 回放测试） |
| `tools/scan_airmate.py` | 扫描附近 BLE 设备 |
| `tools/inspect_airmate.py` | 枚举 GATT 服务 |
| `tools/detect_airmate.py` | 探测设备广播 UUID 和完整 GATT |

> 目录区分：`controllers/` 放可直接控制风扇的程序（网页 / CLI），`tools/` 放调试探测脚本。

### iOS App（ios/AirmateFan，SwiftUI）

原生 iOS 控制器，复刻网页版 UI 与交互，使用 CoreBluetooth 直接对接同一套 BLE 协议。

**目录结构**

```text
ios/AirmateFan/
├── App/             App 入口（@main）
├── BLE/
│   ├── FanBLEManager.swift   封装 CBCentralManager / 扫描 / 写入(AE21) / 订阅(AE22 notify)
│   └── FanProtocol.swift     命令帧 / 状态帧编解码（与 Python 端同一套协议）
├── Managers/
│   └── FanController.swift   业务逻辑：开关机 / 风模式 / 风速 / 摆头 / 定时 + Combine 状态
├── Models/         数据模型
├── Views/
│   ├── ConnectionView.swift  扫描 / 连接 / 超时（15s）/ 连接成功震动
│   ├── ContentView.swift     主容器
│   ├── ControlView.swift     风速滑块 + 状态标签 + 风模式按钮 + 定时
│   └── FanBladesView.swift   扇叶动画（五叶 SVG 复刻 + 0~100 平滑调速）
└── Resources/      图片 / 资源配置

ios/build_ipa.sh / build_ipa.command   打包脚本（xcodebuild，CODE_SIGNING_ALLOWED=NO）
ios/project.yml                      XcodeGen 工程定义（可选，生成 .xcodeproj）
```

**关键实现**

- **扇叶动画**：`FanBladesView` 用 `TimelineView(.animation)` 按帧推进角度，内部维护 `currentPercent`（0~100）以固定速率（`percentRate = 70`/s）逼近 `targetPercent = gear/13*100`，实现开关机 / 切档 / 切模式的平滑加减速，杜绝突变跳帧；`drawingGroup()` 提升渲染性能。
- **风速滑块**：复刻网页版「横线 + 刻度点 + 拖拽圆点（含档位数字）」样式，拖动时仅本地预览 + 震动，松手才发送指令；支持点击空白刻度直接定位。
- **状态标签**：风扇底部「液态玻璃」质感标签，未连接时显示「未连接」。
- **震动反馈**：模式切换、定时、连接成功、风速变化均触发 `UIImpactFeedbackGenerator` / `UINotificationFeedbackGenerator`。
- **扫描超时**：`FanBLEManager` 15s 无设备则置 `scanDidTimeout`，UI 提示「未找到设备」并提供重试。
- **协议一致性**：`FanProtocol` 的命令帧 / 状态帧 / checksum 与 Python 端完全一致；切标准风时延时 150ms 补发一次风速指令（对齐网页端行为）。

**构建**

```bash
# 需 macOS + Xcode
cd ios
bash build_ipa.sh        # 产物在 build/ 下（无需签名也可本地跑）
# 或直接在 Xcode 打开 AirmateFan.xcodeproj 运行到真机（真机需开启蓝牙权限）
```

> 真机运行需 iOS 13+ 及以上；BLE 权限已在 `Info.plist` 配置。

### 网页版前端（static/）

- `index.html` / `style.css` / `app.js` 为前端三件套，由 `web_server.py` 直接托管。
- 可视化风扇：两种扇叶样式（正叶 / 斜叶）**共用同一套五叶 SVG**（viewBox `0 0 1024 1024`，根部 `translate(512 512)`，`scale(0.92)` 控制缩放与间隙），5 片 rotate `-90 / -18 / 54 / 126 / 198`。
- 语音开关：前端已**隐藏**（用户实机语音模块因误识别已拆线），后端 `/api/voice` 仍保留可用。
- 控件样式：`mode-btn` 与 `timer-select` 统一为玻璃材质 + 16px 圆角。

### 使用

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 网页版（推荐）
python controllers/web_server.py
# 然后浏览器访问 http://localhost:8080
# 局域网设备访问 http://<本机IP>:8080

# 3. 命令行版
python controllers/control_airmate_v2.py
```

> 依赖仅需 `bleak`。web_server.py 使用 Python 标准库实现 Web 服务，无额外依赖。

### Docker 化部署（含蓝牙）

**目的**：把网页控制器和蓝牙能力一起打包，部署到**任意带有蓝牙适配器（`hci0`）的 Linux 服务器/盒子/树莓派**上，通过浏览器即可远程控制风扇——容器自带 `bluez`+`dbus`，不要求宿主预先安装蓝牙用户态。

新增文件：`Dockerfile`、`docker-compose.yml`、`docker-entrypoint.sh`、`publish.sh`、`.dockerignore`。

- **镜像**：基于 `python:3.11-slim`，内置 `bluez` + `dbus`（容器自带蓝牙用户态，不依赖宿主装 bluez），多架构 `linux/amd64,linux/arm64`（可在 x86 服务器或 arm64 设备通用）。
- **compose**：`network_mode: host`（web 直出 8080）+ `privileged: true` + 挂载 `/run/dbus` 与 `/dev/bus/usb`，把宿主蓝牙透传给容器内的 `bleak`。
- **entrypoint**：启动前确保 dbus 系统总线与 `bluetoothd` 就绪，再起 `web_server.py`。
- **发布**：`./publish.sh` 走 `buildx` 多架构构建并推送 `yinheng1989/airmate-fan` 到 DockerHub。
- `.dockerignore` 已排除 `huiju-decoded/`（740 个解包小程序源码，纯参考）、venv、日志、文档，不进镜像。

```bash
# 1. 本机构建并推送多架构镜像
./publish.sh

# 2. 在「有蓝牙的部署靶机」上拉取并启动
docker compose pull && docker compose up -d
# 浏览器访问 http://<靶机IP>:8080 即可控风扇
```

> **前提**：部署靶机必须有可用的蓝牙适配器（`hciconfig` 能看到 `hci0`）。容器负责蓝牙软件栈，但硬件需宿主提供。多架构镜像意味着 x86_64 服务器和 arm64 设备（如树莓派、RK3588）都能直接跑，无需重新构建。

---

## 8. 逆向过程复盘

1. **BLE 抓包**：通过 macOS + Bleak 成功订阅 AE22，拿到 15 字节状态帧，逆出了电源/风速/定时/摆头/checksum 字段（100%）。

2. **卡点**：AE21 写入「成功」但风扇不响应。一直假设命令帧 = 状态帧结构，走了弯路。

3. **突破**：反编译微信小程序「慧居管家」（`wedecode` + Node 20 解密 `V1MMWX` 包），拿到官方协议源码：
   - 命令帧是 5 字节短帧 `AA [type] [opcode] [param] 55`
   - 通过广播 UUID `AF51` 定位到 bofei 协议族
   - 通过初始化帧 `Byte[3]=0x2A` 定位到具体型号 `FS35150SR-DC-1`

4. **最终突破**：写入改用 `response=True`（写响应模式），设备立即响应命令。

---

## 9. 逆向进度

```text
GATT 结构          ██████████ 100%
AE22 状态解析       ██████████ 100%
checksum 算法       ██████████ 100%
型号定位            ██████████ 100%
AE21 命令格式       ██████████ 100%
完整控制协议        ██████████ 100%
```

**协议已完全破解，风扇可通过 BLE 完整控制。**

---

## 10. 三端交付状态

```text
协议逆向（Python 验证）   ██████████ 100%
网页版控制器（web）       ██████████ 100%
命令行控制器（CLI）       ██████████ 100%
iOS App（SwiftUI）        ██████████ 100%（UI 复刻 + 扇叶动画 + 滑块 + 震动 + 扫描超时）
Docker 部署（含蓝牙）     ██████████ 就绪（待选有 hci0 的靶机端到端验证）
```

三端共用同一套 BLE 帧格式与 checksum 算法，协议逻辑完全一致：网页版 / CLI 走 Python + Bleak，iOS App 走 CoreBluetooth（`FanProtocol` 复刻编解码）。
