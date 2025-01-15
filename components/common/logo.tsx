import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const porterSans = localFont({
    src: "../../public/fonts/porter-sans-block.ttf",
    variable: '--font-porter-sans',
    display: 'swap',
});

interface LogoProps {
    type: "short" | "long";
    className?: string;
    as?: 'h1' | 'p' | 'span';
}

export default function Logo({
    type,
    className,
    as: Component = 'p'
}: LogoProps) {
    return (
        <Component
            className={cn(
                porterSans.className,
                "text-3xl select-none cursor-pointer",
                className
            )}
        >
            {type === "short" ? "Z" : "ZBANK"}
        </Component>
    );
}