# Due — GitHub JSON Sync

Upload all files in this ZIP to the root of your GitHub Pages repository.

Normal workflow:
1. Open Due on the computer.
2. Add/edit/complete items.
3. Click Export.
4. Due downloads exactly `due-data.json`.
5. Replace the existing `due-data.json` in GitHub with the exported one.
6. Commit.
7. After GitHub Pages deploys, reopen/refresh Due on the phone.
8. The phone sees the newer JSON and replaces its older local copy.

The same works in reverse: export on the phone, upload to GitHub, refresh the computer.

Conflict protection:
- Every export creates a newer `syncVersion`.
- GitHub JSON replaces a device only when its `syncVersion` is newer.
- Local edits made before uploading are not erased merely by refreshing.
- localStorage is the offline/working copy.

If GitHub is unavailable, the app keeps using its latest local copy.

This is GitHub-file sync, not realtime cloud sync.
