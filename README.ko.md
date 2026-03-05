**Language:** [English](README.md) | **한국어** | [简体中文](README.zh-CN.md)

---

# smooth-notification

> React를 위한 부드러운 토스트, 모달, 컨펌 & 얼럿 — **Nocturne** 디자인 시스템 기반.

글라스모피즘 서피스 · 스프링 물리 애니메이션 · Promise 기반 다이얼로그 · Zero dependencies

---

## 미리보기

| Toast | Confirm | Alert | Modal |
|-------|---------|-------|-------|
| 스프링 오버슈트로 우측에서 슬라이드인 | `Promise<boolean>` 반환 | `Promise<void>` 반환 | 임의의 React 컨텐츠 렌더링 |

---

## 설치

```bash
npm install smooth-notification
# 또는
yarn add smooth-notification
```

> **Peer dependencies:** React 18+, React DOM 18+

---

## 빠른 시작

### 1. 앱을 `SmoothProvider`로 감싸기

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

### 2. 어디서든 `smooth.*` 호출

```tsx
import { smooth } from 'smooth-notification';

// 토스트
smooth.toast('저장되었습니다!', { type: 'success' });

// 컨펌 (결과를 await)
const ok = await smooth.confirm('이 항목을 삭제할까요?', {
  title: '삭제 확인',
  icon: 'error',
});
if (ok) deleteItem();

// 얼럿
await smooth.alert('세션이 5분 후 만료됩니다.', {
  title: '경고',
  icon: 'warning',
});

// 모달 (커스텀 React 컨텐츠)
await smooth.modal(<MyForm />, { title: '프로필 수정' });
```

컴포넌트 래핑도, 상태 관리도 필요 없어요 — 그냥 호출하고 기다리면 됩니다.

---

## API 레퍼런스

### `smooth.toast(message, options?)`

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'` | 시각적 변형 |
| `position` | `'top-right' \| 'top-center' \| 'top-left' \| 'bottom-right' \| 'bottom-center' \| 'bottom-left'` | `'top-right'` | 화면 위치 |
| `autoClose` | `number \| false` | `5000` | 자동 닫힘 딜레이(ms). `false` = 유지 |
| `pauseOnHover` | `boolean` | `true` | 마우스 오버 시 타이머 일시정지 |
| `pauseOnFocusLoss` | `boolean` | `true` | 창 포커스 잃을 때 일시정지 |
| `draggable` | `boolean` | `true` | 드래그로 닫기 |

```tsx
smooth.toast('업로드 완료!', {
  type: 'success',
  position: 'bottom-right',
  autoClose: 3000,
});

// 유지되는 토스트 (자동 닫힘 없음)
smooth.toast('백그라운드 동기화 중', {
  type: 'info',
  autoClose: false,
});
```

---

### `smooth.confirm(message, options?)` → `Promise<boolean>`

사용자가 확인하면 `true`, 취소하거나 외부 클릭 시 `false` 반환.

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `string` | `'Confirm'` | 다이얼로그 제목 |
| `confirmText` | `string` | `'Confirm'` | 확인 버튼 레이블 |
| `cancelText` | `string` | `'Cancel'` | 취소 버튼 레이블 |
| `icon` | `TypeOptions` | `'warning'` | 아이콘 배지 변형 |

```tsx
const confirmed = await smooth.confirm('정말 삭제하시겠습니까?', {
  title: '항목 삭제',
  confirmText: '삭제',
  cancelText: '유지',
  icon: 'error',
});

if (confirmed) {
  await deleteItem();
  smooth.toast('삭제되었습니다.', { type: 'success' });
}
```

---

### `smooth.alert(message, options?)` → `Promise<void>`

사용자가 OK를 클릭하면 resolve.

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `string` | `'Notice'` | 다이얼로그 제목 |
| `okText` | `string` | `'OK'` | 버튼 레이블 |
| `icon` | `TypeOptions` | `'info'` | 아이콘 배지 변형 |

```tsx
await smooth.alert('변경사항이 저장되었습니다.', {
  title: '저장 완료',
  icon: 'success',
  okText: '확인',
});
// 다이얼로그를 닫으면 여기서 계속 실행됩니다
```

---

### `smooth.modal(component, options?)` → `Promise<unknown>`

모달 안에 임의의 React 노드를 렌더링합니다. 모달이 닫히면 resolve.

| 옵션 | 타입 | 설명 |
|------|------|------|
| `title` | `string` | 모달 헤더 제목 |

```tsx
function EditForm({ onSave }: { onSave: (data: FormData) => void }) {
  return <form>...</form>;
}

await smooth.modal(<EditForm />, { title: '프로필 수정' });
```

**ESC** 키를 누르거나 배경을 클릭하면 닫힙니다.

---

### `<SmoothProvider>` Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `defaultPosition` | `Position` | `'top-right'` | 기본 토스트 위치 |
| `defaultAutoClose` | `number \| false` | `5000` | 기본 자동 닫힘 딜레이 |
| `defaultTheme` | `string` | `'dark'` | 테마 토큰 |

```tsx
<SmoothProvider
  defaultPosition="bottom-right"
  defaultAutoClose={4000}
>
  <App />
</SmoothProvider>
```

---

## 디자인 시스템

smooth-notification은 **Nocturne** 디자인 시스템을 내장하고 있습니다 — 심우주 서피스와 생물발광 액센트를 기반으로 한 다크 럭셔리 미학.

### CSS 커스텀 프로퍼티

`:root`에서 토큰을 오버라이드하여 전역 커스터마이징:

```css
:root {
  /* 서피스 */
  --sn-void:    #07070e;   /* 가장 어두운 배경 */
  --sn-abyss:   #0c0c1a;   /* 카드 배경 */

  /* 액센트 색상 */
  --sn-success: #10e8a4;
  --sn-error:   #ff6b8a;
  --sn-warning: #ffb547;
  --sn-info:    #a78bfa;

  /* 지오메트리 */
  --sn-radius:  14px;
  --sn-font:    'Instrument Sans', system-ui, sans-serif;
}
```

### 토스트별 액센트 주입

`--accent`와 `--accent-bg` CSS 변수는 `style` prop을 통해 토스트마다 개별 주입되어, 추가 클래스 없이 타입별 색상을 적용합니다:

```
success → --accent: #10e8a4 / --accent-bg: rgba(16, 232, 164, 0.13)
error   → --accent: #ff6b8a / --accent-bg: rgba(255, 107, 138, 0.13)
warning → --accent: #ffb547 / --accent-bg: rgba(255, 181, 71, 0.13)
info    → --accent: #a78bfa / --accent-bg: rgba(167, 139, 250, 0.13)
```

---

## TypeScript

완전한 TypeScript 지원을 기본으로 제공합니다.

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

## 컴포넌트 직접 사용

저수준 제어가 필요하다면 모든 컴포넌트를 개별로 import할 수 있습니다:

```tsx
import { Toast, Modal, Confirm, Alert, ToastContainer } from 'smooth-notification';

// 직접 컨펌 다이얼로그 렌더링
<Confirm
  isOpen={open}
  message="이 항목을 삭제할까요?"
  title="확인"
  onConfirm={() => { setOpen(false); handleDelete(); }}
  onCancel={() => setOpen(false)}
/>
```

---

## SCSS 소스

SCSS를 사용하고 소스 레벨에서 커스터마이징하고 싶다면, 컴파일된 CSS 대신 원본 스타일시트를 import하세요:

```scss
// 메인 SCSS 진입점에서
@import 'smooth-notification/src/styles/smooth';

// import 전에 변수 오버라이드
:root {
  --sn-radius: 10px;
}
```

---

## 애니메이션 레퍼런스

| 키프레임 | 지속시간 | 이징 | 사용처 |
|----------|----------|------|--------|
| `sn-toastIn` | 0.55s | `cubic-bezier(0.34, 1.32, 0.64, 1)` | 토스트 등장 |
| `sn-toastOut` | 0.42s | `cubic-bezier(0.4, 0, 0.8, 1)` | 토스트 퇴장 |
| `sn-dialogIn` | 0.48–0.50s | `cubic-bezier(0.34, 1.3–1.4, 0.64, 1)` | 모달 / 다이얼로그 등장 |
| `sn-dialogOut` | 0.30s | `cubic-bezier(0.4, 0, 0.8, 1)` | 모달 / 다이얼로그 퇴장 |
| `sn-iconPop` | 0.52s + 0.08s 딜레이 | `cubic-bezier(0.34, 1.4, 0.64, 1)` | 다이얼로그 아이콘 배지 |
| `sn-overlayIn/Out` | 0.28–0.30s | `ease` | 배경 페이드 |

---

## 브라우저 지원

| Chrome | Firefox | Safari | Edge |
|--------|---------|--------|------|
| 88+ | 89+ | 15+ | 88+ |

글라스모피즘 효과를 위해 `backdrop-filter` 지원이 필요합니다. 미지원 브라우저에서는 자연스럽게 폴백됩니다.

---

## 라이선스

MIT © [ftery0](https://github.com/ftery0)
