#!/usr/bin/env bash
# Rapid Super App — GitHub Project bootstrap (labels, milestones, issues, project board)
#
# Prerequisites:
#   1. GitHub personal access token with:
#        - classic: repo, project, read:org (if org)
#        - fine-grained: Issues (RW), Metadata (R), Projects (RW) on both repos
#   2. python3
#
# Usage:
#   export GITHUB_TOKEN=ghp_xxxxxxxx
#   export GITHUB_OWNER=headmaster2hm   # optional
#   ./setup-github.sh                  # live create
#   ./setup-github.sh --dry-run        # print actions only
#   ./setup-github.sh --limit 5        # smoke-test first 5 issues

set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"

if [[ -z "${GITHUB_TOKEN:-${GH_TOKEN:-}}" ]]; then
  echo "Missing GITHUB_TOKEN (or GH_TOKEN)."
  echo "Create a token, then:"
  echo "  export GITHUB_TOKEN=..."
  echo "  $0 $*"
  exit 1
fi

exec python3 "$DIR/bootstrap-github-project.py" "$@"
