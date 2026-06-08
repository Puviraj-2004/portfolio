"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/data";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const navigationItems = [
    { title: "Navigate to: Home Page", action: () => router.push("/") },
    { title: "Navigate to: Work Experience", action: () => router.push("/#experience") },
    { title: "Navigate to: Technical Skills", action: () => router.push("/#skills") },
    ...projects.map((project) => ({
      title: `Case Study: ${project.title}`,
      action: () => router.push(`/projects/${project.slug}`),
    })),
  ];

  const filteredItems = navigationItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Cmd+K / Ctrl+K keyboard hooks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (next) {
            setSearch("");
            setSelectedIndex(0);
          }
          return next;
        });
      }
      
      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems, router]);

  // Handle focusing ONLY (No state updates inside the effect)
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const openPalette = () => {
    setSearch("");
    setSelectedIndex(0);
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={openPalette} 
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-card-border bg-card hover:bg-neutral-50 dark:hover:bg-neutral-100 text-xs font-semibold text-neutral-700 dark:text-neutral-500 cursor-pointer"
        aria-label="Open Command Menu"
      >
        <span>🔍</span>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex font-mono text-[9px] tracking-widest px-1 py-0.5 border border-card-border bg-neutral-50 dark:bg-neutral-100 rounded">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh] px-4 bg-background/40 backdrop-blur-md">
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      <div className="relative w-full max-w-lg border border-card-border bg-card rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <div className="border-b border-card-border p-4 flex items-center gap-3">
          <span className="text-sm select-none">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or dynamic route..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm focus:outline-none placeholder-neutral-700 dark:placeholder-neutral-500"
          />
        </div>

        <div className="max-h-60 overflow-y-auto p-2">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold font-mono flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected 
                      ? "bg-primary-500 text-white" 
                      : "text-neutral-700 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-100"
                  }`}
                >
                  <span>{item.title}</span>
                  {isSelected && <span className="text-[10px] opacity-80">Enter ⏎</span>}
                </button>
              );
            })
          ) : (
            <p className="text-center py-6 text-xs font-mono text-neutral-700 dark:text-neutral-500">
              No routes found matching your query.
            </p>
          )}
        </div>

        <div className="border-t border-card-border p-3 bg-neutral-50 dark:bg-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-700 dark:text-neutral-500 select-none">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>⏎ Open</span>
          </div>
          <span>ESC close</span>
        </div>
      </div>
    </div>
  );
}