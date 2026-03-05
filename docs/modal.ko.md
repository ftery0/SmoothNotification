**Language:** [English](modal.md) | **한국어** | [简体中文](modal.zh-CN.md)

---

# Modal

> [← README로 돌아가기](../README.ko.md)

임의의 React 콘텐츠를 렌더링하는 Promise 기반 모달입니다. ESC 키 입력, 배경 클릭, 또는 내장 닫기 버튼을 통해 모달이 닫히면 Promise가 resolve됩니다.

---

## 기본 사용법

```tsx
import { smooth } from 'smooth-notification';

await smooth.modal(
  <p>Any React content goes here.</p>,
  { title: 'My Modal' }
);

// 모달이 닫힌 후 이 코드가 실행됩니다
```

---

## 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `string` | — | 헤더 제목. 생략해도 헤더는 렌더링됩니다 |
| `component` | `React.ReactNode` | — | 모달 본문 내에 렌더링할 콘텐츠 (첫 번째 인수) |

---

## 예제

### 정보 모달

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

### 모달 내 폼

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

// 사용법
const [closeModal, setCloseModal] = useState<(() => void) | null>(null);

await smooth.modal(
  <ProfileForm onClose={() => closeModal?.()} />,
  { title: 'Edit Profile' }
);
```

### 이미지 미리보기

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

## 모달 닫기

| 동작 | 동작 결과 |
|------|-----------|
| 닫기 버튼 클릭 (`×`) | Promise resolve, 종료 애니메이션과 함께 언마운트 |
| `ESC` 키 입력 | Promise resolve, 종료 애니메이션과 함께 언마운트 |
| 배경 클릭 | Promise resolve, 종료 애니메이션과 함께 언마운트 |

---

## 레이아웃

```
┌─────────────────────────────────────┐  ← .sn-overlay (backdrop blur)
│  ┌───────────────────────────────┐  │
│  │  Title                     ×  │  │  ← .sn-modal__head
│  ├───────────────────────────────┤  │
│  │                               │  │
│  │  { children }                 │  │  ← .sn-modal__body
│  │                               │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │  { footer }             │  │  │  ← .sn-modal__footer (선택사항)
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

최대 너비: `520px`. 콘텐츠가 넘칠 경우 세로로 스크롤됩니다.

---

## 애니메이션

| 이벤트 | 키프레임 | 지속 시간 | 이징 |
|--------|----------|-----------|------|
| 오버레이 진입 | `sn-overlayIn` | `0.28s` | `ease` |
| 모달 진입 | `sn-dialogIn` | `0.48s` | `cubic-bezier(0.34, 1.3, 0.64, 1)` |
| 모달 퇴장 | `sn-dialogOut` | `0.30s` | `cubic-bezier(0.4, 0, 0.8, 1)` |
| 오버레이 퇴장 | `sn-overlayOut` | `0.30s` | `ease` |

---

## CSS 클래스

| 클래스 | 설명 |
|--------|------|
| `.sn-overlay` | 전체 화면 배경 (`backdrop-filter: blur(12px)`) |
| `.sn-modal` | 모달 카드 (최대 너비 520px) |
| `.sn-modal.is-opening` | 진입 애니메이션 상태 |
| `.sn-modal.is-closing` | 퇴장 애니메이션 상태 |
| `.sn-modal__head` | 헤더 행 (제목 + 닫기 버튼) |
| `.sn-modal__title` | 헤더 제목 텍스트 |
| `.sn-modal__x` | 닫기 버튼 |
| `.sn-modal__body` | 콘텐츠 영역 |
| `.sn-modal__footer` | 푸터 영역 (본문 내부에 렌더링) |

---

## 컴포넌트 직접 사용

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
