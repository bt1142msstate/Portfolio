#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-8765}"
PDF_PATH="$ROOT_DIR/resume/brandon-temple-resume.pdf"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP_DIR="$(mktemp -d /tmp/portfolio-resume-pdf.XXXXXX)"
TMP_PDF="$TMP_DIR/brandon-temple-resume.pdf"

if [[ ! -x "$CHROME" ]]; then
    echo "Google Chrome was not found at: $CHROME" >&2
    exit 1
fi

cleanup() {
    if [[ -n "${CHROME_PID:-}" ]]; then
        kill "$CHROME_PID" 2>/dev/null || true
        wait "$CHROME_PID" 2>/dev/null || true
    fi
    if [[ -n "${SERVER_PID:-}" ]]; then
        kill "$SERVER_PID" 2>/dev/null || true
        wait "$SERVER_PID" 2>/dev/null || true
    fi
    rm -rf "$TMP_DIR"
}
trap cleanup EXIT

cd "$ROOT_DIR"
python3 -m http.server "$PORT" --bind 127.0.0.1 >/tmp/portfolio-resume-server.log 2>&1 &
SERVER_PID="$!"
sleep 1
if ! kill -0 "$SERVER_PID" 2>/dev/null; then
    cat /tmp/portfolio-resume-server.log >&2
    exit 1
fi

rm -rf /tmp/chrome-portfolio-resume-pdf

"$CHROME" \
    --headless=new \
    --disable-gpu \
    --disable-background-networking \
    --disable-extensions \
    --disable-component-update \
    --no-first-run \
    --run-all-compositor-stages-before-draw \
    --no-pdf-header-footer \
    --print-to-pdf-no-header \
    --user-data-dir=/tmp/chrome-portfolio-resume-pdf \
    --print-to-pdf="$TMP_PDF" \
    "http://127.0.0.1:$PORT/resume/" &
CHROME_PID="$!"

PREVIOUS_SIZE=0
STABLE_COUNT=0
for _ in {1..60}; do
    if [[ -f "$TMP_PDF" ]]; then
        CURRENT_SIZE="$(stat -f%z "$TMP_PDF")"
        if [[ "$CURRENT_SIZE" -gt 0 && "$CURRENT_SIZE" -eq "$PREVIOUS_SIZE" ]]; then
            STABLE_COUNT=$((STABLE_COUNT + 1))
        else
            STABLE_COUNT=0
        fi

        if [[ "$STABLE_COUNT" -ge 2 ]]; then
            break
        fi
        PREVIOUS_SIZE="$CURRENT_SIZE"
    fi
    sleep 0.5
done

if kill -0 "$CHROME_PID" 2>/dev/null; then
    kill "$CHROME_PID" 2>/dev/null || true
fi
wait "$CHROME_PID" 2>/dev/null || true

if [[ ! -s "$TMP_PDF" ]]; then
    echo "Chrome did not generate a resume PDF." >&2
    exit 1
fi

if strings "$TMP_PDF" | grep -E "127\\.0\\.0\\.1|localhost|^[0-9]+/[0-9]+/[0-9]+" >/dev/null; then
    echo "PDF appears to contain browser headers or a local URL." >&2
    exit 1
fi

cp "$TMP_PDF" "$PDF_PATH"
echo "Generated $PDF_PATH"
