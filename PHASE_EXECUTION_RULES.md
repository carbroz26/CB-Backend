# Phase Execution Rules

## Mandatory Rules
1. Previous phases are considered VOID.
2. Previous implementation plans are considered VOID.
3. Previous cleanup plans are considered VOID.
4. Previous recovery plans are considered VOID.
5. Previous architectural assumptions are considered VOID.
6. Development restarts from Phase 0.
7. Every phase requires:
   - Implementation Plan
   - Approval
   - Execution
   - Walkthrough
   - Approval
   - Git Commit
   - Git Tag

## Global Rules
- One phase at a time.
- No temporary architecture.
- No duplicate code.
- No untracked files.
- No code generation without an approved implementation plan.
- Every phase must be reproducible.
