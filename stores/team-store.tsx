"use client";

import { axiosInstance } from "@/lib/axios";
import axios from "axios";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const TeamSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable()
});

const TeamsResponseSchema = z.object({
    teams: z.array(TeamSchema),
    personalSpace: TeamSchema.nullable(),
});


export type Team = z.infer<typeof TeamSchema>;

type TeamState = {
    activeTeam: Team | null;
    teams: Array<Team>;
    personalSpace: Team | null;
};

type TeamActions = {
    getTeams: () => Promise<void>;
    switchTeam: (team: Team) => void;
    reset: () => void;
}

const initialState: TeamState = {
    activeTeam: null,
    teams: new Array<Team>,
    personalSpace: null,
}

export const useTeamStore = create<TeamState & TeamActions>()(
    persist(
        (set) => ({
            ...initialState,

            getTeams: async () => {
                try {
                    const response = await axiosInstance.get("/api/users/teams");
                    const parsed = TeamsResponseSchema.parse(response.data);

                    set((state) => {
                        return {
                            teams: parsed.teams,
                            personalSpace: parsed.personalSpace,
                            activeTeam: state.activeTeam === null ? parsed.teams[0] ?? parsed.personalSpace : state.activeTeam,
                        };
                    });

                } catch (error: any) {
                    if (axios.isAxiosError(error)) {
                        if (error.response?.status === 401) {
                            throw new Error("Invalid credentials");
                        }
                        throw new Error(error.response?.data?.message || "Unable to load teams. Please try again later");
                    }
                    console.error("Failed to fetch teams", error);
                    throw new Error("Unable to load teams. Please try again.");
                }
            },

            switchTeam: (team: Team) => {
                set({ activeTeam: team });
            },
        }),
        {
            name: "team-storage",
        }
    )
);