#!/bin/bash

set -e

MESSAGE="La seconde partie du siège a commencé ! <@&1183532461636988979>"
WEBHOOK="https://discord.com/api/webhooks/1127351601724661962/G4zemQDxn-V__fVEHZooY0x2zDth4tQL817eSc52D4K-VgUJBUMMCThbyGGcEKys_9Lk"
USERNAME="Les potos de la GVO"

curl -X POST \
     -F "content=${MESSAGE}" \
     -F "username=${USERNAME}" \
     "${WEBHOOK}"
