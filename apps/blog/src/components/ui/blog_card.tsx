import * as React from "react";
import { cn } from "@/lib/utils";
import { CaretRight, TerminalWindow, GithubLogo } from "@phosphor-icons/react";

interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string | null;
  title: string;
  stats: string;
  themeColor: string;
  navigate: () => void; // Corrected type definition
}

export const BlogCard = React.forwardRef<HTMLDivElement, BlogCardProps>(
  ({ className, imageUrl, title, stats, navigate, themeColor, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{ "--theme-color": themeColor } as React.CSSProperties}
        className={cn("group w-full h-full font-mono text-sm", className)}
        {...props}
      >
        <div
          onClick={navigate}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate()}
          className="relative block w-full h-full border border-border bg-card cursor-pointer
                     transition-all duration-75
                     shadow-[0px_0px_0px_0px_rgba(0,0,0,0)]
                     hover:shadow-[8px_8px_0px_0px_hsl(var(--theme-color)/0.3)]
                     hover:-translate-x-1 hover:-translate-y-1
                     active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-muted/50 px-3 py-1.5 text-[10px] uppercase tracking-widest
                          transition-colors duration-75
                          group-hover:bg-[hsl(var(--theme-color))] group-hover:text-white">
            <div className="flex items-center gap-2">
              <TerminalWindow
                size={14}
                weight="bold"
                className="text-[hsl(var(--theme-color))] group-hover:text-white"
              />
              <span>[ PROJECT_MODULE ]</span>
            </div>
            <span className="opacity-70">v2.1.0</span>
          </div>

          <div className="p-4 flex flex-col gap-4">
            <div className="relative aspect-video w-full border border-border bg-black overflow-hidden flex items-center justify-center
                            group-hover:border-[hsl(var(--theme-color))] transition-colors">
               {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="size-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <div className="text-muted-foreground/30 text-xs flex flex-col items-center gap-1.5">
                   <span>[ NO_DATA ]</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <h3 className="inline-block font-bold text-base leading-none uppercase tracking-tight
                             group-hover:bg-[hsl(var(--theme-color))] group-hover:text-white group-hover:px-1 transition-all">
                {"> "} {title}
              </h3>
              <div className="text-[11px] text-muted-foreground">
                <span className="text-[hsl(var(--theme-color))] group-hover:font-bold">$</span> stack --show
                <p className="mt-1.5 pl-4 border-l-2 border-border text-foreground/90 whitespace-normal leading-relaxed group-hover:border-[hsl(var(--theme-color))]">
                   {stats}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border px-3 py-2 bg-muted/30 text-[10px]
                          transition-colors duration-75
                          group-hover:bg-[hsl(var(--theme-color))] group-hover:text-white">
            <div className="flex items-center gap-1.5">
               <GithubLogo size={14} weight="bold" />
               <span className="opacity-70">origin/source</span>
            </div>
            <CaretRight
              size={16}
              weight="bold"
              className="transform transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    );
  }
);

BlogCard.displayName = "BlogCard";
