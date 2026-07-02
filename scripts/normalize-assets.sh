#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT_DIR}/src/Assets/Normalized"
STILL_OUT="${OUT_DIR}/stills"
POSTCARD_OUT="${OUT_DIR}/postcard"
mkdir -p "${STILL_OUT}/flowers" "${STILL_OUT}/plants" "${STILL_OUT}/roots" "${POSTCARD_OUT}"

if ! command -v magick >/dev/null 2>&1; then
  echo "ImageMagick is required. Install it first, then rerun this script." >&2
  exit 1
fi

normalize_center() {
  local input="$1"
  local output="$2"
  local size="$3"
  local gravity="$4"

  magick "$input" \
    -auto-orient \
    -trim +repage \
    -background none \
    -gravity "$gravity" \
    -extent "$size" \
    "$output"
}

normalize_fit() {
  local input="$1"
  local output="$2"
  local size="$3"
  local gravity="$4"

  magick "$input" \
    -auto-orient \
    -trim +repage \
    -background none \
    -resize "${size}>" \
    -gravity "$gravity" \
    -extent "$size" \
    "$output"
}

copy_asset() {
  local input="$1"
  local output="$2"

  cp "$input" "$output"
}

echo "Normalizing flower assets..."
normalize_fit "${ROOT_DIR}/src/Assets/yellow_flower.png" "${STILL_OUT}/flowers/yellow_flower.png" 1000x1000 center
normalize_fit "${ROOT_DIR}/src/Assets/white_flower.png" "${STILL_OUT}/flowers/white_flower.png" 1000x1000 center
normalize_fit "${ROOT_DIR}/src/Assets/blue_flower.png" "${STILL_OUT}/flowers/blue_flower.png" 1000x1000 center
normalize_fit "${ROOT_DIR}/src/Assets/purple_flower.png" "${STILL_OUT}/flowers/purple_flower.png" 1000x1000 center
normalize_fit "${ROOT_DIR}/src/Assets/yellow_flower copy.jpeg" "${STILL_OUT}/flowers/yellow_flower_copy.jpeg" 1000x1000 center

echo "Normalizing root assets..."
normalize_center "${ROOT_DIR}/src/Assets/Plants/ShortRoots.png" "${STILL_OUT}/roots/ShortRoots.png" 1000x1000 north
normalize_center "${ROOT_DIR}/src/Assets/Plants/LongRoots.png" "${STILL_OUT}/roots/LongRoots.png" 1000x1000 north

echo "Normalizing plant assets..."
normalize_center "${ROOT_DIR}/src/Assets/Plants/ShortPlant.png" "${STILL_OUT}/plants/ShortPlant.png" 1200x1600 south
normalize_center "${ROOT_DIR}/src/Assets/Plants/TallPlant.png" "${STILL_OUT}/plants/TallPlant.png" 1200x1600 south
normalize_center "${ROOT_DIR}/src/Assets/Plants/output.png" "${STILL_OUT}/plants/output.png" 1200x1600 south

echo "Copying full-bleed postcard and background artwork..."
copy_asset "${ROOT_DIR}/src/Assets/PostcardBackground.png" "${POSTCARD_OUT}/PostcardBackground.png"
copy_asset "${ROOT_DIR}/src/Assets/PostcardBack.png" "${POSTCARD_OUT}/PostcardBack.png"
copy_asset "${ROOT_DIR}/src/Assets/Background.png" "${POSTCARD_OUT}/Background.png"
copy_asset "${ROOT_DIR}/src/Assets/start-screen.jpeg" "${POSTCARD_OUT}/start-screen.jpeg"
copy_asset "${ROOT_DIR}/src/Assets/slide_1_landscape.jpeg" "${POSTCARD_OUT}/slide_1_landscape.jpeg"
copy_asset "${ROOT_DIR}/src/Assets/slide_2_hand.jpeg" "${POSTCARD_OUT}/slide_2_hand.jpeg"
copy_asset "${ROOT_DIR}/src/Assets/lr_ts_fp_plant.jpeg" "${POSTCARD_OUT}/lr_ts_fp_plant.jpeg"
copy_asset "${ROOT_DIR}/src/Assets/U_of_C_Canola_Plants_1.jpeg" "${POSTCARD_OUT}/U_of_C_Canola_Plants_1.jpeg"
copy_asset "${ROOT_DIR}/src/Assets/DNA.png" "${POSTCARD_OUT}/DNA.png"
copy_asset "${ROOT_DIR}/src/Assets/orange-arrow.jpg" "${POSTCARD_OUT}/orange-arrow.jpg"

echo "Done."
echo
