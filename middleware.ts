// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// const roleRoutes: Record<string, string[]> = {
//   "/sales/pos": ["server", "admin"],
//   "/sales/kds": ["cook", "admin"],
//   "/sales/payment": ["cashier", "admin"],
//   "/settings": ["admin"],
//   "/settings/users": ["admin"],
//   "/settings/roles": ["admin"],
// };

export async function middleware(req: NextRequest) {
  // allow public routes: splash, onboarding etc
//   if (req.nextUrl.pathname.startsWith("/splash") || req.nextUrl.pathname.startsWith("/onboarding")) {
//     return NextResponse.next();
//   }

//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   if (!token) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/splash";
//     return NextResponse.redirect(url);
//   }

//   const userRole = (token as any).role as string | undefined;

//   // check explicit route restrictions
//   for (const [route, allowed] of Object.entries(roleRoutes)) {
//     if (req.nextUrl.pathname.startsWith(route)) {
//       if (!userRole || !allowed.includes(userRole)) {
//         const url = req.nextUrl.clone();
//         url.pathname = "/unauthorized";
//         return NextResponse.redirect(url);
//       }
//     }
//   }

//   return NextResponse.next();
}

// export const config = {
//   matcher: [
//     /*
//       protect all dashboard routes - adjust as needed
//     */
//     "/(dashboard|sales|menu|inventory|purchases|settings|documentation|support)/:path*",
//     "/settings/:path*",
//   ],
// };
