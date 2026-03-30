import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import appCss from '../styles.css?url'
import Navbar from "@/components/Navbar"
import { CustomCursor } from "@/components/Coursor"
import { fetchSystemData, systemStore } from "@/lib/data.store"

export const Route = createRootRoute({
  beforeLoad: async () => {
      // This populates the store before the component tree even mounts
      await fetchSystemData()
  },
  loader: async () => {
      await fetchSystemData();
      return { initialized: true };
    },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TanStack Start Starter" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      {/* Added cursor-none here to hide the system pointer everywhere */}
      <body className="md:cursor-none">
        <CustomCursor />
        <Navbar />
        {children}

        <TanStackDevtools
          config={{ position: "bottom-left" }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
