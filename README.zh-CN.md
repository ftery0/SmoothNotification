**Language:** [English](README.md) | [한국어](README.ko.md) | **简体中文**

---

# smooth-notification

> 为 React 打造的丝滑通知组件 — Toast、Modal、Confirm & Alert，由 **Nocturne** 设计系统驱动。

玻璃拟态界面 · 弹簧物理动画 · Promise 驱动对话框 · 零依赖

---

## 预览

| Toast | Confirm | Alert | Modal |
|-------|---------|-------|-------|
| 从右侧以弹簧过冲效果滑入 | 返回 `Promise<boolean>` | 返回 `Promise<void>` | 渲染任意 React 内容 |

---

## 安装

```bash
npm install smooth-notification
# 或者
yarn add smooth-notification
```

> **对等依赖：** React 18+, React DOM 18+

---

## 快速开始

### 1. 使用 `SmoothProvider` 包裹应用

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

### 2. 在任意位置调用 `smooth.*`

```tsx
import { smooth } from 'smooth-notification';

// Toast
smooth.toast('保存成功！', { type: 'success' });

// Confirm（等待结果）
const ok = await smooth.confirm('确定要删除这个项目吗？', {
  title: '确认删除',
  icon: 'error',
});
if (ok) deleteItem();

// Alert
await smooth.alert('会话将在 5 分钟后过期。', {
  title: '警告',
  icon: 'warning',
});

// Modal（自定义 React 内容）
await smooth.modal(<MyForm />, { title: '编辑资料' });
```

无需组件包裹，无需状态管理 — 直接调用并等待即可。

---

## API 参考

### `smooth.toast(message, options?)`

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'` | 视觉变体 |
| `position` | `'top-right' \| 'top-center' \| 'top-left' \| 'bottom-right' \| 'bottom-center' \| 'bottom-left'` | `'top-right'` | 屏幕位置 |
| `autoClose` | `number \| false` | `5000` | 自动关闭延迟(ms)，`false` = 不关闭 |
| `pauseOnHover` | `boolean` | `true` | 鼠标悬停时暂停计时器 |
| `pauseOnFocusLoss` | `boolean` | `true` | 窗口失去焦点时暂停 |
| `draggable` | `boolean` | `true` | 拖拽关闭 |

```tsx
smooth.toast('上传完成！', {
  type: 'success',
  position: 'bottom-right',
  autoClose: 3000,
});

// 持久 Toast（不自动关闭）
smooth.toast('后台同步进行中', {
  type: 'info',
  autoClose: false,
});
```

---

### `smooth.confirm(message, options?)` → `Promise<boolean>`

用户确认时返回 `true`，取消或点击外部时返回 `false`。

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `'Confirm'` | 对话框标题 |
| `confirmText` | `string` | `'Confirm'` | 确认按钮文字 |
| `cancelText` | `string` | `'Cancel'` | 取消按钮文字 |
| `icon` | `TypeOptions` | `'warning'` | 图标徽章变体 |

```tsx
const confirmed = await smooth.confirm('确定要删除这条记录吗？', {
  title: '删除项目',
  confirmText: '删除',
  cancelText: '保留',
  icon: 'error',
});

if (confirmed) {
  await deleteItem();
  smooth.toast('已删除。', { type: 'success' });
}
```

---

### `smooth.alert(message, options?)` → `Promise<void>`

用户点击确定后 resolve。

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `'Notice'` | 对话框标题 |
| `okText` | `string` | `'OK'` | 按钮文字 |
| `icon` | `TypeOptions` | `'info'` | 图标徽章变体 |

```tsx
await smooth.alert('您的更改已保存。', {
  title: '保存成功',
  icon: 'success',
  okText: '好的',
});
// 用户关闭对话框后在此继续执行
```

---

### `smooth.modal(component, options?)` → `Promise<unknown>`

在模态框内渲染任意 React 节点。模态框关闭后 resolve。

| 选项 | 类型 | 说明 |
|------|------|------|
| `title` | `string` | 模态框头部标题 |

```tsx
function EditForm({ onSave }: { onSave: (data: FormData) => void }) {
  return <form>...</form>;
}

await smooth.modal(<EditForm />, { title: '编辑资料' });
```

按 **ESC** 或点击背景遮罩即可关闭。

---

### `<SmoothProvider>` Props

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `defaultPosition` | `Position` | `'top-right'` | 默认 Toast 位置 |
| `defaultAutoClose` | `number \| false` | `5000` | 默认自动关闭延迟 |
| `defaultTheme` | `string` | `'dark'` | 主题令牌 |

```tsx
<SmoothProvider
  defaultPosition="bottom-right"
  defaultAutoClose={4000}
>
  <App />
</SmoothProvider>
```

---

## 设计系统

smooth-notification 内置 **Nocturne** 设计系统 — 以深空界面与生物荧光强调色构建的暗黑奢华美学。

### CSS 自定义属性

在 `:root` 上覆盖任意设计令牌以实现全局自定义：

```css
:root {
  /* 界面层 */
  --sn-void:    #07070e;   /* 最深背景 */
  --sn-abyss:   #0c0c1a;   /* 卡片背景 */

  /* 强调色 */
  --sn-success: #10e8a4;
  --sn-error:   #ff6b8a;
  --sn-warning: #ffb547;
  --sn-info:    #a78bfa;

  /* 几何 */
  --sn-radius:  14px;
  --sn-font:    'Instrument Sans', system-ui, sans-serif;
}
```

### 单条 Toast 强调色注入

`--accent` 与 `--accent-bg` CSS 变量通过 `style` prop 逐条注入，无需额外类名即可为每种类型应用对应颜色：

```
success → --accent: #10e8a4 / --accent-bg: rgba(16, 232, 164, 0.13)
error   → --accent: #ff6b8a / --accent-bg: rgba(255, 107, 138, 0.13)
warning → --accent: #ffb547 / --accent-bg: rgba(255, 181, 71, 0.13)
info    → --accent: #a78bfa / --accent-bg: rgba(167, 139, 250, 0.13)
```

---

## TypeScript

开箱即用，完整 TypeScript 支持。

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

## 直接使用组件

如需更细粒度的控制，所有组件均可单独导入：

```tsx
import { Toast, Modal, Confirm, Alert, ToastContainer } from 'smooth-notification';

// 自行渲染确认对话框
<Confirm
  isOpen={open}
  message="要删除这个项目吗？"
  title="确认"
  onConfirm={() => { setOpen(false); handleDelete(); }}
  onCancel={() => setOpen(false)}
/>
```

---

## SCSS 源文件

如果您使用 SCSS 并希望在源码层面进行自定义，可以直接导入原始样式而非编译后的 CSS：

```scss
// 在主 SCSS 入口文件中
@import 'smooth-notification/src/styles/smooth';

// 在导入前覆盖变量
:root {
  --sn-radius: 10px;
}
```

---

## 动画参考

| 关键帧 | 时长 | 缓动函数 | 用途 |
|--------|------|----------|------|
| `sn-toastIn` | 0.55s | `cubic-bezier(0.34, 1.32, 0.64, 1)` | Toast 入场 |
| `sn-toastOut` | 0.42s | `cubic-bezier(0.4, 0, 0.8, 1)` | Toast 退场 |
| `sn-dialogIn` | 0.48–0.50s | `cubic-bezier(0.34, 1.3–1.4, 0.64, 1)` | 模态框 / 对话框入场 |
| `sn-dialogOut` | 0.30s | `cubic-bezier(0.4, 0, 0.8, 1)` | 模态框 / 对话框退场 |
| `sn-iconPop` | 0.52s + 0.08s 延迟 | `cubic-bezier(0.34, 1.4, 0.64, 1)` | 对话框图标徽章 |
| `sn-overlayIn/Out` | 0.28–0.30s | `ease` | 背景遮罩淡入淡出 |

---

## 浏览器支持

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| 88+ | 89+ | 15+ | 88+ |

玻璃拟态效果依赖 `backdrop-filter` 支持。在不支持的浏览器中会优雅降级。

---

## 许可证

MIT © [ftery0](https://github.com/ftery0)
