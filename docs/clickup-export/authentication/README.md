# ClickUp Import — Authentication Module

**Module completion: ~90%**  
**Space:** Product Development  
**Folder:** Authentication  
**Lists:** Database | Backend API | Frontend UI | Integration | Testing | Documentation

## Files

| File | Purpose |
|------|---------|
| `authentication-tasks.csv` | ClickUp CSV import (tasks) |
| `authentication-tasks.json` | Structured JSON (hierarchy + tasks + metadata) |
| `authentication-lists.csv` | List names to create first |

## How to import into ClickUp

### Option A — CSV (recommended for tasks)

1. In ClickUp: create Space **Product Development** → Folder **Authentication**.
2. Create the 6 Lists from `authentication-lists.csv` (or manually).
3. Open each List → **Import** → **CSV**.
4. Upload `authentication-tasks.csv`.
5. Map columns:
   - Task Name → Task Name
   - Description → Description / Task Content
   - Status → Status
   - Priority → Priority
   - Tags → Tags
   - Time Estimate (hours) → Time Estimate (convert hours → ms if needed: hours × 3600000)
   - List → assign to matching List during import, or filter CSV by `List` column and import per list
6. Map custom fields if available: Progress %, Developer, Sprint, Dependencies

### Option B — JSON

Use as a blueprint or feed a ClickUp API script. Hierarchy and fields are fully specified.

### Status mapping

| Export status | ClickUp status |
|---------------|----------------|
| Completed | Completed |
| In Progress | In Progress |
| Backlog | Backlog |
| Ready | Ready |
| Cancelled | Cancelled |

### Priority mapping

Urgent | High | Normal | Low

### Option C — Per-list CSV (easiest)

1. Create Folder **Authentication** with the 6 Lists.
2. Open **Database** list → Import → CSV → upload `by-list/database.csv`.
3. Repeat for:
   - `by-list/backend-api.csv`
   - `by-list/frontend-ui.csv`
   - `by-list/integration.csv`
   - `by-list/testing.csv`
   - `by-list/documentation.csv`

Map: Task Name, Task Content → Description, Status, Priority, Tags, Time Estimate.

## Module snapshot

| Metric | Value |
|--------|-------|
| Tasks | 42 |
| Completed | 33 (79%) |
| In Progress | 2 |
| Backlog | 7 |
| Module completion | ~90% |
| Remaining effort | ~63 hours |

### Remaining / launch blockers

1. Production OTP strict flags (Urgent)
2. Admin 2FA strict mode (In Progress)
3. Auth OTP rate limiting
4. Auth API documentation
5. Full Cypress auth E2E
6. iOS auth QA (after TestFlight)
