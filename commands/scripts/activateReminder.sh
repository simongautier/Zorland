#!/bin/bash

# Chemin vers le script à exécuter
GVO="../scripts/reminderGVO.sh"
gvoSecond="../scripts/reminderGVOSecond.sh"
GVW="/../scripts/reminderGVW.sh"
SubjugationFirst="../scripts/reminderSubjugationFirst.sh"
SubjugationSecond="../scripts/reminderSubjugationSecond.sh"
Labyrinthe="../scripts/reminderLabyrinthe.sh"


(crontab -l ; echo "0 0 12 ? * MON,THU *  $GVO") | crontab -
(crontab -l ; echo "0 0 9 ? * WED,FRI *  $GVW") | crontab -
(crontab -l ; echo "0 0 9 ? * TUE *  $SubjugationFirst") | crontab -
(crontab -l ; echo "0 0 21 ? * THU *  $SubjugationSecond") | crontab -
(crontab -l ; echo "0 0 12 ? * TUE,FRI *   $gvoSecond") | crontab -









