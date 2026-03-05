**Language:** **English** | [한국어](README.ko.md) | [简体中文](README.zh-CN.md)

---

<div align="center">

# smooth-notification

**Toast · Modal · Confirm · Alert for React**

[![npm version](https://img.shields.io/npm/v/smooth-notification.svg)](https://www.npmjs.com/package/smooth-notification)
[![license](https://img.shields.io/npm/l/smooth-notification.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./docs/contributing.md)

<!-- demo GIF goes here -->

</div>

---

## Install

```bash
npm install smooth-notification
# or
yarn add smooth-notification
```

## Setup

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

## Usage

```tsx
import { smooth } from 'smooth-notification';

// Toast
smooth.toast('Saved!', { type: 'success' });

// Confirm — returns Promise<boolean>
const ok = await smooth.confirm('Delete this item?', { icon: 'error' });

// Alert — returns Promise<void>
await smooth.alert('Session will expire soon.', { icon: 'warning' });

// Modal — render any React content
await smooth.modal(<MyForm />, { title: 'Edit Profile' });
```

No component wrapping, no state management — call from anywhere, await the result.

---

## Documentation

| | |
|--|--|
| 🔔 [Toast](./docs/toast.md) | Options, positions, animations, drag behavior |
| ✅ [Confirm](./docs/confirm.md) | Promise-based confirmation dialog |
| ⚠️ [Alert](./docs/alert.md) | Promise-based alert dialog |
| 🪟 [Modal](./docs/modal.md) | Full-featured modal with arbitrary content |
| 🎨 [Design System](./docs/design-system.md) | Nocturne tokens, SCSS, buttons, animations |
| 🤝 [Contributing](./docs/contributing.md) | Setup, project structure, PR guide |

---

## License

[MIT](./LICENSE) © [ftery0](https://github.com/ftery0)
