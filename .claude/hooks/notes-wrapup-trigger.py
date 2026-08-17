#!/usr/bin/env python
"""
PostToolUse hook (Write|Edit) for this project.

Fires only when the file just written/edited is under the notes/ folder.
When it matches, injects a system context nudge telling Claude to invoke
the daily-wrap-up skill right away. Silent (no output, exit 0) otherwise.
"""
import json
import re
import sys


def main():
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return  # malformed/empty input -> do nothing

    tool_input = payload.get("tool_input") or {}
    file_path = tool_input.get("file_path") or ""

    # Match a "notes" path segment on either slash style (Windows or POSIX).
    if not re.search(r"[\\/]notes[\\/]", file_path):
        return

    message = (
        "A file under notes/ was just saved (" + file_path + "). "
        "Invoke the daily-wrap-up skill (.claude/skills/daily-wrap-up/SKILL.md) "
        "now to record this in today's log/ file."
    )
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PostToolUse",
            "additionalContext": message,
        }
    }))


if __name__ == "__main__":
    main()
