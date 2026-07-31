#!/usr/bin/env python3
"""
Bootstrap Rapid Super App GitHub Project, labels, milestones, and issues.

Usage:
  export GITHUB_TOKEN=ghp_xxx   # classic: repo + project scope; fine-grained: Issues/Projects write
  export GITHUB_OWNER=headmaster2hm
  python3 bootstrap-github-project.py [--dry-run] [--skip-project] [--limit N]

Creates:
  - Labels + milestones on rapid-superapp and rapid-superapp-api
  - Issues from docs/github-project/data/rapid-superapp-project-catalog.json
  - GitHub Project (Projects V2) "Rapid Super App Development" with Status options
  - Adds issues to project and sets Status column

Dependencies graph is written into issue bodies (GitHub native blocking deps
require Issues Preview; body + labels used for portability).
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "data" / "rapid-superapp-project-catalog.json"

API = "https://api.github.com"
GQL = "https://api.github.com/graphql"

STATUS_FIELD = "Status"
STATUS_OPTIONS = [
    "Backlog",
    "Todo",
    "In Progress",
    "Testing",
    "Review",
    "Done",
    "Phase 2",
]


def die(msg: str, code: int = 1) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(code)


def token() -> str:
    t = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if not t:
        die("Set GITHUB_TOKEN (or GH_TOKEN) with repo + project permissions")
    return t


def request(method: str, url: str, body: dict | None = None, preview: str | None = None):
    data = None if body is None else json.dumps(body).encode()
    headers = {
        "Authorization": f"Bearer {token()}",
        "Accept": preview or "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "rapid-superapp-project-bootstrap",
    }
    if data is not None:
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read().decode()
            return resp.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        try:
            payload = json.loads(err)
        except Exception:
            payload = {"message": err}
        return e.code, payload


def gql(query: str, variables: dict | None = None):
    status, payload = request("POST", GQL, {"query": query, "variables": variables or {}})
    if status >= 400:
        die(f"GraphQL HTTP {status}: {payload}")
    if payload.get("errors"):
        die(f"GraphQL errors: {json.dumps(payload['errors'], indent=2)}")
    return payload["data"]


def ensure_label(owner: str, repo: str, label: dict, dry: bool) -> None:
    name = label["name"]
    url = f"{API}/repos/{owner}/{repo}/labels/{urllib.request.quote(name)}"
    status, _ = request("GET", url)
    body = {
        "name": name,
        "color": label["color"].lstrip("#"),
        "description": label.get("description", "")[:100],
    }
    if status == 200:
        if dry:
            print(f"  [dry] update label {repo}:{name}")
            return
        request("PATCH", f"{API}/repos/{owner}/{repo}/labels/{urllib.request.quote(name)}", body)
        return
    if dry:
        print(f"  [dry] create label {repo}:{name}")
        return
    status, payload = request("POST", f"{API}/repos/{owner}/{repo}/labels", body)
    if status not in (200, 201) and status != 422:
        die(f"create label {name} on {repo}: {status} {payload}")


def ensure_milestone(owner: str, repo: str, ms: dict, dry: bool) -> int | None:
    status, payload = request("GET", f"{API}/repos/{owner}/{repo}/milestones?state=all&per_page=100")
    if status != 200:
        die(f"list milestones {repo}: {status} {payload}")
    for existing in payload:
        if existing["title"] == ms["title"]:
            return existing["number"]
    body = {
        "title": ms["title"],
        "description": ms.get("description", ""),
        "state": "open",
    }
    if ms.get("due_on"):
        body["due_on"] = ms["due_on"]
    if dry:
        print(f"  [dry] create milestone {repo}:{ms['title']}")
        return None
    status, created = request("POST", f"{API}/repos/{owner}/{repo}/milestones", body)
    if status not in (200, 201):
        die(f"create milestone {ms['title']}: {status} {created}")
    return created["number"]


def format_issue_body(issue: dict) -> str:
    ac = "\n".join(f"- [ ] {c}" for c in issue.get("acceptance_criteria", []))
    checklist = "\n".join(f"- [ ] {c}" for c in issue.get("checklist", []))
    deps = ", ".join(issue.get("dependencies", [])) or "None"
    return f"""## Description
{issue['description']}

## Acceptance Criteria
{ac}

## Checklist
{checklist}

## Meta
- **Priority:** {issue['priority']}
- **Estimated effort:** {issue['estimated_effort']}
- **Repository:** {issue['repository']}
- **Epic:** {issue.get('epic', '')}
- **Target column:** {issue['column']}
- **Dependencies:** {deps}
- **Catalog key:** `{issue['key']}`

<!-- rapid-catalog-key:{issue['key']} -->
"""


def find_existing_issue(owner: str, repo: str, key: str) -> int | None:
    # Search recent issues by catalog key marker
    q = urllib.request.quote(f'repo:{owner}/{repo} "{key}" in:body')
    status, payload = request("GET", f"{API}/search/issues?q={q}&per_page=5")
    if status != 200:
        return None
    for item in payload.get("items", []):
        if f"rapid-catalog-key:{key}" in (item.get("body") or ""):
            return item["number"]
    return None


def create_issue(owner: str, repo_full: str, issue: dict, milestones: dict, dry: bool) -> dict | None:
    owner_name, repo = repo_full.split("/")
    existing = None if dry else find_existing_issue(owner_name, repo, issue["key"])
    if existing:
        print(f"  skip existing #{existing} {issue['key']}")
        status, payload = request("GET", f"{API}/repos/{owner_name}/{repo}/issues/{existing}")
        return payload if status == 200 else {"number": existing, "node_id": None}

    ms_num = milestones.get((repo_full, issue.get("milestone")))
    body = {
        "title": f"{issue['key']}: {issue['title']}" if not issue["title"].startswith("[") else issue["title"],
        "body": format_issue_body(issue),
        "labels": issue.get("labels", []),
    }
    if ms_num:
        body["milestone"] = ms_num
    # Done items closed
    if issue["column"] == "Done":
        # create open then close — or create and patch state
        pass
    if dry:
        print(f"  [dry] issue {repo_full}: {body['title'][:80]}")
        return {"number": 0, "node_id": "DRY", "html_url": "dry-run"}
    status, created = request("POST", f"{API}/repos/{owner_name}/{repo}/issues", body)
    if status not in (200, 201):
        die(f"create issue {issue['key']}: {status} {created}")
    if issue["column"] == "Done":
        request("PATCH", f"{API}/repos/{owner_name}/{repo}/issues/{created['number']}", {"state": "closed"})
    print(f"  created #{created['number']} {issue['key']} -> {created.get('html_url')}")
    time.sleep(0.4)  # soft rate limit
    return created


def ensure_project(owner: str, title: str, dry: bool) -> str | None:
    data = gql(
        """
        query($login:String!) {
          user(login:$login) {
            id
            projectsV2(first:50) { nodes { id title } }
          }
          organization(login:$login) {
            id
            projectsV2(first:50) { nodes { id title } }
          }
        }
        """,
        {"login": owner},
    )
    user = data.get("user")
    org = data.get("organization")
    owner_id = None
    projects = []
    if user:
        owner_id = user["id"]
        projects = user["projectsV2"]["nodes"]
    elif org:
        owner_id = org["id"]
        projects = org["projectsV2"]["nodes"]
    else:
        die(f"Owner {owner} not found as user or org")

    for p in projects:
        if p["title"] == title:
            print(f"Using existing project {p['id']}")
            return p["id"]

    if dry:
        print(f"  [dry] create project {title}")
        return "DRY_PROJECT"

    data = gql(
        """
        mutation($ownerId:ID!, $title:String!) {
          createProjectV2(input:{ownerId:$ownerId, title:$title}) {
            projectV2 { id title }
          }
        }
        """,
        {"ownerId": owner_id, "title": title},
    )
    pid = data["createProjectV2"]["projectV2"]["id"]
    print(f"Created project {pid}")
    return pid


def ensure_status_options(project_id: str, dry: bool) -> dict:
    """Return map optionName -> optionId for Status single-select field."""
    if dry and project_id == "DRY_PROJECT":
        return {name: f"dry-{name}" for name in STATUS_OPTIONS}

    data = gql(
        """
        query($id:ID!) {
          node(id:$id) {
            ... on ProjectV2 {
              field(name:"Status") {
                ... on ProjectV2SingleSelectField {
                  id
                  options { id name }
                }
              }
            }
          }
        }
        """,
        {"id": project_id},
    )
    field = data["node"]["field"]
    if not field:
        die("Project has no Status field — unexpected for Projects V2")
    field_id = field["id"]
    existing = {o["name"]: o["id"] for o in field["options"]}

    # GitHub does not allow arbitrary Status option create via simple API on default field
    # for all plan types; try updateProjectV2SingleSelectField for missing options.
    missing = [n for n in STATUS_OPTIONS if n not in existing]
    if missing and not dry:
        options_input = [{"name": n, "color": "GRAY", "description": n} for n in STATUS_OPTIONS]
        # Preserve existing ids where possible by name-only upsert is not supported;
        # attempt full options replace carefully — if fails, map to closest defaults.
        try:
            data = gql(
                """
                mutation($fieldId:ID!, $options:[ProjectV2SingleSelectFieldOptionInput!]!) {
                  updateProjectV2Field(input:{
                    fieldId:$fieldId
                    singleSelectOptions:$options
                  }) {
                    projectV2Field {
                      ... on ProjectV2SingleSelectField {
                        id
                        options { id name }
                      }
                    }
                  }
                }
                """,
                {"fieldId": field_id, "options": options_input},
            )
            opts = data["updateProjectV2Field"]["projectV2Field"]["options"]
            existing = {o["name"]: o["id"] for o in opts}
        except SystemExit:
            print("WARN: could not customize Status options; will map to defaults")
            # refresh
            data = gql(
                """
                query($id:ID!) {
                  node(id:$id) {
                    ... on ProjectV2 {
                      field(name:"Status") {
                        ... on ProjectV2SingleSelectField {
                          id
                          options { id name }
                        }
                      }
                    }
                  }
                }
                """,
                {"id": project_id},
            )
            existing = {o["name"]: o["id"] for o in data["node"]["field"]["options"]}

    # Fallback mapping if custom options unavailable
    aliases = {
        "Todo": ["Todo", "To do", "Ready"],
        "In Progress": ["In Progress", "In progress"],
        "Done": ["Done"],
        "Backlog": ["Backlog", "No Status", "Todo"],
        "Testing": ["Testing", "In Progress"],
        "Review": ["Review", "In Progress"],
        "Phase 2": ["Phase 2", "Backlog", "Todo"],
    }
    resolved = {}
    for name in STATUS_OPTIONS:
        if name in existing:
            resolved[name] = existing[name]
            continue
        for alt in aliases.get(name, []):
            if alt in existing:
                resolved[name] = existing[alt]
                break
    return {"field_id": field_id, "options": resolved}


def add_to_project(project_id: str, content_id: str, status: dict, column: str, dry: bool) -> None:
    if dry:
        print(f"  [dry] project item column={column}")
        return
    data = gql(
        """
        mutation($projectId:ID!, $contentId:ID!) {
          addProjectV2ItemById(input:{projectId:$projectId, contentId:$contentId}) {
            item { id }
          }
        }
        """,
        {"projectId": project_id, "contentId": content_id},
    )
    item_id = data["addProjectV2ItemById"]["item"]["id"]
    option_id = status["options"].get(column)
    if not option_id:
        print(f"  WARN: no Status option for {column}")
        return
    gql(
        """
        mutation($projectId:ID!, $itemId:ID!, $fieldId:ID!, $optionId:String!) {
          updateProjectV2ItemFieldValue(input:{
            projectId:$projectId
            itemId:$itemId
            fieldId:$fieldId
            value:{ singleSelectOptionId: $optionId }
          }) { projectV2Item { id } }
        }
        """,
        {
            "projectId": project_id,
            "itemId": item_id,
            "fieldId": status["field_id"],
            "optionId": option_id,
        },
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--skip-project", action="store_true")
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--owner", default=os.environ.get("GITHUB_OWNER", "headmaster2hm"))
    args = parser.parse_args()

    catalog = json.loads(CATALOG_PATH.read_text())
    owner = args.owner
    repos = [
        catalog["project"]["repositories"]["frontend"],
        catalog["project"]["repositories"]["backend"],
    ]

    print("== Labels ==")
    for repo_full in repos:
        o, r = repo_full.split("/")
        for label in catalog["labels"]:
            ensure_label(o, r, label, args.dry_run)

    print("== Milestones ==")
    milestone_ids: dict[tuple[str, str], int | None] = {}
    for repo_full in repos:
        o, r = repo_full.split("/")
        for ms in catalog["milestones"]:
            num = ensure_milestone(o, r, ms, args.dry_run)
            milestone_ids[(repo_full, ms["title"])] = num

    project_id = None
    status = None
    if not args.skip_project:
        print("== Project ==")
        project_id = ensure_project(owner, catalog["project"]["name"], args.dry_run)
        status = ensure_status_options(project_id, args.dry_run)

    print("== Issues ==")
    issues = catalog["issues"]
    if args.limit:
        issues = issues[: args.limit]
    created_map = {}
    for issue in issues:
        created = create_issue(owner, issue["repository"], issue, milestone_ids, args.dry_run)
        if created:
            created_map[issue["key"]] = created
            if project_id and created.get("node_id") and status:
                add_to_project(project_id, created["node_id"], status, issue["column"], args.dry_run)

    summary_path = ROOT / "data" / "bootstrap-last-run.json"
    summary_path.write_text(
        json.dumps(
            {
                "owner": owner,
                "project_id": project_id,
                "created": {k: {"number": v.get("number"), "url": v.get("html_url")} for k, v in created_map.items()},
            },
            indent=2,
        )
    )
    print(f"Done. Summary: {summary_path}")


if __name__ == "__main__":
    main()
