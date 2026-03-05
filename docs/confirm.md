**Language:** **English** | [한국어](confirm.ko.md) | [简体中文](confirm.zh-CN.md)

---

# Confirm

> [← Back to README](../README.md)

A Promise-based confirmation dialog. Returns `true` when the user confirms and `false` when they cancel — no callbacks, no state, just `await`.

---

## Basic Usage

```tsx
import { smooth } from 'smooth-notification';

const ok = await smooth.confirm('Are you sure?');

if (ok) {
  // user clicked Confirm
} else {
  // user clicked Cancel or the backdrop
}
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | `'Confirm'` | Dialog heading |
| `message` | `React.ReactNode` | — | Main body text (first argument) |
| `confirmText` | `string` | `'Confirm'` | Label for the confirm button |
| `cancelText` | `string` | `'Cancel'` | Label for the cancel button |
| `icon` | `TypeOptions` | `'warning'` | Icon badge variant |

---

## Examples

### Delete confirmation

```tsx
const confirmed = await smooth.confirm(
  'This action cannot be undone. All associated data will be permanently removed.',
  {
    title: 'Delete Account',
    confirmText: 'Delete forever',
    cancelText: 'Keep account',
    icon: 'error',
  }
);

if (confirmed) {
  await deleteAccount();
  smooth.toast('Account deleted.', { type: 'success' });
}
```

### Destructive action with result feedback

```tsx
async function handlePublish() {
  const ok = await smooth.confirm('Publish this post to all subscribers?', {
    title: 'Publish Post',
    confirmText: 'Publish',
    icon: 'info',
  });

  if (!ok) return;

  try {
    await publishPost();
    smooth.toast('Post published!', { type: 'success' });
  } catch {
    smooth.toast('Publish failed.', { type: 'error' });
  }
}
```

### React content in message

```tsx
const ok = await smooth.confirm(
  <span>
    Remove <strong>{user.name}</strong> from the project?
  </span>,
  { title: 'Remove Member', icon: 'warning' }
);
```

---

## Icon Variants

The icon badge changes color based on the `icon` option:

| Value | Color | Use case |
|-------|-------|----------|
| `'error'` | `#ff6b8a` (red-pink) | Destructive / irreversible actions |
| `'warning'` | `#ffb547` (amber) | Caution required |
| `'success'` | `#10e8a4` (green) | Positive confirmation |
| `'info'` | `#a78bfa` (purple) | Informational |
| `'default'` | muted | Neutral |

---

## Behavior

- Clicking the **backdrop** resolves `false` (same as Cancel)
- Pressing **ESC** resolves `false`
- Multiple simultaneous confirms are supported — they stack in order

---

## Animation

| Event | Keyframe | Duration | Easing |
|-------|----------|----------|--------|
| Overlay in | `sn-overlayIn` | `0.28s` | `ease` |
| Dialog in | `sn-dialogIn` | `0.50s` | `cubic-bezier(0.34, 1.4, 0.64, 1)` |
| Icon pop | `sn-iconPop` | `0.52s` + `0.08s` delay | `cubic-bezier(0.34, 1.4, 0.64, 1)` |
| Dialog out | `sn-dialogOut` | `0.30s` | `cubic-bezier(0.4, 0, 0.8, 1)` |
| Overlay out | `sn-overlayOut` | `0.30s` | `ease` |

---

## CSS Classes

| Class | Description |
|-------|-------------|
| `.sn-overlay` | Full-screen backdrop with blur |
| `.sn-overlay.is-opening` | Entry animation state |
| `.sn-overlay.is-closing` | Exit animation state |
| `.sn-dialog` | Dialog card |
| `.sn-dialog.is-opening` | Entry animation state |
| `.sn-dialog.is-closing` | Exit animation state |
| `.sn-dialog__icon` | Icon badge wrapper |
| `.sn-dialog__icon--danger` | Red-pink variant |
| `.sn-dialog__icon--warning` | Amber variant |
| `.sn-dialog__icon--success` | Green variant |
| `.sn-dialog__icon--info` | Purple variant |
| `.sn-dialog__title` | Heading text |
| `.sn-dialog__message` | Body text |
| `.sn-dialog__actions` | Button row |

---

## Using the Component Directly

```tsx
import { Confirm } from 'smooth-notification';

function MyPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Delete</button>
      <Confirm
        isOpen={open}
        message="This cannot be undone."
        title="Delete Item"
        confirmText="Delete"
        cancelText="Cancel"
        icon="error"
        onConfirm={() => { setOpen(false); handleDelete(); }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
```
