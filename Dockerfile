# ============================================================
# AIRMATE FS35-SRD133 风扇控制器 镜像
#   运行环境：RK3588 (arm64) / x86_64 OpenWRT + Docker
#   容器内自带 bluez + dbus，使 bleak 可通过宿主蓝牙控制风扇
# ============================================================
FROM --platform=$BUILDPLATFORM python:3.11-slim

# 时区 & 基础工具
ENV TZ=Asia/Shanghai \
    DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1

# 安装蓝牙依赖（bluez 提供 bluetoothctl/bluetoothd，dbus 供 bleak 使用）
RUN apt-get update && apt-get install -y --no-install-recommends \
        bluez \
        dbus \
        libglib2.0-0 \
        tzdata \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 先装 Python 依赖（利用层缓存）
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制项目代码
COPY controllers/ ./controllers/
COPY static/ ./static/
COPY tools/ ./tools/

# 暴露 Web 端口（host 网络模式下实际由 --net=host 接管）
EXPOSE 8080

# 启动脚本：先确保 dbus 可用，再起 web_server
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
