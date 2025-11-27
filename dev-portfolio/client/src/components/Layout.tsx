import { Link } from "wouter";
import { Github, Linkedin, Mail } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border">
        <nav className="container py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Dev Portfolio
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

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Dev Portfolio. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:your.email@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
