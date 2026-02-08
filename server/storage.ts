import { type User, type InsertUser, type Release, type InsertRelease, users, releases } from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getReleases(): Promise<Release[]>;
  getRelease(id: number): Promise<Release | undefined>;
  createRelease(release: InsertRelease): Promise<Release>;
  updateRelease(id: number, release: Partial<InsertRelease>): Promise<Release | undefined>;
  deleteRelease(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getReleases(): Promise<Release[]> {
    return db.select().from(releases).orderBy(asc(releases.sortOrder));
  }

  async getRelease(id: number): Promise<Release | undefined> {
    const [release] = await db.select().from(releases).where(eq(releases.id, id));
    return release;
  }

  async createRelease(release: InsertRelease): Promise<Release> {
    const [created] = await db.insert(releases).values(release).returning();
    return created;
  }

  async updateRelease(id: number, release: Partial<InsertRelease>): Promise<Release | undefined> {
    const [updated] = await db.update(releases).set(release).where(eq(releases.id, id)).returning();
    return updated;
  }

  async deleteRelease(id: number): Promise<boolean> {
    const result = await db.delete(releases).where(eq(releases.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
