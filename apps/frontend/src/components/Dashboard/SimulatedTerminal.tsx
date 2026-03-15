"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

interface SimulatedTerminalProps {
  logs: string[];
}

export function SimulatedTerminal({ logs }: SimulatedTerminalProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [pausedLogs, setPausedLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const renderedLogs = useMemo(() => (isPaused ? pausedLogs : logs), [isPaused, pausedLogs, logs]);

  useEffect(() => {
    if (!isPaused) {
      setPausedLogs(logs);
    }
  }, [logs, isPaused]);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [renderedLogs]);

  return (
    <div className="fixed bottom-4 right-4 z-30 hidden w-115 overflow-hidden rounded-xl border border-[#1f2330] bg-[#090b12]/95 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:block">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-[#8b93a7]">Simulated Validator Terminal</p>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-[10px] text-[#8b93a7] hover:text-white hover:bg-white/10"
            onClick={() => setIsPaused((prev) => !prev)}
          >
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-[10px] text-[#8b93a7] hover:text-white hover:bg-white/10"
            onClick={() => setPausedLogs([])}
          >
            Clear
          </Button>
        </div>
      </div>
      <div ref={containerRef} className="h-56 overflow-y-auto px-4 py-3 font-mono text-xs leading-5 text-[#86f5c1]">
        {renderedLogs.map((line, idx) => (
          <div key={`${idx}-${line.slice(0, 14)}`} className="whitespace-pre-wrap wrap-break-word">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
