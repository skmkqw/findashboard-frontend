"use client";

import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPersonalSpace } from "@/actions/teams";
import { MoveRight } from "lucide-react";

const formSchema = z.object({
    spaceName: z
        .string()
        .min(1, { message: "Space name is required" })
});

export default function WelcomeForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            spaceName: ""
        }
    });

    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createPersonalSpace(values);
            router.push("/");
        } catch (error: any) {
            setErrorMessage(error.message || "Failed to create a space. Please try again.");
        }
    }

    function handleSkipButtonClick() {
        router.push("/");
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-10">
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="spaceName"
                        render={({ field }) => (
                            <FormItem
                                className={cn("rounded-lg bg-secondary px-5 py-2 shadow-[0px_0px_45px_10px_rgba(220,56,69,0.9)] sm:min-w-[400px]")}>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Your space name (eg. personal)..."
                                        className="bg-background py-3 text-base text-primary rounded-lg"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="text-xl py-6 px-10">Begin!</Button>
                <Button
                    variant="ghost"
                    onClick={handleSkipButtonClick}
                >
                    <p>Skip</p>
                    <MoveRight />
                </Button>
            </form>
        </Form>
    );
}