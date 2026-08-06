# Hum Qadam — Project Folder Structure

> Updated 2026-08-06 after a weekly memory review removed several duplicate/stale
> files. `CLAUDE.md`, `agent_loop.md`, and `whatsapp-assistant-plan.md` used to
> also exist as copies under `instructions/` — they didn't need to; the root
> versions are the only ones that were ever actually loaded. See `notes/memory.md`
> Entry 6 and `notes/decisions.md` Decision 4.

```
C:\Users\HP\Test\
│
├── CLAUDE.md                    ← project brief, loaded every session
├── agent_loop.md
├── whatsapp-assistant-plan.md   ← now a short index, see plan/
├── memory.md
│
├── plan\                        ← the 25 plan sections, one file each
│     ├── 01-product-vision.md
│     ├── ...
│     └── 25-monitoring-and-evaluation-framework.md
│
├── instructions\
│     └── SKILL.md               ← describes what used to live here
│
├── notes\
│     ├── decisions.md
│     └── project_brief.md
│
├── outputs\          ← empty for now
├── assets\           ← empty for now
└── data\             ← empty for now
```

## What Goes Where

| Folder | Purpose |
|---|---|
| `plan/` | One file per plan section, lazy-loaded from the `whatsapp-assistant-plan.md` index |
| `notes/` | Architectural decision log and the original project brief |
| `outputs/` | Generated lesson plans, reports, and exported files |
| `assets/` | Images, icons, and static files |
| `data/` | Teacher profiles, pilot data, and test datasets |
