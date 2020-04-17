so funktioniert der Befehl `ini` :black_joker:
```console
> !ini [@spieler...] [gegner]

Zieht für alle erwähnten Spieler und die angegebene Anzahl von Gegnern Poker-Karten, um die Initiative-Reihenfolge zu bestimmen.
Es muss mindestens ein Spieler erwähnt oder ein Gegner angegeben werden.

Beispiele:

> !ini @Max           # Zieht Karten für einen Spieler
> !ini 5              # Zieht Karten für fünf Gegner
> !ini @Max 3         # Zieht Karten für einen Spieler und drei Gegner
> !ini @Max @Peter    # Zieht Karten für zwei Spieler
```