# Due — GitHub Master Build

Upload every file in this ZIP to the root of your GitHub Pages repository.

## What changes across devices automatically
Edit `data.js` and push to GitHub:
- title
- type/category
- due date
- estimated cost
- recurrence
- reminder schedule
- important flag
- notes / master metadata

On the next online open/reload, desktop and phone load the latest `data.js`.

## What stays local on each device
This build intentionally keeps device/user state local:
- saved/reserve amount
- completed state
- history
- contributions
- settings
- items added only from the app UI

Those fields do not sync between devices without a cloud backend.

## Deploy workflow
1. Edit `data.js`.
2. Keep each task `id` stable.
3. Commit and push to GitHub.
4. Wait for GitHub Pages deployment.
5. Reopen/refresh Due on the phone.

`data.js`, `app.js`, page navigation and `index.html` are network-first in the service worker, so the phone prefers the newest deployed version.

## Important
If you change app code, also bump:
- query version in `index.html`
- `CACHE` version in `sw.js`

The current build version is `20261019-1`.
