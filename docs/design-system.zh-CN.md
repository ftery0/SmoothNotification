**Language:** [English](design-system.md) | [한국어](design-system.ko.md) | **简体中文**

---

# 设计系统 — Nocturne

> [← 返回 README](../README.zh-CN.md)

**Nocturne** 是驱动 smooth-notification 的设计系统。它建立在暗黑奢华美学之上：深空层次的表面色彩、生物发光的强调色，以及弹簧物理动画。

所有样式均以 CSS 自定义属性的形式表达 — 在 `:root` 级别覆盖任意 token，即可全局自定义样式，无需触及 SCSS 源文件。

---

## 色彩系统

### 表面色

| Token | 值 | 用途 |
|-------|----|------|
| `--sn-void` | `#07070e` | 页面背景 — 最深的层次 |
| `--sn-abyss` | `#0c0c1a` | 卡片 / 对话框背景 |
| `--sn-depth` | `#11111e` | 悬浮表面 |
| `--sn-surface` | `rgba(255,255,255,0.04)` | 细微填充（按钮、输入框） |
| `--sn-surface-h` | `rgba(255,255,255,0.07)` | 表面的悬停状态 |
| `--sn-border` | `rgba(255,255,255,0.07)` | 默认边框 |
| `--sn-border-h` | `rgba(255,255,255,0.14)` | 边框的悬停状态 |

### 字体排版

| Token | 值 | 用途 |
|-------|----|------|
| `--sn-text` | `#ededfa` | 主要文字 |
| `--sn-text-muted` | `rgba(237,237,250,0.5)` | 次要 / 正文文字 |
| `--sn-text-subtle` | `rgba(237,237,250,0.28)` | 禁用 / 占位文字 |

### 生物发光强调色

| Token | 值 | 用途 |
|-------|----|------|
| `--sn-success` | `#10e8a4` | 成功状态 |
| `--sn-error` | `#ff6b8a` | 错误 / 危险状态 |
| `--sn-warning` | `#ffb547` | 警告状态 |
| `--sn-info` | `#a78bfa` | 信息提示状态 |

### 强调色背景（预计算）

| Token | 值 |
|-------|----|
| `--sn-success-bg` | `rgba(16, 232, 164, 0.13)` |
| `--sn-error-bg` | `rgba(255, 107, 138, 0.13)` |
| `--sn-warning-bg` | `rgba(255, 181, 71, 0.13)` |
| `--sn-info-bg` | `rgba(167, 139, 250, 0.13)` |
| `--sn-default-bg` | `rgba(255, 255, 255, 0.08)` |

---

## 字体

| Token | 值 |
|-------|----|
| `--sn-font` | `'Instrument Sans', -apple-system, system-ui, sans-serif` |

[Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) 通过 SCSS 变量文件从 Google Fonts 加载。

---

## 几何尺寸

| Token | 值 | 用途 |
|-------|----|------|
| `--sn-radius` | `14px` | Toast、模态框、对话框卡片 |
| `--sn-radius-sm` | `9px` | 按钮、小型元素 |

---

## 阴影

| Token | 值 | 用途 |
|-------|----|------|
| `--sn-shadow-sm` | `0 2px 8px rgba(0,0,0,.35)` | 细微层次感 |
| `--sn-shadow-md` | `0 8px 32px rgba(0,0,0,.5)` | 卡片（toast） |
| `--sn-shadow-lg` | `0 24px 80px rgba(0,0,0,.65)` | 模态框 / 对话框 |
| `--sn-shadow-ring` | `0 0 0 1px rgba(255,255,255,.04)` | 细微轮廓发光 |

---

## 覆盖 Token

将以下代码粘贴到全局 CSS 或 SCSS 文件顶部，即可覆盖任意 token：

```css
:root {
  --sn-radius:  10px;           /* rounder corners */
  --sn-success: #00e096;        /* custom green */
  --sn-font:    'Inter', sans-serif;
}
```

---

## SCSS 结构

```
src/styles/
├── _variables.scss     ← 所有 CSS 自定义属性 + Google Fonts 导入
├── _animations.scss    ← @keyframes（toast、dialog、overlay、icon）
├── _toast.scss         ← .sn-toast 与 .sn-toasts 容器
├── _modal.scss         ← .sn-overlay 与 .sn-modal
├── _dialog.scss        ← .sn-dialog（Confirm 与 Alert 共用）
├── _buttons.scss       ← .sn-btn 各变体
└── smooth.scss         ← 入口文件（@import 所有子文件）
```

在项目中导入入口文件：

```scss
@import 'smooth-notification/src/styles/smooth';
```

或单独导入子文件：

```scss
@import 'smooth-notification/src/styles/variables';
@import 'smooth-notification/src/styles/animations';
@import 'smooth-notification/src/styles/toast';
```

---

## 按钮系统

smooth-notification 提供了一套按钮工具类，可在对话框和模态框内使用。

```html
<button class="sn-btn sn-btn--primary">Save</button>
<button class="sn-btn sn-btn--ghost">Cancel</button>
<button class="sn-btn sn-btn--danger">Delete</button>
<button class="sn-btn sn-btn--success">Confirm</button>
```

| 修饰符 | 外观 | 适用场景 |
|--------|------|----------|
| `--ghost` | 细微边框，柔和文字 | 次要操作 / 取消按钮 |
| `--primary` | 信息紫色填充 | 主要操作按钮（CTA） |
| `--danger` | 红粉色调 | 破坏性操作 |
| `--success` | 绿色调 | 确认性操作 |

---

## 动画参考

| 关键帧 | 持续时间 | 缓动函数 | 用途 |
|--------|----------|----------|------|
| `sn-toastIn` | `0.55s` | `cubic-bezier(0.34, 1.32, 0.64, 1)` | Toast 进入动画（弹簧超调） |
| `sn-toastOut` | `0.42s` | `cubic-bezier(0.4, 0, 0.8, 1)` | Toast 退出动画 |
| `sn-progress` | `autoClose` 毫秒 | `linear` | 进度条 scaleX |
| `sn-overlayIn` | `0.28s` | `ease` | 背景遮罩淡入 |
| `sn-overlayOut` | `0.30s` | `ease` | 背景遮罩淡出 |
| `sn-dialogIn` | `0.48–0.50s` | `cubic-bezier(0.34, 1.3–1.4, 0.64, 1)` | 模态框 / 对话框进入 |
| `sn-dialogOut` | `0.30s` | `cubic-bezier(0.4, 0, 0.8, 1)` | 模态框 / 对话框退出 |
| `sn-iconPop` | `0.52s` + `0.08s` 延迟 | `cubic-bezier(0.34, 1.4, 0.64, 1)` | 对话框图标徽章 |

---

## 玻璃拟态效果

Toast 卡片使用玻璃拟态处理：

```css
background: rgba(11, 11, 22, 0.9);
backdrop-filter: blur(24px) saturate(180%);
border: 1px solid var(--sn-border);
box-shadow: var(--sn-shadow-md), var(--sn-shadow-ring);
```

遮罩 / 背景：

```css
background: rgba(4, 4, 10, 0.75);
backdrop-filter: blur(12px);
```

> `backdrop-filter` 需要 Chrome 88+、Firefox 89+、Safari 15+ 版本支持。
