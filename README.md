# Savage Worlds Discord Bot

Ein Discord Chatbot für **Savage Worlds** *Abenteuer-Edition*.

## Bot Setup

Zunächst muss mit dem eigenen Discord Account im Developer Portal eine Bot-Anwendung angelegt werden; folge dazu einfach der [offiziellen Anleitung](https://discordapp.com/developers/docs/intro).

Erstelle anschließend mit dem OAuth2 URL Generator des Developer Portals einen Link mit `bot` als Scope und den Permissions `Send Messages` und `Manage Messages`.

Diese Permissions werden benötigt, damit der Bot auf Nachrichten Antworten und über einen Admin-Befehl Nachrichten löschen kann.

Der erzeugte Link sollte ungefähr so aussehen:

```bash
https://discordapp.com/api/oauth2/authorize?client_id=xyz&permissions=10240&scope=bot
```

Über diesen Link kann der Bot nun zu einem beliebigen Server hinzugefügt werden.

## Installation und Start

Zunächst müssen die Dependencies installiert werden:

```bash
$ cd savage-worlds-discord-bot
$ npm install
```

Als nächstes muss der Discord Bot Token aus dem Developer Portal als Umgebungsvariable hinterlegt werden.

Dazu muss `.env.example` in `.env` umbenannt werden; dort kann der Token folgendermaßen platziert werden:

```bash
DISCORD_TOKEN=XYZ
```

Nun kann die App gestartet werden:

```bash
$ npm start
```

Wenn alles korrekt konfiguriert ist, sollte der Bot nun auf deinem Discord Server als "online" angezeigt werden und auf Nachrichten reagieren.

Schreib einfach die Nachricht `!hilfe`, um mehr über die verfügbaren Befehle zu erfahren.

## Entwicklung

### Linting und Formatierung

```bash
$ npm run lint
$ npm run prettier
```

### Tests

```bash
$ npm test
$ npm run test:watch
$ npm run test:coverage
```
