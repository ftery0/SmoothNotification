**Language:** **English** | [한국어](alert.ko.md) | [简体中文](alert.zh-CN.md)

---

# Alert

> [← Back to README](../README.md)

A Promise-based alert dialog that resolves `void` once the user acknowledges it. Use it when you need to block execution until the user has read a message.

---

## Basic Usage

```tsx
import { smooth } from 'smooth-notification';

await smooth.alert('Your session has expired. Please log in again.');

// Execution continues only after the user clicks OK
redirectToLogin();
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | `'Notice'` | Dialog heading |
| `message` | `React.ReactNode` | — | Main body text (first argument) |
| `okText` | `string` | `'OK'` | Label for the OK button |
| `icon` | `TypeOptions` | `'info'` | Icon badge variant |

---

## Examples

### Session expiry notice

```tsx
await smooth.alert('Your session will expire in 2 minutes. Please save your work.', {
  title: 'Session Warning',
  icon: 'warning',
  okText: 'Got it',
});
```

### Success confirmation

```tsx
await smooth.alert('Your report has been submitted and will be reviewed within 24 hours.', {
  title: 'Submitted',
  icon: 'success',
  okText: 'Great',
});
```

### Error notice

```tsx
await smooth.alert(
  'We could not process your payment. Please check your card details and try again.',
  {
    title: 'Payment Failed',
    icon: 'error',
    okText: 'Understood',
  }
);
```

### React content

```tsx
await smooth.alert(
  <span>
    <strong>{fileName}</strong> could not be uploaded. Maximum file size is 10 MB.
  </span>,
  { title: 'Upload Failed', icon: 'error' }
);
```

---

## Icon Variants

| Value | Color | Use case |
|-------|-------|----------|
| `'info'` | `#a78bfa` (purple) | General notices |
| `'warning'` | `#ffb547` (amber) | Caution messages |
| `'error'` | `#ff6b8a` (red-pink) | Error / failure notices |
| `'success'` | `#10e8a4` (green) | Completion / success |
| `'default'` | muted | Neutral |

---

## Alert vs. Confirm

| | `smooth.alert` | `smooth.confirm` |
|--|---------------|-----------------|
| Buttons | OK only | Confirm + Cancel |
| Returns | `Promise<void>` | `Promise<boolean>` |
| Use when | User must acknowledge | User must decide |

---

## Animation

| Event | Keyframe | Duration | Easing |
|-------|----------|----------|--------|
| Overlay in | `sn-overlayIn` | `0.28s` | `ease` |
| Dialog in | `sn-dialogIn` | `0.50s` | `cubic-bezier(0.34, 1.4, 0.64, 1)` |
| Icon pop | `sn-iconPop` | `0.52s` + `0.08s` delay | `cubic-bezier(0.34, 1.4, 0.64, 1)` |
| Dialog out | `sn-dialogOut` | `0.30s` | `cubic-bezier(0.4, 0, 0.8, 1)` |

---

## Using the Component Directly

```tsx
import { Alert } from 'smooth-notification';

function MyPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Show Notice</button>
      <Alert
        isOpen={open}
        message="Maintenance window starts at midnight."
        title="Scheduled Maintenance"
        icon="warning"
        okText="Understood"
        onOk={() => setOpen(false)}
      />
    </>
  );
}
```
