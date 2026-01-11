import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function proxy(req) {
        const pathname = req.nextUrl.pathname;
        const role = req.nextauth.token?.role as "USER" | "ADMIN" | undefined;

        const referer = req.headers.get("referer") || "";
        const cameFromLogin = referer.includes("/login");

        const isAdminOnlyRoute =
            pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

        // USER tries to access admin-only routes
        if (isAdminOnlyRoute && role !== "ADMIN") {
            // Condition (2): If came from /login => go to /profile
            if (cameFromLogin) {
                return NextResponse.redirect(new URL("/profile", req.url));
            }

            // Condition (2): otherwise redirect back to the previous page (referer)
            if (referer) {
                return NextResponse.redirect(referer);
            }

            // Fallback: if no referer header exists, send to unauthorized
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        // Otherwise allow
        return NextResponse.next();
    },
    {
        callbacks: {
            // Require login for these matched routes
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*"],
};
