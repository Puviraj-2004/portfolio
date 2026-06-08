"use client";

import { useState } from "react";
import { DiagramData, DiagramNode } from "@/lib/data";

export default function ArchitectureDiagram({ diagram }: { diagram: DiagramData | undefined }) {
  const [hoveredNode, setHoveredNode] = useState<DiagramNode | null>(null);
  const [activeMobileNode, setActiveMobileNode] = useState<string | null>(null);

  if (!diagram) return null;

  return (
    <div className="border border-card-border bg-card rounded-xl p-4 sm:p-6 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold tracking-widest text-primary-500 uppercase">
          System Architecture Diagram
        </span>
        <span className="text-[10px] font-mono text-neutral-700 dark:text-neutral-500">
          <span className="hidden sm:inline">Hover nodes to inspect properties</span>
          <span className="sm:hidden">Tap cards to inspect layers</span>
        </span>
      </div>

      {/* 1. MOBILE LAYOUT (sm:hidden) */}
      <div className="flex flex-col gap-3 sm:hidden">
        {diagram.nodes.map((node, idx) => {
          const isSelected = activeMobileNode === node.id;
          const isLast = idx === diagram.nodes.length - 1;

          return (
            <div key={node.id} className="flex flex-col items-center w-full">
              <button
                onClick={() => setActiveMobileNode(isSelected ? null : node.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-primary-500/5 border-primary-500 shadow-sm"
                    : "bg-background/40 border-card-border hover:bg-neutral-50 dark:hover:bg-neutral-900"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono font-bold text-xs text-neutral-700 dark:text-neutral-300">
                    {node.label}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-primary-50 dark:bg-primary-500/10 text-primary-500 font-bold shrink-0">
                    {node.tech}
                  </span>
                </div>
                
                <div className={`grid transition-all duration-300 ${
                  isSelected ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                }`}>
                  <p className="overflow-hidden text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {node.description}
                  </p>
                </div>
              </button>

              {/* Downward Connector Arrow with running flow animation */}
              {!isLast && (
                <div className="flex flex-col items-center py-2 h-10 w-full select-none relative">
                  <div className="w-0.5 h-full bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden rounded">
                    {/* Glowing packet traveling downwards */}
                    <div className="absolute w-0.5 h-4 bg-linear-to-b from-primary-500 to-transparent top-[-20%] left-0 mobile-flow-packet" />
                  </div>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-600 font-bold -mt-0.5 select-none">↓</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 2. DESKTOP LAYOUT (hidden sm:block) */}
      <div className="hidden sm:block relative w-full">
        <svg 
          viewBox="0 0 540 210" 
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" className="fill-neutral-700 dark:fill-neutral-500" />
            </marker>
          </defs>

          {/* Links */}
          {diagram.links.map((link, idx) => {
            const fromNode = diagram.nodes.find(n => n.id === link.from);
            const toNode = diagram.nodes.find(n => n.id === link.to);
            if (!fromNode || !toNode) return null;

            const isDiagonal = fromNode.x !== toNode.x && fromNode.y !== toNode.y;
            const pathData = isDiagonal
              ? `M ${fromNode.x + 51} ${fromNode.y} L ${toNode.x - 51} ${fromNode.y - 100} L ${toNode.x} ${toNode.y - 18}`
              : `M ${fromNode.x + 51} ${fromNode.y} L ${toNode.x - 51} ${toNode.y}`;

            return (
              <g key={idx}>
                <path
                  d={pathData}
                  fill="none"
                  strokeWidth="2"
                  className="stroke-neutral-100 dark:stroke-neutral-800"
                  markerEnd="url(#arrow)"
                />
                
                {link.animated && (
                  <path
                    d={pathData}
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray="4 8"
                    className="stroke-primary-500/60 dark:stroke-primary-500/50 animate-[dash_1.5s_linear_infinite]"
                    style={{
                      strokeDashoffset: 12
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {diagram.nodes.map((node) => {
            const isHovered = hoveredNode?.id === node.id;
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
              >
                <rect
                  x={node.x - 54}
                  y={node.y - 21}
                  width="108"
                  height="42"
                  rx="6"
                  className={`fill-transparent stroke-2 transition-all duration-300 ${
                    isHovered ? "stroke-primary-500/20" : "stroke-transparent"
                  }`}
                />
                
                <rect
                  x={node.x - 51}
                  y={node.y - 18}
                  width="102"
                  height="36"
                  rx="6"
                  className={`transition-all duration-300 ${
                    isHovered 
                      ? "fill-primary-50/10 dark:fill-primary-500/5 stroke-primary-500 shadow-md" 
                      : "fill-card stroke-card-border"
                  }`}
                  strokeWidth="1.5"
                />
                
                <text
                  x={node.x}
                  y={node.y - 1}
                  textAnchor="middle"
                  className="font-mono text-[8px] font-bold fill-neutral-700 dark:fill-neutral-300"
                >
                  {node.label}
                </text>
                
                <text
                  x={node.x}
                  y={node.y + 10}
                  textAnchor="middle"
                  className="font-mono text-[6.5px] font-semibold fill-primary-500"
                >
                  {node.tech}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Desktop Information Panel */}
      <div className="hidden sm:flex border-t border-card-border pt-4 min-h-15 flex-col justify-center">
        {hoveredNode ? (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono font-bold text-xs text-neutral-700 dark:text-neutral-300">
                {hoveredNode.label}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary-50 dark:bg-primary-500/10 text-primary-500 font-bold">
                {hoveredNode.tech}
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {hoveredNode.description}
            </p>
          </div>
        ) : (
          <p className="text-xs text-neutral-700 dark:text-neutral-500 font-mono italic">
            Hover over any nodes in the diagram above to inspect how the payload processes and flows through individual layers of the architecture stack.
          </p>
        )}
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -12;
          }
        }
        @keyframes flowDown {
          0% { top: -20%; opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .mobile-flow-packet {
          animation: flowDown 1.8s linear infinite;
        }
      `}</style>
    </div>
  );
}