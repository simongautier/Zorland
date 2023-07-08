#!/bin/bash

# Chemin vers le script à exécuter
GVO="/Users/simongautier/Documents/Botdiscord/Zorland/commands/scripts/reminderGVO.sh"
gvoSecond="/Users/simongautier/Documents/Botdiscord/Zorland/commands/scripts/reminderGVOSecond.sh"
GVW="/Users/simongautier/Documents/Botdiscord/Zorland/commands/scripts/reminderGVW.sh"
SubjugationFirst="/Users/simongautier/Documents/Botdiscord/Zorland/commands/scripts/reminderSubjugationFirst.sh"
SubjugationSecond="/Users/simongautier/Documents/Botdiscord/Zorland/commands/scripts/reminderSubjugationSecond.sh"


(crontab -l ; echo "0 0 12 ? * MON,THU *  $GVO") | crontab -
(crontab -l ; echo "0 0 9 ? * WED,FRI *  $GVW") | crontab -
(crontab -l ; echo "0 0 9 ? * TUE *  $SubjugationFirst") | crontab -
(crontab -l ; echo "0 0 21 ? * THU *  $SubjugationSecond") | crontab -
(crontab -l ; echo "0 0 12 ? * TUE,FRI *   $gvoSecond") | crontab -








