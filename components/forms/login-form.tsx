"use client";

import { z } from "zod";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { loginUser } from "@/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Please enter a valid email address" }),

    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" })
});


export default function LoginForm({ className }: { className?: string }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await loginUser(values);
            router.push("/");
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.message || "Failed to log in. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form
                method="POST"
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("max-w-md bg-[#1C1917] text-white rounded-lg p-6 sm:p-10 flex flex-col gap-8 border-[1px] border-secondary", className)}
            >
                <h2 className="text-3xl font-black">Login</h2>

                <div className="flex flex-col gap-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="example@gmail.com"
                                        className="bg-white border-white py-3 text-base text-gray-600"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="**********"
                                        className="bg-white border-white py-3 text-base text-gray-600"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
                </div>

                <Button
                    type="submit"
                    className="text-xl"
                >
                    Submit
                </Button>

                <p className="text-center">
                    Don't have account?
                    <Link href="/register" className="underline font-medium ml-3">Register</Link>
                </p>
            </form>
        </Form>
    );
}