so funktioniert der Befehl `probe` :dart:
```console
> !probe <würfel> [mod] ["kommentar"] [optionen]

Würfelt eine Probe mit den angegebenen Würfeln auf den Zielwert 4, inklusive Wildcard-Würfel. Alle Würfel können explodieren, erlaubt sind W4, W6, W8, W10 und W12. Die Würfel können als "6", "w6" oder "1w6" angegeben werden.

Optionen:

  !ziel <wert>    Zielwert    [1 - 20]                (Standard 4)
  !wild <wert>    Wildcard    [0, 4, 6, 8, 10, 12]    (Standard 6)

Beispiele:

> !probe 8               # Probe mit einem W8
> !probe w6              # Probe mit einem W6
> !probe 2w10            # Probe mit zwei W10
> !probe w8 +2           # Probe mit einem W8 und einem Bonus von 2
> !probe w4 -1           # Probe mit einem W4 und einem Malus von 1
> !probe 8 "Athletik"    # Probe mit Kommentar
> !probe w6 !wild 4      # Probe mit W4 als Wildcard-Würfel
> !probe w6 !wild 0      # Probe ohne Wildcard-Würfel
> !probe w8 !ziel 6      # Probe auf den Zielwert 6
```