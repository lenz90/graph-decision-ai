# SKILLS.md

## Purpose
This file documents the reusable building blocks in `src/components/` plus the small state helpers in `src/App.tsx`.

## Non-Negotiable Tailwind Rules
Do **not** casually break these visual patterns:
- **Card shell**: `rounded-3xl border border-white/10 bg-white/5 ... backdrop-blur`
- **Focus rings**: cyan-tinted `focus:ring-2` treatments with visible opacity values
- **Hover transitions**: `transition duration-200` with subtle color or border shifts
- **Dark-only palette**: keep surfaces and text aligned with the current slate/cyan system

## Components

### `InputScreen`
**File:** `src/components/InputScreen.tsx`

**Props**
- `onSubmit: (value: string) => void`

**What it does**
- Owns the local text input state for the first user prompt.
- Trims whitespace before submit.
- Blocks empty submissions.

**When to modify**
- Change copy, placeholder text, or first-run onboarding language.
- Add input validation or helper text.
- Add loading/disabled states if submission ever becomes async.

**Modification notes**
- Keep the single-column card layout.
- Keep the input and submit button inside the same form.
- Preserve the current focus ring and button treatment unless UI_PATTERNS is updated too.

### `FocusScreen`
**File:** `src/components/FocusScreen.tsx`

**Props**
- `currentNode: Node`
- `onGenerate: () => void`

**What it does**
- Displays the committed current node.
- Presents the main call to action to generate the next four branches.

**When to modify**
- Add metadata about the current node.
- Add secondary actions like edit, regenerate, or copy.
- Add loading UI for future AI generation.

**Modification notes**
- Keep the centered “single idea in focus” layout.
- The large inner panel is part of the current visual identity; avoid replacing it with a dense list layout.

### `ChoiceScreen`
**File:** `src/components/ChoiceScreen.tsx`

**Props**
- `branches: string[]`
- `onSelect: (branch: string) => void`

**What it does**
- Renders the candidate branches as selectable cards.
- Uses `motion.button` so selection has tactile feedback.

**When to modify**
- Change branch card density, layout, or wording.
- Add branch metadata, confidence labels, or icons.
- Add disabled/loading states for async generation.

**Current bug to keep in mind**
- The list currently uses `key={branch}`.
- This should be `key={index}` if branch strings can repeat, otherwise duplicate labels can create unstable React keys.

**Modification notes**
- Keep the card grid responsive with the `sm:` two-column layout.
- Keep choice cards visually distinct from primary CTA buttons.
- Preserve `whileTap` feedback unless motion behavior is intentionally redesigned.

### `Breadcrumb`
**File:** `src/components/Breadcrumb.tsx`

**Props**
- `path: Node[]`

**What it does**
- Displays the committed navigation history.
- Truncates long labels to keep the path readable.
- Highlights the last node as the active location.

**When to modify**
- Improve overflow handling.
- Add click-to-jump behavior if non-linear navigation is introduced.
- Add separators or richer node labels.

**Modification notes**
- Keep horizontal overflow safe.
- Keep the final node visually emphasized over earlier nodes.

## Utilities

### `createNode(text)`
**File:** `src/App.tsx`

**Signature**
- `createNode(text: string): Node`

**What it does**
- Creates the committed `Node` object with a random UUID and the provided text.

**When to modify**
- Add new node metadata such as timestamps, parent IDs, or AI provenance.
- Normalize text before persistence.

**Guardrails**
- Keep node creation centralized here.
- If the returned shape changes, update `src/types.ts`, `ARCHITECTURE.md`, and any component consuming `Node`.

### `generateBranches(text)`
**File:** `src/App.tsx`

**Signature**
- `generateBranches(text: string): string[]`

**What it does**
- Returns four placeholder branches based on the current node text.
- It is currently synchronous and deterministic.

**When to modify**
- Replace the placeholder implementation with real AI output.
- Add filtering, deduplication, or formatting.

**Guardrails**
- The app assumes four branch options today.
- If that changes, revisit `FocusScreen` button copy, `ChoiceScreen` layout, and `INSTRUCTIONS.md`.

## Change Checklist
When editing a component or utility:
1. Check whether the prop shape changed.
2. Keep the existing Tailwind shell/focus/hover patterns unless the design system is being intentionally updated.
3. Update `ARCHITECTURE.md` if state flow changes.
4. Update `UI_PATTERNS.md` if any classes or motion rules change.
