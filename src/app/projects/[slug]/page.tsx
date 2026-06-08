import { projects, profile } from "@/lib/data";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = { 
  params: Promise<{ slug: string }> 
};

// Next.js 16 dynamic Meta generator for dynamic routes
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    return {
      title: "Project Not Found | Puvi's Portfolio",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | ${project.role}`,
      description: project.summary,
      type: "article",
      url: `https://puviraj.dev/projects/${project.slug}`, // Replace with your actual domain when launching
      siteName: `${profile.fullName} Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${project.role}`,
      description: project.summary,
    }
  };
}

export default async function ProjectPage({ params }: Props) {
  // Await params promise to comply with Next.js 16 standards
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-card-border transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-base sm:text-lg tracking-tight hover:opacity-85 transition-opacity">
            {profile.displayName.toLowerCase()}.dev
          </Link>
          
          {/* Touch-Safe Back Button Pill */}
          <Link 
            href="/" 
            className="px-3 py-1.5 rounded-lg border border-card-border bg-card hover:bg-neutral-50 dark:hover:bg-neutral-100 text-xs sm:text-sm font-semibold text-primary-500 hover:text-primary-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>←</span>
            <span className="hidden xs:inline">Back to Home</span>
            <span className="xs:hidden">Home</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Case Study Header Banner */}
        <div className="border-b border-card-border pb-10 mb-10">
          <div className="flex flex-wrap gap-2 items-center text-xs font-mono font-bold text-primary-500 uppercase mb-4">
            <span>{project.role}</span>
            <span className="text-neutral-700 dark:text-neutral-500">•</span>
            <span>Case Study</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {project.title}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-semibold max-w-2xl leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Dynamic SVG Architecture Diagram Component */}
        <div className="mb-10 w-full">
          <ArchitectureDiagram diagram={project.diagram} />
        </div>

        {/* Double Column Engineering Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Main Case Content - 2 Columns */}
          <div className="md:col-span-2 flex flex-col gap-6 sm:gap-8">
            {/* Context/Problem */}
            <section className="bg-card border border-card-border rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-500 uppercase tracking-widest mb-3">
                The Problem & Context
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
                {project.problem}
              </p>
            </section>

            {/* Technical Approach */}
            <section className="bg-card border border-card-border rounded-xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-500 uppercase tracking-widest mb-4">
                Architecture & Implementation Approach
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                Engineering decisions were made with scalability, clean architecture, and rapid deployment in mind. Key strategic initiatives included:
              </p>
              <ul className="flex flex-col gap-4">
                {project.approach.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-500 text-xs font-bold shrink-0 font-mono">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mt-0.5">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Retrospective */}
            {project.whatChange && (
              <section className="bg-primary-50/30 dark:bg-primary-500/5 border border-primary-100 dark:border-primary-500/10 rounded-xl p-5 sm:p-6">
                <h2 className="text-xs font-mono font-bold text-primary-700 dark:text-primary-500 uppercase tracking-widest mb-3">
                  Retrospective: What I Would Change
                </h2>
                <p className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed font-semibold">
                  {project.whatChange}
                </p>
              </section>
            )}
          </div>

          {/* Quick Facts Sidebar - 1 Column */}
          <div className="md:col-span-1 flex flex-col gap-6 sm:gap-8">
            {/* Outcomes */}
            <div className="border border-card-border bg-card rounded-xl p-5 sm:p-6 shadow-sm">
              <h3 className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-500 uppercase tracking-widest mb-4">
                Key Performance Indicators
              </h3>
              <ul className="flex flex-col gap-3">
                {project.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="text-success font-bold text-base leading-none select-none">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Parameters */}
            <div className="border border-card-border bg-card rounded-xl p-5 sm:p-6 shadow-sm">
              <h3 className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-500 uppercase tracking-widest mb-4">
                Project Parameters
              </h3>
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <span className="block text-neutral-700 dark:text-neutral-500 uppercase tracking-wider mb-1 font-semibold">Team Allocation</span>
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">{project.role}</span>
                </div>
                <div>
                  <span className="block text-neutral-700 dark:text-neutral-500 uppercase tracking-wider mb-1 font-semibold">Project Boundaries</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.constraints.map((constraint, idx) => (
                      <span key={idx} className="px-2 py-1 rounded bg-neutral-50 dark:bg-neutral-100 border border-card-border text-neutral-700 dark:text-neutral-300">
                        {constraint}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Launch CTA actions */}
            <div className="flex flex-col gap-3">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 rounded-lg bg-primary-500 hover:opacity-90 text-white font-semibold text-sm transition-opacity"
                >
                  Launch App Demo
                </a>
              ) : (
                <span className="w-full text-center py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-card-border text-neutral-700 dark:text-neutral-500 text-xs sm:text-sm font-semibold cursor-not-allowed">
                  Demo Restricted (Internal Tool)
                </span>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 rounded-lg border border-card-border hover:bg-neutral-50 dark:hover:bg-neutral-100 text-neutral-700 dark:text-neutral-300 font-semibold text-xs sm:text-sm transition-colors"
                >
                  View Repository
                </a>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-card-border py-12 text-center text-xs text-neutral-700 dark:text-neutral-500 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} {profile.fullName}. All rights reserved.</span>
          <span className="font-mono">Engineering Showcase</span>
        </div>
      </footer>
    </div>
  );
}