import { auth } from "@/auth/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  // Solo proteger rutas de admin
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn || req.auth?.user?.role !== "ADMIN") {
      return Response.redirect(new URL("/login", req.nextUrl));
    }
  }

  // Si está en login/register y ya está autenticado, redirigir
  if ((pathname.startsWith("/login") || pathname.startsWith("/register")) && isLoggedIn) {
    return Response.redirect(new URL("/", req.nextUrl));
  }
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/register",
  ],
};