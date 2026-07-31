# Dual remote push (company + CEO)

The frontend repo pushes to **both**:

1. Primary: `git@github.com:headmaster2hm/rapid-superapp.git`
2. CEO mirror: `git@github.com:sunnydoshlowkee-jpg/Fastrapidapp.git`

## How it works

`origin` has two push URLs. A normal:

```bash
git push origin develop
# or
git push origin HEAD
```

updates **both** repositories.

Fetch still comes only from the primary (`headmaster2hm/rapid-superapp`).

## Explicit CEO remote

```bash
git remote -v
# ceo -> sunnydoshlowkee-jpg/Fastrapidapp.git

git push ceo develop:main    # update CEO default branch
git push ceo develop          # update CEO develop branch
```

## Agent / teammate rule

Whenever you push the frontend to GitHub, push to `origin` (dual) so the CEO mirror stays current. If dual-push fails on the CEO URL, still push primary and report the CEO failure.

## Note

Uncommitted local work is **not** included until committed.
