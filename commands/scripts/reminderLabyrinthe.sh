#!/bin/bash

set -e

MESSAGE="Oubliez pas le laby les bg <@&1181930764103860295>"
WEBHOOK="https://discord.com/api/webhooks/1127351601724661962/G4zemQDxn-V__fVEHZooY0x2zDth4tQL817eSc52D4K-VgUJBUMMCThbyGGcEKys_9Lk"
USERNAME="Les potos de la GVO"

curl -X POST \
     -F "content=${MESSAGE}" \
     -F "username=${USERNAME}" \
     "${WEBHOOK}"