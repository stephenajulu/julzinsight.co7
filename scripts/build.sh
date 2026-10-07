#!/usr/bin/env bash
set -euo pipefail

HUGO_REQUIRED_VERSION="${HUGO_VERSION:-0.160.1}"

# Check if Hugo Extended is available
if command -v hugo &> /dev/null; then
  echo "Hugo found in PATH: $(hugo version)"
  hugo --minify --cleanDestinationDir
else
  echo "Hugo not found in PATH. Downloading Hugo Extended v${HUGO_REQUIRED_VERSION}..."
  mkdir -p /tmp/hugo_bin
  TAR_URL="https://github.com/gohugoio/hugo/releases/download/v${HUGO_REQUIRED_VERSION}/hugo_extended_${HUGO_REQUIRED_VERSION}_linux-amd64.tar.gz"
  curl -sL "${TAR_URL}" | tar -xz -C /tmp/hugo_bin
  chmod +x /tmp/hugo_bin/hugo
  echo "Successfully installed: $(/tmp/hugo_bin/hugo version)"
  /tmp/hugo_bin/hugo --minify --cleanDestinationDir
fi

echo "Build completed successfully into ./public"
