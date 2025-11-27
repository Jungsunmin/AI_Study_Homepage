# 포트폴리오 코드 가이드

이 문서는 포트폴리오 사이트의 주요 코드 구조와 커스터마이징 방법을 설명합니다.

## 📁 프로젝트 구조

```
client/src/
├── pages/
│   ├── Home.tsx          # 홈 페이지 (프로필 사진, 소개, 기술 스택)
│   ├── Projects.tsx      # 프로젝트 목록 페이지
│   ├── About.tsx         # 자기소개 페이지
│   └── NotFound.tsx      # 404 페이지
├── components/
│   ├── Layout.tsx        # 헤더, 푸터, 네비게이션
│   └── ui/               # shadcn/ui 컴포넌트들
├── App.tsx               # 라우팅 설정
├── main.tsx              # React 진입점
└── index.css             # 전역 스타일
```

---

## 🏠 Home.tsx - 홈 페이지

**위치**: `client/src/pages/Home.tsx`

### 프로필 사진 커스터마이징

```tsx
{/* 좌측: 프로필 사진 (동그라미) */}
<div className="flex-shrink-0">
  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg border-4 border-primary">
    <img src="/profile.jpeg" alt="프로필" className="w-full h-full object-cover" />
  </div>
</div>
```

**크기 조정**:
- `w-24 h-24`: 모바일 크기 (96px × 96px)
- `md:w-28 md:h-28`: 데스크톱 크기 (112px × 112px)
- 더 크게 하려면: `w-32 h-32 md:w-40 md:h-40` 등으로 변경

**이미지 변경**:
1. 새 사진을 `client/public/profile.jpeg`로 저장
2. 또는 다른 이름으로 저장하고 `src="/profile.jpeg"` 부분 수정

### 소개 텍스트 수정

```tsx
<h1 className="text-4xl md:text-5xl font-bold mb-4">
  안녕하세요,
  <br />
  <span className="text-primary">개발자</span>입니다
</h1>
<p className="text-lg text-muted-foreground mb-8">
  웹 개발과 소프트웨어 엔지니어링에 열정을 가진 개발자입니다.
  다양한 프로젝트와 기술 스택을 활용하여 문제를 해결합니다.
</p>
```

### 기술 스택 수정

```tsx
{["React", "TypeScript", "Node.js", "Python", "Next.js", "Tailwind CSS", "Git", "Docker"].map((tech) => (
  <div key={tech} className="p-4 text-center hover:text-primary transition-colors cursor-default">
    <span className="font-medium">{tech}</span>
  </div>
))}
```

배열의 기술을 추가/제거하면 자동으로 그리드에 반영됩니다.

---

## 📋 Projects.tsx - 프로젝트 페이지

**위치**: `client/src/pages/Projects.tsx`

### 프로젝트 추가/수정

```tsx
const projects = [
  {
    id: 1,
    title: "프로젝트 이름",
    description: "프로젝트에 대한 간단한 설명",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/yourusername/project-name",
    demo: "https://project-demo.com",
  },
  // 더 많은 프로젝트 추가...
];
```

**필드 설명**:
- `id`: 고유 식별자 (숫자)
- `title`: 프로젝트 제목
- `description`: 프로젝트 설명 (한두 문장)
- `tags`: 사용한 기술 배열
- `github`: GitHub 저장소 URL (필수)
- `demo`: 데모 URL (선택사항, `null`로 설정하면 Demo 버튼 미표시)

### 프로젝트 렌더링

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project) => (
    <Card key={project.id} className="flex flex-col">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        {/* 링크 */}
        <div className="flex gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" 
               className="text-primary hover:underline font-medium transition-colors flex items-center gap-1">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
               className="text-primary hover:underline font-medium transition-colors flex items-center gap-1">
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  ))}
</div>
```

---

## 👤 About.tsx - About 페이지

**위치**: `client/src/pages/About.tsx`

### 자기소개 수정

```tsx
<p className="text-lg text-muted-foreground mb-4">
  안녕하세요! 저는 웹 개발과 소프트웨어 엔지니어링에 열정을 가진 개발자입니다.
</p>
<p className="text-muted-foreground mb-4">
  새로운 기술을 배우고 문제를 해결하는 것을 좋아하며...
</p>
```

### 특징 카드 수정

```tsx
<div className="grid md:grid-cols-3 gap-6 mb-12">
  <Card>
    <CardHeader>
      <Code className="w-8 h-8 mb-2 text-primary" />
      <CardTitle>개발</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">
        깔끔하고 유지보수 가능한 코드를 작성하는 것을 중요하게 생각합니다.
      </p>
    </CardContent>
  </Card>
  {/* 더 많은 카드 추가 가능 */}
</div>
```

**아이콘 변경**: `lucide-react`에서 다른 아이콘으로 교체 가능
- `Code`, `Lightbulb`, `Users` 등

### 기술 스택 섹션

```tsx
<div>
  <h2 className="text-2xl font-bold mb-4">기술 스택</h2>
  <div className="space-y-4">
    <div>
      <h3 className="font-semibold mb-2">Frontend</h3>
      <p className="text-muted-foreground">React, TypeScript, Next.js, Tailwind CSS, HTML/CSS</p>
    </div>
    <div>
      <h3 className="font-semibold mb-2">Backend</h3>
      <p className="text-muted-foreground">Node.js, Express, Python, Django, REST API</p>
    </div>
    {/* 더 많은 카테고리 추가 가능 */}
  </div>
</div>
```

---

## 🎨 Layout.tsx - 헤더, 푸터, 네비게이션

**위치**: `client/src/components/Layout.tsx`

### 헤더 수정

```tsx
<header className="border-b border-border">
  <nav className="container py-4 flex justify-between items-center">
    <Link href="/" className="text-xl font-bold">
      Dev Portfolio  {/* 사이트 제목 */}
    </Link>
    <div className="flex gap-6">
      <Link href="/" className="hover:text-primary transition-colors">
        Home
      </Link>
      <Link href="/projects" className="hover:text-primary transition-colors">
        Projects
      </Link>
      <Link href="/about" className="hover:text-primary transition-colors">
        About
      </Link>
    </div>
  </nav>
</header>
```

### 푸터 소셜 링크 수정

```tsx
<footer className="border-t border-border py-8">
  <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
    <p className="text-sm text-muted-foreground">
      © 2024 Dev Portfolio. All rights reserved.
    </p>
    <div className="flex gap-4">
      <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" 
         className="text-muted-foreground hover:text-foreground transition-colors">
        <Github className="w-5 h-5" />
      </a>
      <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"
         className="text-muted-foreground hover:text-foreground transition-colors">
        <Linkedin className="w-5 h-5" />
      </a>
      <a href="mailto:your.email@example.com"
         className="text-muted-foreground hover:text-foreground transition-colors">
        <Mail className="w-5 h-5" />
      </a>
    </div>
  </div>
</footer>
```

---

## 🔀 App.tsx - 라우팅

**위치**: `client/src/App.tsx`

### 페이지 추가

새로운 페이지를 추가하려면:

```tsx
// 1. 페이지 컴포넌트 import
import NewPage from "./pages/NewPage";

// 2. Router 함수에 라우트 추가
function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/projects"} component={Projects} />
      <Route path={"/about"} component={About} />
      <Route path={"/new-page"} component={NewPage} />  {/* 새 라우트 */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

### 테마 변경

```tsx
<ThemeProvider defaultTheme="light">  {/* "light" 또는 "dark" */}
```

---

## 🎨 스타일 커스터마이징

### 색상 변경

**파일**: `client/src/index.css`

```css
:root {
  --primary: 220 25% 25%;  /* 주 색상 */
  --background: 0 0% 100%;  /* 배경색 */
  --foreground: 220 15% 15%;  /* 텍스트 색상 */
  /* 기타 색상 변수... */
}
```

**색상 형식**: `hue saturation lightness` (HSL)

### 폰트 변경

**파일**: `client/index.html`

```html
<!-- Google Fonts 추가 -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

그 후 `index.css`에서:

```css
body {
  font-family: 'Poppins', sans-serif;
}
```

---

## 📦 Tailwind CSS 클래스 참고

### 자주 사용되는 클래스

| 클래스 | 설명 |
|--------|------|
| `container` | 반응형 컨테이너 (자동 중앙 정렬) |
| `py-20` | 위아래 패딩 (5rem) |
| `md:py-32` | 중간 화면 이상에서 위아래 패딩 (8rem) |
| `text-4xl` | 큰 제목 (2.25rem) |
| `md:text-5xl` | 중간 화면 이상에서 더 큰 제목 |
| `font-bold` | 굵은 텍스트 |
| `text-primary` | 주 색상 텍스트 |
| `hover:underline` | 마우스 오버 시 밑줄 |
| `transition-colors` | 색상 변화 애니메이션 |
| `grid` | 그리드 레이아웃 |
| `md:grid-cols-2` | 중간 화면 이상에서 2열 |
| `gap-6` | 요소 간 간격 (1.5rem) |

---

## 🚀 배포 전 체크리스트

- [ ] 프로필 사진 업로드 (`client/public/profile.jpeg`)
- [ ] 홈 페이지 텍스트 수정
- [ ] 프로젝트 정보 입력
- [ ] About 페이지 자기소개 작성
- [ ] GitHub/LinkedIn/이메일 링크 업데이트
- [ ] 색상 테마 커스터마이징 (선택사항)
- [ ] 로컬에서 `pnpm dev`로 테스트
- [ ] GitHub Pages 배포

---

## 💡 팁

1. **이미지 최적화**: 프로필 사진은 200KB 이하로 압축하세요
2. **모바일 테스트**: 개발자 도구에서 반응형 디자인 테스트
3. **SEO**: `client/index.html`의 메타 태그 업데이트
4. **성능**: 불필요한 의존성 제거, 이미지 최적화

---

**Happy Coding! 🎉**
