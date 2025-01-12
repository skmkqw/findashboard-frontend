import { axiosInstance } from "@/lib/axios";
import nookies from "nookies";
import { z } from "zod";
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
        const response = await axiosInstance.post("api/personalSpaces", data, {
            withCredentials: true
        });

        const personalSpace = PersonalSpaceSchema.parse(response.data);

        savePersonalSpace(personalSpace.id)

        return response.data;
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            throw new RequestError("Invalid input data", 400, error.errors);
        }
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 409) {
                throw new Error("Personal space already exists.");
            }

            throw new RequestError(
                error.response?.data?.message || "Personal space creation failed.",
                error.response?.status
            );
        }
        throw new RequestError("An unexpected error occurred");
    }
}

function savePersonalSpace(spaceId: string) {
    nookies.set(null, "PersonalSpaceId", spaceId, COOKIE_OPTIONS);
}