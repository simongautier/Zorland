#!/bin/bash

set -e

MESSAGE="La GVO a commencé <@&1183532461636988979> !"
WEBHOOK="https://discord.com/api/webhooks/1220387840047976648/BBZNOf_wB88gc_p5Kymip7buUioK81iHhr1P0k1gbBlfIZnEW7VPb1flhRUn4K3R6Oud"
USERNAME="Les Potos de la GVO"

curl -X POST \
     -F "content=${MESSAGE}" \
     -F "username=${USERNAME}" \
     "${WEBHOOK}"

     



