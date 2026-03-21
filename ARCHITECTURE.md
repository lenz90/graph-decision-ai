# ARCHITECTURE.md

## Overview
`src/App.tsx` is the entire app state machine. It swaps between three rendered screens (`InputScreen`, `FocusScreen`, `ChoiceScreen`) by combining four pieces of state instead of using a router.

## Core State

| State | Type | Role |
|---|---|---|
| `path` | `Node[]` | The committed branch history. The last item is always the current focus node. |
| `mode` | `'focus' | 'choice'` | Controls whether the current node is being reviewed or whether branch options are being chosen. |
| `branches` | `string[]` | Temporary candidate branches for the current node. This is scratch state, not committed path state. |
| `direction` | `'forward' | 'backward'` | Tells Framer Motion which way the next screen should slide. |

## State Flow
- `handleStart(value)` initializes the app with a single root node, clears stale branch options, and lands on `focus`.
- `handleGenerate()` derives four branch strings from the current node, stores them in `branches`, and switches to `choice`.
- `handleSelectBranch(branch)` appends a new node to `path`, clears `branches`, and returns to `focus`.
- `handleBack()` has two branches:
  - From `choice`, it returns to the same node's `focus` screen without changing `path`.
  - From `focus`, it either pops one committed node or resets to the initial input screen when the path only has one node left.

## Why `screenKey` Is Critical
`screenKey` is the identity for the animated screen container.

- It returns `'input'` when no node exists.
- Otherwise it returns ``${currentNode.id}-${mode}``.
- That means **both node changes and mode changes force a remount** of the animated panel.

This is critical because `AnimatePresence` with `mode="wait"` only runs enter/exit transitions correctly when React sees a different keyed child. If `screenKey` stops changing:
- transitions can fail to run,
- content can swap in-place instead of animating,
- back/forward motion can feel wrong because the old screen never exits.

## State Invariants
These rules should always stay true:

1. `currentNode` is always `path[path.length - 1]` when `path.length > 0`.
2. When `path.length === 0`, the app must render `InputScreen`.
3. `mode === 'choice'` only makes sense when `currentNode` exists.
4. `branches` is temporary: after `handleStart`, `handleSelectBranch`, and every `handleBack`, it should be cleared.
5. In `focus` mode, `branches` should be treated as disposable cache, not source of truth.
6. `direction` must be set before every screen transition so animations match navigation intent.
7. `path` stores only committed decisions. Generated choices do **not** belong in `path` until selected.

## Adding Features Safely
When adding features to `App.tsx`, preserve the invariants above.

### Safe extension rules
- Add new `useState` only if it has a single, clear owner and does not duplicate `path`, `mode`, or `branches`.
- If a feature changes what screen is shown, revisit both `screenKey` and `canGoBack`.
- If you add async work, keep `branches` as the output buffer and add explicit loading/error state rather than overloading `mode`.
- If you add another mode, update:
  - the `Mode` type,
  - the render branch,
  - `handleBack()`,
  - `screenKey`,
  - this document.
- Keep `createNode()` as the only place that creates committed `Node` objects so IDs remain stable.

### Common mistakes to avoid
- Do not push generated-but-unselected options into `path`.
- Do not derive animation direction inside child components.
- Do not reuse a static key for the animated container.
- Do not let `choice` mode render with an empty `path`.

## Why There Is No Router
A router would be extra machinery here because the app is not page-based; it is a **single branching interaction** with transient animated states.

Reasons this app stays router-free:
- There are no shareable URLs or deep-linkable pages yet.
- `focus` and `choice` are UI states of the same decision flow, not distinct routes.
- Back behavior is custom state-machine behavior, not browser-history behavior.
- Animation direction depends on semantic navigation (`forward` vs `backward`), which is easier to control directly in local state.

If the project later adds persistence, sharing, or multi-session history, reevaluate routing then. For the current scope, `App.tsx` is the correct orchestration layer.
