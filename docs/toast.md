**Language:** **English** | [한국어](toast.ko.md) | [简体中文](toast.zh-CN.md)

---

# Toast

> [← Back to README](../README.md)

Fire-and-forget notifications that slide in from the edge of the screen with a spring overshoot animation.

---

## Basic Usage

```tsx
import { smooth } from 'smooth-notification';

smooth.toast('Hello world!');
smooth.toast('Saved!', { type: 'success' });
smooth.toast('Something went wrong.', { type: 'error' });
smooth.toast('Heads up.', { type: 'warning' });
smooth.toast('FYI.', { type: 'info' });
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'` | Visual variant — controls icon and accent color |
| `position` | `Position` | `'top-right'` | Where the toast appears on screen |
| `autoClose` | `number \| false` | `5000` | Milliseconds before auto-dismiss. Pass `false` to persist indefinitely |
| `pauseOnHover` | `boolean` | `true` | Pauses the auto-close countdown while the cursor is over the toast |
| `pauseOnFocusLoss` | `boolean` | `true` | Pauses the countdown when the browser window loses focus |
| `draggable` | `boolean` | `true` | Allows the toast to be dismissed by dragging it off-screen |

---

## Position

Six positions are available. The toast stack grows inward from the anchor point.

```tsx
smooth.toast('Top right',     { position: 'top-right' });     // default
smooth.toast('Top center',    { position: 'top-center' });
smooth.toast('Top left',      { position: 'top-left' });
smooth.toast('Bottom right',  { position: 'bottom-right' });
smooth.toast('Bottom center', { position: 'bottom-center' });
smooth.toast('Bottom left',   { position: 'bottom-left' });
```

The default position for all toasts can be set once on `<SmoothProvider>`:

```tsx
<SmoothProvider defaultPosition="bottom-right">
  <App />
</SmoothProvider>
```

---

## Auto-close

```tsx
// Dismiss after 2 seconds
smooth.toast('Quick note', { autoClose: 2000 });

// Never dismiss automatically — user must drag or close
smooth.toast('Background sync active', {
  type: 'info',
  autoClose: false,
});
```

The progress bar at the bottom of the toast visualizes the remaining time. It pauses on hover and on window blur if those options are enabled.

---

## Draggable Dismiss

When `draggable: true` (default), the user can drag the toast horizontally to dismiss it. The toast fades as it moves and snaps back if the drag threshold isn't reached.

```tsx
// Disable drag
smooth.toast('Not draggable', { draggable: false });
```

---

## React Content

`message` accepts any React node:

```tsx
smooth.toast(
  <span>
    File <strong>report.pdf</strong> uploaded successfully.
  </span>,
  { type: 'success' }
);
```

---

## Type Accent Colors

Each `type` injects CSS variables `--accent` and `--accent-bg` inline:

| Type | Accent | Background |
|------|--------|------------|
| `success` | `#10e8a4` | `rgba(16, 232, 164, 0.13)` |
| `error` | `#ff6b8a` | `rgba(255, 107, 138, 0.13)` |
| `warning` | `#ffb547` | `rgba(255, 181, 71, 0.13)` |
| `info` | `#a78bfa` | `rgba(167, 139, 250, 0.13)` |
| `default` | `rgba(237,237,250,0.28)` | `rgba(255,255,255,0.08)` |

---

## Animation

Toasts use a spring overshoot keyframe on entry and a quick ease-out on exit.

| Event | Keyframe | Duration | Easing |
|-------|----------|----------|--------|
| Enter | `sn-toastIn` | `0.55s` | `cubic-bezier(0.34, 1.32, 0.64, 1)` |
| Exit  | `sn-toastOut` | `0.42s` | `cubic-bezier(0.4, 0, 0.8, 1)` |
| Progress bar | `sn-progress` | `autoClose` value | `linear` |

```
sn-toastIn keyframes:
  0%   → translateX(calc(100% + 32px)) scale(0.86)  opacity: 0
  55%  → translateX(-12px) scale(1.02)               opacity: 1  ← overshoot
  75%  → translateX(5px) scale(0.99)
  100% → translateX(0) scale(1)                      opacity: 1
```

---

## CSS Classes

| Class | Description |
|-------|-------------|
| `.sn-toasts` | Fixed position container |
| `.sn-toasts--{position}` | Position modifier (e.g. `--top-right`) |
| `.sn-toast` | Individual toast card |
| `.sn-toast.is-exiting` | Applied during exit animation |
| `.sn-toast__accent` | Left color strip |
| `.sn-toast__body` | Content row (icon + message + close) |
| `.sn-toast__icon` | Circular icon badge |
| `.sn-toast__msg` | Message text |
| `.sn-toast__close` | Dismiss button |
| `.sn-toast__bar` | Progress bar |
| `.sn-toast__bar.is-paused` | Paused state |
