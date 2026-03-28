import { Elysia } from "elysia";
import {profile } from "./router/testimonials";
import { testimonials } from "./router/project";
import { blog } from "./router/blog";
import { music } from "./router/music";
import cors from "@elysiajs/cors";


const app = new Elysia({
  prefix: "/api"
}).use(cors({
    origin: 'http://localhost:5000', // Allow your Blog
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })).use(cors({
      origin: 'http://localhost:4023', // Allow your web
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }))
  .use(profile)
  .use(testimonials)
  .use(blog)
  .use(music)
  .listen(7000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
