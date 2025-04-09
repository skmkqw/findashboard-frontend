"use client";

import { axiosInstance } from "@/lib/axios";
import axios from "axios";
import { redirect } from "next/navigation";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const UserSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email()
});


type User = z.infer<typeof UserSchema> | null;

type AuthState = {
    user: User;
    isAuthenticated: boolean;
};

type AuthActions = {
    login: (data: { email: string; password: string; }) => Promise<void>;
    register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
    logout: () => void;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false
}

export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            ...initialState,

            login: async (data: { email: string; password: string; }) => {
                try {
                    const response = await axiosInstance.post("/api/auth/login", data);

                    const user = UserSchema.parse(response.data.user);
                    set({ user, isAuthenticated: true });
                } catch (error: any) {
                    if (error instanceof z.ZodError) {
                        throw new Error("Invalid input data");
                    }
                    if (axios.isAxiosError(error)) {
                        if (error.response?.status === 401) {
                            throw new Error("Invalid credentials");
                        }
                        throw new Error(error.response?.data?.message || "Login failed. Please, try again later");
                    }
                    console.error(error);
                    throw new Error("An unexpected error occurred");
                }
            },

            register: async (data: any) => {
                try {
                    const response = await axiosInstance.post("/api/auth/register", data);

                    const user = UserSchema.parse(response.data.user);
                    set({ user, isAuthenticated: true });
                } catch (error: any) {
                    if (error instanceof z.ZodError) {
                        throw new Error("Invalid input data");
                    }
                    if (axios.isAxiosError(error)) {
                        if (error.response?.status === 409) {
                            throw new Error("User already exists");
                        }
                        throw new Error(error.response?.data?.message || "Registration failed. Please, try again later");
                    }
                    throw new Error("An unexpected error occurred");
                }
            },

            logout: () => {
                axios.post("/api/auth/logout").catch(() => { });
                set({ user: null, isAuthenticated: false });
                redirect("/login");
            },
        }),
        {
            name: "auth-storage",
        }
    )
);