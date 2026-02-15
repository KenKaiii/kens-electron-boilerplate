# Kens Electron Boilerplate

Modern Electron starter with React, TypeScript, and Vite. Cross-platform (macOS, Windows, Linux), zero-config clone-to-dev experience.

## Project Structure

```
src/
  ├── main/              # Electron main process
  │   ├── index.ts       # Window creation, CSP, lifecycle
  │   └── ipc.ts         # IPC handlers
  ├── preload/           # Context bridge (secure IPC)
  │   └── index.ts       # Exposed API surface via contextBridge
  └── renderer/          # React + Vite frontend
      ├── index.html     # Entry HTML
      ├── main.tsx       # React root
      ├── App.tsx        # Root component
      ├── App.css        # Styles
      └── types/         # Type declarations (electronAPI, vite-env)
scripts/
  ├── dev.mjs            # Dev server: Vite + esbuild watch + Electron
  └── build.mjs          # Production build: Vite + esbuild (minified)
tests/
  ├── setup.ts           # Vitest setup + electronAPI mock
  └── unit/              # Unit tests
```

## Organization Rules

**Keep code organized and modularized:**
- Main process logic → `src/main/`, one file per concern
- Preload APIs → `src/preload/`, expose only whitelisted APIs
- React components → `src/renderer/`, one component per file
- Types → `src/renderer/types/` or co-located with usage
- Tests → `tests/unit/`, mirroring source structure

**Modularity principles:**
- Single responsibility per file
- Clear, descriptive file names
- No direct Node access in renderer — always go through preload
- IPC handlers in `src/main/ipc.ts`, exposed APIs in `src/preload/index.ts`

## Code Quality — Zero Tolerance

After editing ANY file, run:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test
```

Or all at once: `npm run check`

Fix ALL errors and warnings before continuing. No exceptions.

## Key Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with HMR + Electron |
| `npm run build` | Production build |
| `npm run check` | Typecheck + lint + format + tests |
| `npm run package` | Build + package for current OS |

## Security Defaults

- `contextIsolation: true` — renderer cannot access Node
- `nodeIntegration: false` — no `require()` in renderer
- Strict CSP in production — no unsafe directives
- Dev mode suppresses security warnings (Vite needs unsafe-eval for HMR)
