import { type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  // Redirigir /admin sin autenticación
  if (pathname.startsWith("/admin")) {
    const cookie = req.cookies.get("authjs.session-token")?.value;
    
    if (!cookie) {
      return Response.redirect(new URL("/login", req.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};