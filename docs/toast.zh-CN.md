**Language:** [English](toast.md) | [한국어](toast.ko.md) | **简体中文**

---

# Toast

> [← 返回 README](../README.zh-CN.md)

从屏幕边缘滑入的一次性通知，带有弹簧超调动画效果。

---

## 基本用法

```tsx
import { smooth } from 'smooth-notification';

smooth.toast('Hello world!');
smooth.toast('已保存！', { type: 'success' });
smooth.toast('出现错误。', { type: 'error' });
smooth.toast('请注意。', { type: 'warning' });
smooth.toast('仅供参考。', { type: 'info' });
```

---

## 选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'` | 视觉变体 — 控制图标和强调色 |
| `position` | `Position` | `'top-right'` | Toast 在屏幕上的显示位置 |
| `autoClose` | `number \| false` | `5000` | 自动关闭前的毫秒数。传入 `false` 则永久显示 |
| `pauseOnHover` | `boolean` | `true` | 鼠标悬停在 Toast 上时暂停自动关闭倒计时 |
| `pauseOnFocusLoss` | `boolean` | `true` | 浏览器窗口失去焦点时暂停倒计时 |
| `draggable` | `boolean` | `true` | 允许通过拖拽将 Toast 滑出屏幕来关闭它 |

---

## 位置

共有六个可用位置。Toast 堆栈从锚点向内增长。

```tsx
smooth.toast('右上角',   { position: 'top-right' });     // 默认
smooth.toast('顶部居中', { position: 'top-center' });
smooth.toast('左上角',   { position: 'top-left' });
smooth.toast('右下角',   { position: 'bottom-right' });
smooth.toast('底部居中', { position: 'bottom-center' });
smooth.toast('左下角',   { position: 'bottom-left' });
```

可在 `<SmoothProvider>` 上一次性设置所有 Toast 的默认位置：

```tsx
<SmoothProvider defaultPosition="bottom-right">
  <App />
</SmoothProvider>
```

---

## 自动关闭

```tsx
// 2 秒后关闭
smooth.toast('快速提示', { autoClose: 2000 });

// 永不自动关闭 — 用户需拖拽或手动关闭
smooth.toast('后台同步中', {
  type: 'info',
  autoClose: false,
});
```

Toast 底部的进度条可视化显示剩余时间。若启用了相应选项，它会在悬停和窗口失焦时暂停。

---

## 拖拽关闭

当 `draggable: true`（默认值）时，用户可以水平拖拽 Toast 来关闭它。Toast 在移动时会逐渐淡出，若未达到拖拽阈值则弹回原位。

```tsx
// 禁用拖拽
smooth.toast('不可拖拽', { draggable: false });
```

---

## React 内容

`message` 接受任意 React 节点：

```tsx
smooth.toast(
  <span>
    文件 <strong>report.pdf</strong> 上传成功。
  </span>,
  { type: 'success' }
);
```

---

## 类型强调色

每个 `type` 会内联注入 CSS 变量 `--accent` 和 `--accent-bg`：

| 类型 | 强调色 | 背景色 |
|------|--------|--------|
| `success` | `#10e8a4` | `rgba(16, 232, 164, 0.13)` |
| `error` | `#ff6b8a` | `rgba(255, 107, 138, 0.13)` |
| `warning` | `#ffb547` | `rgba(255, 181, 71, 0.13)` |
| `info` | `#a78bfa` | `rgba(167, 139, 250, 0.13)` |
| `default` | `rgba(237,237,250,0.28)` | `rgba(255,255,255,0.08)` |

---

## 动画

Toast 入场时使用弹簧超调关键帧，退场时使用快速缓出效果。

| 事件 | 关键帧 | 时长 | 缓动函数 |
|------|--------|------|----------|
| 入场 | `sn-toastIn` | `0.55s` | `cubic-bezier(0.34, 1.32, 0.64, 1)` |
| 退场 | `sn-toastOut` | `0.42s` | `cubic-bezier(0.4, 0, 0.8, 1)` |
| 进度条 | `sn-progress` | `autoClose` 的值 | `linear` |

```
sn-toastIn 关键帧：
  0%   → translateX(calc(100% + 32px)) scale(0.86)  opacity: 0
  55%  → translateX(-12px) scale(1.02)               opacity: 1  ← 超调
  75%  → translateX(5px) scale(0.99)
  100% → translateX(0) scale(1)                      opacity: 1
```

---

## CSS 类名

| 类名 | 描述 |
|------|------|
| `.sn-toasts` | 固定定位容器 |
| `.sn-toasts--{position}` | 位置修饰符（例如 `--top-right`） |
| `.sn-toast` | 单个 Toast 卡片 |
| `.sn-toast.is-exiting` | 退场动画期间应用 |
| `.sn-toast__accent` | 左侧色条 |
| `.sn-toast__body` | 内容行（图标 + 消息 + 关闭按钮） |
| `.sn-toast__icon` | 圆形图标徽章 |
| `.sn-toast__msg` | 消息文本 |
| `.sn-toast__close` | 关闭按钮 |
| `.sn-toast__bar` | 进度条 |
| `.sn-toast__bar.is-paused` | 暂停状态 |
