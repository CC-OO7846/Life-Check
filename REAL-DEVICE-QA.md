# Due V15.1 — Manual Real-Device QA Checklist

Automated browser checks are Chromium responsive simulations. They do not replace the following physical-device checks.

## iPhone 13 — Safari

- [ ] Load from a production HTTPS URL in portrait and landscape.
- [ ] Confirm the top safe area and bottom navigation clear the notch/home indicator.
- [ ] Open add/edit, completion, snooze, and reserve dialogs; confirm each scrolls without moving the page behind it.
- [ ] Focus title, numeric, date, reminder, and notes inputs; confirm the keyboard does not hide the active field or modal footer.
- [ ] Confirm sticky header/footer behavior and all 44 px touch targets.
- [ ] Confirm the native date picker stores the chosen local calendar date without an off-by-one shift.
- [ ] Reload offline after one successful online load and confirm the app starts with saved data.
- [ ] Deploy a cache-bumped update and confirm one reload activates it without a stale shell.

## Installed iOS PWA

- [ ] Add to Home Screen, launch standalone, and confirm the icon/name/theme.
- [ ] Repeat safe-area, bottom-nav, keyboard, modal-scroll, sticky-header/footer, and date-input checks.
- [ ] Enable notifications from the in-app control on a supported iOS version; confirm denial and later settings recovery are understandable.
- [ ] With a configured backend, confirm an exact-offset due-day notification and a snoozed task exclusion while the PWA is closed.
- [ ] Launch in airplane mode and confirm existing data and navigation remain available.
- [ ] Return online and confirm pending reminder sync changes clear without duplicate notifications.

## Chrome — Android

- [ ] Load the HTTPS site, accept the install prompt, and launch the installed app.
- [ ] Check status/navigation bar insets, bottom navigation, sticky regions, keyboard resize, modal scroll, and date input.
- [ ] Test notification permission allow, deny, and browser-settings recovery.
- [ ] With a configured backend, verify exact offsets, snooze/cancel, completion exclusion, deletion cleanup, and no duplicate delivery after reconnect.
- [ ] Force-stop, go offline, and relaunch; confirm cached startup and saved data.
- [ ] Deploy the cache-bumped service worker and confirm the updated shell appears after reload/relaunch.

Record OS/browser versions, URL, install mode, backend revision, and any screenshots with the test result.
