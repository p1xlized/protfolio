'use client';
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import { BlogCard } from "@/components/ui/blog_card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

// 1. Define the fetcher (using the Root Env)
const API_URL = import.meta.env.VITE_API_URL;

// src/routes/index.tsx
export const Route = createFileRoute("/")({
  loader: async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(`${API_URL}/blog`);
      if (!res.ok) return []; // Return empty array instead of crashing
      return res.json();
    } catch (e) {
      console.error("API is down:", e);
      return []; // Fallback so the route still "exists"
    }
  },
  component: App
});

function App() {
  const projects = Route.useLoaderData();
  const navigate = useNavigate();
  async function handleClick(id: number) {


    // After the async operation, navigate to the home page
    navigate({ to: `/post/${id}` });
  }
  return (
    <div className="flex min-h-svh flex-col p-6 gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl tracking-tighter uppercase">
          Projects_From_API
        </h1>
        <div className="h-px w-full bg-border" /> {/* TUI-style separator */}
      </header>
      <div className="flex flex-col gap-6">
        <FilterBar />


      {/* The Grid Container */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.length > 0 ? (
          projects.map((p: any) => (
            <div key={p.id} className="flex justify-center">
              <BlogCard
                title={p.title}
                imageUrl={p.img || p.img} // Flexible mapping
                stats={p.stack || "v1.0.0"}
                navigate={() => handleClick(p.id)}
                themeColor="150 50% 25%"
              />
            </div>
          ))
        ) : (
          <p className="text-muted-foreground italic col-span-full">
            No projects found in the database...
          </p>
        )}
        </div>
        <Pagination />
      </div>
    </div>
  );
}
