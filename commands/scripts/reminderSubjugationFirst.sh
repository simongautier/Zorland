#!/bin/bash

set -e

MESSAGE="La première période de la subjugation a commencé ! <@&1181930764103860295"
WEBHOOK=https://discord.com/api/webhooks/1220387840047976648/BBZNOf_wB88gc_p5Kymip7buUioK81iHhr1P0k1gbBlfIZnEW7VPb1flhRUn4K3R6Oud"
USERNAME="Les potos de la subjugation"

curl -X POST \
     -F "content=${MESSAGE}" \
     -F "username=${USERNAME}" \
     "${WEBHOOK}"
