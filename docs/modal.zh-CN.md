**Language:** [English](modal.md) | [한국어](modal.ko.md) | **简体中文**

---

# Modal（模态框）

> [← 返回 README](../README.zh-CN.md)

一个基于 Promise 的模态框，可渲染任意 React 内容。当模态框关闭时（通过 ESC 键、点击背景遮罩或内置关闭按钮）Promise 将会 resolve。

---

## 基本用法

```tsx
import { smooth } from 'smooth-notification';

await smooth.modal(
  <p>Any React content goes here.</p>,
  { title: 'My Modal' }
);

// 模态框关闭后继续执行
```

---

## 选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | — | 标题栏文字。若省略，标题栏仍会渲染 |
| `component` | `React.ReactNode` | — | 渲染在模态框主体区域内的内容（第一个参数） |

---

## 示例

### 信息模态框

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

### 模态框内的表单

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

// 使用方式
const [closeModal, setCloseModal] = useState<(() => void) | null>(null);

await smooth.modal(
  <ProfileForm onClose={() => closeModal?.()} />,
  { title: 'Edit Profile' }
);
```

### 图片预览

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

## 关闭模态框

| 操作 | 行为 |
|------|------|
| 点击关闭按钮（`×`） | resolve Promise，并以退出动画卸载组件 |
| 按下 `ESC` 键 | resolve Promise，并以退出动画卸载组件 |
| 点击背景遮罩 | resolve Promise，并以退出动画卸载组件 |

---

## 布局结构

```
┌─────────────────────────────────────┐  ← .sn-overlay（背景遮罩模糊）
│  ┌───────────────────────────────┐  │
│  │  Title                     ×  │  │  ← .sn-modal__head
│  ├───────────────────────────────┤  │
│  │                               │  │
│  │  { children }                 │  │  ← .sn-modal__body
│  │                               │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │  { footer }             │  │  │  ← .sn-modal__footer（可选）
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

最大宽度：`520px`。内容溢出时垂直滚动。

---

## 动画

| 事件 | 关键帧 | 持续时间 | 缓动函数 |
|------|--------|----------|----------|
| 遮罩进入 | `sn-overlayIn` | `0.28s` | `ease` |
| 模态框进入 | `sn-dialogIn` | `0.48s` | `cubic-bezier(0.34, 1.3, 0.64, 1)` |
| 模态框退出 | `sn-dialogOut` | `0.30s` | `cubic-bezier(0.4, 0, 0.8, 1)` |
| 遮罩退出 | `sn-overlayOut` | `0.30s` | `ease` |

---

## CSS 类名

| 类名 | 说明 |
|------|------|
| `.sn-overlay` | 全屏背景遮罩（`backdrop-filter: blur(12px)`） |
| `.sn-modal` | 模态框卡片（最大宽度 520px） |
| `.sn-modal.is-opening` | 进入动画状态 |
| `.sn-modal.is-closing` | 退出动画状态 |
| `.sn-modal__head` | 标题栏（标题 + 关闭按钮） |
| `.sn-modal__title` | 标题栏文字 |
| `.sn-modal__x` | 关闭按钮 |
| `.sn-modal__body` | 内容区域 |
| `.sn-modal__footer` | 底部区域（渲染在 body 内部） |

---

## 直接使用组件

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
