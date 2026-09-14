# QA Report — Due V15.1 Ecosystem

Result: **PASS** — all 25 automated assertions passed on 2026-09-14.

## Chromium responsive simulation

These are automated Chromium viewport simulations, not claims of physical-device coverage.

| Dataset | Viewport | Median active-view render | No horizontal overflow | No duplicate live IDs |
|---|---:|---:|---|---|
| 0 items | 390 px | 26.9 ms | Pass | Pass |
| 1 items | 390 px | 27.8 ms | Pass | Pass |
| 20 items | 390 px | 21.0 ms | Pass | Pass |
| 50 items | 390 px | 36.7 ms | Pass | Pass |
| 100 items | 390 px | 60.2 ms | Pass | Pass |
| 100 items | 375 px | 64.0 ms | Pass | Pass |
| 100 items | 430 px | 61.7 ms | Pass | Pass |
| 100 items | 1366 px | 84.8 ms | Pass | Pass |
| 100 items | 1440 px | 91.9 ms | Pass | Pass |
| 20 items (V14 migration) | 390 px | 22.5 ms | Pass | Pass |

The performance measurement is the median of five warm Home → Items render samples. The 100-item / 375 px case measured **64.0 ms**, below the requested practical target of 70 ms and substantially below the reported ~101 ms V15 baseline.

The generated datasets covered 0, 1, 20, 50, and 100 items and mixed overdue, due-today, 7-day, 30-day, long-term, completed, recurring, important, snoozed, fully funded, partially funded, history, and contribution records.

## Automated functional coverage passed

- V15 primary storage plus realistic V14 copy-forward migration; byte-for-byte confirmation that `due_v14_state` remains untouched.
- V12, V13, V14, and V15 JSON import through one migration path, plus V15 export metadata and filename.
- Due-date edits with one/multiple/current/settled contributions, fully funded balances, legacy nonzero saved balance without contribution records, recurring-cycle settlement, and historical contribution deletion.
- Snooze Tomorrow / 3 days / 1 week / custom date / cancel, Snoozed filtering, and notification-drawer exclusion.
- Type-specific completion labels for all eight task types.
- Recurrence boundaries: Jan 31 → Feb 28, Feb 28 → Mar 28, leap-day yearly → Feb 28, and Apr 30 → May 30.
- Reminder sorting, deduplication, removal, `0`-day offsets, save, and reload persistence.
- Search, task/status views, 12-month calendar, full timeline, reserve totals/history, notification badge/drawer, reset, clear, onboarding, and embedded images.
- Push-sync allow-list serializer, stable device ID, revision/idempotency header, non-blocking success, failure persistence, retry on the next relevant save, and explicit deletion payload/cleanup.
- Service-worker control, offline cached startup, relative GitHub Pages paths, cache-version bump, static and live duplicate-ID checks, and no browser runtime/console errors.
- `index.html` inline application JavaScript, `sw.js`, and `push-config.js` passed `node --check` after the final build.

## Integration boundary

Actual provider delivery while the app is closed was not run because the ZIP intentionally contains no VAPID private key, deployed API, database, or scheduler. The client contract and server behavior needed for this test are specified in `PUSH-BACKEND.md`.

Physical Safari, installed iOS PWA, and Chrome Android validation remains manual. Use `REAL-DEVICE-QA.md`; automated responsive checks are not presented as real-device results.
