export const COOKIE_OPTIONS = {
    expires: 1,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax" as const
} as const;