import Elysia from "elysia";
import { getAllAlbums } from "../services/music.service";

export const music = new Elysia({ prefix: "/music" })
  .get("/", () => {
    try {
       const result = getAllAlbums();
       return result;
     }catch (error) {
       return {
         status: "error",
         message: error instanceof Error ? error.message : "Unknown error"
       };
     }
  })
