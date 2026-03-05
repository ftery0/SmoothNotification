**Language:** [English](README.md) | [한국어](README.ko.md) | **简体中文**

---

<div align="center">

# smooth-notification

**为 React 打造的 Toast · Modal · Confirm · Alert**

[![npm version](https://img.shields.io/npm/v/smooth-notification.svg)](https://www.npmjs.com/package/smooth-notification)
[![license](https://img.shields.io/npm/l/smooth-notification.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./docs/contributing.md)

<!-- 演示 GIF -->

</div>

---

## 安装

```bash
npm install smooth-notification
# 或者
yarn add smooth-notification
```

## 配置

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

## 使用

```tsx
import { smooth } from 'smooth-notification';

// Toast
smooth.toast('保存成功！', { type: 'success' });

// Confirm — 返回 Promise<boolean>
const ok = await smooth.confirm('确定删除吗？', { icon: 'error' });

// Alert — 返回 Promise<void>
await smooth.alert('会话即将过期。', { icon: 'warning' });

// Modal — 渲染任意 React 内容
await smooth.modal(<MyForm />, { title: '编辑资料' });
```

无需组件包裹，无需状态管理 — 随处调用，等待结果。

---

## 文档

| | |
|--|--|
| 🔔 [Toast](./docs/toast.zh-CN.md) | 选项、位置、动画、拖拽行为 |
| ✅ [Confirm](./docs/confirm.zh-CN.md) | Promise 驱动的确认对话框 |
| ⚠️ [Alert](./docs/alert.zh-CN.md) | Promise 驱动的提示对话框 |
| 🪟 [Modal](./docs/modal.zh-CN.md) | 支持任意内容的全功能模态框 |
| 🎨 [Design System](./docs/design-system.zh-CN.md) | Nocturne 令牌、SCSS、按钮、动画 |
| 🤝 [Contributing](./docs/contributing.zh-CN.md) | 开发环境、项目结构、PR 指南 |

---

## 许可证

[MIT](./LICENSE) © [ftery0](https://github.com/ftery0)
