#!/bin/bash
#
# Airmate 风扇 iOS 打包脚本
# 用法: 在 Xcode 中 Product -> Archive 签名后，把生成的 .xcarchive 拖到此脚本运行时出现的提示处回车
# 脚本会从 .xcarchive 取出 .app，按 Payload 方式打包成 IPA，并做签名/描述文件校验、生成 SHA256。
#
# 也可直接传参: ./build_ipa.sh /path/to/AirmateFan.xcarchive
# 或:          ./build_ipa.sh "/path/with space/AirmateFan.xcarchive"
#

set -u

echo ""
echo "========================================"
echo "      Xcode Archive -> IPA Builder"
echo "========================================"
echo ""

#################################################
# 获取 Archive 路径
#################################################

if [ $# -ge 1 ]; then
    ARCHIVE_PATH="$1"
else
    echo "请把 .xcarchive 拖到此窗口后按回车："
    read -r ARCHIVE_PATH
fi

# 处理 Finder 拖入路径（可能带 file:// 或引号）
ARCHIVE_PATH="${ARCHIVE_PATH#file://}"
ARCHIVE_PATH=$(eval echo "$ARCHIVE_PATH")
# 去除首尾引号/空白
ARCHIVE_PATH="${ARCHIVE_PATH%\"}"
ARCHIVE_PATH="${ARCHIVE_PATH#\"}"
ARCHIVE_PATH="$(echo "$ARCHIVE_PATH" | sed 's/^ *//;s/ *$//')"

#################################################
# 检查 Archive
#################################################

if [ ! -d "$ARCHIVE_PATH" ]; then
    echo ""
    echo "❌ 找不到目录："
    echo "$ARCHIVE_PATH"
    echo ""
    exit 1
fi

#################################################
# 查找 .app
#################################################

APP_PATH=$(find "$ARCHIVE_PATH/Products/Applications" -maxdepth 1 -name "*.app" | head -n 1)

if [ -z "$APP_PATH" ]; then
    echo ""
    echo "❌ Archive 中未找到 .app (期望路径: $ARCHIVE_PATH/Products/Applications/*.app)"
    echo ""
    exit 1
fi

APP_NAME=$(basename "$APP_PATH" .app)

#################################################
# 输出路径（默认桌面）
#################################################

DESKTOP="$HOME/Desktop"
IPA_PATH="$DESKTOP/${APP_NAME}.ipa"
SHA_PATH="$DESKTOP/${APP_NAME}.ipa.sha256"

#################################################
# 显示信息
#################################################

echo ""
echo "📦 App Name"
echo "----------------------------------------"
echo "$APP_NAME"

echo ""
echo "📁 Archive"
echo "----------------------------------------"
echo "$ARCHIVE_PATH"

#################################################
# 验证签名
#################################################

echo ""
echo "🔍 验证签名..."
echo ""

codesign -vvv "$APP_PATH" || echo "⚠️ 签名验证未通过，请确认 Archive 时已正确签名"

#################################################
# 检查描述文件
#################################################

echo ""
echo "🔍 检查 Provision..."
echo ""

if [ -f "$APP_PATH/embedded.mobileprovision" ]; then
    echo "✅ embedded.mobileprovision 存在"
else
    echo "⚠️ 未发现 embedded.mobileprovision（可能是未签名 Archive）"
fi

#################################################
# 创建 Payload
#################################################

TMP_DIR=$(mktemp -d)

PAYLOAD_DIR="$TMP_DIR/Payload"
mkdir -p "$PAYLOAD_DIR"

echo ""
echo "📂 复制 App..."
echo ""

cp -R "$APP_PATH" "$PAYLOAD_DIR/"

#################################################
# 打包 IPA
#################################################

echo ""
echo "📦 打包 IPA..."
echo ""

cd "$TMP_DIR"
zip -qry "$IPA_PATH" Payload

#################################################
# 生成 SHA256
#################################################

echo ""
echo "🔐 生成 SHA256..."
echo ""

shasum -a 256 "$IPA_PATH" > "$SHA_PATH"

#################################################
# 校验 IPA
#################################################

echo ""
echo "🔍 验证 IPA..."
echo ""

unzip -l "$IPA_PATH" | head -20

#################################################
# 输出结果
#################################################

echo ""
echo "========================================"
echo "              完成"
echo "========================================"

echo ""
echo "📦 IPA"
echo "$IPA_PATH"

echo ""
echo "🔐 SHA256"
echo "$SHA_PATH"

echo ""
echo "📏 文件大小"
ls -lh "$IPA_PATH"

echo ""
echo "🔑 Hash"
cat "$SHA_PATH"

#################################################
# 清理
#################################################

rm -rf "$TMP_DIR"

echo ""
echo "🧹 临时文件已清理"
echo ""
echo "========================================"
echo "     打包成功"
echo "========================================"
echo ""
