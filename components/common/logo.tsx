import localFont from "next/font/local";
import { clsx } from "clsx";

const porterSans = localFont({ src: "../../public/fonts/porter-sans-block.ttf" });

export default function Logo({type, className}: {type: "short" | "long", className?: string}) {
    return (
        <p className={clsx(porterSans.className, "text-3xl", className)}>{type === "short" ? "Z" : "ZBANK"}</p>
    );
}
