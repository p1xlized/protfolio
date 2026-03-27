import * as React from "react";
import { MagnifyingGlass, Funnel, Cpu, Globe, BracketsCurly } from "@phosphor-icons/react";

export default function FilterBar() {
  return (
    <div className="w-full font-mono text-xs border border-border bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
      {/* 1. Prompt Header */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-3 py-1.5 uppercase tracking-tighter text-muted-foreground">
        <Funnel size={14} weight="bold" />
        <span>Filter_Engine_v1.0</span>
      </div>

      <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-border">

        {/* 2. Search Input (The Prompt) */}
        <div className="flex items-center gap-3 px-4 py-3 w-full md:w-1/3 group">
          <span className="text-emerald-500 font-bold">λ</span>
          <input
            type="text"
            placeholder="search_projects..."
            className="bg-transparent border-none outline-none w-full placeholder:text-muted-foreground/50 focus:ring-0 uppercase"
          />
        </div>

        {/* 3. Category Selectors (The Tabs) */}
        <div className="flex flex-wrap items-center gap-4 px-4 py-3 w-full md:flex-1 bg-muted/20">
          <FilterToggle label="ALL" icon={<BracketsCurly size={14} />} active />
          <FilterToggle label="WEB" icon={<Globe size={14} />} />
          <FilterToggle label="SYSTEMS" icon={<Cpu size={14} />} />
        </div>

        {/* 4. Results Counter */}
        <div className="hidden lg:flex items-center px-4 py-3 text-muted-foreground whitespace-nowrap">
          [ <span className="text-foreground mx-1 font-bold">12</span> RESULTS_FOUND ]
        </div>
      </div>
    </div>
  );
}

function FilterToggle({ label, icon, active = false }: { label: string, icon: React.ReactNode, active?: boolean }) {
  return (
    <button className={`
      flex items-center gap-2 px-2 py-1 transition-all duration-75
      ${active
        ? "bg-[hsl(var(--theme-color,160_84%_39%))] text-white"
        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"}
    `}>
      {icon}
      <span className="font-bold">{label}</span>
      {active && <span className="ml-1 text-[10px] animate-pulse">_</span>}
    </button>
  );
}
