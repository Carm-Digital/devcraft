import { randomUUID } from "node:crypto";
import { isKvStorageEnabled } from "@/lib/siteContent";

export type JournalEntry = {
  action: string;
  detail: string;
  timestamp: string;
};

export async function appendJournalEntry(action: string, detail: string): Promise<void> {
  if (!isKvStorageEnabled()) return;
  try {
    const { kv } = await import("@vercel/kv");
    const timestamp = new Date().toISOString();
    const key = `journal:${timestamp}:${randomUUID()}`;
    const payload: JournalEntry = { action, detail, timestamp };
    await kv.set(key, JSON.stringify(payload), { ex: 60 * 60 * 24 * 365 });
  } catch (err) {
    console.error("[adminJournal]", err);
  }
}
