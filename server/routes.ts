import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReleaseSchema } from "@shared/schema";
import express from "express";
import path from "path";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use("/assets", express.static(path.resolve(process.cwd(), "attached_assets")));

  app.get("/api/releases", async (_req, res) => {
    try {
      const releases = await storage.getReleases();
      res.json(releases);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch releases" });
    }
  });

  app.get("/api/releases/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const release = await storage.getRelease(id);
      if (!release) return res.status(404).json({ message: "Release not found" });
      res.json(release);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch release" });
    }
  });

  app.post("/api/releases", async (req, res) => {
    try {
      const parsed = insertReleaseSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: parsed.error.message });
      }
      const release = await storage.createRelease(parsed.data);
      res.status(201).json(release);
    } catch (error) {
      res.status(500).json({ message: "Failed to create release" });
    }
  });

  app.patch("/api/releases/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

      const partial = insertReleaseSchema.partial().safeParse(req.body);
      if (!partial.success) {
        return res.status(400).json({ message: partial.error.message });
      }

      const updated = await storage.updateRelease(id, partial.data);
      if (!updated) return res.status(404).json({ message: "Release not found" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update release" });
    }
  });

  app.delete("/api/releases/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

      const deleted = await storage.deleteRelease(id);
      if (!deleted) return res.status(404).json({ message: "Release not found" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete release" });
    }
  });

  return httpServer;
}
