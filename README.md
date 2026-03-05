**Language:** **English** | [한국어](README.ko.md) | [简体中文](README.zh-CN.md)

---

# smooth-notification

> Silky smooth toast, modal, confirm & alert for React — powered by the **Nocturne** design system.

Glass-morphism surfaces · Spring physics animations · Promise-based dialogs · Zero dependencies

---

## Preview

| Toast | Confirm | Alert | Modal |
|-------|---------|-------|-------|
| Slides in from the right with a spring overshoot | Resolves `Promise<boolean>` | Resolves `Promise<void>` | Renders arbitrary React content |

---

## Installation

```bash
npm install smooth-notification
# or
yarn add smooth-notification
```

> **Peer dependencies:** React 18+, React DOM 18+

---

## Quick Start

### 1. Wrap your app with `SmoothProvider`

```tsx
import { SmoothProvider } from 'smooth-notification';
import 'smooth-notification/dist/smooth.css';

export default function App() {
  return (
    <SmoothProvider>
      <YourApp />
    </SmoothProvider>
  );
}
```

### 2. Call `smooth.*` from anywhere

```tsx
import { smooth } from 'smooth-notification';

// Toast
smooth.toast('Saved successfully!', { type: 'success' });

// Confirm (await the result)
const ok = await smooth.confirm('Delete this item?', {
  title: 'Confirm Delete',
  icon: 'error',
});
if (ok) deleteItem();

// Alert
await smooth.alert('Session expires in 5 minutes.', {
  title: 'Warning',
  icon: 'warning',
});

// Modal (custom React content)
await smooth.modal(<MyForm />, { title: 'Edit Profile' });
```

No component wrapping, no state management — just call and await.

---

## API Reference

### `smooth.toast(message, options?)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'` | Visual variant |
| `position` | `'top-right' \| 'top-center' \| 'top-left' \| 'bottom-right' \| 'bottom-center' \| 'bottom-left'` | `'top-right'` | Screen position |
| `autoClose` | `number \| false` | `5000` | Auto-dismiss delay in ms. `false` = never |
| `pauseOnHover` | `boolean` | `true` | Pause timer on mouse hover |
| `pauseOnFocusLoss` | `boolean` | `true` | Pause when window loses focus |
| `draggable` | `boolean` | `true` | Drag to dismiss |

```tsx
smooth.toast('Upload complete!', {
  type: 'success',
  position: 'bottom-right',
  autoClose: 3000,
});

// Persistent toast (no auto-close)
smooth.toast('Background sync active', {
  type: 'info',
  autoClose: false,
});
```

---

### `smooth.confirm(message, options?)` → `Promise<boolean>`

Returns `true` when the user confirms, `false` when they cancel or click outside.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | `'Confirm'` | Dialog heading |
| `confirmText` | `string` | `'Confirm'` | Confirm button label |
| `cancelText` | `string` | `'Cancel'` | Cancel button label |
| `icon` | `TypeOptions` | `'warning'` | Icon badge variant |

```tsx
const confirmed = await smooth.confirm('Are you sure you want to delete this?', {
  title: 'Delete Item',
  confirmText: 'Delete',
  cancelText: 'Keep it',
  icon: 'error',
});

if (confirmed) {
  await deleteItem();
  smooth.toast('Deleted.', { type: 'success' });
}
```

---

### `smooth.alert(message, options?)` → `Promise<void>`

Resolves when the user clicks OK.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | `'Notice'` | Dialog heading |
| `okText` | `string` | `'OK'` | Button label |
| `icon` | `TypeOptions` | `'info'` | Icon badge variant |

```tsx
await smooth.alert('Your changes have been saved.', {
  title: 'Saved',
  icon: 'success',
  okText: 'Great!',
});
// Continues here after the user closes the dialog
```

---

### `smooth.modal(component, options?)` → `Promise<unknown>`

Renders any React node inside a modal. Resolves when the modal closes.

| Option | Type | Description |
|--------|------|-------------|
| `title` | `string` | Modal header title |

```tsx
function EditForm({ onSave }: { onSave: (data: FormData) => void }) {
  return <form>...</form>;
}

await smooth.modal(<EditForm />, { title: 'Edit Profile' });
```

Press **ESC** or click the backdrop to close.

---

### `<SmoothProvider>` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultPosition` | `Position` | `'top-right'` | Default toast position |
| `defaultAutoClose` | `number \| false` | `5000` | Default auto-dismiss delay |
| `defaultTheme` | `string` | `'dark'` | Theme token |

```tsx
<SmoothProvider
  defaultPosition="bottom-right"
  defaultAutoClose={4000}
>
  <App />
</SmoothProvider>
```

---

## Design System

smooth-notification ships with the **Nocturne** design system — a dark-luxury aesthetic built on deep space surfaces and bioluminescent accents.

### CSS Custom Properties

Override any token on `:root` to customize globally:

```css
:root {
  /* Surfaces */
  --sn-void:    #07070e;   /* darkest background */
  --sn-abyss:   #0c0c1a;   /* card background */

  /* Accent colors */
  --sn-success: #10e8a4;
  --sn-error:   #ff6b8a;
  --sn-warning: #ffb547;
  --sn-info:    #a78bfa;

  /* Geometry */
  --sn-radius:  14px;
  --sn-font:    'Instrument Sans', system-ui, sans-serif;
}
```

### Per-toast accent injection

The `--accent` and `--accent-bg` CSS variables are injected per toast via `style` prop, so each type carries its own color without extra class specificity:

```
success → --accent: #10e8a4 / --accent-bg: rgba(16, 232, 164, 0.13)
error   → --accent: #ff6b8a / --accent-bg: rgba(255, 107, 138, 0.13)
warning → --accent: #ffb547 / --accent-bg: rgba(255, 181, 71, 0.13)
info    → --accent: #a78bfa / --accent-bg: rgba(167, 139, 250, 0.13)
```

---

## TypeScript

Full TypeScript support out of the box.

```ts
import type {
  TypeOptions,      // 'success' | 'error' | 'warning' | 'info' | 'default'
  Position,         // 'top-right' | 'top-center' | ...
  SmoothToastOptions,
  SmoothProviderProps,
  ConfirmProps,
  AlertProps,
  ModalProps,
} from 'smooth-notification';
```

---

## Using Components Directly

If you need lower-level control, all components are exported individually:

```tsx
import { Toast, Modal, Confirm, Alert, ToastContainer } from 'smooth-notification';

// Render a confirm dialog yourself
<Confirm
  isOpen={open}
  message="Delete this item?"
  title="Confirm"
  onConfirm={() => { setOpen(false); handleDelete(); }}
  onCancel={() => setOpen(false)}
/>
```

---

## SCSS Source

If you use SCSS and want to customize at the source level, import the raw stylesheet instead of the compiled CSS:

```scss
// In your main SCSS entry point
@import 'smooth-notification/src/styles/smooth';

// Override variables before import
:root {
  --sn-radius: 10px;
}
```

---

## Animation Reference

| Keyframe | Duration | Easing | Used for |
|----------|----------|--------|----------|
| `sn-toastIn` | 0.55s | `cubic-bezier(0.34, 1.32, 0.64, 1)` | Toast entrance |
| `sn-toastOut` | 0.42s | `cubic-bezier(0.4, 0, 0.8, 1)` | Toast exit |
| `sn-dialogIn` | 0.48–0.50s | `cubic-bezier(0.34, 1.3–1.4, 0.64, 1)` | Modal / dialog entrance |
| `sn-dialogOut` | 0.30s | `cubic-bezier(0.4, 0, 0.8, 1)` | Modal / dialog exit |
| `sn-iconPop` | 0.52s + 0.08s delay | `cubic-bezier(0.34, 1.4, 0.64, 1)` | Dialog icon badge |
| `sn-overlayIn/Out` | 0.28–0.30s | `ease` | Backdrop fade |

---

## Browser Support

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| 88+ | 89+ | 15+ | 88+ |

Requires `backdrop-filter` support for the glass-morphism effect. Falls back gracefully on older browsers.

---

## License

MIT © [ftery0](https://github.com/ftery0)
