so funktioniert der Befehl `wurf` :game_die:
```console
> !wurf <würfel> [mod]

Würfelt eine bestimmte Anzahl und Typen an Würfeln und summiert die Augenzahlen. Die Würfel explodieren nicht, erlaubt sind W2, W3, W4, W6, W8, W10, W12, W20 und W100. Die Würfel können als "6", "w6" oder "1w6" angegeben werden.

Beispiele:

> !wurf 4           # Würfelt einen W4
> !wurf w8          # Würfelt einen W8
> !wurf 3w20        # Würfelt drei W20
> !wurf 2w6 +4      # Würfelt zwei W6 und addiert 4
> !wurf 3w6 -2      # Würfelt drei W6 und subtrahiert 2
> !wurf 1w4,2w12    # Würfelt einen W4 und zwei W12
> !wurf 4,2w3,w6    # Würfelt einen W4 und zwei W3 und einen W6
```