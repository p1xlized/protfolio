import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { projects, blogPosts, albums, tracks, testimonials } from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const db = drizzle(client);

async function seed() {
  console.log("Emptying existing data... 🧹");

  // Clean up in reverse order of dependencies
  await db.delete(tracks);      // Child of Albums
  await db.delete(albums);
  await db.delete(blogPosts);
  await db.delete(projects);
  await db.delete(testimonials);

  console.log("Seeding Testimonials... 💬");
  await db.insert(testimonials).values([
    {
      id: "U-01",
      author: "Marc-Antoine D.",
      role: "Senior Lead Dev",
      project: "Distributed Systems Architecture",
      date: "2026.02.14",
      content: "Exceptional mastery of distributed systems. The integration speed on the Golang backend was surgical. p1xlized is a force multiplier for any technical team requiring high-performance infrastructure.",
      hash: "0x88_SEC_ALPHA"
    },
    {
      id: "U-02",
      author: "Sarah L.",
      role: "Product Architect",
      project: "TUI Interface Framework",
      date: "2025.11.28",
      content: "The TUI-aesthetic portfolio components aren't just for show—the underlying React logic is some of the cleanest I've audited in years. Highly efficient and strictly typed codebase.",
      hash: "0x42_VAL_BETA"
    },
    {
      id: "U-03",
      author: "Jonas K.",
      role: "Full-Stack Dev",
      project: "Cloud Native Monorepo",
      date: "2026.01.05",
      content: "From TypeScript to low-level systems, the versatility is rare. Handled the monorepo deployment with zero downtime using ElysiaJS and Bun. A flawless execution under pressure.",
      hash: "0xFF_OPT_GAMMA"
    }
  ]);

  console.log("Seeding Music Albums... 💿");
  const [firstAlbum] = await db.insert(albums).values([
    {
      name: "Bitwise Melodies",
      description: "A collection of lo-fi tracks for late-night coding sessions on Arch Linux.",
      releaseDate: new Date("2026-01-15"),
      genre: "Lo-Fi / Synthwave",
      coverUrl: "https://picsum.photos/400/400",
    }
  ]).returning();

  console.log("Seeding Tracks... 🎵");
  await db.insert(tracks).values([
    {
      name: "Kernel Panic",
      description: "Distorted basslines and glitchy synths.",
      audioUrl: "/audio/kernel-panic.mp3",
      duration: 184,
      trackNumber: 1,
      albumId: firstAlbum.id,
    },
    {
      name: "Standard Output",
      description: "The sound of a successful build.",
      audioUrl: "/audio/stdout.mp3",
      duration: 210,
      trackNumber: 2,
      albumId: firstAlbum.id,
    }
  ]);

  console.log("Seeding Projects... 🛠️");
  await db.insert(projects).values([
    {
      title: "GYMBUD",
      tech: "FLUTTER / SUPABASE / OPENAI",
      role: "Developer | AI Integration",
      date: "NOV_2024",
      tag: "MOBILE",
      description: "Led a 5-person team in a 24-hour hackathon to build an AI fitness MVP, implementing real-time adaptable workout logic via OpenAI and architecting a high-fidelity, gamified progression system that secured 3rd place overall and the Best Design award.",
      cover: "/assets/projects/gymbud.png",
      imgs: ["/assets/projects/gymbud.png", "/assets/projects/gymbud2.gif", "https://media.licdn.com/dms/image/v2/D4E22AQFfuXKdQLPydg/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1732720938191?e=1775692800&v=beta&t=luBHskv9-mrN8LgIdWYzk-PBzvDABwxhxJee1pU4vnc"],
      githubUrl: "https://github.com/svdxx/gymbud",
      features: ["Gamified Progression", "Real-Time advice", "AI nutrition advices"],
      metrics: [{ label: "HACKATHON_SPEED", value: 100 }, { label: "UI_FIDELITY", value: 96 }],
      awards: [{ title: "3RD_PLACE_OVERALL", organization: "HACKATHON_2024" }, { title: "BEST_DESIGN_AWARD", organization: "HACKATHON_2024" }],
      isFeatured: true,
      isPersonal: true,
      stack: ["Flutter", "Supabase", "OpenAI"]
    },
    {
      title: "BEERBOLTER",
      tech: "REACT / THREE.JS / SUPABASE",
      role: "Solo Developer",
      date: "FEB_2025",
      tag: "WEB",
      description: "High-performance 3D editor featuring a custom streaming pipeline that achieves sub-one-second load times. Optimized rendering through GLTF instancing and asset management.",
      cover: "/assets/projects/beerbolter.png",
      imgs: ["/assets/projects/beerbolter.png", "/assets/projects/beerbolter2.gif"],
      githubUrl: "https://github.com/svdxx/homebrewer",
      features: ["GLTF_INSTANCING", "STREAMING_PIPELINE", "VERSION_CONTROL"],
      metrics: [{ label: "Progress", value: 100 }, { label: "LOAD_TIME_MS", value: 95 }],
      isFeatured: true,
      isPersonal: true,
      stack: ["React", "Three.js", "Supabase"],
      awards: []
    },
    {
      title: "KIRA",
      tech: "GODOT / GDSCRIPT",
      role: "GAME_ARCHITECT",
      tag: "GAME",
      date: "FEB_2025",
      description: "2D exploration game from scratch featuring dynamic environment logic and custom modular architecture managing 300+ concurrent objects.",
      cover: "/assets/projects/kira1.png",
      imgs: ["/assets/projects/kira1.png", "/assets/projects/kira3.png"],
      githubUrl: "https://github.com/svdxx/kira",
      features: ["Interactive World", "Enemy AI", "Varied Environments"],
      metrics: [{ label: "Progress", value: 100 }],
      isFeatured: false,
      isPersonal: true,
      stack: ["Godot", "GDScript"],
      awards: []
    },
    {
      title: "JUNCTION_CHALLENGE",
      tech: "TYPESCRIPT / OPENAI / NODE.JS",
      role: "BACKEND",
      date: "NOV_2024",
      tag: "GAME",
      description: "Working in a team of five for the Junction 2024 hackathon, we designed a context-aware AI narrative engine utilizing recursive memory management for LLM prompt injection. This system enables dynamic storyline branching that adapts to player decisions and emotional tone in real-time.",
      cover: "/assets/projects/junc2025.png",
      imgs: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"],
      githubUrl: "https://github.com/svdxx/junction-2024",
      projectUrl: "https://youtu.be/8T6qDzPPie0?si=sEVZRA0Dpj78lROx",
      isVideo: true,
      features: ["NARRATIVE_BRANCHING", "CONTEXT_AWARE_BRANCHING", "STATE_PERSISTENCE"],
      metrics: [{ label: "Progress", value: 100 }],
      isFeatured: false,
      isPersonal: true,
      stack: ["TypeScript", "OpenAI", "Node.js"],
      awards: []
    }
  ]);

  console.log("Seeding Blog Posts... ✍️");
  await db.insert(blogPosts).values([
    {
      slug: "moving-to-finland-2026",
      title: "My Journey to Kuopio",
      excerpt: "A deep dive into moving to Finland as a student and developer.",
      content: "Full markdown content goes here...",
      published: true,
    }
  ]);

  console.log("Database has been seeded successfully. 🌱");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
