import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  isAdminPasswordConfigured,
  verifyEmail,
  verifyPassword,
} from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = body?.email ?? "";
  const password = body?.password ?? "";

  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      {
        error: "MISSING_ADMIN_CREDENTIALS",
        message: "ADMIN_EMAIL ou ADMIN_PASSWORD est manquant.",
      },
      { status: 500 },
    );
  }

  if (!verifyEmail(email) || !verifyPassword(password)) {
    return NextResponse.json({ error: "INVALID_CREDENTIALS", message: "Identifiants incorrects." }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return NextResponse.json({ ok: true });
}

