import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// --- Tables ---

export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey(), // e.g., "U-01"
  author: text("author").notNull(),
  role: text("role").notNull(),
  project: text("project").notNull(),
  date: text("date").notNull(),
  content: text("content").notNull(),
  hash: text("hash").notNull(),
});

export const projects = sqliteTable("projects", {
  // Base Identifiers
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Core Metadata
  title: text("title").notNull(),
  description: text("description").notNull(),
  tech: text("tech").notNull(),      // Main tech (e.g., "React / Bun")
  tag: text("tag").notNull(),        // Category (e.g., "Full-Stack")
  role: text("role").notNull(),      // Your role (e.g., "Lead Dev")
  date: text("date").notNull(),      // Date string

  // Media & Links
  cover: text("cover").notNull(),    // Cover image URL
  githubUrl: text("github_url"),     // Mapping 'git' from interface
  projectUrl: text("project_url"),   // Mapping 'video_url' or live link
  isVideo: integer("is_video", { mode: "boolean" }).default(false),
  isPersonal: integer("is_personal", { mode: "boolean" })
      .notNull()
      .default(true),

  // Feature Flags
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),

  // Complex Types (Stored as JSON)
  imgs: text("imgs", { mode: "json" }).$type<string[]>().notNull(),
  features: text("features", { mode: "json" }).$type<string[]>().notNull(),
  stack: text("stack", { mode: "json" }).$type<string[]>(),

  metrics: text("metrics", { mode: "json" }).$type<
    Array<{ label: string; value: number }>
  >().notNull(),

  awards: text("awards", { mode: "json" }).$type<
    Array<{ title: string; organization: string }>
  >(),
});

export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  img: text("img"),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  published: integer("published", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

// --- Albums Table ---
export const albums = sqliteTable("albums", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  releaseDate: integer("release_date", { mode: "timestamp" }).notNull(),
  coverUrl: text("cover_url"),
  genre: text("genre"),
});

// --- Tracks Table (Linked to Album) ---
export const tracks = sqliteTable("tracks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  audioUrl: text("audio_url").notNull(),
  duration: integer("duration"), // in seconds
  trackNumber: integer("track_number"),

  // Link to Album
  albumId: integer("album_id")
    .notNull()
    .references(() => albums.id, { onDelete: "cascade" }),
});

// --- Relations ---

export const albumsRelations = relations(albums, ({ many }) => ({
  tracks: many(tracks),
}));

export const tracksRelations = relations(tracks, ({ one }) => ({
  album: one(albums, {
    fields: [tracks.albumId],
    references: [albums.id],
  }),
}));
