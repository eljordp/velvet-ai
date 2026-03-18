import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Promoter dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // Allow login page
    if (pathname === "/dashboard/login") return NextResponse.next();

    const session = request.cookies.get("velvet_session")?.value;
    if (!session) {
      return NextResponse.redirect(new URL("/dashboard/login", request.url));
    }
  }

  // Admin routes (JP's super admin)
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();

    const adminAuth = request.cookies.get("velvet_admin")?.value;
    if (!adminAuth) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // API auth for dashboard endpoints
  if (pathname.startsWith("/api/dashboard")) {
    const session = request.cookies.get("velvet_session")?.value;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/dashboard/:path*"],
};
