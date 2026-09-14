# Due V15.1 Background Push Backend Contract

The static client works fully offline and does not require this service. True notifications while the app is closed require an HTTPS backend, durable storage, a scheduler, and VAPID credentials. Never put a VAPID private key in this ZIP.

## Public client configuration

Set these values in `push-config.js`:

- `applicationServerKey`: URL-safe Base64 public VAPID key.
- `subscribeEndpoint`: HTTPS `POST` endpoint for device subscription registration.
- `unsubscribeEndpoint`: HTTPS `POST` endpoint for device cleanup.
- `syncEndpoint`: HTTPS `POST` endpoint for authoritative reminder state.

Plain HTTP is rejected except for `localhost`, `127.0.0.1`, and `::1` development endpoints.

## Stable association

The client creates a random `deviceId` once and keeps it in `due_v15_device_id`. Treat it as an opaque device identifier, not as authentication. If accounts exist, associate the authenticated user and this device server-side. Never accept a user ID from an unauthenticated body as proof of identity.

## Register subscription

`POST subscribeEndpoint`

```json
{
  "deviceId": "dd91f6d5-…",
  "timezone": "Asia/Bangkok",
  "updatedAt": "2026-09-14T08:15:30.000Z",
  "subscription": {
    "endpoint": "https://push.example/…",
    "expirationTime": null,
    "keys": { "p256dh": "…", "auth": "…" }
  }
}
```

Validate origin/authentication, body size, the PushSubscription shape, and the IANA time-zone name. Upsert on `(deviceId, subscription.endpoint)` and return `200` or `204`. Encrypt subscription keys at rest.

## Synchronize reminder state

`POST syncEndpoint` with `Content-Type: application/json` and `Idempotency-Key: due-<deviceId>-<revision>`.

```json
{
  "schemaVersion": 1,
  "deviceId": "dd91f6d5-…",
  "timezone": "Asia/Bangkok",
  "updatedAt": "2026-09-14T08:16:00.000Z",
  "revision": 42,
  "replaceAll": true,
  "tasks": [
    {
      "id": "task-123",
      "title": "Renew passport",
      "type": "document",
      "dueDate": "2027-01-31",
      "reminders": [180, 90, 30, 7, 1, 0],
      "snoozedUntil": null,
      "completed": false
    }
  ],
  "deletedTaskIds": ["task-122"]
}
```

Only the listed fields leave the browser. Notes, reserve costs, saved balances, contribution history, completion notes, and arbitrary metadata are deliberately excluded.

Server behavior:

1. Authenticate/authorize the request where accounts exist; otherwise scope all data strictly to `deviceId` and apply origin and rate controls.
2. Reject invalid dates, reminder offsets outside `0…3650`, oversized strings/bodies, unknown schema versions, and malformed time zones.
3. Store the idempotency key and response. Replays must return the same success without duplicating writes.
4. Lock or transact by device. Ignore any revision lower than the stored revision. Treat an equal revision as an idempotent replay.
5. Upsert every supplied task by `(deviceId, task.id)`. Because `replaceAll` is true, delete server tasks for that device that are absent from `tasks`; also process `deletedTaskIds` idempotently.
6. Commit the new device revision and client timestamp, then return `200` with `{ "ok": true, "revision": 42 }` (or `204`).

This authoritative snapshot plus monotonic revision prevents stale retries from resurrecting deleted or completed tasks. The client keeps the same revision until success and sends a distinct idempotency key for every later mutation batch.

## Unsubscribe

`POST unsubscribeEndpoint`

```json
{
  "deviceId": "dd91f6d5-…",
  "endpoint": "https://push.example/…",
  "updatedAt": "2026-09-14T08:30:00.000Z"
}
```

Delete the matching subscription idempotently and return `200` or `204`. The scheduler must also remove endpoints immediately after permanent Web Push responses such as `404` or `410`.

## Scheduler semantics

- Evaluate each task in its stored IANA timezone, once per local scheduling window.
- Honor every exact reminder offset, including `0` for due day.
- Exclude completed tasks and tasks whose `snoozedUntil` is later than the current local date.
- Use a unique occurrence key such as `(deviceId, taskId, dueDate, offset, timezone)` and a database uniqueness constraint so retries cannot create duplicate notifications.
- Queue and claim occurrences transactionally. Record attempts and provider response codes.
- When a due date, reminder set, snooze value, completion state, or deletion changes, cancel obsolete unsent occurrences before scheduling replacements.
- Periodically remove orphaned task data, expired idempotency records, stale inactive devices, and subscriptions invalidated by push services.

## Failure model

Local saves never wait for the network. When offline, unconfigured, timed out, or rejected, the client keeps `pending: true` with the last error and retries on reconnect, the next launch, or the next relevant save. The server must tolerate duplicate deliveries and must not apply a stale lower revision.

## Push payload consumed by `sw.js`

```json
{
  "title": "Due — Reminder",
  "body": "Renew passport is due today.",
  "tag": "dd91f6d5:task-123:2027-01-31:0",
  "url": "./#items"
}
```

Keep payloads concise and avoid sensitive task details where lock-screen privacy matters.
