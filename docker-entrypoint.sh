#!/bin/sh
set -e

# Start the Bun API server in the background
bun run server/index.ts &
BUN_PID=$!

# Start nginx in the foreground (PID 1 signal handler)
nginx -g "daemon off;" &
NGINX_PID=$!

# Relay signals to both child processes
trap 'kill "$BUN_PID" "$NGINX_PID" 2>/dev/null; exit 0' INT TERM

# Wait for either process to exit; restart policy handles the rest
wait -n

# If either exits unexpectedly, kill the other and exit non-zero
kill "$BUN_PID" "$NGINX_PID" 2>/dev/null
exit 1
