"use client";

import { useEffect, useState } from "react";

type ServerStatus = {
  status: string;
  region: string;
  environment: string;
  nodeVersion: string;
  commitHash: string;
  serverUptime: number;
  latency: number;
};

export default function SystemMetrics() {
  const [latency, setLatency] = useState(118);
  const [queueSize, setQueueSize] = useState(0);
  const [serverData, setServerData] = useState<ServerStatus | null>(null);

  // Fetch true server diagnostics on load
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("/api/status");
        if (response.ok) {
          const data = await response.json();
          setServerData(data);
        }
      } catch (err) {
        // Fallback gracefully if endpoint is unreachable locally
        console.warn("Unable to fetch operational environment telemetry:", err);
      }
    };
    
    fetchStatus();
  }, []);

  // Simulated queue and socket operations ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => Math.max(105, Math.min(135, prev + (Math.random() > 0.5 ? 4 : -4))));
      setQueueSize((prev) => Math.max(0, Math.min(3, prev + (Math.random() > 0.7 ? 1 : -1))));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-card-border bg-card/60 rounded-xl p-4 sm:p-6 text-sm flex flex-col gap-4">
      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-card-border pb-3">
        <span className="font-mono font-bold text-[10px] sm:text-xs tracking-widest text-primary-500 uppercase">
          Observer Widget (Active Server telemetry)
        </span>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-[10px] sm:text-xs text-neutral-700 dark:text-neutral-500 font-mono font-semibold">
            Gateway Operational
          </span>
        </div>
      </div>

      {/* Grid: Mixes real-world API data with mock websocket loads */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] sm:text-xs font-mono">
        <div>
          <span className="block text-neutral-700 dark:text-neutral-500 uppercase tracking-wider mb-0.5">API SLA Rate</span>
          <span className="font-bold text-neutral-700 dark:text-neutral-300">99.98%</span>
        </div>
        <div>
          <span className="block text-neutral-700 dark:text-neutral-500 uppercase tracking-wider mb-0.5">WS Handshake</span>
          <span className="font-bold text-neutral-700 dark:text-neutral-300">{latency}ms</span>
        </div>
        <div>
          <span className="block text-neutral-700 dark:text-neutral-500 uppercase tracking-wider mb-0.5">Queue Payload</span>
          <span className="font-bold text-neutral-700 dark:text-neutral-300">{queueSize} msgs/s</span>
        </div>
        <div>
          <span className="block text-neutral-700 dark:text-neutral-500 uppercase tracking-wider mb-0.5">Redis Hit Rate</span>
          <span className="font-bold text-neutral-700 dark:text-neutral-300">94.2%</span>
        </div>
      </div>

      {/* Dynamic Infrastructure telemetry footer */}
      {serverData && (
        <div className="border-t border-card-border pt-3 mt-1 flex flex-wrap gap-x-6 gap-y-2 text-[8.5px] sm:text-[10px] font-mono text-neutral-700 dark:text-neutral-500">
          <div>
            <span className="font-bold text-primary-500">Region:</span> {serverData.region.toUpperCase()}
          </div>
          <div>
            <span className="font-bold text-primary-500">Env:</span> {serverData.environment}
          </div>
          <div>
            <span className="font-bold text-primary-500">Node:</span> {serverData.nodeVersion}
          </div>
          <div>
            <span className="font-bold text-primary-500">Commit:</span> {serverData.commitHash}
          </div>
          <div>
            <span className="font-bold text-primary-500">Uptime:</span> {serverData.serverUptime}s
          </div>
          <div>
            <span className="font-bold text-primary-500">Latency:</span> {serverData.latency}ms
          </div>
        </div>
      )}
    </div>
  );
}