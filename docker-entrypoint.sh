#!/bin/sh
# ============================================================
# 容器启动入口
# 1. 确保 dbus 系统总线运行（bleak 在 Linux 依赖它）
# 2. 若宿主未提供 bluetoothd，则在容器内启动一个
# 3. 启动网页控制器
# ============================================================
set -e

# 启动 D-Bus 系统总线（若挂载的 /run/dbus 不可用）
if [ ! -S /run/dbus/system_bus_socket ]; then
    mkdir -p /run/dbus
    if command -v dbus-daemon >/dev/null 2>&1; then
        dbus-daemon --system --fork
    fi
fi

# 启动 bluetoothd（若宿主未运行；需要 privileged）
if command -v bluetoothd >/dev/null 2>&1; then
    if ! pgrep -x bluetoothd >/dev/null 2>&1; then
        bluetoothd --compat >/dev/null 2>&1 &
        sleep 1
    fi
fi

# 启动网页控制器（监听 0.0.0.0:8080）
exec python controllers/web_server.py
