**Language:** [English](contributing.md) | **한국어** | [简体中文](contributing.zh-CN.md)

---

# 기여하기

> [← README로 돌아가기](../README.ko.md)

버그 리포트, 기능 요청, 문서 개선, 풀 리퀘스트 등 모든 형태의 기여를 환영합니다.

---

## 개발 환경 설정

```bash
# 1. Fork 후 클론
git clone https://github.com/your-username/smooth-notification.git
cd smooth-notification

# 2. 의존성 설치
yarn install
cd playground && yarn install && cd ..

# 3. 플레이그라운드 개발 서버 시작
yarn start   # → http://localhost:5173
```

플레이그라운드(`/playground`)는 Vite 별칭을 통해 라이브러리 소스를 핫 리로드합니다 — `src/`의 파일을 수정하면 즉시 반영됩니다.

---

## 프로젝트 구조

```
smooth-notification/
├── src/                              # 라이브러리 소스 (npm에 배포됨)
│   ├── core/
│   │   ├── store.ts                  # Pub/sub 이벤트 에미터 + 토글 레지스트리
│   │   └── smooth.ts                 # smooth.toast / modal / confirm / alert
│   ├── components/
│   │   ├── SmoothProvider.tsx        # Provider + document.body 포털
│   │   ├── ToastContainer.tsx        # 위치별 그룹 토스트 렌더러
│   │   ├── Toast.tsx                 # 드래그 + 타이머 + 프로그레스 바
│   │   ├── Modal.tsx                 # ESC + 배경 클릭 + 스프링 애니메이션
│   │   ├── Confirm.tsx               # Promise<boolean> 다이얼로그
│   │   ├── Alert.tsx                 # Promise<void> 다이얼로그
│   │   └── Icon.tsx                  # 타입 기반 SVG 아이콘
│   ├── hooks/
│   │   ├── useAnimatedMount.ts       # 퇴장 애니메이션 안전 마운트/언마운트
│   │   ├── useToast.ts               # 드래그 + 일시정지 인터랙션 로직
│   │   └── useDynamicLayoutEffect.ts # SSR 안전 레이아웃 이펙트
│   ├── styles/                       # Nocturne 디자인 시스템 (SCSS)
│   │   ├── _variables.scss
│   │   ├── _animations.scss
│   │   ├── _toast.scss
│   │   ├── _modal.scss
│   │   ├── _dialog.scss
│   │   ├── _buttons.scss
│   │   └── smooth.scss               # 진입점
│   ├── types.ts
│   ├── utils.ts
│   └── index.ts                      # 공개 API 내보내기
├── playground/                       # Vite + React 데모 앱
│   └── src/App.js                    # 인터랙티브 쇼케이스
├── cypress/                          # 컴포넌트 테스트
└── docs/                             # 상세 문서
```

---

## 풀 리퀘스트 제출

1. **중요한 변경사항의 경우 먼저 이슈를 열어주세요** — 코딩에 시간을 투자하기 전에 접근 방식을 함께 논의합니다.

2. `main`에서 **브랜치를 생성하세요**:
   ```bash
   git checkout -b feat/your-feature-name
   # 또는
   git checkout -b fix/issue-description
   ```

3. **변경사항을 적용하세요.** 새로운 시각적 요소를 추가하는 경우, 검토자가 실제로 확인할 수 있도록 플레이그라운드 데모를 업데이트하세요.

4. **테스트를 실행하세요:**
   ```bash
   yarn test
   ```

5. 컨벤셔널 메시지로 **커밋하세요**:
   ```
   feat :: add loading toast variant
   fix  :: timer not resuming after focus restore
   docs :: add toast position examples
   style :: update warning accent color
   ```

6. 다음 내용을 포함하여 `main`을 대상으로 **PR을 열어주세요**:
   - 변경 내용과 그 이유
   - 시각적 변경사항인 경우 스크린샷 또는 GIF
   - 관련 이슈 참조 (있는 경우)

---

## 버그 리포트

[GitHub Issues](https://github.com/ftery0/smooth-notification/issues)를 사용하고 다음을 포함해주세요:

- 최소 재현 코드 (CodeSandbox 링크 또는 코드 스니펫)
- React 버전 및 브라우저 + OS 정보
- 예상 동작 vs. 실제 동작
- 콘솔 오류 (있는 경우)

---

## 코드 스타일

### TypeScript
- 전체적으로 strict 모드 사용 — `any` 금지, 근거 없는 non-null assertion 금지
- 내보내기 함수에는 명시적 반환 타입 사용 권장
- 타입 전용 임포트에는 `type` 임포트 사용: `import type { ... }`

### React
- 함수형 컴포넌트만 사용
- 파일당 하나의 컴포넌트, 파일 이름은 컴포넌트 이름과 일치
- Props 인터페이스는 `{ComponentName}Props` 형식으로 명명

### CSS / SCSS
- 모든 클래스는 `sn-` 접두사 사용
- BEM 네이밍: `.sn-block__element--modifier`
- 커스텀 프로퍼티는 컴포넌트 선택자가 아닌 `:root`에 선언
- 하드코딩된 색상 금지 — 항상 토큰 사용

### 커밋
- 이 저장소에서 사용하는 `type :: description` 형식을 따를 것
- 커밋을 집중적으로 유지 — 커밋당 하나의 논리적 변경사항

---

## 로드맵

계획된 기능 — PR 환영:

- [ ] 라이트 테마 지원
- [ ] 토스트별 커스텀 transition 속성
- [ ] `smooth.loading()` — resolve/reject가 가능한 지속 로딩 토스트
- [ ] 스택형 / 축소형 토스트 모드
- [ ] 접근성 감사 (WCAG 2.1 AA)
- [ ] React Native 지원

목록에 없는 아이디어가 있으신가요? [기능 요청 열기 →](https://github.com/ftery0/smooth-notification/issues)
