# Rapid Super App — GitHub Projects bootstrap

Automated project organization generated from the **live codebase** of:

| Repo | GitHub | Local path |
|------|--------|------------|
| Rapid Frontend | `headmaster2hm/rapid-superapp` | `app.fastrapid.com/public_html` |
| Rapid Backend API | `headmaster2hm/rapid-superapp-api` | `api.fastrapid.com/public_html` |

## Stakeholder dashboard (browser)

**Live URL (share this):** https://app.fastrapid.com/status/

Source file (also openable offline):

- [progress-dashboard.html](./progress-dashboard.html)

Copies for deploy:

- `public/status/index.html` (included in future Vite builds)
- `dist/status/index.html` (live on production now)

Share the link with anyone who has a browser — no Cursor required.

## Contents

| Path | Purpose |
|------|---------|
| [progress-dashboard.html](./progress-dashboard.html) | Non-coder visual progress page |
| [PROJECT_PLAN.md](./PROJECT_PLAN.md) | Full plan: epics, issues, roadmap, risks |
| [ISSUE_BOARD.md](./ISSUE_BOARD.md) | Column snapshot |
| [data/rapid-superapp-project-catalog.json](./data/rapid-superapp-project-catalog.json) | Machine-readable catalog |
| [scripts/setup-github.sh](./scripts/setup-github.sh) | Entry point |
| [scripts/bootstrap-github-project.py](./scripts/bootstrap-github-project.py) | Creates labels, milestones, issues, Project V2 |

## Create on GitHub

Credentials were **not** available in this environment (`gh` missing, no `GITHUB_TOKEN`).

```bash
export GITHUB_TOKEN=ghp_your_token   # needs repo + project scopes
export GITHUB_OWNER=headmaster2hm

cd /home/fastrapid_cloud/app.fastrapid.com/public_html/docs/github-project/scripts
./setup-github.sh --dry-run
./setup-github.sh
```

This will:

1. Create shared labels on both repositories  
2. Create milestones: MVP Launch, iOS TestFlight, Compliance, Phase 2, Production Launch  
3. Create ~93 issues (remaining work + Done trackers; **no duplicate of completed Auth ClickUp tasks**)  
4. Create Project **Rapid Super App Development**  
5. Place each issue into Backlog / Todo / In Progress / Testing / Review / Done / Phase 2  

## Notes

- Completed Authentication ClickUp work (~90%) is summarized as `[Done]` tracker issues only.
- Admin finance/support screens that are UI-complete but mock-backed generate **paired BE+FE** issues.
- Rider withdraw is the top cross-repo gap for MVP.
