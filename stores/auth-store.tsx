"use client";

import { axiosInstance } from "@/lib/axios";
import { COOKIE_OPTIONS } from "@/lib/cookies";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
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
    login: (data: { email: string; password: string; }) => Promise<void>;
    register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
    logout: () => void;
    checkTokenExpiration: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,

            login: async (data: { email: string; password: string; }) => {
                try {
                    const response = await axiosInstance.post("/api/auth/login", data, {
                        withCredentials: true
                    });

                    const user = UserSchema.parse(response.data.user);
                    set({ user, isAuthenticated: true });
                    Cookies.set("AuthToken", response.data.token, COOKIE_OPTIONS);
                    get().checkTokenExpiration();
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

            register: async (data) => {
                try {
                    const response = await axiosInstance.post("/api/auth/register", data, {
                        withCredentials: true
                    });

                    const user = UserSchema.parse(response.data.user);
                    set({ user, isAuthenticated: true });
                    Cookies.set("AuthToken", response.data.token, COOKIE_OPTIONS);
                    get().checkTokenExpiration();
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
                Cookies.remove("AuthToken", COOKIE_OPTIONS);
                set({ user: null, isAuthenticated: false });
                redirect("/login");
            },

            checkTokenExpiration: () => {
                const token = Cookies.get("AuthToken");
                if (!token) return;

                try {
                    const decoded: { exp: number } = jwtDecode(token);
                    const expirationTime = decoded.exp * 1000;
                    const currentTime = Date.now();

                    if (currentTime >= expirationTime) {
                        get().logout();
                    } else {
                        setTimeout(() => {
                            get().logout();
                        }, expirationTime - currentTime);
                    }
                } catch (error) {
                    console.error("Invalid token format", error);
                    get().logout();
                }
            }
        }),
        {
            name: "auth-storage",
        }
    )
);