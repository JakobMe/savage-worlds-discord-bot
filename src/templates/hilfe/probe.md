so funktioniert der Befehl `probe` :dart:
```console
> !probe <würfel> [mod] [optionen]

Würfelt eine Probe mit den angegebenen Würfeln auf den Zielwert 4, inklusive Wildcard-Würfel.
Alle Würfel können explodieren, erlaubt sind W4, W6, W8, W10 und W12.

Optionen:

  !ziel <wert>    Alternativer Zielwert               # (Standard:  4)
  !wild <wert>    Wildcard-Würfel benutzen ja/nein    # (Standard: ja)

Beispiele:

> !probe 1w8               # Probe mit einem W8
> !probe 2w10              # Probe mit zwei W10
> !probe 1w8 +2            # Probe mit einem W8 und einem Bonus von 2
> !probe 1w4 -1            # Probe mit einem W4 und einem Malus von 1
> !probe 1w6 !wild nein    # Probe ohne Wildcard-Würfel
> !probe 1w8 !ziel 6       # Probe auf den Zielwert 6
```