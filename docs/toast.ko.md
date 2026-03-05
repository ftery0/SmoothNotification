**Language:** [English](toast.md) | **한국어** | [简体中文](toast.zh-CN.md)

---

# Toast

> [← README로 돌아가기](../README.ko.md)

스프링 오버슈트 애니메이션과 함께 화면 가장자리에서 슬라이드 인하는 단방향 알림입니다.

---

## 기본 사용법

```tsx
import { smooth } from 'smooth-notification';

smooth.toast('안녕하세요!');
smooth.toast('저장되었습니다!', { type: 'success' });
smooth.toast('문제가 발생했습니다.', { type: 'error' });
smooth.toast('주의하세요.', { type: 'warning' });
smooth.toast('참고하세요.', { type: 'info' });
```

---

## 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|--------|------|---------|-------------|
| `type` | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'` | 시각적 변형 — 아이콘과 강조 색상을 제어합니다 |
| `position` | `Position` | `'top-right'` | 화면에서 토스트가 나타나는 위치 |
| `autoClose` | `number \| false` | `5000` | 자동으로 닫히기까지의 밀리초. `false`를 전달하면 계속 유지됩니다 |
| `pauseOnHover` | `boolean` | `true` | 커서가 토스트 위에 있는 동안 자동 닫기 카운트다운을 일시정지합니다 |
| `pauseOnFocusLoss` | `boolean` | `true` | 브라우저 창이 포커스를 잃으면 카운트다운을 일시정지합니다 |
| `draggable` | `boolean` | `true` | 토스트를 화면 밖으로 드래그하여 닫을 수 있도록 합니다 |

---

## 위치

여섯 가지 위치를 사용할 수 있습니다. 토스트 스택은 앵커 지점에서 안쪽으로 쌓입니다.

```tsx
smooth.toast('오른쪽 상단',   { position: 'top-right' });     // 기본값
smooth.toast('중앙 상단',     { position: 'top-center' });
smooth.toast('왼쪽 상단',     { position: 'top-left' });
smooth.toast('오른쪽 하단',   { position: 'bottom-right' });
smooth.toast('중앙 하단',     { position: 'bottom-center' });
smooth.toast('왼쪽 하단',     { position: 'bottom-left' });
```

모든 토스트의 기본 위치는 `<SmoothProvider>`에서 한 번 설정할 수 있습니다:

```tsx
<SmoothProvider defaultPosition="bottom-right">
  <App />
</SmoothProvider>
```

---

## 자동 닫기

```tsx
// 2초 후 닫기
smooth.toast('빠른 알림', { autoClose: 2000 });

// 자동으로 닫히지 않음 — 사용자가 드래그하거나 직접 닫아야 합니다
smooth.toast('백그라운드 동기화 중', {
  type: 'info',
  autoClose: false,
});
```

토스트 하단의 프로그레스 바는 남은 시간을 시각화합니다. 해당 옵션이 활성화된 경우 호버 시 및 윈도우 블러 시에 일시정지됩니다.

---

## 드래그로 닫기

`draggable: true`(기본값)일 때, 사용자는 토스트를 가로로 드래그하여 닫을 수 있습니다. 토스트는 이동하면서 점점 사라지고, 드래그 임계값에 도달하지 않으면 원래 위치로 되돌아옵니다.

```tsx
// 드래그 비활성화
smooth.toast('드래그 불가', { draggable: false });
```

---

## React 콘텐츠

`message`는 모든 React 노드를 허용합니다:

```tsx
smooth.toast(
  <span>
    파일 <strong>report.pdf</strong>이 성공적으로 업로드되었습니다.
  </span>,
  { type: 'success' }
);
```

---

## 타입별 강조 색상

각 `type`은 CSS 변수 `--accent`와 `--accent-bg`를 인라인으로 주입합니다:

| 타입 | 강조 색상 | 배경 색상 |
|------|--------|------------|
| `success` | `#10e8a4` | `rgba(16, 232, 164, 0.13)` |
| `error` | `#ff6b8a` | `rgba(255, 107, 138, 0.13)` |
| `warning` | `#ffb547` | `rgba(255, 181, 71, 0.13)` |
| `info` | `#a78bfa` | `rgba(167, 139, 250, 0.13)` |
| `default` | `rgba(237,237,250,0.28)` | `rgba(255,255,255,0.08)` |

---

## 애니메이션

토스트는 진입 시 스프링 오버슈트 키프레임을, 종료 시 빠른 ease-out을 사용합니다.

| 이벤트 | 키프레임 | 지속 시간 | 이징 |
|-------|----------|----------|--------|
| 진입 | `sn-toastIn` | `0.55s` | `cubic-bezier(0.34, 1.32, 0.64, 1)` |
| 종료 | `sn-toastOut` | `0.42s` | `cubic-bezier(0.4, 0, 0.8, 1)` |
| 프로그레스 바 | `sn-progress` | `autoClose` 값 | `linear` |

```
sn-toastIn 키프레임:
  0%   → translateX(calc(100% + 32px)) scale(0.86)  opacity: 0
  55%  → translateX(-12px) scale(1.02)               opacity: 1  ← 오버슈트
  75%  → translateX(5px) scale(0.99)
  100% → translateX(0) scale(1)                      opacity: 1
```

---

## CSS 클래스

| 클래스 | 설명 |
|-------|-------------|
| `.sn-toasts` | 고정 위치 컨테이너 |
| `.sn-toasts--{position}` | 위치 수정자 (예: `--top-right`) |
| `.sn-toast` | 개별 토스트 카드 |
| `.sn-toast.is-exiting` | 종료 애니메이션 중에 적용 |
| `.sn-toast__accent` | 왼쪽 색상 스트립 |
| `.sn-toast__body` | 콘텐츠 행 (아이콘 + 메시지 + 닫기) |
| `.sn-toast__icon` | 원형 아이콘 배지 |
| `.sn-toast__msg` | 메시지 텍스트 |
| `.sn-toast__close` | 닫기 버튼 |
| `.sn-toast__bar` | 프로그레스 바 |
| `.sn-toast__bar.is-paused` | 일시정지 상태 |
