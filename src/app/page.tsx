import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase"; 
import SystemMetrics from "@/components/SystemMetrics"; 
import ThemeToggle from "@/components/ThemeToggle";
import CommandPalette from "@/components/CommandPalette"; 
import { resumePlaceholder, profile } from "@/lib/data";
import Link from "next/link";
import { Metadata } from "next";

// Homepage Static Metadata configuration
export const metadata: Metadata = {
  title: `Puvi.dev`,
  description: profile.headline,
  openGraph: {
    title: `${profile.fullName} | Software Engineer`,
    description: profile.headline,
    url: "https://puviraj.dev", // Replace with your actual domain when launching
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} | Software Engineer`,
    description: profile.headline,
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-card-border transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-base sm:text-lg tracking-tight hover:opacity-85 transition-opacity">
            {profile.displayName.toLowerCase()}.dev
          </Link>
          <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-400">
            <a href="#projects" className="hover:text-primary-500 transition-colors">Case Studies</a>
            <a href="#experience" className="hidden xs:inline hover:text-primary-500 transition-colors">Experience</a>
            <a href="#skills" className="hover:text-primary-500 transition-colors">Skills</a>
            {/* Global keyboard search */}
            <CommandPalette />
            {/* Manual Light/Dark Theme Switch */}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="pb-24">
        {/* Hero Section */}
        <Hero />

        {/* Dynamic Case Studies */}
        <section id="projects" className="max-w-4xl mx-auto px-4 sm:px-6 py-16 border-t border-card-border">
          <div className="mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-primary-500 uppercase block mb-2">Featured Work</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Production Case Studies</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl text-sm sm:text-base">
              A select representation of real-world problems solved, focusing on architectural design, scalability, and technical constraints.
            </p>
          </div>

          <ProjectShowcase />
        </section>

        {/* Experience History */}
        <section id="experience" className="max-w-4xl mx-auto px-4 sm:px-6 py-16 border-t border-card-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <span className="text-xs font-mono font-bold tracking-widest text-primary-500 uppercase block mb-2">Background</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Work Experience</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-xs sm:text-sm leading-relaxed">
                Summary of professional milestones and structural roles driving engineering success.
              </p>
            </div>

            <div className="md:col-span-2 flex flex-col gap-10">
              {resumePlaceholder.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-primary-100 dark:border-primary-500/20">
                  <div className="absolute w-3 h-3 rounded-full bg-primary-500 -left-1.75 top-1.5" />
                  <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-500">{exp.period}</span>
                  <h3 className="text-base sm:text-lg font-bold mt-1 text-neutral-700 dark:text-neutral-300">{exp.role}</h3>
                  <h4 className="text-xs sm:text-sm font-semibold text-primary-500">{exp.company}</h4>
                  <ul className="mt-4 flex flex-col gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="list-disc ml-4 leading-relaxed">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Skills & Stack */}
        <section id="skills" className="max-w-4xl mx-auto px-4 sm:px-6 py-16 border-t border-card-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <span className="text-xs font-mono font-bold tracking-widest text-primary-500 uppercase block mb-2">Technical Core</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Skills & Stack</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-xs sm:text-sm leading-relaxed">
                Core technologies, framework proficiencies, and system design paradigms used regularly.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-col gap-4">
                {resumePlaceholder.skills.map((skillGroup, idx) => (
                  <div key={idx} className="border border-card-border bg-card rounded-lg p-4">
                    <span className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 block mb-2">
                      {skillGroup.split(":")[0]}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.split(":")[1]?.split(",").map((tech, techIdx) => (
                        <span key={techIdx} className="text-[10px] sm:text-xs font-mono bg-neutral-50 dark:bg-neutral-100 border border-card-border text-neutral-700 dark:text-neutral-300 px-2 py-0.5 rounded">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live Observability Panel Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 border-t border-card-border">
          <SystemMetrics />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-card-border py-12 text-center text-xs text-neutral-700 dark:text-neutral-500 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} {profile.fullName}. All rights reserved.</span>
          <span className="font-mono">Built with Next.js 16 & Tailwind v4</span>
        </div>
      </footer>
    </div>
  );
}