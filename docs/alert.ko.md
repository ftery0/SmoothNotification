**Language:** [English](alert.md) | **한국어** | [简体中文](alert.zh-CN.md)

---

# Alert

> [← README로 돌아가기](../README.ko.md)

사용자가 확인하면 `void`로 처리되는 Promise 기반 알림 다이얼로그입니다. 사용자가 메시지를 읽을 때까지 실행을 차단해야 할 때 사용합니다.

---

## 기본 사용법

```tsx
import { smooth } from 'smooth-notification';

await smooth.alert('세션이 만료되었습니다. 다시 로그인해 주세요.');

// 사용자가 확인 버튼을 클릭한 후에만 실행이 계속됩니다
redirectToLogin();
```

---

## 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|--------|------|---------|-------------|
| `title` | `string` | `'Notice'` | 다이얼로그 제목 |
| `message` | `React.ReactNode` | — | 본문 텍스트 (첫 번째 인수) |
| `okText` | `string` | `'OK'` | 확인 버튼 레이블 |
| `icon` | `TypeOptions` | `'info'` | 아이콘 배지 변형 |

---

## 예시

### 세션 만료 알림

```tsx
await smooth.alert('세션이 2분 후에 만료됩니다. 작업 내용을 저장해 주세요.', {
  title: '세션 경고',
  icon: 'warning',
  okText: '알겠습니다',
});
```

### 성공 확인

```tsx
await smooth.alert('보고서가 제출되었으며 24시간 이내에 검토됩니다.', {
  title: '제출 완료',
  icon: 'success',
  okText: '좋아요',
});
```

### 오류 알림

```tsx
await smooth.alert(
  '결제를 처리할 수 없습니다. 카드 정보를 확인하고 다시 시도해 주세요.',
  {
    title: '결제 실패',
    icon: 'error',
    okText: '확인',
  }
);
```

### React 콘텐츠

```tsx
await smooth.alert(
  <span>
    <strong>{fileName}</strong>을(를) 업로드할 수 없습니다. 최대 파일 크기는 10MB입니다.
  </span>,
  { title: '업로드 실패', icon: 'error' }
);
```

---

## 아이콘 변형

| 값 | 색상 | 사용 사례 |
|-------|-------|----------|
| `'info'` | `#a78bfa` (보라) | 일반 공지 |
| `'warning'` | `#ffb547` (앰버) | 주의 메시지 |
| `'error'` | `#ff6b8a` (붉은 분홍) | 오류 / 실패 알림 |
| `'success'` | `#10e8a4` (초록) | 완료 / 성공 |
| `'default'` | muted | 중립 |

---

## Alert vs. Confirm

| | `smooth.alert` | `smooth.confirm` |
|--|---------------|-----------------|
| 버튼 | 확인만 | 확인 + 취소 |
| 반환값 | `Promise<void>` | `Promise<boolean>` |
| 사용 시점 | 사용자가 확인해야 할 때 | 사용자가 결정해야 할 때 |

---

## 애니메이션

| 이벤트 | 키프레임 | 지속 시간 | 이징 |
|-------|----------|----------|--------|
| 오버레이 진입 | `sn-overlayIn` | `0.28s` | `ease` |
| 다이얼로그 진입 | `sn-dialogIn` | `0.50s` | `cubic-bezier(0.34, 1.4, 0.64, 1)` |
| 아이콘 팝 | `sn-iconPop` | `0.52s` + `0.08s` 딜레이 | `cubic-bezier(0.34, 1.4, 0.64, 1)` |
| 다이얼로그 종료 | `sn-dialogOut` | `0.30s` | `cubic-bezier(0.4, 0, 0.8, 1)` |

---

## 컴포넌트 직접 사용

```tsx
import { Alert } from 'smooth-notification';

function MyPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>공지 보기</button>
      <Alert
        isOpen={open}
        message="자정에 유지보수가 시작됩니다."
        title="정기 유지보수"
        icon="warning"
        okText="확인"
        onOk={() => setOpen(false)}
      />
    </>
  );
}
```
