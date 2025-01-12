import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Kode_Mono } from "next/font/google";

export const metadata: Metadata = {
    title: "ZBank",
    description: "Collaborative activity and assets tracking platform"
};

const kodeMono = Kode_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
});

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${kodeMono.className} antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
