import { cn } from "@/lib/utils";
import Logo from "@/components/shared/logo";
import WelcomeForm from "@/components/forms/welcome-form";

export default function WelcomePage() {
    return (
        <div className={cn("flex flex-col items-center gap-20 justify-between min-h-full")}>
            <Logo
                className="text-5xl sm:text-6xl"
                type="long"
            />
            <div className="flex flex-col text-center gap-10 max-w-3xl">
                <p className={cn("text-5xl md:text-6xl underline")}>Welcome!</p>
                <p className="text-2xl md:text-3xl">
                    Before creating or joining a team,
                    let’s create your personal space!
                </p>
            </div>
            <WelcomeForm />
        </div>
    );
}