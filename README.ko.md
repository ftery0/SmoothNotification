**Language:** [English](README.md) | **한국어** | [简体中文](README.zh-CN.md)

---

<div align="center">

# smooth-notification

**React를 위한 Toast · Modal · Confirm · Alert**

[![npm version](https://img.shields.io/npm/v/smooth-notification.svg)](https://www.npmjs.com/package/smooth-notification)
[![license](https://img.shields.io/npm/l/smooth-notification.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./docs/contributing.md)

<!-- 데모 GIF -->

</div>

---

## 설치

```bash
npm install smooth-notification
# 또는
yarn add smooth-notification
```

## 세팅

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

## 사용법

```tsx
import { smooth } from 'smooth-notification';

// Toast
smooth.toast('저장되었습니다!', { type: 'success' });

// Confirm — Promise<boolean> 반환
const ok = await smooth.confirm('삭제할까요?', { icon: 'error' });

// Alert — Promise<void> 반환
await smooth.alert('세션이 곧 만료됩니다.', { icon: 'warning' });

// Modal — 임의의 React 컨텐츠 렌더링
await smooth.modal(<MyForm />, { title: '프로필 수정' });
```

컴포넌트 래핑도, 상태 관리도 필요 없어요 — 어디서든 호출하고 결과를 await.

---

## 문서

| | |
|--|--|
| 🔔 [Toast](./docs/toast.ko.md) | 옵션, 위치, 애니메이션, 드래그 동작 |
| ✅ [Confirm](./docs/confirm.ko.md) | Promise 기반 확인 다이얼로그 |
| ⚠️ [Alert](./docs/alert.ko.md) | Promise 기반 알림 다이얼로그 |
| 🪟 [Modal](./docs/modal.ko.md) | 임의 컨텐츠를 담는 풀 피처 모달 |
| 🎨 [Design System](./docs/design-system.ko.md) | Nocturne 토큰, SCSS, 버튼, 애니메이션 |
| 🤝 [Contributing](./docs/contributing.ko.md) | 개발 환경 세팅, 프로젝트 구조, PR 가이드 |

---

## 라이선스

[MIT](./LICENSE) © [ftery0](https://github.com/ftery0)
