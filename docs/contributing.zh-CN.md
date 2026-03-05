**Language:** [English](contributing.md) | [한국어](contributing.ko.md) | **简体中文**

---

# 贡献指南

> [← 返回 README](../README.zh-CN.md)

欢迎各种形式的贡献 — 错误报告、功能请求、文档改进以及 Pull Request。

---

## 开发环境搭建

```bash
# 1. Fork 并克隆仓库
git clone https://github.com/your-username/smooth-notification.git
cd smooth-notification

# 2. 安装依赖
yarn install
cd playground && yarn install && cd ..

# 3. 启动 playground 开发服务器
yarn start   # → http://localhost:5173
```

playground（`/playground`）通过 Vite 别名热重载库的源代码 — 修改 `src/` 中的文件后立即生效。

---

## 项目结构

```
smooth-notification/
├── src/                              # 库源码（发布到 npm）
│   ├── core/
│   │   ├── store.ts                  # 发布/订阅事件发射器 + 开关注册表
│   │   └── smooth.ts                 # smooth.toast / modal / confirm / alert
│   ├── components/
│   │   ├── SmoothProvider.tsx        # Provider + document.body 传送门
│   │   ├── ToastContainer.tsx        # 按位置分组的 Toast 渲染器
│   │   ├── Toast.tsx                 # 拖拽 + 计时器 + 进度条
│   │   ├── Modal.tsx                 # ESC + 背景遮罩 + 弹簧动画
│   │   ├── Confirm.tsx               # Promise<boolean> 对话框
│   │   ├── Alert.tsx                 # Promise<void> 对话框
│   │   └── Icon.tsx                  # 基于类型的 SVG 图标
│   ├── hooks/
│   │   ├── useAnimatedMount.ts       # 支持退出动画的安全挂载/卸载
│   │   ├── useToast.ts               # 拖拽 + 暂停交互逻辑
│   │   └── useDynamicLayoutEffect.ts # SSR 安全的布局副作用
│   ├── styles/                       # Nocturne 设计系统（SCSS）
│   │   ├── _variables.scss
│   │   ├── _animations.scss
│   │   ├── _toast.scss
│   │   ├── _modal.scss
│   │   ├── _dialog.scss
│   │   ├── _buttons.scss
│   │   └── smooth.scss               # 入口文件
│   ├── types.ts
│   ├── utils.ts
│   └── index.ts                      # 公共 API 导出
├── playground/                       # Vite + React 演示应用
│   └── src/App.js                    # 交互式展示页面
├── cypress/                          # 组件测试
└── docs/                             # 详细文档
```

---

## 提交 Pull Request

1. **重大改动请先创建 Issue** — 在投入大量编码工作之前，先就方案达成共识。

2. **从 `main` 创建分支**：
   ```bash
   git checkout -b feat/your-feature-name
   # 或
   git checkout -b fix/issue-description
   ```

3. **进行修改。** 如果添加了新的可视元素，请更新 playground 演示，以便审阅者能够直观查看效果。

4. **运行测试：**
   ```bash
   yarn test
   ```

5. **提交**，使用规范化的提交信息：
   ```
   feat :: add loading toast variant
   fix  :: timer not resuming after focus restore
   docs :: add toast position examples
   style :: update warning accent color
   ```

6. **向 `main` 提交 PR**，包含以下内容：
   - 改动内容及原因
   - 如涉及视觉变更，附上截图或 GIF
   - 相关 Issue 的引用（如有）

---

## 报告错误

请使用 [GitHub Issues](https://github.com/ftery0/smooth-notification/issues) 并提供：

- 最小复现案例（CodeSandbox 链接或代码片段）
- React 版本、浏览器及操作系统
- 预期行为与实际行为的对比
- 控制台报错信息（如有）

---

## 代码规范

### TypeScript
- 全程启用严格模式 — 不使用 `any`，非空断言须有充分理由
- 导出函数优先显式声明返回类型
- 仅类型导入使用 `type` 关键字：`import type { ... }`

### React
- 仅使用函数式组件
- 每个文件只包含一个组件，文件名与组件名保持一致
- Props 接口命名为 `{ComponentName}Props`

### CSS / SCSS
- 所有类名以 `sn-` 为前缀
- BEM 命名规范：`.sn-block__element--modifier`
- 自定义属性定义在 `:root` 上，而非组件选择器上
- 禁止硬编码颜色值 — 始终使用 token

### 提交信息
- 遵循本仓库使用的 `type :: description` 格式
- 保持提交专注 — 每次提交只包含一个逻辑变更

---

## 路线图

计划中的功能 — 欢迎提交 PR：

- [ ] 浅色主题支持
- [ ] 每个 Toast 的自定义过渡属性
- [ ] `smooth.loading()` — 带 resolve/reject 的持久加载 Toast
- [ ] 堆叠 / 折叠 Toast 模式
- [ ] 无障碍审计（WCAG 2.1 AA）
- [ ] React Native 支持

有列表之外的想法？[提交功能请求 →](https://github.com/ftery0/smooth-notification/issues)
