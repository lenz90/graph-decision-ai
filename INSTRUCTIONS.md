# INSTRUCTIONS.md

## Phase 1: UI Polish
No async work required. Focus on correctness, consistency, and UX clarity.

### 🔴 P1 — Fix unstable branch keys
- **File:** `src/components/ChoiceScreen.tsx`
- **Problem:** Branch cards use `key={branch}`, which breaks if two generated branches have identical text.
- **Fix:** Change the map callback to include `index` and use `key={index}`.
- **Why:** Prevents duplicate-key warnings and incorrect DOM reuse during animation-heavy updates.
- **Estimated time:** 5 minutes

### 🟡 P1 — Remove duplicated choice heading copy
- **File:** `src/components/ChoiceScreen.tsx`
- **Problem:** The eyebrow label and the main heading both say “Choose next direction”.
- **Fix:** Keep one phrase and make the other more specific, e.g. “Branch options” + “Choose your next direction”.
- **Why:** Improves hierarchy and reduces repetitive UI text.
- **Estimated time:** 10 minutes

### 🟡 P1 — Centralize repeated card/button class patterns
- **File:** `src/components/InputScreen.tsx`, `src/components/FocusScreen.tsx`, `src/components/ChoiceScreen.tsx`, `src/App.tsx`
- **Problem:** Core visual classes are repeated inline across multiple files.
- **Fix:** Extract stable class constants or lightweight shared helpers for card shells and button variants.
- **Why:** Makes future UI changes safer and keeps dark-mode styling consistent.
- **Estimated time:** 20–30 minutes

## Phase 2: AI Integration
Future work. Async handling required before these tasks are safe.

### 📌 P2 — Add loading state for branch generation
- **File:** `src/App.tsx`, `src/components/FocusScreen.tsx`, `src/components/ChoiceScreen.tsx`
- **Problem:** The current flow assumes branch generation is immediate.
- **Fix:** Add explicit loading state and disable interactions while results are being fetched.
- **Why:** Real AI generation will be asynchronous and should not allow double-submits.
- **Prerequisites:** Decide on API surface and response shape.
- **Async needed:** Yes
- **Estimated time:** 30–45 minutes

### 📌 P2 — Replace placeholder `generateBranches()` with API-backed generation
- **File:** `src/App.tsx` or extracted service module
- **Problem:** Branches are currently fake `A/B/C/D` suffixes.
- **Fix:** Move generation into an async service call.
- **Why:** This is the actual product capability.
- **Prerequisites:** Loading/error state, API key strategy, prompt format.
- **Async needed:** Yes
- **Estimated time:** 1–2 hours

### 🟢 P2 — Add error state and retry affordance
- **File:** `src/App.tsx`, `src/components/FocusScreen.tsx` or `ChoiceScreen.tsx`
- **Problem:** There is no place to surface API failures.
- **Fix:** Add error state, visible messaging, and retry action.
- **Why:** Prevents silent failure once generation is remote.
- **Prerequisites:** Async generation path exists.
- **Async needed:** Yes
- **Estimated time:** 30 minutes

### 📌 P2 — Track richer node metadata
- **File:** `src/types.ts`, `src/App.tsx`, `src/components/Breadcrumb.tsx`
- **Problem:** Nodes only store `id` and `text`.
- **Fix:** Add optional metadata such as parent ID, created time, or generation source.
- **Why:** Helps with persistence, analytics, and smarter navigation later.
- **Prerequisites:** Decide which downstream features need the metadata.
- **Async needed:** Possibly
- **Estimated time:** 30–60 minutes

## Priority Legend
- 🔴 High: fix soon; correctness or maintainability risk
- 🟡 Medium: worthwhile cleanup with immediate UX value
- 🟢 Nice-to-have: useful, but not blocking
- 📌 Future: planned work that depends on bigger product steps
