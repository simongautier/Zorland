#!/bin/bash

# Chemin vers le script à exécuter
GVO="./reminderGVO.sh"



(crontab -l ; echo "* * * * * $GVO") | crontab -









