import { CaretDown, Database, FadersHorizontal, SortAscending, SortDescending, Target } from "@phosphor-icons/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@portfolio/ui/components/ui/collapsible";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  sortOrder: "ASC" | "DESC";
  setSortOrder: (val: "ASC" | "DESC") => void;
  workType: "ALL" | "PERSONAL" | "FREELANCE";
  setWorkType: (val: "ALL" | "PERSONAL" | "FREELANCE") => void;
  filter: string;
  setFilter: (val: string) => void;
}

export function ProjectFilters({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  workType,
  setWorkType,
  filter,
  setFilter,
}: ProjectFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Reusable Section Label for that HUD look
  const SectionLabel = ({ label, icon: Icon }: { label: string; icon?: any }) => (
    <div className="flex items-center gap-2 mb-4">
      {Icon && <Icon size={12} className="text-primary animate-pulse" />}
      <span className="text-[10px] uppercase tracking-[0.4em] text-primary/80 font-bold">
        {label}
      </span>
    </div>
  );

  const FilterContent = (
    <div className="space-y-10 pt-4 lg:pt-0">
      {/* 1. SEARCH MODULE WITH DECORATION */}
      <div className="space-y-3">
        <SectionLabel label="Search_Query" icon={Target} />
        <div className="relative group">
          {/* Decorative Brackets */}
          <div className="absolute -top-1 -left-1 size-2 border-t border-l border-primary/40 group-focus-within:border-primary transition-colors" />
          <div className="absolute -bottom-1 -right-1 size-2 border-b border-r border-primary/40 group-focus-within:border-primary transition-colors" />

          <input
            type="text"
            placeholder="INPUT_STRING..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-primary/[0.05] border border-primary/20 p-3 text-[11px] uppercase tracking-widest text-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-primary/20"
          />
        </div>
      </div>

      {/* 2. SEQUENCE ORDER (ICON TOGGLE) */}
      <div className="space-y-3">
        <SectionLabel label="Sequence" />
        <div className="flex gap-2">
          {[
            { id: "DESC", icon: SortDescending, label: "New" },
            { id: "ASC", icon: SortAscending, label: "Old" }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSortOrder(s.id as "ASC" | "DESC")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 border transition-all ${
                sortOrder === s.id
                ? "bg-primary border-primary text-background shadow-[0_0_10px_rgba(var(--primary-rgb),0.4)]"
                : "border-primary/20 text-primary hover:border-primary/60"
              }`}
            >
              <s.icon size={14} weight={sortOrder === s.id ? "bold" : "regular"} />
              <span className="text-[9px] uppercase tracking-tighter">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. CLASSIFICATION */}
      <div className="space-y-3">
        <SectionLabel label="Classification" />
        <div className="flex flex-col gap-1.5">
          {(["ALL", "PERSONAL", "FREELANCE"] as const).map((t) => {
            const isActive = workType === t;
            return (
              <button
                key={t}
                onClick={() => setWorkType(t)}
                className="group relative flex items-center justify-between px-3 py-2 overflow-hidden transition-all outline-none border border-transparent hover:border-primary/10"
              >
                <span className={`text-[11px] uppercase tracking-[0.2em] z-10 transition-colors ${isActive ? 'text-primary' : 'text-foreground/50'}`}>
                  {t}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="type-bg"
                    className="absolute inset-0 bg-primary/[0.08] border-l-2 border-primary"
                    initial={{ x: -10 }} animate={{ x: 0 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. CATEGORY INDEX */}
      <div className="space-y-3">
        <SectionLabel label="Category" icon={Database} />
        <nav className="flex flex-col gap-1">
          {["ALL", "WEB", "GAME", "MOBILE"].map((label) => {
            const isActive = filter === label;
            return (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`group flex items-center gap-3 px-3 py-2 text-left text-[11px] uppercase tracking-[0.2em] transition-all
                  ${isActive ? "text-primary font-bold" : "text-foreground/40 hover:text-primary hover:translate-x-1"}`}
              >
                <div className={`size-1.5 rotate-45 border border-primary transition-all ${isActive ? "bg-primary shadow-[0_0_8px_var(--primary)]" : "opacity-20"}`} />
                {label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <aside className="w-full lg:w-52 shrink-0">
      {/* MOBILE COLLAPSIBLE */}
      <div className="lg:hidden mb-8">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-primary/20 bg-background/50 backdrop-blur-md">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 group">
            <div className="flex items-center gap-3">
              <FadersHorizontal size={18} className="text-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">System_Filters</span>
            </div>
            <CaretDown
              size={16}
              className={`text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-6">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-6" />
            {FilterContent}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block sticky top-32">
        {FilterContent}
      </div>
    </aside>
  );
}
