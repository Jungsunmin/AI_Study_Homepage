# GitHub Pages 배포 가이드

이 포트폴리오 사이트를 GitHub Pages에 배포하는 방법입니다.

## 1단계: GitHub 저장소 생성

1. GitHub에서 새로운 저장소를 생성합니다.
2. 저장소 이름을 `dev-portfolio` 또는 원하는 이름으로 설정합니다.
3. Public으로 설정합니다.

## 2단계: 로컬 저장소 설정

```bash
# 현재 디렉토리에서 git 초기화
git init

# GitHub 저장소를 원격으로 추가
git remote add origin https://github.com/YOUR_USERNAME/dev-portfolio.git

# 모든 파일을 스테이징
git add .

# 초기 커밋
git commit -m "Initial commit: Portfolio setup"

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

## 3단계: GitHub Actions 자동 배포 설정

`.github/workflows/deploy.yml` 파일이 이미 준비되어 있습니다.

main 브랜치에 푸시하면 자동으로:
1. 프로젝트를 빌드합니다
2. GitHub Pages로 배포합니다

## 4단계: GitHub Pages 활성화

1. GitHub 저장소의 **Settings** 탭으로 이동합니다
2. 왼쪽 메뉴에서 **Pages**를 선택합니다
3. **Build and deployment** 섹션에서:
   - Source: **Deploy from a branch** 선택
   - Branch: **gh-pages** 선택
   - Folder: **/ (root)** 선택
4. **Save** 버튼을 클릭합니다

## 5단계: 배포 확인

1. GitHub Actions 탭에서 배포 상태를 확인합니다
2. 배포가 완료되면 `https://YOUR_USERNAME.github.io/dev-portfolio` 에서 사이트를 볼 수 있습니다

## 커스텀 도메인 설정 (선택사항)

1. 도메인을 소유하고 있다면:
2. Settings > Pages에서 **Custom domain** 섹션에 도메인을 입력합니다
3. DNS 레코드를 설정합니다 (도메인 제공자의 지침 참고)

## 주의사항

- 저장소 이름이 `dev-portfolio`가 아니라면, `vite.config.ts`의 `base` 경로를 수정해야 합니다:
  ```typescript
  base: process.env.GITHUB_PAGES ? '/your-repo-name/' : '/',
  ```

- 프라이빗 저장소를 사용하려면 GitHub Pro 이상의 플랜이 필요합니다.

## 로컬에서 테스트

배포 전에 로컬에서 테스트하려면:

```bash
# GitHub Pages 환경 시뮬레이션
GITHUB_PAGES=true pnpm build

# 빌드된 파일 미리보기
pnpm preview
```

## 문제 해결

**배포가 실패하는 경우:**
1. GitHub Actions 탭에서 실패한 워크플로우를 클릭합니다
2. 에러 메시지를 확인합니다
3. 일반적인 문제:
   - Node.js 버전 호환성
   - 의존성 설치 실패
   - 빌드 에러

**사이트가 보이지 않는 경우:**
1. GitHub Pages가 활성화되었는지 확인합니다
2. 브라우저 캐시를 삭제합니다
3. 배포 완료까지 기다립니다 (보통 1-2분)
