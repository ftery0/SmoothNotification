**Language:** **English** | [한국어](modal.ko.md) | [简体中文](modal.zh-CN.md)

---

# Modal

> [← Back to README](../README.md)

A Promise-based modal that renders arbitrary React content. Resolves when the modal closes — via ESC, backdrop click, or the built-in close button.

---

## Basic Usage

```tsx
import { smooth } from 'smooth-notification';

await smooth.modal(
  <p>Any React content goes here.</p>,
  { title: 'My Modal' }
);

// Continues here after the modal closes
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | — | Header title. If omitted, the header is still rendered |
| `component` | `React.ReactNode` | — | Content to render inside the modal body (first argument) |

---

## Examples

### Information modal

```tsx
await smooth.modal(
  <div>
    <p>Version 2.1.0 introduces:</p>
    <ul>
      <li>Spring animations</li>
      <li>Promise-based dialogs</li>
      <li>Nocturne design system</li>
    </ul>
  </div>,
  { title: "What's New" }
);
```

### Form inside a modal

```tsx
function ProfileForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');

  async function handleSave() {
    await saveProfile({ name });
    onClose();
    smooth.toast('Profile updated.', { type: 'success' });
  }

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Display name" />
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button className="sn-btn sn-btn--ghost" onClick={onClose}>Cancel</button>
        <button className="sn-btn sn-btn--primary" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

// Usage
const [closeModal, setCloseModal] = useState<(() => void) | null>(null);

await smooth.modal(
  <ProfileForm onClose={() => closeModal?.()} />,
  { title: 'Edit Profile' }
);
```

### Image preview

```tsx
await smooth.modal(
  <img
    src={imageUrl}
    alt="Preview"
    style={{ width: '100%', borderRadius: 8 }}
  />,
  { title: 'Image Preview' }
);
```

---

## Closing the Modal

| Action | Behavior |
|--------|----------|
| Click close button (`×`) | Resolves promise, unmounts with exit animation |
| Press `ESC` | Resolves promise, unmounts with exit animation |
| Click backdrop | Resolves promise, unmounts with exit animation |

---

## Layout

```
┌─────────────────────────────────────┐  ← .sn-overlay (backdrop blur)
│  ┌───────────────────────────────┐  │
│  │  Title                     ×  │  │  ← .sn-modal__head
│  ├───────────────────────────────┤  │
│  │                               │  │
│  │  { children }                 │  │  ← .sn-modal__body
│  │                               │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │  { footer }             │  │  │  ← .sn-modal__footer (optional)
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

Max width: `520px`. Scrolls vertically if content overflows.

---

## Animation

| Event | Keyframe | Duration | Easing |
|-------|----------|----------|--------|
| Overlay in | `sn-overlayIn` | `0.28s` | `ease` |
| Modal in | `sn-dialogIn` | `0.48s` | `cubic-bezier(0.34, 1.3, 0.64, 1)` |
| Modal out | `sn-dialogOut` | `0.30s` | `cubic-bezier(0.4, 0, 0.8, 1)` |
| Overlay out | `sn-overlayOut` | `0.30s` | `ease` |

---

## CSS Classes

| Class | Description |
|-------|-------------|
| `.sn-overlay` | Full-screen backdrop (`backdrop-filter: blur(12px)`) |
| `.sn-modal` | Modal card (max-width 520px) |
| `.sn-modal.is-opening` | Entry animation state |
| `.sn-modal.is-closing` | Exit animation state |
| `.sn-modal__head` | Header row (title + close button) |
| `.sn-modal__title` | Header title text |
| `.sn-modal__x` | Close button |
| `.sn-modal__body` | Content area |
| `.sn-modal__footer` | Footer area (rendered inside body) |

---

## Using the Component Directly

```tsx
import { Modal } from 'smooth-notification';

function MyPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal
        isOpen={open}
        title="Settings"
        onClose={() => setOpen(false)}
        footer={
          <>
            <button className="sn-btn sn-btn--ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="sn-btn sn-btn--primary" onClick={handleSave}>
              Save
            </button>
          </>
        }
      >
        <p>Modal content here.</p>
      </Modal>
    </>
  );
}
```
