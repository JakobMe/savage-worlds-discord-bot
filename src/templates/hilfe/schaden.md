so funktioniert der Befehl `schaden` :skull:
```console
> !schaden <würfel> [mod]

Würfelt eine bestimmte Anzahl und Typen an Würfeln und summiert den Gesamtschaden auf. Alle Würfel können explodieren, erlaubt sind W2, W3, W4, W6, W8, W10, W12, W20 und W100. Die Würfel können als "6", "w6" oder "1w6" angegeben werden.

Beispiele:

> !schaden 6             # Ein W6 Schaden
> !schaden 2w8           # Zwei W8 Schaden
> !schaden 8,6           # Ein W8 und ein W6 Schaden
> !schaden w6 +4         # Ein W6 +4 Schaden
> !schaden w4,2w6 +2     # Ein W4 und zwei W6 +2 Schaden
> !schaden 2w4,2w3 -2    # Zwei W4 und zwei W3 -2 Schaden
> !schaden 8,4,3,3w6     # Ein W8, ein W4, ein W3 und drei W6 Schaden
```