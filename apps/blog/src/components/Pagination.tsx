import * as React from "react";
import { cn } from "@/lib/utils";
import { CaretLeft, CaretRight, Command, NumberSquareOne } from "@phosphor-icons/react";

export default function Pagination() {
  return (
    <div className="w-full font-mono text-xs flex flex-col md:flex-row items-center justify-between border border-border bg-card shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">

      {/* 1. Left Section: Page Info / Buffer Name */}
      <div className="flex items-center gap-4 px-4 py-2 border-b md:border-b-0 md:border-r border-border bg-muted/30 w-full md:w-auto">
        <div className="flex items-center gap-2 text-[hsl(var(--theme-color,160_84%_39%))]">
          <Command size={14} weight="bold" />
          <span className="font-bold uppercase">Navigator_v1</span>
        </div>
        <span className="text-muted-foreground hidden sm:inline">|</span>
        <span className="text-muted-foreground uppercase text-[10px]">Sector: 01/05</span>
      </div>

      {/* 2. Center Section: Page Numbers (The Buffer List) */}
      <div className="flex flex-1 items-center justify-center divide-x divide-border h-full">
        <NavButton icon={<CaretLeft size={16} weight="bold" />} label="PREV" disabled />

        <div className="flex items-center">
          <PageNumber num={1} active />
          <PageNumber num={2} />
          <PageNumber num={3} />
          <span className="px-3 text-muted-foreground">...</span>
          <PageNumber num={12} />
        </div>

        <NavButton icon={<CaretRight size={16} weight="bold" />} label="NEXT" />
      </div>

      {/* 3. Right Section: Shortcuts / Metadata */}
      <div className="hidden lg:flex items-center gap-3 px-4 py-2 border-l border-border bg-muted/10 text-muted-foreground text-[10px]">
        <span>PRESS [ <span className="text-foreground">L/R</span> ] TO JUMP</span>
      </div>
    </div>
  );
}

function PageNumber({ num, active = false }: { num: number; active?: boolean }) {
  return (
    <button
      className={cn(
        "px-4 py-3 transition-all duration-75 border-r border-border last:border-r-0",
        active
          ? "bg-[hsl(var(--theme-color,160_84%_39%))] text-white font-bold"
          : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
      )}
    >
      {num.toString().padStart(2, '0')}
      {active && <span className="ml-1 animate-pulse">_</span>}
    </button>
  );
}

function NavButton({ icon, label, disabled = false }: { icon: React.ReactNode; label: string; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "flex items-center gap-2 px-6 py-3 transition-colors uppercase font-bold tracking-tighter",
        disabled
          ? "opacity-30 cursor-not-allowed bg-muted/20"
          : "hover:bg-[hsl(var(--theme-color,160_84%_39%))] hover:text-white"
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
