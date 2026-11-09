import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sirf /admin dashboard aur pages wale routes ko protect karna hai
  const isAdminRoute = pathname.startsWith("/admin/dashboard") || pathname.startsWith("/admin/pages");
  const isLoginPage = pathname === "/admin";

  if (isAdminRoute || isLoginPage) {
    // Cookie se token nikalna
    const token = request.cookies.get("admin_token")?.value;
    
    // Agar token hai, toh usko verify karein
    const verifiedPayload = token ? await verifyToken(token) : null;

    if (isAdminRoute && !verifiedPayload) {
      // Agar admin route par hai aur token invalid/missing hai -> Redirect to Login
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (isLoginPage && verifiedPayload) {
      // Agar pehle se logged in hai aur login page par aaya -> Redirect to Dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Middleware kahan chalega, uski configuration
export const config = {
  matcher: [
    "/admin",
    "/admin/dashboard/:path*",
    "/admin/pages/:path*",
  ],
};