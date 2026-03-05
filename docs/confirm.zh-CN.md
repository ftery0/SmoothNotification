**Language:** [English](confirm.md) | [한국어](confirm.ko.md) | **简体中文**

---

# Confirm

> [← 返回 README](../README.zh-CN.md)

基于 Promise 的确认对话框。用户确认时返回 `true`，取消时返回 `false` — 无需回调，无需状态管理，只需 `await`。

---

## 基本用法

```tsx
import { smooth } from 'smooth-notification';

const ok = await smooth.confirm('Are you sure?');

if (ok) {
  // 用户点击了确认
} else {
  // 用户点击了取消或背景遮罩
}
```

---

## 选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `title` | `string` | `'Confirm'` | 对话框标题 |
| `message` | `React.ReactNode` | — | 主体文本（第一个参数） |
| `confirmText` | `string` | `'Confirm'` | 确认按钮的标签文字 |
| `cancelText` | `string` | `'Cancel'` | 取消按钮的标签文字 |
| `icon` | `TypeOptions` | `'warning'` | 图标徽章变体 |

---

## 示例

### 删除确认

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

### 破坏性操作并反馈结果

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

### 消息中使用 React 内容

```tsx
const ok = await smooth.confirm(
  <span>
    Remove <strong>{user.name}</strong> from the project?
  </span>,
  { title: 'Remove Member', icon: 'warning' }
);
```

---

## 图标变体

图标徽章的颜色根据 `icon` 选项而变化：

| 值 | 颜色 | 适用场景 |
|----|------|----------|
| `'error'` | `#ff6b8a`（红粉色） | 破坏性 / 不可逆操作 |
| `'warning'` | `#ffb547`（琥珀色） | 需要谨慎操作 |
| `'success'` | `#10e8a4`（绿色） | 积极的确认操作 |
| `'info'` | `#a78bfa`（紫色） | 信息性内容 |
| `'default'` | 低调色 | 中性提示 |

---

## 行为

- 点击**背景遮罩**时解析为 `false`（与取消相同）
- 按下 **ESC** 键时解析为 `false`
- 支持多个同时显示的确认框 — 它们按顺序堆叠

---

## 动画

| 事件 | 关键帧 | 时长 | 缓动函数 |
|------|--------|------|----------|
| 遮罩入场 | `sn-overlayIn` | `0.28s` | `ease` |
| 对话框入场 | `sn-dialogIn` | `0.50s` | `cubic-bezier(0.34, 1.4, 0.64, 1)` |
| 图标弹出 | `sn-iconPop` | `0.52s` + `0.08s` 延迟 | `cubic-bezier(0.34, 1.4, 0.64, 1)` |
| 对话框退场 | `sn-dialogOut` | `0.30s` | `cubic-bezier(0.4, 0, 0.8, 1)` |
| 遮罩退场 | `sn-overlayOut` | `0.30s` | `ease` |

---

## CSS 类名

| 类名 | 描述 |
|------|------|
| `.sn-overlay` | 带模糊效果的全屏背景遮罩 |
| `.sn-overlay.is-opening` | 入场动画状态 |
| `.sn-overlay.is-closing` | 退场动画状态 |
| `.sn-dialog` | 对话框卡片 |
| `.sn-dialog.is-opening` | 入场动画状态 |
| `.sn-dialog.is-closing` | 退场动画状态 |
| `.sn-dialog__icon` | 图标徽章容器 |
| `.sn-dialog__icon--danger` | 红粉色变体 |
| `.sn-dialog__icon--warning` | 琥珀色变体 |
| `.sn-dialog__icon--success` | 绿色变体 |
| `.sn-dialog__icon--info` | 紫色变体 |
| `.sn-dialog__title` | 标题文本 |
| `.sn-dialog__message` | 正文文本 |
| `.sn-dialog__actions` | 按钮行 |

---

## 直接使用组件

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
