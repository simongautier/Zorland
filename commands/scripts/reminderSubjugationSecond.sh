#!/bin/bash

set -e

MESSAGE="Le Roi des Slimes est apparu ! @everyone"
WEBHOOK="https://discord.com/api/webhooks/1127351601724661962/G4zemQDxn-V__fVEHZooY0x2zDth4tQL817eSc52D4K-VgUJBUMMCThbyGGcEKys_9Lk"
USERNAME="Les potos du Roi des Slimes"

curl -X POST \
     -F "content=${MESSAGE}" \
     -F "username=${USERNAME}" \
     "${WEBHOOK}"
