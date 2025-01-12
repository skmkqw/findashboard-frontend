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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth";

const formSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: "First name is required" })
        .min(2, { message: "First name must be between 2 and 100 characters" })
        .max(100, { message: "First name must be between 2 and 100 characters" }),

    lastName: z
        .string()
        .min(1, { message: "Last name is required" })
        .min(2, { message: "Last name must be between 2 and 100 characters" })
        .max(100, { message: "Last name must be between 2 and 100 characters" }),

    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Please enter a valid email address" }),

    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/\W/, { message: "Password must contain at least one special character" })
});


export default function RegisterForm({ className }: { className?: string }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    });

    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await registerUser(values);
            router.push("/welcome");
        } catch (error: any) {
            setErrorMessage(error.message || "Failed to register. Please try again.");
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className={cn("max-w-md bg-secondary text-secondary-foreground rounded-lg p-6 sm:p-10 flex flex-col gap-8", className)}>
                <h2 className="text-3xl font-black">Register</h2>

                <div className="flex flex-col gap-6">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="John"
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
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg">Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Doe"
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
                    Already have an account?
                    <Link href="/login" className="underline font-medium ml-3">Log in</Link>
                </p>
            </form>
        </Form>
    );
}