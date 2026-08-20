#!/usr/bin/env bash
# ============================================================
# AIRMATE FS35-SRD133 风扇控制器 · 构建并推送 Docker 镜像
# 适配 RK3588 (arm64) / x86_64 OpenWRT 部署
# ============================================================
set -euo pipefail

# ---------- 配置 ----------
DOCKERHUB_USER="yinheng1989"
IMAGE_NAME="airmate-fan"
PLATFORMS="linux/amd64,linux/arm64"
TAG="${1:-latest}"

FULL_IMAGE="${DOCKERHUB_USER}/${IMAGE_NAME}:${TAG}"

echo "==> 目标镜像: ${FULL_IMAGE}"
echo "==> 构建平台: ${PLATFORMS}"

# ---------- 1. 确保 buildx 可用 ----------
if ! docker buildx version >/dev/null 2>&1; then
    echo "错误: 未检测到 docker buildx，请升级 Docker 到 19.03+ 或启用 buildx 插件" >&2
    exit 1
fi

BUILDER="multiarch"
if ! docker buildx inspect "${BUILDER}" >/dev/null 2>&1; then
    echo "==> 创建 buildx builder: ${BUILDER}"
    docker buildx create --name "${BUILDER}" --use
else
    docker buildx use "${BUILDER}"
fi
docker buildx inspect --bootstrap

# ---------- 2. 登录 DockerHub ----------
echo "==> 登录 DockerHub (${DOCKERHUB_USER})"
# 若已通过 docker login 缓存凭据可跳过；否则交互输入
if ! docker info 2>/dev/null | grep -q "Username: ${DOCKERHUB_USER}"; then
    docker login "${DOCKERHUB_USER}" || true
fi

# ---------- 3. 构建并推送多架构镜像 ----------
echo "==> 构建并推送: ${FULL_IMAGE}"
docker buildx build \
    --platform "${PLATFORMS}" \
    --tag "${FULL_IMAGE}" \
    --push \
    .

echo "==> 完成! 镜像已推送: ${FULL_IMAGE}"
echo ""
echo "部署方式（RK3588 OpenWRT）:"
echo "  docker compose pull && docker compose up -d"
echo "  浏览器访问 http://<设备IP>:8080"
