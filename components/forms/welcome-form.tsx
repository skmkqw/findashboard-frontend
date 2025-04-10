"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTeamStore } from "@/stores/team-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    spaceName: z
        .string()
        .min(1, { message: "Space name is required" })
});

export default function WelcomeForm() {
    const createPersonalSpace = useTeamStore((state) => state.createPersonalSpace);

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
            setErrorMessage("");
            setTimeout(() => {
                setErrorMessage(error.message || "Failed to create personal space");
            }, 200);
        }
    }

    function handleSkipButtonClick() {
        router.push("/");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-10">
                <div className="flex flex-col gap-4 items-center">
                    <FormField
                        control={form.control}
                        name="spaceName"
                        render={({ field }) => (
                            <FormItem
                                className={cn("rounded-lg bg-secondary px-3 py-1 sm:min-w-[450px]")}>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Your space name (eg. personal)..."
                                        className="bg-background py-3 text-lg rounded-lg"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-center" />
                            </FormItem>
                        )}
                    />

                    <div className="min-h-5">
                        {errorMessage && <FormMessage className="text-center">{errorMessage}</FormMessage>}
                    </div>
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