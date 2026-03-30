"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion} from "framer-motion"


// Loaders
import { DataUplink, SystemLoader } from "@/components/Loaders/Loader"
import ProjectArchiveCard from "@/components/Projects/ProjectCard"
import ProjectDetailView from "@/components/Projects/ProjectDetailsView"
import { ProjectFilters } from "@/components/Projects/ProjectFilter"
import PageBackground from "@/components/BackgroundEffects/ProjectBackground"
import { ShieldCheck } from "@phosphor-icons/react"
import { useStore } from "@tanstack/react-store"
import { systemStore } from "@/lib/data.store"
// import { Button } from "@portfolio/ui/components/ui/button";

export const Route = createFileRoute("/projects")({

  component: ProjectsPage,
})

export default function ProjectsPage() {
  const [isBooting, setIsBooting] = useState(true);
  const [isUplinking, setIsUplinking] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [filter, setFilter] = useState("ALL");
  const [workType, setWorkType] = useState<"ALL" | "PERSONAL" | "FREELANCE">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [time, setTime] = useState("");

  const projects = useStore(systemStore, (state) => state.projects)
  console.log("Projects in store:", projects);
  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    // Boot sequence is now controlled by the SystemLoader's onComplete
    return () => { clearInterval(interval); }
  }, []);

  const filteredProjects = useMemo(() => {
    let result = projects.filter((p: any) => {
      const matchesTag = filter === "ALL" || p.tag === filter;
      const matchesType = workType === "ALL" || (workType === "PERSONAL" ? p.isPersonal : !p.isPersonal);
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.tech.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesType && matchesSearch;
    });

    return result.sort((a: any, b: any) => {
      return sortOrder === "ASC" ? a.id - b.id : b.id - a.id;
    });
  }, [filter, workType, searchQuery, sortOrder, projects]);

  // --- TRANSITION LOGIC ---
  const handleProjectSelect = (id: number | null) => {
    setIsUplinking(true);
    // The DataUplink loader will call the completion logic which swaps the view
    // We store the pending ID to switch after the animation
    const pendingId = id;

    // Artificial delay to let the Uplink animation breathe
    setTimeout(() => {
      setSelectedId(pendingId);
      setCurrentIndex(0);
      setIsUplinking(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  };

  return (
    <div className="relative min-h-screen font-mono text-foreground selection:bg-primary/20 overflow-x-hidden">
      <PageBackground />

      {/* 1. INITIAL SYSTEM BOOT */}
      <AnimatePresence>
        {isBooting && (
          <SystemLoader
            key="sys-boot"
            onComplete={() => setIsBooting(false)}
            duration={2.5}
          />
        )}
      </AnimatePresence>

      {/* 2. DATA UPLINK TRANSITION */}
      <AnimatePresence>
        {isUplinking && (
          <DataUplink
            key="data-uplink"
            statusText={selectedId ? "DECRYPTING_ARCHIVE" : "ESTABLISHING_LINK"}
          />
        )}
      </AnimatePresence>

      {/* ================= HUD ================= */}
      {!isBooting && (
        <div className="fixed inset-0 z-[60] pointer-events-none hidden md:flex flex-col justify-between p-6 md:p-10">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col gap-2 pointer-events-auto">
                      <div className="text-[9px] uppercase tracking-[0.4em] text-primary/30 ml-2">
                        Loc: Orion_Arm // Sol_8.2
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                       <span className="text-[10px] uppercase tracking-widest text-primary/60">
                          {selectedId ? "Data_Link_Active" : "Archive_Standby"}
                       </span>
                       <span className="text-xs tabular-nums text-primary/40">[{time}]</span>
                    </div>
                  </div>
                  <div className="mt-auto flex items-end justify-between text-[9px] uppercase tracking-[0.3em] text-primary/30 w-full">
                    <span>Sys_v1.0.4 // {selectedId ? "Explorer_Mode" : "Repository"}</span>
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={14} className="text-primary/40" />
                      <span>Secure_Uplink</span>
                    </div>
                  </div>
                </div>
      )}

      {/* ================= CONTENT AREA ================= */}
      {!isBooting && (
        <main className="relative z-10 mx-auto max-w-7xl pt-24 pb-32 px-6">
          <AnimatePresence mode="wait">
            {!selectedId ? (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isUplinking ? 0 : 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* --- HEADER BLOCK --- */}
                <div className="flex flex-col gap-6 border-b border-primary/10 pb-6">
                   <div className="flex items-center gap-4">
                     <div className="h-[1px] w-12 bg-primary/40" />
                     <span className="text-[10px] uppercase tracking-[0.8em] text-primary/40">Repository_Index</span>
                   </div>

                   <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                      <div className="space-y-2">
                        <h1 className="text-4xl md:text-6xl uppercase tracking-tighter text-foreground/90 leading-none">
                          Projects
                        </h1>
                        <p className="text-[9px] uppercase tracking-[0.5em] text-primary/30 italic">
                          Active_Nodes // Total_Modules: {projects.length}
                        </p>
                      </div>

                      <div className="flex gap-8 text-[8px] uppercase tracking-widest text-primary/20">
                         <div className="flex flex-col gap-1">
                            <span>Status</span>
                            <span className="text-primary/60 animate-pulse">Syncing...</span>
                         </div>
                         <div className="flex flex-col gap-1 text-right">
                            <span>Hash</span>
                            <span className="text-primary/60 italic font-mono">0x{filteredProjects.length.toString(16).toUpperCase()}</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
                  <ProjectFilters
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      sortOrder={sortOrder}
                      setSortOrder={setSortOrder}
                      workType={workType}
                      setWorkType={setWorkType}
                      filter={filter}
                      setFilter={setFilter}
                    />

                  <div className="flex-1 space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                      {filteredProjects.map((p: any) => (

                          <ProjectArchiveCard key={p.id} project={p} onClick={() => handleProjectSelect(p.id)} />
                        ))}
                     </div>

                     <div className="pt-12 border-t border-primary/5 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-8 opacity-20">
                           <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-primary" />
                           <div className="flex gap-2">
                              {[...Array(4)].map((_, i) => <div key={i} className="size-1 bg-primary" />)}
                           </div>
                           <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-primary" />
                        </div>
                        <span className="text-[8px] uppercase tracking-[1em] text-primary/10">End_Of_Archive</span>
                     </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`detail-${selectedId}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isUplinking ? 0 : 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectDetailView
                  project={projects.find((p: any) => p.id === selectedId)!}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  onBack={() => handleProjectSelect(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}
    </div>
  );
}
