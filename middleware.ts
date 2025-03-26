import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
        return NextResponse.next();
    }

    const token = request.cookies.get("AuthToken")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const decoded: { exp: number } = jwtDecode(token);
        const expirationTime = decoded.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
            console.warn("Token expired, redirecting to login...");
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } catch (error) {
        console.error("Invalid token format, redirecting to login...");
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|logo.png|favicon.ico).*)"
    ]
};
