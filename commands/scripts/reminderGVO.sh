#!/bin/bash



WEBHOOK="https://discord.com/api/webhooks/1242813038847852696/hZj4TLqPDMUawYL0fdY9zwbKx2LqFNiH9p5thMLyfji_DWHXmV192W4pr98e9cRFGTOa"
MESSAGE="@Angel's Slayer  Jour de siège  .
 Nous vous invitons à relire les règles épinglées dans les salons. 
et
Rappel: 
Vérifiez vos Runes et Artés.
Reset des scores des defs.
(Enlevez un mob de chaque defs puis le remettre).
Respectez les règles (voir messages épinglés dans ce chanel ou dans ⁠ #💬・angels-slayer  ).
N'hésitez pas à demander en cas de doute.
N'hésitez pas à regarder le #📖・pokedex  et swgt.io pour des idées de counter.

Bon Tenten à tous !"


curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"content":"'"$MESSAGE"'","username":"Les Potos de la GVO"}' \
     $WEBHOOK





# @Angel's Slayer  Jour de siège  .
#  Nous vous invitons à relire les règles épinglées dans les salons. 
# et
# Rappel: 
# Vérifiez vos Runes et Artés.
# Reset des scores des defs.
# (Enlevez un mob de chaque defs puis le remettre).
# Respectez les règles (voir messages épinglés dans ce chanel ou dans ⁠ #💬・angels-slayer  ).
# N'hésitez pas à demander en cas de doute.
# N'hésitez pas à regarder le #📖・pokedex  et swgt.io pour des idées de counter.

# Bon Tenten à tous !