import { axiosInstance } from "@/lib/axios";
import nookies from "nookies";
import { z } from "zod";
import { COOKIE_OPTIONS } from "@/lib/cookies";
import axios from "axios";

const PersonalSpaceSchema = z.object({
    id: z.string(),
    ownerId: z.string(),
    name: z.string(),
    description: z.string()
});

type PersonalSpace = z.infer<typeof PersonalSpaceSchema>;

export async function createPersonalSpace(data: { spaceName: string; }) {
    try {
        const response = await axiosInstance.post("/api/personalSpaces", data, {
            withCredentials: true
        });

        const personalSpace = PersonalSpaceSchema.parse(response.data);

        savePersonalSpace(personalSpace);

        return response.data;
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw new Error("Invalid input data");
        }
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 409) {
                throw new Error("Personal space already exists");
            }
            throw new Error(error.response?.data?.message || "Failed to create personal space. Please try again later");
        }
        throw new Error("An unexpected error occurred");
    }
}

function savePersonalSpace(personalSpace: PersonalSpace) {
    nookies.set(null, "PersonalSpaceId", personalSpace.id, COOKIE_OPTIONS);
    nookies.set(null, "PersonalSpaceName", personalSpace.name, COOKIE_OPTIONS);
}