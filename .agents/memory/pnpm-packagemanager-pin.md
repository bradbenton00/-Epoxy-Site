---
name: pnpm packageManager pin loop
description: Why pinning packageManager in package.json breaks local pnpm, and the fix
---
Pinning `"packageManager": "pnpm@x.y.z"` (different from the workspace's installed pnpm) makes local pnpm try to self-provision that version via `pnpm add pnpm@x.y.z`; with `minimumReleaseAge` set in pnpm-workspace.yaml this hangs/loops and every pnpm command (builds, workflows) stalls.

**Why:** Cloudflare needs the pin honored at deploy time, but locally the self-provision loop broke all builds twice (Aug 2026).
**How to apply:** Keep the pin for CI/Cloudflare, and set `manage-package-manager-versions=false` in root `.npmrc` so local pnpm ignores it. Don't remove the pin — Cloudflare relies on it.
