#!/usr/bin/env bash
# ============================================================
# AIRMATE FS35-SRD133 风扇控制器启动脚本
#   ./run.sh          启动（默认）
#   ./run.sh start    启动
#   ./run.sh stop     结束进程
#   ./run.sh restart  重启
#   ./run.sh status   查看运行状态
# ============================================================

set -euo pipefail

# 脚本所在目录（无论在哪调用都基于项目根）
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

VENV_DIR="$SCRIPT_DIR/.venv"
PID_FILE="$SCRIPT_DIR/.fan.pid"
LOG_FILE="$SCRIPT_DIR/fan.log"
HOST="0.0.0.0"
PORT="8080"

# ---------- 工具函数 ----------

is_running() {
    [[ -f "$PID_FILE" ]] || return 1
    local pid
    pid="$(cat "$PID_FILE" 2>/dev/null || echo)"
    [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

ensure_venv() {
    if [[ -d "$VENV_DIR" ]]; then
        echo "✓ 虚拟环境已存在：$VENV_DIR"
    else
        echo "→ 创建虚拟环境…"
        python3 -m venv "$VENV_DIR"
        echo "✓ 虚拟环境已创建"
    fi

    # shellcheck disable=SC1091
    source "$VENV_DIR/bin/activate"
    echo "→ 安装依赖（bleak）…"
    pip install --quiet --upgrade pip
    pip install --quiet -r requirements.txt
    echo "✓ 依赖就绪"
}

start() {
    if is_running; then
        echo "⚠ 已在运行（PID $(cat "$PID_FILE")）。先 ./run.sh stop 再启动。"
        exit 0
    fi

    ensure_venv

    echo "→ 启动风扇控制器（后台）…"
    # nohup 后台启动（macOS 无 setsid，用 nohup + & 跨平台通用）
    # web_server.py 在 controllers/ 下，切到该目录执行
    ( source "$VENV_DIR/bin/activate"; cd "$SCRIPT_DIR/controllers"; exec python web_server.py ) \
        > "$LOG_FILE" 2>&1 &
    nohup true >/dev/null 2>&1 || true   # 兼容无 nohup 的环境（此处实际用 & 即可）

    local pid=$!
    echo "$pid" > "$PID_FILE"

    # 等一下确认没立刻崩
    sleep 1.5
    if ! is_running; then
        echo "✗ 启动失败，请查看日志：$LOG_FILE"
        cat "$LOG_FILE"
        rm -f "$PID_FILE"
        exit 1
    fi

    echo ""
    echo "=================================================="
    echo "✓ 已启动  PID=$(cat "$PID_FILE")"
    echo "  访问: http://localhost:$PORT/"
    echo "  日志: tail -f $LOG_FILE"
    echo "  结束: ./run.sh stop"
    echo "=================================================="
}

stop() {
    if ! is_running; then
        echo "⚠ 没有运行中的进程"
        rm -f "$PID_FILE"
        return 0
    fi

    local pid
    pid="$(cat "$PID_FILE")"
    echo "→ 正在结束进程 PID=$pid …"

    # 主进程为单进程 python，直接 TERM 即可；失败时回退进程组（Linux）
    kill -TERM "$pid" 2>/dev/null || kill -TERM "-$pid" 2>/dev/null || true

    # 等待最多 5 秒优雅退出
    local i
    for i in $(seq 1 10); do
        if ! is_running; then break; fi
        sleep 0.5
    done

    # 仍存活则强制结束
    if is_running; then
        echo "→ 强制结束…"
        kill -KILL "$pid" 2>/dev/null || kill -KILL "-$pid" 2>/dev/null || true
        sleep 0.5
    fi

    rm -f "$PID_FILE"
    echo "✓ 已停止"
}

status() {
    if is_running; then
        echo "● 运行中  PID=$(cat "$PID_FILE")"
        echo "  访问: http://localhost:$PORT/"
    else
        echo "○ 未运行"
        rm -f "$PID_FILE" 2>/dev/null || true
    fi
}

# ---------- 入口 ----------

case "${1:-start}" in
    start|"")   start ;;
    stop)       stop ;;
    restart)    stop; start ;;
    status)     status ;;
    *)
        echo "用法: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac
