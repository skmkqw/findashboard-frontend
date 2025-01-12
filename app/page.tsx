import { ModeToggle } from "@/components/common/mode-toggle";
import Logo from "@/components/common/logo";

export default function Home() {
    return (
        <main>
            <Logo type="long" />
            <h1>Welcome to ZBank!</h1>
            <ModeToggle />
        </main>
    );
}