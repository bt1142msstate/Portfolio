#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGE_DIR="$ROOT_DIR/assets/images"
PROJECT_DIR="$IMAGE_DIR/projects"
ILLUSTRATION_SOURCE="$IMAGE_DIR/brandon-illustrated-profile-photo.jpg"
TMP_DIR="$(mktemp -d /tmp/portfolio-responsive-images.XXXXXX)"

for command in ffmpeg cwebp; do
    if ! command -v "$command" >/dev/null 2>&1; then
        echo "$command is required to build responsive images." >&2
        exit 1
    fi
done

cleanup() {
    rm -rf "$TMP_DIR"
}
trap cleanup EXIT

render_crop() {
    local input="$1"
    local output="$2"
    local width="$3"
    local height="$4"
    local crop="$5"
    local temporary="$TMP_DIR/$(basename "${output%.webp}").png"

    ffmpeg -loglevel error -y -i "$input" \
        -vf "${crop},scale=${width}:${height}:flags=lanczos,format=rgb24" \
        -frames:v 1 -map_metadata -1 "$temporary"
    cwebp -quiet -q 84 -m 6 -metadata none "$temporary" -o "$output"
}

render_project_variant() {
    local input="$1"
    local output="$2"
    local width="$3"
    local height="$4"
    local foreground_width=$((width * 94 / 100))
    local foreground_height=$((height * 94 / 100))
    local temporary="$TMP_DIR/$(basename "${output%.webp}").png"

    ffmpeg -loglevel error -y -i "$input" \
        -filter_complex "[0:v]split=2[background][foreground];[background]scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height},boxblur=18:2,eq=brightness=-0.14:saturation=0.68[canvas];[foreground]scale=${foreground_width}:${foreground_height}:force_original_aspect_ratio=decrease:flags=lanczos[content];[canvas][content]overlay=(W-w)/2:(H-h)/2,format=rgb24[output]" \
        -map "[output]" -frames:v 1 -map_metadata -1 "$temporary"
    cwebp -quiet -q 80 -m 6 -metadata none "$temporary" -o "$output"
}

# The About portrait uses focal crops instead of stretching one composition.
render_crop "$ILLUSTRATION_SOURCE" "$IMAGE_DIR/brandon-illustrated-profile-photo--3x4-540.webp" 540 720 "crop=1050:1400:35:0"
render_crop "$ILLUSTRATION_SOURCE" "$IMAGE_DIR/brandon-illustrated-profile-photo--3x4-810.webp" 810 1080 "crop=1050:1400:35:0"
render_crop "$ILLUSTRATION_SOURCE" "$IMAGE_DIR/brandon-illustrated-profile-photo--2x3-480.webp" 480 720 "crop=932:1398:94:1"
render_crop "$ILLUSTRATION_SOURCE" "$IMAGE_DIR/brandon-illustrated-profile-photo--2x3-720.webp" 720 1080 "crop=932:1398:94:1"
render_crop "$ILLUSTRATION_SOURCE" "$IMAGE_DIR/brandon-illustrated-profile-photo--4x3-720.webp" 720 540 "crop=1120:840:0:180"
render_crop "$ILLUSTRATION_SOURCE" "$IMAGE_DIR/brandon-illustrated-profile-photo--4x3-1080.webp" 1080 810 "crop=1120:840:0:180"

# Project screenshots keep their full interface inside four reusable card shapes.
for input in "$PROJECT_DIR"/*.webp; do
    case "$input" in
        *--4x5.webp|*--4x3.webp|*--16x10.webp|*--1x1.webp)
            continue
            ;;
    esac

    stem="${input%.webp}"
    render_project_variant "$input" "${stem}--4x5.webp" 960 1200
    render_project_variant "$input" "${stem}--4x3.webp" 1200 900
    render_project_variant "$input" "${stem}--16x10.webp" 1280 800
    render_project_variant "$input" "${stem}--1x1.webp" 960 960
done

echo "Responsive image variants generated."
