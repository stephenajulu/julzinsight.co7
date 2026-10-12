#!/usr/bin/env bash
set -euo pipefail

HUGO_REQUIRED_VERSION="${HUGO_VERSION:-0.160.1}"
BIN_DIR="/tmp/hugo_bin"
HUGO_EXEC="hugo"

NEED_DOWNLOAD=1
if command -v hugo &> /dev/null; then
  CURRENT_VERSION=$(hugo version 2>&1 | awk '{print $2}' | sed 's/v//' | cut -d'-' -f1 || true)
  echo "Found system Hugo version: ${CURRENT_VERSION}"
  if [ "${CURRENT_VERSION}" = "${HUGO_REQUIRED_VERSION}" ]; then
    NEED_DOWNLOAD=0
    HUGO_EXEC="hugo"
  fi
fi

if [ "${NEED_DOWNLOAD}" -eq 1 ]; then
  echo "Downloading Hugo Extended v${HUGO_REQUIRED_VERSION} Linux AMD64 for Render..."
  mkdir -p "${BIN_DIR}"
  TAR_URL="https://github.com/gohugoio/hugo/releases/download/v${HUGO_REQUIRED_VERSION}/hugo_extended_${HUGO_REQUIRED_VERSION}_linux-amd64.tar.gz"
  curl -sL "${TAR_URL}" | tar -xz -C "${BIN_DIR}"
  chmod +x "${BIN_DIR}/hugo"
  HUGO_EXEC="${BIN_DIR}/hugo"
fi

echo "Compiling site with: $("${HUGO_EXEC}" version)"
"${HUGO_EXEC}" --gc --minify --cleanDestinationDir

echo "Render build completed successfully into ./public"
