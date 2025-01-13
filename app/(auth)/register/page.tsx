import { cn } from "@/lib/utils";
import RegisterForm from "@/components/forms/register-form";
import Logo from "@/components/common/logo";

export default function LoginPage() {
    return (
        <div className={cn("grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-12 lg:gap-20")}>
            <div className={cn("flex flex-col gap-8 items-center lg:items-start")}>
                <Logo
                    className="text-5xl sm:text-6xl"
                    type="long"
                />
                <p className={cn("text-4xl sm:text-5xl max-w-xl text-center lg:text-start leading-tight lg:leading-[60px]")}>
                    Whatever happens here, <span className="font-bold">stays</span> here
                </p>
            </div>
            <RegisterForm className="w-full" />
        </div>
    );
}