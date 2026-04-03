import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";
import { readMaintenanceMode } from "@/lib/readMaintenanceMode";

function isPublicAssetPath(pathname: string) {
  return /\.(svg|png|jpg|jpeg|gif|webp|ico|txt|xml|woff2?)$/i.test(pathname);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname === "/favicon.ico" || isPublicAssetPath(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const hasSession = Boolean(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
    if (!hasSession) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const isAdminUi = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isMaintenancePage = pathname === "/maintenance";

  if (!isAdminUi && !isAdminApi && !isMaintenancePage) {
    const maintenanceMode = await readMaintenanceMode();
    if (maintenanceMode) {
      const url = request.nextUrl.clone();
      url.pathname = "/maintenance";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_next/webpack-hmr).*)"],
};
