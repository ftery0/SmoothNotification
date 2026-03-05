**Language:** [English](confirm.md) | **한국어** | [简体中文](confirm.zh-CN.md)

---

# Confirm

> [← README로 돌아가기](../README.ko.md)

Promise 기반 확인 다이얼로그입니다. 사용자가 확인하면 `true`를, 취소하면 `false`를 반환합니다 — 콜백도, 상태도 필요 없이 그냥 `await`만 하면 됩니다.

---

## 기본 사용법

```tsx
import { smooth } from 'smooth-notification';

const ok = await smooth.confirm('정말 진행하시겠습니까?');

if (ok) {
  // 사용자가 확인 버튼을 클릭
} else {
  // 사용자가 취소 버튼 또는 배경을 클릭
}
```

---

## 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|--------|------|---------|-------------|
| `title` | `string` | `'Confirm'` | 다이얼로그 제목 |
| `message` | `React.ReactNode` | — | 본문 텍스트 (첫 번째 인수) |
| `confirmText` | `string` | `'Confirm'` | 확인 버튼 레이블 |
| `cancelText` | `string` | `'Cancel'` | 취소 버튼 레이블 |
| `icon` | `TypeOptions` | `'warning'` | 아이콘 배지 변형 |

---

## 예시

### 삭제 확인

```tsx
const confirmed = await smooth.confirm(
  '이 작업은 되돌릴 수 없습니다. 모든 관련 데이터가 영구적으로 삭제됩니다.',
  {
    title: '계정 삭제',
    confirmText: '영구 삭제',
    cancelText: '계정 유지',
    icon: 'error',
  }
);

if (confirmed) {
  await deleteAccount();
  smooth.toast('계정이 삭제되었습니다.', { type: 'success' });
}
```

### 결과 피드백이 있는 파괴적 작업

```tsx
async function handlePublish() {
  const ok = await smooth.confirm('이 게시물을 모든 구독자에게 게시하시겠습니까?', {
    title: '게시물 발행',
    confirmText: '발행',
    icon: 'info',
  });

  if (!ok) return;

  try {
    await publishPost();
    smooth.toast('게시물이 발행되었습니다!', { type: 'success' });
  } catch {
    smooth.toast('발행에 실패했습니다.', { type: 'error' });
  }
}
```

### 메시지에 React 콘텐츠 사용

```tsx
const ok = await smooth.confirm(
  <span>
    프로젝트에서 <strong>{user.name}</strong>을(를) 제거하시겠습니까?
  </span>,
  { title: '멤버 제거', icon: 'warning' }
);
```

---

## 아이콘 변형

아이콘 배지의 색상은 `icon` 옵션에 따라 변경됩니다:

| 값 | 색상 | 사용 사례 |
|-------|-------|----------|
| `'error'` | `#ff6b8a` (붉은 분홍) | 파괴적 / 되돌릴 수 없는 작업 |
| `'warning'` | `#ffb547` (앰버) | 주의가 필요한 경우 |
| `'success'` | `#10e8a4` (초록) | 긍정적 확인 |
| `'info'` | `#a78bfa` (보라) | 정보 제공 |
| `'default'` | muted | 중립 |

---

## 동작 방식

- **배경**을 클릭하면 `false`로 처리됩니다 (취소와 동일)
- **ESC** 키를 누르면 `false`로 처리됩니다
- 여러 confirm을 동시에 띄울 수 있으며, 순서대로 쌓입니다

---

## 애니메이션

| 이벤트 | 키프레임 | 지속 시간 | 이징 |
|-------|----------|----------|--------|
| 오버레이 진입 | `sn-overlayIn` | `0.28s` | `ease` |
| 다이얼로그 진입 | `sn-dialogIn` | `0.50s` | `cubic-bezier(0.34, 1.4, 0.64, 1)` |
| 아이콘 팝 | `sn-iconPop` | `0.52s` + `0.08s` 딜레이 | `cubic-bezier(0.34, 1.4, 0.64, 1)` |
| 다이얼로그 종료 | `sn-dialogOut` | `0.30s` | `cubic-bezier(0.4, 0, 0.8, 1)` |
| 오버레이 종료 | `sn-overlayOut` | `0.30s` | `ease` |

---

## CSS 클래스

| 클래스 | 설명 |
|-------|-------------|
| `.sn-overlay` | 블러 효과가 있는 전체 화면 배경 |
| `.sn-overlay.is-opening` | 진입 애니메이션 상태 |
| `.sn-overlay.is-closing` | 종료 애니메이션 상태 |
| `.sn-dialog` | 다이얼로그 카드 |
| `.sn-dialog.is-opening` | 진입 애니메이션 상태 |
| `.sn-dialog.is-closing` | 종료 애니메이션 상태 |
| `.sn-dialog__icon` | 아이콘 배지 래퍼 |
| `.sn-dialog__icon--danger` | 붉은 분홍 변형 |
| `.sn-dialog__icon--warning` | 앰버 변형 |
| `.sn-dialog__icon--success` | 초록 변형 |
| `.sn-dialog__icon--info` | 보라 변형 |
| `.sn-dialog__title` | 제목 텍스트 |
| `.sn-dialog__message` | 본문 텍스트 |
| `.sn-dialog__actions` | 버튼 행 |

---

## 컴포넌트 직접 사용

```tsx
import { Confirm } from 'smooth-notification';

function MyPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>삭제</button>
      <Confirm
        isOpen={open}
        message="이 작업은 되돌릴 수 없습니다."
        title="항목 삭제"
        confirmText="삭제"
        cancelText="취소"
        icon="error"
        onConfirm={() => { setOpen(false); handleDelete(); }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
```
