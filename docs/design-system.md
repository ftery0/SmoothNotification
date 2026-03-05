**Language:** **English** | [한국어](design-system.ko.md) | [简体中文](design-system.zh-CN.md)

---

# Design System — Nocturne

> [← Back to README](../README.md)

**Nocturne** is the design system powering smooth-notification. It's built on a dark-luxury aesthetic: deep-space surface layers, bioluminescent accent colors, and spring physics animations.

Everything is expressed as CSS custom properties — override any token at `:root` level to customize globally without touching SCSS.

---

## Color Palette

### Surfaces

| Token | Value | Role |
|-------|-------|------|
| `--sn-void` | `#07070e` | Page background — the darkest layer |
| `--sn-abyss` | `#0c0c1a` | Card / dialog background |
| `--sn-depth` | `#11111e` | Elevated surfaces |
| `--sn-surface` | `rgba(255,255,255,0.04)` | Subtle fills (buttons, inputs) |
| `--sn-surface-h` | `rgba(255,255,255,0.07)` | Hover state of surfaces |
| `--sn-border` | `rgba(255,255,255,0.07)` | Default border |
| `--sn-border-h` | `rgba(255,255,255,0.14)` | Hover state of borders |

### Typography

| Token | Value | Role |
|-------|-------|------|
| `--sn-text` | `#ededfa` | Primary text |
| `--sn-text-muted` | `rgba(237,237,250,0.5)` | Secondary / body text |
| `--sn-text-subtle` | `rgba(237,237,250,0.28)` | Disabled / placeholder text |

### Bioluminescent Accents

| Token | Value | Use |
|-------|-------|-----|
| `--sn-success` | `#10e8a4` | Success states |
| `--sn-error` | `#ff6b8a` | Error / danger states |
| `--sn-warning` | `#ffb547` | Warning states |
| `--sn-info` | `#a78bfa` | Informational states |

### Accent Backgrounds (pre-computed)

| Token | Value |
|-------|-------|
| `--sn-success-bg` | `rgba(16, 232, 164, 0.13)` |
| `--sn-error-bg` | `rgba(255, 107, 138, 0.13)` |
| `--sn-warning-bg` | `rgba(255, 181, 71, 0.13)` |
| `--sn-info-bg` | `rgba(167, 139, 250, 0.13)` |
| `--sn-default-bg` | `rgba(255, 255, 255, 0.08)` |

---

## Typography

| Token | Value |
|-------|-------|
| `--sn-font` | `'Instrument Sans', -apple-system, system-ui, sans-serif` |

[Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) is loaded from Google Fonts via the SCSS variables partial.

---

## Geometry

| Token | Value | Used for |
|-------|-------|----------|
| `--sn-radius` | `14px` | Toast, modal, dialog cards |
| `--sn-radius-sm` | `9px` | Buttons, small elements |

---

## Shadows

| Token | Value | Role |
|-------|-------|------|
| `--sn-shadow-sm` | `0 2px 8px rgba(0,0,0,.35)` | Subtle elevation |
| `--sn-shadow-md` | `0 8px 32px rgba(0,0,0,.5)` | Cards (toast) |
| `--sn-shadow-lg` | `0 24px 80px rgba(0,0,0,.65)` | Modals / dialogs |
| `--sn-shadow-ring` | `0 0 0 1px rgba(255,255,255,.04)` | Subtle outline glow |

---

## Overriding Tokens

Paste this in your global CSS or at the top of your SCSS to override any token:

```css
:root {
  --sn-radius:  10px;           /* rounder corners */
  --sn-success: #00e096;        /* custom green */
  --sn-font:    'Inter', sans-serif;
}
```

---

## SCSS Structure

```
src/styles/
├── _variables.scss     ← all CSS custom properties + Google Fonts import
├── _animations.scss    ← @keyframes (toast, dialog, overlay, icon)
├── _toast.scss         ← .sn-toast and .sn-toasts container
├── _modal.scss         ← .sn-overlay and .sn-modal
├── _dialog.scss        ← .sn-dialog (Confirm + Alert shared)
├── _buttons.scss       ← .sn-btn variants
└── smooth.scss         ← entry point (@import all partials)
```

Import the entry point in your project:

```scss
@import 'smooth-notification/src/styles/smooth';
```

Or import partials individually:

```scss
@import 'smooth-notification/src/styles/variables';
@import 'smooth-notification/src/styles/animations';
@import 'smooth-notification/src/styles/toast';
```

---

## Button System

smooth-notification exposes a button utility class for use inside dialogs and modals.

```html
<button class="sn-btn sn-btn--primary">Save</button>
<button class="sn-btn sn-btn--ghost">Cancel</button>
<button class="sn-btn sn-btn--danger">Delete</button>
<button class="sn-btn sn-btn--success">Confirm</button>
```

| Modifier | Appearance | Use for |
|----------|------------|---------|
| `--ghost` | Subtle border, muted text | Secondary / cancel actions |
| `--primary` | Info purple fill | Primary CTA |
| `--danger` | Red-pink tinted | Destructive actions |
| `--success` | Green tinted | Positive confirmations |

---

## Animation Reference

| Keyframe | Duration | Easing | Used for |
|----------|----------|--------|----------|
| `sn-toastIn` | `0.55s` | `cubic-bezier(0.34, 1.32, 0.64, 1)` | Toast entrance (spring overshoot) |
| `sn-toastOut` | `0.42s` | `cubic-bezier(0.4, 0, 0.8, 1)` | Toast exit |
| `sn-progress` | `autoClose` ms | `linear` | Progress bar scaleX |
| `sn-overlayIn` | `0.28s` | `ease` | Backdrop fade in |
| `sn-overlayOut` | `0.30s` | `ease` | Backdrop fade out |
| `sn-dialogIn` | `0.48–0.50s` | `cubic-bezier(0.34, 1.3–1.4, 0.64, 1)` | Modal / dialog entrance |
| `sn-dialogOut` | `0.30s` | `cubic-bezier(0.4, 0, 0.8, 1)` | Modal / dialog exit |
| `sn-iconPop` | `0.52s` + `0.08s` delay | `cubic-bezier(0.34, 1.4, 0.64, 1)` | Dialog icon badge |

---

## Glass Morphism

Toast cards use a glass-morphism treatment:

```css
background: rgba(11, 11, 22, 0.9);
backdrop-filter: blur(24px) saturate(180%);
border: 1px solid var(--sn-border);
box-shadow: var(--sn-shadow-md), var(--sn-shadow-ring);
```

Overlay / backdrop:

```css
background: rgba(4, 4, 10, 0.75);
backdrop-filter: blur(12px);
```

> `backdrop-filter` requires Chrome 88+, Firefox 89+, Safari 15+.
