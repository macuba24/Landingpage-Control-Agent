# Control Agent

Vite + React **Master Console** (Cockpit).

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Production-Build (immer so, nicht `vite build` direkt, damit Checks laufen):

```bash
npm run build
```

Ausgabe: `dist/` (wird von Git ignoriert).

## Sauberes Setup — damit nichts „kaputt deployt“

1. **`public/index.html` gibt es nicht.**  
   Nur die `index.html` im **Projektroot** ist der Einstieg. Alles unter `public/` landet unverändert in `dist/` — eine `public/index.html` **überschreibt** die SPA und war der Grund für die falsche Seite auf Vercel.  
   Davor schützt `npm run check:public` (läuft automatisch vor `npm run build`).

2. **Nicht committen:** `node_modules/`, `dist/`, `.vercel/`, `.env*`.  
   Steht in `.gitignore`.

3. **Vercel:** Root = **Repo-Root** (nicht `public/`).  
   **`index.html` liegt nur im Projektroot** (Vite-Einstieg); **`public/index.html` darf es nicht geben**.  
   `vercel.json` setzt `framework: vite`, `buildCommand`, `outputDirectory: dist` und den SPA-Rewrite.

4. **CI:** Bei Push/PR auf `main` baut GitHub Actions das Projekt — offensichtliche Branches fallen so auf.

5. **Vor Commit kurz prüfen:** `npm run build` lokal grün lassen.

## Technik-Stack

React 19, React Router, TypeScript, Vite 7.
