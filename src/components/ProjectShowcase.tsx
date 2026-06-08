"use client";

import { useState } from "react";
import { projects, Project } from "@/lib/data";
import Link from "next/link";

const FILTER_CATEGORIES = ["All", "ASP.NET Core", "Next.js", "Redis", "WebSockets"];

export default function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    
    const approachText = project.approach.join(" ").toLowerCase();
    const roleText = project.role.toLowerCase();
    
    return (
      approachText.includes(activeFilter.toLowerCase()) || 
      roleText.includes(activeFilter.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Interactive Badges Filter Bar */}
      <div className="flex flex-wrap gap-2.5">
        {FILTER_CATEGORIES.map((category) => {
          const isActive = activeFilter === category;
          return (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                isActive
                  ? "bg-primary-500 text-white border-primary-500 shadow-md"
                  : "bg-card border-card-border text-neutral-700 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-100"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Case Studies Cards Grid */}
      <div className="flex flex-col gap-12 min-h-100">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project: Project) => (
            <article 
              key={project.id} 
              className="group border border-card-border bg-card rounded-xl p-6 sm:p-8 hover:shadow-xl hover:border-primary-500/40 transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-mono font-bold text-primary-500 uppercase px-2.5 py-1 rounded bg-primary-50 dark:bg-primary-500/10">
                    {project.role}
                  </span>
                  <span className="text-xs font-mono text-neutral-700 dark:text-neutral-500">
                    {project.constraints.join(" • ")}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-500 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-neutral-700 dark:text-neutral-300 font-semibold mb-4 leading-relaxed text-sm sm:text-base">
                  {project.summary}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-mono text-neutral-700 dark:text-neutral-500 uppercase tracking-widest mb-1.5 font-bold">The Challenge</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Key Achievements */}
                <div className="mb-8">
                  <h4 className="text-xs font-mono text-neutral-700 dark:text-neutral-500 uppercase tracking-widest mb-2 font-bold">Key Engineering Outcomes</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                    {project.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-success select-none font-bold">✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RESPONSIVE FOOTER: Vertically stacks on mobile, floats horizontally on desktop */}
              <div className="border-t border-card-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.approach.map((tech, idx) => (
                    <span key={idx} className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-neutral-50 dark:bg-neutral-100 border border-card-border text-neutral-700 dark:text-neutral-300">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Responsive Button - Large touch target on mobile, standard link on desktop */}
                <Link 
                  href={`/projects/${project.slug}`}
                  className="w-full sm:w-auto text-center px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-card-border sm:border-0 sm:bg-transparent sm:p-0 text-xs sm:text-sm font-bold text-primary-500 hover:text-primary-700 sm:hover:bg-transparent transition-all flex items-center justify-center gap-1 group/link shrink-0 cursor-pointer"
                >
                  Read full case study 
                  <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-card-border rounded-xl">
            <span className="text-2xl">🔍</span>
            <p className="text-sm text-neutral-700 dark:text-neutral-500 mt-2 font-mono">No matching case studies found.</p>
          </div>
        )}
      </div>
    </div>
  );
}