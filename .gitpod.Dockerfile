from gitpod/workspace-full

ENV TRIGGER_REBUILD 0

USER gitpod

run sudo apt-get update && \
    sudo apt-get install -y \
    pkg-config \
    rust-lldb \
    && sudo rm -rf /var/lib/apt/lists/*

env RUST_LLDB=/usr/bin/lldb-11