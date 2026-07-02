#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IN_DIR="${ROOT_DIR}/src/Assets/Animations"
OUT_DIR="${ROOT_DIR}/src/Assets/Normalized/animations"
COMMON_SIZE="1200:1600"
ANIMATION_FPS=15
mkdir -p "${OUT_DIR}"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required. Install it first, then rerun this script." >&2
  exit 1
fi

if ! command -v magick >/dev/null 2>&1; then
  echo "ImageMagick is required for the static artwork normalization. Install it first, then rerun this script." >&2
  exit 1
fi

render_apng() {
  local input="$1"
  local output="$2"
  local size="$3"
  local gravity="${4:-center}"
  local key_color="${5:-0xFFFFFF}"
  local pad_y="(oh-ih)/2"

  case "$gravity" in
    north)
      pad_y="0"
      ;;
    south)
      pad_y="oh-ih"
      ;;
    center)
      pad_y="(oh-ih)/2"
      ;;
    *)
      pad_y="(oh-ih)/2"
      ;;
  esac

  ffmpeg -y -i "$input" \
    -vf "format=rgba,colorkey=${key_color}:0.10:0.03,scale=${size}:force_original_aspect_ratio=decrease,pad=${size}:(ow-iw)/2:${pad_y}:color=0x00000000,format=rgba,setsar=1,fps=${ANIMATION_FPS}" \
    -f apng \
    -plays 1 \
    -an \
    "$output"
}

render_mp4() {
  local input="$1"
  local output="$2"
  local size="$3"

  ffmpeg -y -i "$input" \
    -vf "scale=${size}:force_original_aspect_ratio=decrease,pad=${size}:(ow-iw)/2:(oh-ih)/2:color=white,fps=30" \
    -c:v libx264 \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -an \
    "$output"
}

render_webp() {
  local input="$1"
  local output="$2"
  local size="$3"
  local gravity="${4:-south}"

  magick "$input" \
    -coalesce \
    -auto-orient \
    -alpha set \
    -background none \
    -resize "${size}>" \
    -gravity "$gravity" \
    -extent "$size" \
    -layers Optimize \
    -define webp:lossless=true \
    "$output"
}

echo "Normalizing DNA animations..."
render_apng "${IN_DIR}/DNA.webm" "${OUT_DIR}/DNA.png" 1000:1000
render_apng "${IN_DIR}/DNA_.webm" "${OUT_DIR}/DNA_.png" 1000:1000
render_apng "${IN_DIR}/DNA_non_trans.webm" "${OUT_DIR}/DNA_non_trans.png" 1000:1000
render_apng "${IN_DIR}/STILL_DNA.webm" "${OUT_DIR}/STILL_DNA.png" 1000:1000

echo "Normalizing all non-DNA animations to the same frame..."
render_apng "${IN_DIR}/GrowingRoots.webm" "${OUT_DIR}/GrowingRoots.png" "${COMMON_SIZE}" north
render_apng "${IN_DIR}/GrowingRootsReverse.webm" "${OUT_DIR}/GrowingRootsReverse.png" "${COMMON_SIZE}" north
render_apng "${IN_DIR}/NEWGrowingRootsReverse.webm" "${OUT_DIR}/NEWGrowingRootsReverse.png" "${COMMON_SIZE}" north
render_apng "${IN_DIR}/ShortPlantsMorePods.webm" "${OUT_DIR}/ShortPlantsMorePods.png" "${COMMON_SIZE}" south
render_apng "${IN_DIR}/ShortPlantsMorePodsREVERSE.webm" "${OUT_DIR}/ShortPlantsMorePodsREVERSE.png" "${COMMON_SIZE}" south
render_apng "${IN_DIR}/NEWShortPlantsMorePods.webm" "${OUT_DIR}/NEWShortPlantsMorePods.png" "${COMMON_SIZE}" south
render_apng "${IN_DIR}/NEWShortPlantsMorePodsREVERSE.webm" "${OUT_DIR}/NEWShortPlantsMorePodsREVERSE.png" "${COMMON_SIZE}" south
render_apng "${IN_DIR}/NEW_NEWShortPlantsMorePodsREVERSE.webm" "${OUT_DIR}/NEW_NEWShortPlantsMorePodsREVERSE.png" "${COMMON_SIZE}" south
render_apng "${IN_DIR}/STILLNEWShortPlantsMorePods_1.webm" "${OUT_DIR}/STILLNEWShortPlantsMorePods_1.png" "${COMMON_SIZE}" south
render_apng "${IN_DIR}/NEWTallPlantsMorePods.webm" "${OUT_DIR}/NEWTallPlantsMorePods.png" "${COMMON_SIZE}" south
render_apng "${IN_DIR}/NEWTallPlantsMorePodsREVERSE.webm" "${OUT_DIR}/NEWTallPlantsMorePodsREVERSE.png" "${COMMON_SIZE}" south
render_apng "${IN_DIR}/STILL_NEWTallPlantsMorePods.webm" "${OUT_DIR}/STILL_NEWTallPlantsMorePods.png" "${COMMON_SIZE}" south
render_apng "${IN_DIR}/TallPlantsMorePods.webm" "${OUT_DIR}/TallPlantsMorePods.png" "${COMMON_SIZE}" south
render_apng "${IN_DIR}/TallPlantsMorePodsREVERSE.webm" "${OUT_DIR}/TallPlantsMorePodsREVERSE.png" "${COMMON_SIZE}" south
render_apng "${IN_DIR}/output.webm" "${OUT_DIR}/output.png" "${COMMON_SIZE}" south

echo "Normalizing non-transparent plant artwork..."
render_webp "${IN_DIR}/output.webp" "${OUT_DIR}/output.webp" "${COMMON_SIZE}" south

echo "Normalizing landing video..."
render_mp4 "${IN_DIR}/LandingPage.mp4" "${OUT_DIR}/LandingPage.mp4" 1920:1080

echo
echo "Done. Normalized animation files are in:"
echo "  ${OUT_DIR}"
echo
echo "If any clip still feels off, I can tune the size for that specific filename."
