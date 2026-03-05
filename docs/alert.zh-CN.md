**Language:** [English](alert.md) | [한국어](alert.ko.md) | **简体中文**

---

# Alert

> [← 返回 README](../README.zh-CN.md)

基于 Promise 的提示对话框，用户确认后解析为 `void`。当需要阻塞执行直到用户阅读完消息时使用它。

---

## 基本用法

```tsx
import { smooth } from 'smooth-notification';

await smooth.alert('Your session has expired. Please log in again.');

// 仅在用户点击确定后继续执行
redirectToLogin();
```

---

## 选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `title` | `string` | `'Notice'` | 对话框标题 |
| `message` | `React.ReactNode` | — | 主体文本（第一个参数） |
| `okText` | `string` | `'OK'` | 确定按钮的标签文字 |
| `icon` | `TypeOptions` | `'info'` | 图标徽章变体 |

---

## 示例

### 会话过期提示

```tsx
await smooth.alert('Your session will expire in 2 minutes. Please save your work.', {
  title: 'Session Warning',
  icon: 'warning',
  okText: 'Got it',
});
```

### 成功确认

```tsx
await smooth.alert('Your report has been submitted and will be reviewed within 24 hours.', {
  title: 'Submitted',
  icon: 'success',
  okText: 'Great',
});
```

### 错误通知

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

### React 内容

```tsx
await smooth.alert(
  <span>
    <strong>{fileName}</strong> could not be uploaded. Maximum file size is 10 MB.
  </span>,
  { title: 'Upload Failed', icon: 'error' }
);
```

---

## 图标变体

| 值 | 颜色 | 适用场景 |
|----|------|----------|
| `'info'` | `#a78bfa`（紫色） | 一般通知 |
| `'warning'` | `#ffb547`（琥珀色） | 警告消息 |
| `'error'` | `#ff6b8a`（红粉色） | 错误 / 失败通知 |
| `'success'` | `#10e8a4`（绿色） | 完成 / 成功 |
| `'default'` | 低调色 | 中性提示 |

---

## Alert 与 Confirm 的比较

| | `smooth.alert` | `smooth.confirm` |
|--|----------------|-----------------|
| 按钮 | 仅有确定 | 确认 + 取消 |
| 返回值 | `Promise<void>` | `Promise<boolean>` |
| 使用场景 | 用户需要确认知晓 | 用户需要做出决定 |

---

## 动画

| 事件 | 关键帧 | 时长 | 缓动函数 |
|------|--------|------|----------|
| 遮罩入场 | `sn-overlayIn` | `0.28s` | `ease` |
| 对话框入场 | `sn-dialogIn` | `0.50s` | `cubic-bezier(0.34, 1.4, 0.64, 1)` |
| 图标弹出 | `sn-iconPop` | `0.52s` + `0.08s` 延迟 | `cubic-bezier(0.34, 1.4, 0.64, 1)` |
| 对话框退场 | `sn-dialogOut` | `0.30s` | `cubic-bezier(0.4, 0, 0.8, 1)` |

---

## 直接使用组件

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
