import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

// 예시 프로젝트 데이터 - 사용자가 직접 수정할 수 있습니다
const projects = [
  {
    id: 1,
    title: "프로젝트 1",
    description: "프로젝트에 대한 간단한 설명입니다. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 설명하세요.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/yourusername/project1",
    demo: "https://project1-demo.com",
  },
  {
    id: 2,
    title: "프로젝트 2",
    description: "또 다른 프로젝트에 대한 설명입니다. 주요 기능과 성과를 간략히 작성하세요.",
    tags: ["Node.js", "Express", "MongoDB"],
    github: "https://github.com/yourusername/project2",
    demo: null,
  },
  {
    id: 3,
    title: "프로젝트 3",
    description: "세 번째 프로젝트 설명입니다. 배운 점이나 특별한 도전 과제를 언급할 수 있습니다.",
    tags: ["Python", "Django", "PostgreSQL"],
    github: "https://github.com/yourusername/project3",
    demo: "https://project3-demo.com",
  },
];

export default function Projects() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">프로젝트</h1>
          <p className="text-lg text-muted-foreground">
            제가 작업한 프로젝트들입니다. 각 프로젝트를 클릭하여 자세한 내용을 확인하세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium transition-colors flex items-center gap-1">
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium transition-colors flex items-center gap-1">
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
