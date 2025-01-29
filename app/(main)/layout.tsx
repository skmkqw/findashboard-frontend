import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Kode_Mono } from "next/font/google";
import { AppSidebar } from "@/components/sidebar/index";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/common/mode-toggle";
import NavUser from "@/components/nav-user";

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
                    <SidebarProvider style={
                        {
                            "--sidebar-width": "350px",
                        } as React.CSSProperties
                    }
                    >
                        <AppSidebar />
                        <SidebarInset>
                            <header className="sticky top-0 flex shrink-0 items-center justify-between gap-2 border-b bg-background p-4">
                            <SidebarTrigger className="-ml-1" />
                            <div className="flex items-center gap-4">
                                <ModeToggle />
                                <NavUser />
                            </div> 
                            </header>
                            <div className="flex flex-1 flex-col gap-4 p-4">
                                <main>
                                    {children}
                                </main>
                            {Array.from({ length: 24 }).map((_, index) => (
                                <div
                                key={index}
                                className="aspect-video h-12 w-full rounded-lg bg-muted/50"
                                />
                            ))}
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
