# Kens Electron Boilerplate

<p align="center">
  <strong>A modern Electron starter — React, TypeScript, Vite. Ready to go.</strong>
</p>

<p align="center">
  <a href="https://github.com/KenKaiii/kens-electron-boilerplate/releases/latest"><img src="https://img.shields.io/github/v/release/KenKaiii/kens-electron-boilerplate?include_prereleases&style=for-the-badge" alt="GitHub release"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
  <a href="https://youtube.com/@kenkaidoesai"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube"></a>
  <a href="https://skool.com/kenkai"><img src="https://img.shields.io/badge/Skool-Community-7C3AED?style=for-the-badge" alt="Skool"></a>
</p>

---

## What this is

A clean, zero-config Electron boilerplate with everything wired up so you can skip the setup and start building. Clone it, install, run dev. That's it.

Cross-platform out of the box — macOS, Windows, Linux.

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Electron 40 |
| Renderer | React 19 + Vite 7 |
| Language | TypeScript 5.9 (strict) |
| Bundler | esbuild (main/preload) + Vite (renderer) |
| Testing | Vitest + Testing Library |
| Linting | ESLint 9 + Prettier |
| Hooks | Husky + lint-staged |
| Packaging | electron-builder (dmg, exe, AppImage, deb) |

---

## Getting started

```bash
git clone https://github.com/KenKaiii/kens-electron-boilerplate.git
cd kens-electron-boilerplate
npm install
npm run dev
```

That's it. Electron launches with hot reload on the renderer and auto-restart on the main process.

---

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server with HMR + Electron |
| `npm run build` | Production build (renderer + main + preload) |
| `npm run check` | Run typecheck + lint + format check + tests |
| `npm run test` | Run tests with Vitest |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |
| `npm run package` | Build + package for current OS |
| `npm run package:mac` | Package for macOS |
| `npm run package:win` | Package for Windows |
| `npm run package:linux` | Package for Linux |

---

## Project structure

```
src/
  main/           Main process (Electron)
    index.ts       Window creation, CSP, lifecycle
    ipc.ts         IPC handlers
  preload/         Context bridge (secure IPC)
    index.ts       Exposed API surface
  renderer/        React app (Vite)
    index.html     Entry HTML
    main.tsx       React root
    App.tsx        Root component
    App.css        Styles
    types/         Type declarations
scripts/
  dev.mjs          Dev server orchestration
  build.mjs        Production build
tests/
  setup.ts         Test setup + mocks
  unit/            Unit tests
```

---

## Security defaults

- `contextIsolation: true` — renderer can't access Node
- `nodeIntegration: false` — no `require()` in renderer
- Strict CSP in production — no unsafe directives
- `contextBridge` — only whitelisted APIs exposed to renderer

---

## Community

- [YouTube @kenkaidoesai](https://youtube.com/@kenkaidoesai) — tutorials and demos
- [Skool community](https://skool.com/kenkai) — come hang out

---

## License

MIT

---

<p align="center">
  <strong>Fork it. Build something.</strong>
</p>
