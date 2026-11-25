import Fastify from "fastify";
import cors from "@fastify/cors";
import type { Health } from "@toshbekov/shared";
import { prisma } from "./db";

const app = Fastify({
  logger: {
    // Sezgir ma'lumot logga tushmasligi uchun auth headerlar yashiriladi
    redact: ["req.headers.authorization", "req.headers.cookie"],
  },
});

await app.register(cors, { origin: process.env.WEB_ORIGIN ?? true });

app.get("/health", async (_req, reply): Promise<Health> => {
  let db: Health["db"] = "ok";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    db = "error";
  }
  reply.code(db === "ok" ? 200 : 503);
  return { status: db === "ok" ? "ok" : "error", db, time: new Date().toISOString() };
});

app.get("/", async () => ({ message: "Salom! ToshbekovSchool API" }));

const port = Number(process.env.PORT ?? 4000);
await app.listen({ port, host: "0.0.0.0" });
