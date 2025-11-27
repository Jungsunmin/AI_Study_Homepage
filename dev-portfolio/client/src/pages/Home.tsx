import Layout from "@/components/Layout";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      <section className="container py-20 md:py-32">
        <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
          {/* 좌측: 프로필 사진 (동그라미) */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg border-4 border-primary">
              <img src="/profile.jpeg" alt="프로필" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* 우측: 텍스트 */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              안녕하세요,
              <br />
              <span className="text-primary">개발자</span>입니다
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              웹 개발과 소프트웨어 엔지니어링에 열정을 가진 개발자입니다.
              다양한 프로젝트와 기술 스택을 활용하여 문제를 해결합니다.
            </p>
            <div className="flex gap-6">
              <Link href="/projects" className="text-primary hover:underline font-medium transition-colors">
                프로젝트 보기 →
              </Link>
              <Link href="/about" className="text-primary hover:underline font-medium transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 border-t border-border">
        <h2 className="text-2xl font-bold mb-8">주요 기술 스택</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["React", "TypeScript", "Node.js", "Python", "Next.js", "Tailwind CSS", "Git", "Docker"].map((tech) => (
            <div
              key={tech}
              className="p-4 text-center hover:text-primary transition-colors cursor-default"
            >
              <span className="font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
