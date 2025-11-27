import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Lightbulb, Users } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Me</h1>
          
          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-lg text-muted-foreground mb-4">
              안녕하세요! 저는 웹 개발과 소프트웨어 엔지니어링에 열정을 가진 개발자입니다.
            </p>
            <p className="text-muted-foreground mb-4">
              새로운 기술을 배우고 문제를 해결하는 것을 좋아하며, 사용자 경험을 개선하는 데 관심이 많습니다.
              팀과 협업하며 더 나은 제품을 만들어가는 과정을 즐깁니다.
            </p>
            <p className="text-muted-foreground">
              이 포트폴리오는 제가 작업한 프로젝트들과 기술 스택을 보여주기 위해 만들었습니다.
              자유롭게 둘러보시고, 궁금한 점이 있으시면 언제든 연락 주세요!
            </p>
          </div>

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

            <Card>
              <CardHeader>
                <Lightbulb className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>문제 해결</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  복잡한 문제를 분석하고 창의적인 해결책을 찾는 것을 즐깁니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>협업</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  팀원들과 소통하며 함께 성장하는 것을 중요하게 여깁니다.
                </p>
              </CardContent>
            </Card>
          </div>

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
              <div>
                <h3 className="font-semibold mb-2">Database</h3>
                <p className="text-muted-foreground">PostgreSQL, MongoDB, MySQL</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tools & Others</h3>
                <p className="text-muted-foreground">Git, Docker, AWS, CI/CD, Agile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
