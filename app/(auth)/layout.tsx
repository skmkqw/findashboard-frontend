import "../globals.css";
import Container from "@/components/shared/container";
import { cn } from "@/lib/utils";
import { Kode_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const kodeMono = Kode_Mono({
    weight: ["400", "500", "600"],
    subsets: ["latin"]
});

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={cn(kodeMono.className, "antialiased")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <Container className="bg-background w-screen flex items-center justify-center min-h-screen py-10">
                {children}
            </Container>
        </ThemeProvider>
        </body>
        </html>
    );
}
