import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { profiles, projects, blogPosts, albums, tracks } from "./schema";
import path from "node:path";

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
  // Ensure this exact order
  await db.delete(tracks);      // Child of Albums
  await db.delete(albums);      // Child of Profile
  await db.delete(blogPosts);   // Child of Profile
  await db.delete(projects);    // Child of Profile
  await db.delete(profiles);    // The Parent

  console.log("Seeding Profile... 👤");
  const [me] = await db
    .insert(profiles)
    .values({
      id: "alex_01",
      name: "Alexandru Paduret",
      email: "alex@example.com", // Update with your actual email if needed
      bio: "Full-Stack Software Engineer & CS Student in Finland.",
      avatarUrl: "https://avatars.githubusercontent.com/u/72890769?v=4",
      githubUrl: "https://github.com/svdxx",
    })
    .returning();

  console.log("Seeding Music Albums... 💿");
  const [firstAlbum] = await db.insert(albums).values([
    {
      name: "Bitwise Melodies",
      description: "A collection of lo-fi tracks for late-night coding sessions on Arch Linux.",
      releaseDate: new Date("2026-01-15"),
      genre: "Lo-Fi / Synthwave",
      coverUrl: "https://picsum.photos/400/400",
      profileId: me.id,
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
      profileId: me.id,
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
      profileId: me.id,
      stack: ["React", "Three.js", "Supabase"]
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
      isPersonal: true,
      profileId: me.id,
      stack: ["Godot", "GDScript"]
    },
    // Inside the projects seeding section of your seed script:
      {
        title: "JUNCTION_CHALLENGE",
        tech: "TYPESCRIPT / OPENAI / NODE.JS",
        role: "BACKEND",
        date: "NOV_2024",
        tag: "GAME",
        description: "Working in a team of five for the Junction 2024 hackathon, we designed a context-aware AI narrative engine utilizing recursive memory management for LLM prompt injection. This system enables dynamic storyline branching that adapts to player decisions and emotional tone in real-time.",
        cover: "/assets/projects/junc2025.png",
        imgs: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"],

        // UPDATED: Added GitHub URL
        githubUrl: "https://github.com/svdxx/junction-2024",

        projectUrl: "https://youtu.be/8T6qDzPPie0?si=sEVZRA0Dpj78lROx",
        isVideo: true,
        features: ["NARRATIVE_BRANCHING", "CONTEXT_AWARE_BRANCHING", "STATE_PERSISTENCE"],
        metrics: [{ label: "Progress", value: 100 }],
        isFeatured: false,
        isPersonal: true,
        profileId: me.id,
        stack: ["TypeScript", "OpenAI", "Node.js"]
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
      profileId: me.id,
    }
  ]);

  console.log("Database has been seeded successfully. 🌱");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
