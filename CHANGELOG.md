# Changelog — Due V15.1

## Storage and migration

- Promoted `due_v15_state` to the primary key.
- Added safe copy-forward migration in order from V14 through all supported older keys.
- Corrupt candidates are skipped without changing or deleting any legacy key.
- V15 export metadata is explicit and V12–V15 object backups remain importable through the common migration path.

## Reserve integrity

- Current-cycle contribution records follow an edited due date.
- Contribution deletion recomputes the active balance from the retained legacy base plus current-cycle records.
- Recurring settlement freezes prior-cycle contributions and begins the next cycle at zero.
- A `legacySavedBalance` preserves valid imported balances that have no matching contribution records.

## Push integration

- Added `syncEndpoint`, stable anonymous device ID, minimal allow-listed serializer, authoritative snapshots, explicit deletion IDs, monotonic revisions, and idempotency keys.
- Relevant task/reminder mutations are batched and synchronized without blocking local saves.
- Pending, last-success, and last-error state survives reloads; retries occur on launch, reconnect, and the next reminder-relevant save.
- Production endpoints require HTTPS; localhost HTTP remains available for development.

## Performance and QA

- Added a per-render derived cache for date, status, reminder, snooze, and reserve calculations.
- Replaced repeated dynamic event rebinding with a single delegated handler.
- Expanded migration, reserve-cycle, recurrence, reminder, serializer, responsive, asset, offline, cache, and duplicate-ID coverage.
