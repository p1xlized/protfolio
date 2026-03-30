import { Elysia } from "elysia";

import { blog } from "./router/blog";

import cors from "@elysiajs/cors";
import { profile } from "./router/profile";
import { contact } from "./router/contact";


const app = new Elysia({
  prefix: "/api"
}).use(
    cors({
      // 1. Pass an array to allow multiple specific origins
      origin: [
        'http://localhost:5000',
        'http://localhost:4023'
      ],
      // 2. Methods that allow a request body
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      // 3. Headers required for JSON bodies and Auth
      allowedHeaders: ['Content-Type', 'Authorization'],
      // 4. Set to true if you need to send cookies/sessions across domains
      credentials: true,
    })
  )
  .use(profile)
  .use(contact)
  .use(blog)
  .listen(7000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
