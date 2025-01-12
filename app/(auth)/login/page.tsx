import LoginForm from "@/components/forms/login-form";
import { cn } from "@/lib/utils";
import Logo from "@/components/common/logo";


export default function LoginPage() {
    return (
        <div className={cn("flex flex-col lg:flex-row items-center lg:justify-between gap-20")}>
            <div className={cn("flex flex-col gap-8 items-center lg:items-start")}>
                <Logo
                    className="text-5xl sm:text-6xl"
                    type="long"
                />
                <p className={cn("text-3xl sm:text-5xl max-w-xl text-center lg:text-start leading-tight lg:leading-[60px]")}>
                    Whatever happens here, <span className="font-bold">stays</span> here
                </p>
            </div>
            <LoginForm className="w-full" />
        </div>
    );
}