# Dependency Graph Report
- Root workspace depends on turbo, typescript, vitest, eslint, prettier.
- Internal packages form a strict DAG structure to prevent circular dependencies.
- Packages use `workspace:*` references.
