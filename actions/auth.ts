import { axiosInstance } from "@/lib/axios";
import nookies from "nookies";
import { redirect } from "next/navigation";
import { z } from "zod";
import axios from "axios";

const UserSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email()
});

type User = z.infer<typeof UserSchema>;

export async function registerUser(data: { firstName: string; lastName: string; email: string; password: string; }) {
    try {
        const response = await axiosInstance.post("api/auth/register", data, {
            withCredentials: true
        });

        const user = UserSchema.parse(response.data.user);
        saveUserData(user);

        return { user, success: true };
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw new RequestError("Invalid input data", 400, error.errors);
        }
        if (axios.isAxiosError(error)) {
            throw new RequestError(
                error.response?.data?.message || "Registration failed",
                error.response?.status
            );
        }
        throw new RequestError("An unexpected error occurred");
    }
}

export async function loginUser(data: { email: string; password: string; }) {
    try {
        const response = await axiosInstance.post("api/auth/login", data, {
            withCredentials: true
        });

        const user = UserSchema.parse(response.data.user);
        saveUserData(user);

        return { user, success: true };
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw new RequestError("Invalid input data", 400, error.errors);
        }
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                throw new RequestError("Invalid credentials", 401);
            }
            throw new RequestError(
                error.response?.data?.message || "Login failed",
                error.response?.status
            );
        }
        throw new RequestError("An unexpected error occurred");
    }
}

export async function logoutUser() {
    try {
        await axiosInstance.post("/api/auth/logout");
    } catch (error) {
        console.error("Logout request failed:", error);
    } finally {
        clearUserData();
        redirect("/login");
    }
}

function saveUserData(user: User) {
    Object.entries(user).forEach(([key, value]) => {
        nookies.set(null, key, value.toString(), COOKIE_OPTIONS);
    });
}

function clearUserData() {
    const cookies = nookies.get(null);
    Object.keys(cookies).forEach((cookieName) => {
        nookies.destroy(null, cookieName, COOKIE_OPTIONS);
    });
}

