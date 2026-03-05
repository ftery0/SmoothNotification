**Language:** [English](design-system.md) | **한국어** | [简体中文](design-system.zh-CN.md)

---

# 디자인 시스템 — Nocturne

> [← README로 돌아가기](../README.ko.md)

**Nocturne**은 smooth-notification을 구동하는 디자인 시스템입니다. 심우주를 연상시키는 어두운 고급 미학을 기반으로 합니다: 깊은 우주의 표면 레이어, 생물발광 악센트 색상, 그리고 스프링 물리 애니메이션으로 구성됩니다.

모든 것이 CSS 커스텀 프로퍼티로 표현됩니다 — SCSS를 수정하지 않고도 `:root` 레벨에서 토큰을 재정의하여 전역적으로 커스터마이징할 수 있습니다.

---

## 색상 팔레트

### 표면

| 토큰 | 값 | 역할 |
|------|----|------|
| `--sn-void` | `#07070e` | 페이지 배경 — 가장 어두운 레이어 |
| `--sn-abyss` | `#0c0c1a` | 카드 / 다이얼로그 배경 |
| `--sn-depth` | `#11111e` | 상승된 표면 |
| `--sn-surface` | `rgba(255,255,255,0.04)` | 미묘한 채우기 (버튼, 입력 필드) |
| `--sn-surface-h` | `rgba(255,255,255,0.07)` | 표면의 호버 상태 |
| `--sn-border` | `rgba(255,255,255,0.07)` | 기본 테두리 |
| `--sn-border-h` | `rgba(255,255,255,0.14)` | 테두리의 호버 상태 |

### 타이포그래피

| 토큰 | 값 | 역할 |
|------|----|------|
| `--sn-text` | `#ededfa` | 기본 텍스트 |
| `--sn-text-muted` | `rgba(237,237,250,0.5)` | 보조 / 본문 텍스트 |
| `--sn-text-subtle` | `rgba(237,237,250,0.28)` | 비활성화 / 플레이스홀더 텍스트 |

### 생물발광 악센트

| 토큰 | 값 | 용도 |
|------|----|------|
| `--sn-success` | `#10e8a4` | 성공 상태 |
| `--sn-error` | `#ff6b8a` | 오류 / 위험 상태 |
| `--sn-warning` | `#ffb547` | 경고 상태 |
| `--sn-info` | `#a78bfa` | 정보 상태 |

### 악센트 배경 (사전 계산됨)

| 토큰 | 값 |
|------|----|
| `--sn-success-bg` | `rgba(16, 232, 164, 0.13)` |
| `--sn-error-bg` | `rgba(255, 107, 138, 0.13)` |
| `--sn-warning-bg` | `rgba(255, 181, 71, 0.13)` |
| `--sn-info-bg` | `rgba(167, 139, 250, 0.13)` |
| `--sn-default-bg` | `rgba(255, 255, 255, 0.08)` |

---

## 타이포그래피

| 토큰 | 값 |
|------|----|
| `--sn-font` | `'Instrument Sans', -apple-system, system-ui, sans-serif` |

[Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans)는 SCSS 변수 파셜을 통해 Google Fonts에서 불러옵니다.

---

## 형태

| 토큰 | 값 | 사용처 |
|------|----|--------|
| `--sn-radius` | `14px` | 토스트, 모달, 다이얼로그 카드 |
| `--sn-radius-sm` | `9px` | 버튼, 소형 요소 |

---

## 그림자

| 토큰 | 값 | 역할 |
|------|----|------|
| `--sn-shadow-sm` | `0 2px 8px rgba(0,0,0,.35)` | 미묘한 입체감 |
| `--sn-shadow-md` | `0 8px 32px rgba(0,0,0,.5)` | 카드 (토스트) |
| `--sn-shadow-lg` | `0 24px 80px rgba(0,0,0,.65)` | 모달 / 다이얼로그 |
| `--sn-shadow-ring` | `0 0 0 1px rgba(255,255,255,.04)` | 미묘한 아웃라인 광채 |

---

## 토큰 재정의

전역 CSS 또는 SCSS 상단에 다음을 붙여넣어 토큰을 재정의할 수 있습니다:

```css
:root {
  --sn-radius:  10px;           /* 더 둥근 모서리 */
  --sn-success: #00e096;        /* 커스텀 초록색 */
  --sn-font:    'Inter', sans-serif;
}
```

---

## SCSS 구조

```
src/styles/
├── _variables.scss     ← 모든 CSS 커스텀 프로퍼티 + Google Fonts 임포트
├── _animations.scss    ← @keyframes (toast, dialog, overlay, icon)
├── _toast.scss         ← .sn-toast 및 .sn-toasts 컨테이너
├── _modal.scss         ← .sn-overlay 및 .sn-modal
├── _dialog.scss        ← .sn-dialog (Confirm + Alert 공유)
├── _buttons.scss       ← .sn-btn 변형
└── smooth.scss         ← 진입점 (@import 모든 파셜)
```

프로젝트에서 진입점을 임포트하세요:

```scss
@import 'smooth-notification/src/styles/smooth';
```

또는 파셜을 개별적으로 임포트하세요:

```scss
@import 'smooth-notification/src/styles/variables';
@import 'smooth-notification/src/styles/animations';
@import 'smooth-notification/src/styles/toast';
```

---

## 버튼 시스템

smooth-notification은 다이얼로그와 모달 내에서 사용할 수 있는 버튼 유틸리티 클래스를 제공합니다.

```html
<button class="sn-btn sn-btn--primary">Save</button>
<button class="sn-btn sn-btn--ghost">Cancel</button>
<button class="sn-btn sn-btn--danger">Delete</button>
<button class="sn-btn sn-btn--success">Confirm</button>
```

| 수정자 | 외관 | 용도 |
|--------|------|------|
| `--ghost` | 미묘한 테두리, 흐린 텍스트 | 보조 / 취소 동작 |
| `--primary` | Info 보라색 채우기 | 주요 CTA |
| `--danger` | 붉은 분홍색 계열 | 파괴적 동작 |
| `--success` | 초록색 계열 | 긍정적 확인 |

---

## 애니메이션 참조

| 키프레임 | 지속 시간 | 이징 | 용도 |
|----------|-----------|------|------|
| `sn-toastIn` | `0.55s` | `cubic-bezier(0.34, 1.32, 0.64, 1)` | 토스트 진입 (스프링 오버슈트) |
| `sn-toastOut` | `0.42s` | `cubic-bezier(0.4, 0, 0.8, 1)` | 토스트 퇴장 |
| `sn-progress` | `autoClose` ms | `linear` | 프로그레스 바 scaleX |
| `sn-overlayIn` | `0.28s` | `ease` | 배경 페이드 인 |
| `sn-overlayOut` | `0.30s` | `ease` | 배경 페이드 아웃 |
| `sn-dialogIn` | `0.48–0.50s` | `cubic-bezier(0.34, 1.3–1.4, 0.64, 1)` | 모달 / 다이얼로그 진입 |
| `sn-dialogOut` | `0.30s` | `cubic-bezier(0.4, 0, 0.8, 1)` | 모달 / 다이얼로그 퇴장 |
| `sn-iconPop` | `0.52s` + `0.08s` 딜레이 | `cubic-bezier(0.34, 1.4, 0.64, 1)` | 다이얼로그 아이콘 배지 |

---

## 유리 형태 효과 (Glass Morphism)

토스트 카드는 유리 형태 효과를 사용합니다:

```css
background: rgba(11, 11, 22, 0.9);
backdrop-filter: blur(24px) saturate(180%);
border: 1px solid var(--sn-border);
box-shadow: var(--sn-shadow-md), var(--sn-shadow-ring);
```

오버레이 / 배경:

```css
background: rgba(4, 4, 10, 0.75);
backdrop-filter: blur(12px);
```

> `backdrop-filter`는 Chrome 88+, Firefox 89+, Safari 15+ 이상이 필요합니다.
