**Language:** **English** | [한국어](contributing.ko.md) | [简体中文](contributing.zh-CN.md)

---

# Contributing

> [← Back to README](../README.md)

Contributions of all kinds are welcome — bug reports, feature requests, documentation improvements, and pull requests.

---

## Development Setup

```bash
# 1. Fork and clone
git clone https://github.com/your-username/smooth-notification.git
cd smooth-notification

# 2. Install dependencies
yarn install
cd playground && yarn install && cd ..

# 3. Start the playground dev server
yarn start   # → http://localhost:5173
```

The playground (`/playground`) hot-reloads the library source via a Vite alias — editing files in `src/` is reflected immediately.

---

## Project Structure

```
smooth-notification/
├── src/                              # Library source (published to npm)
│   ├── core/
│   │   ├── store.ts                  # Pub/sub event emitter + toggle registry
│   │   └── smooth.ts                 # smooth.toast / modal / confirm / alert
│   ├── components/
│   │   ├── SmoothProvider.tsx        # Provider + document.body portal
│   │   ├── ToastContainer.tsx        # Position-grouped toast renderer
│   │   ├── Toast.tsx                 # Drag + timer + progress bar
│   │   ├── Modal.tsx                 # ESC + backdrop + spring animation
│   │   ├── Confirm.tsx               # Promise<boolean> dialog
│   │   ├── Alert.tsx                 # Promise<void> dialog
│   │   └── Icon.tsx                  # Type-based SVG icons
│   ├── hooks/
│   │   ├── useAnimatedMount.ts       # Exit-animation-safe mount/unmount
│   │   ├── useToast.ts               # Drag + pause interaction logic
│   │   └── useDynamicLayoutEffect.ts # SSR-safe layout effect
│   ├── styles/                       # Nocturne design system (SCSS)
│   │   ├── _variables.scss
│   │   ├── _animations.scss
│   │   ├── _toast.scss
│   │   ├── _modal.scss
│   │   ├── _dialog.scss
│   │   ├── _buttons.scss
│   │   └── smooth.scss               # Entry point
│   ├── types.ts
│   ├── utils.ts
│   └── index.ts                      # Public API exports
├── playground/                       # Vite + React demo app
│   └── src/App.js                    # Interactive showcase
├── cypress/                          # Component tests
└── docs/                             # Detailed documentation
```

---

## Submitting a Pull Request

1. **Open an issue first** for significant changes — let's align on the approach before you invest time coding.

2. **Create a branch** from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

3. **Make your changes.** If adding a new visual element, update the playground demo so reviewers can see it in action.

4. **Run tests:**
   ```bash
   yarn test
   ```

5. **Commit** with a conventional message:
   ```
   feat :: add loading toast variant
   fix  :: timer not resuming after focus restore
   docs :: add toast position examples
   style :: update warning accent color
   ```

6. **Open a PR** against `main` with:
   - What changed and why
   - A screenshot or GIF if it's a visual change
   - Reference to the related issue (if any)

---

## Reporting Bugs

Use [GitHub Issues](https://github.com/ftery0/smooth-notification/issues) and include:

- Minimal reproduction (CodeSandbox link or code snippet)
- React version and browser + OS
- Expected behavior vs. actual behavior
- Console errors if any

---

## Code Style

### TypeScript
- Strict mode throughout — no `any`, no non-null assertions without justification
- Prefer explicit return types on exported functions
- Use `type` imports for type-only imports: `import type { ... }`

### React
- Functional components only
- One component per file, file name matches component name
- Props interfaces named `{ComponentName}Props`

### CSS / SCSS
- All classes prefixed with `sn-`
- BEM naming: `.sn-block__element--modifier`
- Custom properties on `:root`, not on component selectors
- No hardcoded colors — always use tokens

### Commits
- Follow the `type :: description` format used in this repo
- Keep commits focused — one logical change per commit

---

## Roadmap

Planned features — PRs welcome:

- [ ] Light theme support
- [ ] Custom transition prop per toast
- [ ] `smooth.loading()` — persistent loading toast with resolve/reject
- [ ] Stacked / collapsed toast mode
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] React Native support

Have an idea not on the list? [Open a feature request →](https://github.com/ftery0/smooth-notification/issues)
