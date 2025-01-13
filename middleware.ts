import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
        return NextResponse.next();
    }

    const token = request.cookies.get("AuthToken");

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|logo.png|favicon.ico).*)"
    ]
};
