# Botiga Copilot

## Stack
- Backend: Node.js amb Express i SQLite (mòdul `node:sqlite`), amb mòduls ES (`import` / `export`).
- Frontend: HTML, CSS i JavaScript sense frameworks.
- Tests: runner integrat de Node.js (`node:test` i `node:assert/strict`).

## Convencions
- Noms de variables, funcions i missatges en català, en camelCase.
- El disseny de les pàgines ha de ser completament responsive (adaptable a mòbils i escriptori) utilitzant Flexbox o CSS Grid.

## Arquitectura
- Les rutes del servidor i la lògica de la base de dades han d'estar separades en fitxers diferents de la carpeta backend.

## No facis
- No afegeixis dependències noves sense demanar-ho.
- No pugis mai fitxers de configuració local o bases de dades de prova (`.env`, `botiga.db`) al repositori de GitHub.
