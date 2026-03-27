export interface Project {
  id: number
  title: string
  tech: string
  tag: string
  role: string
  date: string
  description: string
  cover: string
  imgs: Array<string>
  git?: string
  is_video?: boolean
  video_url?: string
  features: Array<string>
  metrics: Array<{
    label: string
    value: number
  }>
  awards?: Array<{
    title: string
    organization: string
  }>
}

export const projects: Array<Project> = [
  {
    id: 1,
    title: "GYMBUD",
    tech: "FLUTTER / SUPABASE / OPENAI",
    role: "Developer | AI Integration",
    date: "NOV_2024",
    tag: "MOBILE",
    description:
      "Led a 5-person team in a 24-hour hackathon to build an AI fitness MVP, implementing real-time adaptable workout logic via OpenAI and architecting a high-fidelity, gamified progression system that secured 3rd place overall and the Best Design award.",
    cover: "/assets/projects/gymbud.png",
    imgs: [
      "/assets/projects/gymbud.png",
      "/assets/projects/gymbud2.gif",
      "https://media.licdn.com/dms/image/v2/D4E22AQFfuXKdQLPydg/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1732720938191?e=1775692800&v=beta&t=luBHskv9-mrN8LgIdWYzk-PBzvDABwxhxJee1pU4vnc",
    ],
    git: "https://github.com/svdxx/gymbud",
    features: [
      "Gamified Progression",
      "Real-Time advice",
      "AI nutrition advices",
    ],
    metrics: [
      { label: "HACKATHON_SPEED", value: 100 },
      { label: "UI_FIDELITY", value: 96 },
    ],
    awards: [
      { title: "3RD_PLACE_OVERALL", organization: "HACKATHON_2024" },
      { title: "BEST_DESIGN_AWARD", organization: "HACKATHON_2024" },
    ],
  },
  {
    id: 2,
    title: "BEERBOLTER",
    tech: "REACT / THREE.JS / SUPABASE",
    role: "Solo Developer",
    date: "FEB_2025",
    tag: "WEB",
    description:
      "I developed this solo project as a high-performance 3D editor featuring a custom streaming pipeline that achieves sub-one-second load times. I maintained a stable 60 FPS by optimizing the rendering engine through GLTF instancing and efficient asset management. Additionally, I integrated Supabase to power real-time design sharing, version control, and community collaboration features.",
    cover: "/assets/projects/beerbolter.png",
    imgs: [
      "/assets/projects/beerbolter.png",
      "/assets/projects/beerbolter2.gif",
    ],
    git: "https://github.com/svdxx/homebrewer",
    features: ["GLTF_INSTANCING", "STREAMING_PIPELINE", "VERSION_CONTROL"],
    metrics: [
      { label: "Progress", value: 100 },
      { label: "LOAD_TIME_MS", value: 95 },
    ],
  },
  {
    id: 3,
    title: "KIRA",
    tech: "GODOT / GDSCRIPT",
    role: "GAME_ARCHITECT",
    tag: "GAME",
    date: "FEB_2025",
    description:
      "We developed a 2D exploration game from scratch featuring dynamic environment logic and a custom modular architecture. Our system efficiently manages over 300 concurrent objects, ensuring a lag-free experience even during complex gameplay. By optimizing the physics and navigation logic, we successfully reduced CPU overhead by 20% to maintain peak performance.",
    cover: "/assets/projects/kira1.png",
    imgs: ["/assets/projects/kira1.png", "/assets/projects/kira3.png"],
    git: "https://github.com/svdxx/kira",
    features: ["Interactive World", "Ennemy AI", "Veried Environements"],
    metrics: [{ label: "Progress", value: 100 }],
  },
  {
    id: 4,
    title: "JUNCTION_CHALLENGE",
    tech: "TYPESCRIPT / OPENAI / NODE.JS",
    role: "BACKEND",
    date: "NOV_2024",
    tag: "GAME",
    is_video: true,
    description:
      "Working in a team of five for the Junction 2024 hackathon, we designed a context-aware AI narrative engine utilizing recursive memory management for LLM prompt injection. This system enables dynamic storyline branching that adapts to player decisions and emotional tone in real-time. By optimizing the narrative pipeline, we achieved efficient content delivery with sub-10-second generation times for complex, branching dialogue.",
    cover: "/assets/projects/junc2025.png",
    imgs: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    ],
    video_url: "https://youtu.be/8T6qDzPPie0?si=sEVZRA0Dpj78lROx",
    features: [
      "NARRATIVE_BRANCHING",
      "CONTEXT_AWARE_BRANCHING",
      "STATE_PERSISTENCE",
    ],
    metrics: [{ label: "Progress", value: 100 }],
  },
  {
    id: 5,
    title: "FARMERS_DELIGHT",
    tech: "JAVA / FXGL /JavaFX",
    role: "SOLO_DEVELOPER",
    date: "JAN_2025",
    tag: "GAME",
    description:
      "I developed this solo project as a high-performance Java-based simulation engine utilizing LWJGL for custom rendering and multilayered generation. I architected an extensible entity-component system to manage complex crop growth cycles and resource management while maintaining a low memory footprint. By optimizing the grid-based tile logic, I ensured the application remains highly performant even during large-scale simulations.",
    cover:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
    imgs: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
    ],
    features: ["CUSTOM_TILE_ENGINE", "ECS_ARCHITECTURE", "RESOURCE_PIPELINE"],
    metrics: [{ label: "Progress", value: 60 }],
  },
  {
    id: 6,
    title: "CITY_LIFE",
    tech: "REACT NATIVE / SUPABASE / CITY OF MONTREAL API",
    role: "TEAM_OF_4",
    date: "FEB_2024",
    tag: "MOBILE",
    description:
      "Developed during a February 2024 hackathon, our team of four built an urban management platform featuring an adaptable calendar for public utility scheduling. We centralized access to all public resources through an integrated activity board, ensuring real-time updates and efficient information delivery for city residents. I contributed to the core logic that streamlined resource discovery and community engagement features.",
    cover: "/assets/projects/city.png",
    imgs: ["/assets/projects/city.png"],
    features: ["ADAPTABLE_CALENDAR", "RESOURCE_HUB", "ACTIVITY_BOARD"],
    metrics: [
      { label: "RESOURCE_ACCESSIBILITY", value: 95 },
      { label: "UI_RESPONSIVENESS", value: 92 },
    ],
  },
]
