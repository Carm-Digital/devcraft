import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST() {
  const jar = await cookies();
  jar.delete(ADMIN_SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}

