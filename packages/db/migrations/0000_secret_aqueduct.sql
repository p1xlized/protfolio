CREATE TABLE `albums` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`release_date` integer NOT NULL,
	`cover_url` text,
	`genre` text
);
--> statement-breakpoint
CREATE TABLE `blog_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`img` text,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`published` integer DEFAULT false,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`tech` text NOT NULL,
	`tag` text NOT NULL,
	`role` text NOT NULL,
	`date` text NOT NULL,
	`cover` text NOT NULL,
	`github_url` text,
	`project_url` text,
	`is_video` integer DEFAULT false,
	`is_personal` integer DEFAULT true NOT NULL,
	`is_featured` integer DEFAULT false,
	`imgs` text NOT NULL,
	`features` text NOT NULL,
	`stack` text,
	`metrics` text NOT NULL,
	`awards` text
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` text PRIMARY KEY NOT NULL,
	`author` text NOT NULL,
	`role` text NOT NULL,
	`project` text NOT NULL,
	`date` text NOT NULL,
	`content` text NOT NULL,
	`hash` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tracks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`audio_url` text NOT NULL,
	`duration` integer,
	`track_number` integer,
	`album_id` integer NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade
);
