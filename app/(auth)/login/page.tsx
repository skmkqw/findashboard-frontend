import Logo from "@/components/shared/logo";
import LoginForm from "@/components/forms/login-form";


export default function LoginPage() {
    return (
        <div className="grid items-center justify-items-center gap-12">
            <div className="flex flex-col gap-4 items-center">
                <Logo
                    className="text-5xl"
                    type="long"
                />
                <p className="text-3xl sm:text-4xl max-w-xl text-center">
                    Whatever happens here, <span className="font-bold">stays</span> here
                </p>
            </div>
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
}