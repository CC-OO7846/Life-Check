# Due V15.1 — Ecosystem Theme

V15.1 is a correctness and integration hardening release built on the unchanged V15 visual system. Open `index.html` directly for local use or deploy the complete folder to any static HTTPS host such as GitHub Pages.

## What changed

- Uses `due_v15_state` as the sole primary state key and performs copy-forward migration from V14 and older keys without modifying those sources.
- Keeps reserve balances mathematically aligned with unsettled current-cycle contributions, including due-date changes and undo.
- Adds an explicit minimal reminder-sync serializer, durable pending/error/success state, debounced non-blocking sync, and retry on launch/online/next relevant save.
- Reduces repeated date and reminder derivation inside a render pass and replaces per-render row handler binding with one delegated handler.
- Includes an expanded backend API contract, automated Chromium responsive-simulation QA evidence, and a separate real-device checklist.

## Files

- `index.html` — complete static application.
- `push-config.js` — public VAPID and HTTPS endpoint configuration.
- `sw.js` — offline cache and Web Push handler.
- `PUSH-BACKEND.md` — backend storage, API, scheduling, deduplication, and cleanup contract.
- `QA-REPORT.md` — executed automated results.
- `REAL-DEVICE-QA.md` — manual iOS, installed-PWA, and Android checklist.
