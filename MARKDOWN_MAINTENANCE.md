# MARKDOWN_MAINTENANCE.md – When to Update Documentation

This file tells AI agents (Codex, Claude, GitHub Copilot) when to update the `.md` files.

## Rule 1: Color or Tailwind class changes → Update UI_PATTERNS.md

**Trigger**: Any change to:
- Button classes in any component
- Card border/background classes
- Focus ring colors or opacity
- Hover state colors
- Background color (currently slate-950)
- Text colors (currently slate-50)

**Action**: 
1. Read the new Tailwind classes from the modified component
2. Update the corresponding section in UI_PATTERNS.md
3. If it's a new button variant, add it to "Component Building Blocks"

**Example**:
- If ChoiceScreen.tsx button color changes from cyan-400 to blue-500
- Then UI_PATTERNS.md "Button (Choice — Slate)" section must be updated to show the new class

## Rule 2: State variable or handler changes → Update ARCHITECTURE.md

**Trigger**: Any change to:
- `useState` declarations in App.tsx (lines 45-48)
- A handler function (handleStart, handleGenerate, handleSelectBranch, handleBack)
- The screenKey computation logic
- The screenVariants animation config

**Action**:
1. Update the state table with new/changed variables
2. If screenKey logic changed, update that section
3. If handlers changed, update the invariants section
4. If a new mode is added, document it

**Example**:
- If you add `const [isLoading, setIsLoading] = useState(false)` to App.tsx
- Then add a new row to the state table in ARCHITECTURE.md

## Rule 3: Component props or behavior change → Update SKILLS.md

**Trigger**: Any change to:
- A component's props (new prop, removed prop, prop type changed)
- A component's JSX (new button, removed section, layout change)
- The `createNode` or `generateBranches` function signature
- A new component added

**Action**:
1. Update the component documentation in SKILLS.md
2. If props changed, update the props list
3. If behavior changed, add "When to modify" notes
4. If a new component is added, add a new section

**Example**:
- If FocusScreen receives a new `isLoading` prop
- Then update FocusScreen section: "Props: currentNode: Node, onGenerate: () => void, isLoading: boolean"

## Rule 4: New tasks or completed tasks → Update INSTRUCTIONS.md

**Trigger**:
- A new bug is discovered (add to Phase 1)
- A task is completed (remove or mark as ✅)
- A new feature is planned (add to Phase 2)
- Time estimates change based on actual work

**Action**:
1. Add/remove/update the task
2. Keep priority levels consistent (🔴 🟡 🟢 📌)
3. Keep tasks in execution order (dependencies first)
4. When a task is done, mark it ✅ or remove it

**Example**:
- If BUG-1 (key={branch}) is fixed
- Remove it or mark as: ✅ BUG-1: Fixed duplicate key in ChoiceScreen

## Rule 5: Animations or transitions change → Update UI_PATTERNS.md + ARCHITECTURE.md

**Trigger**: Any change to:
- screenVariants config (duration, ease, initial/exit positions)
- motion.div properties in any component
- Transition duration (currently 200ms)
- Animation effects (blur, scale, opacity)

**Action**:
1. Update animation section in UI_PATTERNS.md
2. If screenVariants changed, update ARCHITECTURE.md screenKey section
3. Document new animations if added

---

## How Codex uses this file

When you say "add a new button to FocusScreen", Codex will:

1. Check this file to see what to update
2. Read SKILLS.md to understand component patterns
3. Read UI_PATTERNS.md to get the button class
4. Make the change
5. Automatically update SKILLS.md to reflect the new button

This keeps documentation in sync with code **automatically**.

---

## Checklist: Before asking Codex to change code
- Which `.md` file is affected by the change?
- Did any Tailwind classes, props, state handlers, or tasks change?
- Should the change also update architecture, UI patterns, or component docs?
- After code changes, re-read the relevant markdown file and sync it before finishing.
