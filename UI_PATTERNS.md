# UI_PATTERNS.md

## Core Rule
This is a **dark-only app**. Do not add light mode variants, dual-theme tokens, or conditional theme logic unless the product direction explicitly changes.

## Color Palette
Use the current Tailwind palette consistently:

- **App background:** `bg-slate-950`
- **Primary text:** `text-slate-50`, `text-white`
- **Secondary text:** `text-slate-200`, `text-slate-300`, `text-slate-500`
- **Muted separators:** `text-slate-700`
- **Primary accent:** `cyan-400`
- **Accent hover:** `cyan-300`
- **Borders:** `border-white/10`
- **Glass/card fill:** `bg-white/5`
- **Inset panel / choice surface:** `bg-slate-900/70` or `bg-slate-900/80`

## Button Variants

### Primary Cyan
Used for the main action on `InputScreen` and `FocusScreen`.

```txt
rounded-2xl bg-cyan-400 ... text-slate-950 transition duration-200 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/60
```

### Secondary Ghost
Used for navigation actions like the Back button.

```txt
rounded-2xl border border-white/10 bg-white/[0.03] ... text-slate-200 transition duration-200 hover:border-cyan-400/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/40
```

### Choice Slate
Used for branch-selection cards in `ChoiceScreen`.

```txt
rounded-3xl border border-white/10 bg-slate-900/70 ... text-slate-100 transition duration-200 hover:border-cyan-400/70 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-300/50
```

## Card Shell Pattern
Primary screen containers should keep this shell:

```txt
rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-10
```

Use it for full-screen panels unless there is a deliberate, documented design change.

## Input Field Pattern
Base text input treatment:

```txt
w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-base text-white outline-none transition duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30
```

Rules:
- Keep white text on dark surfaces.
- Keep cyan focus styling.
- Keep the 2xl rounded shape to match button geometry.

## Spacing Scale
Current spacing is intentionally roomy.

- **Page shell:** `px-4 py-8`, then `sm:px-6 lg:px-8`
- **Screen max widths:** `max-w-xl`, `max-w-2xl`, `max-w-4xl`, `max-w-5xl`
- **Card padding:** `p-8`, `sm:p-10`
- **Primary vertical gaps:** `gap-3`, `gap-4`, `gap-6`, `gap-8`
- **Section margins:** `mt-2`, `mt-3`, `mt-6`, `mt-8`
- **Choice card padding:** `p-6`
- **Focus content panel padding:** `px-6 py-12`, `sm:px-10`

Do not compress spacing unless the layout is actually breaking.

## Responsive Breakpoints
The app relies on simple `sm:` upgrades and should keep them.

Required responsive patterns:
- `sm:px-6` and `lg:px-8` on the page shell
- `sm:flex-row` and related alignment upgrades in the top control area
- `sm:text-4xl` / `sm:text-3xl` for headline scaling
- `sm:grid-cols-2` for choice cards
- `sm:auto-rows-fr` so choice cards stay visually balanced
- `sm:p-10` for card padding increases

If you add a new component, it should usually have at least a base layout plus an explicit `sm:` behavior.

## Animation Rules
### Screen transitions
The app-level screen transition is the source of truth.

- Enter/exit horizontal offset: `56px`
- Blur on enter/exit: `blur(6px)`
- Scale on enter/exit: `0.985`
- App transition timing: `duration: 0.32`
- Easing: `[0.22, 1, 0.36, 1]`

### Interaction transitions
- Tailwind interactions should stay on `duration-200`.
- Hover states should be subtle: border, text, background, or shadow shifts.
- Press feedback on branch cards uses `whileTap={{ scale: 0.98 }}`.

Do not introduce slow, floaty animations that fight the fast decision-flow feel.
