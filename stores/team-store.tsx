"use client";

import { axiosInstance } from "@/lib/axios";
import axios from "axios";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const TeamSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable()
});

const TeamsResponseSchema = z.object({
    teams: z.array(TeamSchema),
    personalSpace: TeamSchema,
});


type Team = z.infer<typeof TeamSchema>;

type TeamState = {
    activeTeam: Team | null;
    teams: Array<Team>;
    personalSpace: Team | null;
    hasInitialized: boolean;
    getTeams: () => Promise<void>;
    switchTeam: (team: Team) => void;
};

export const useTeamStore = create<TeamState>()(
    persist(
        (set) => ({
            activeTeam: null,
            teams: [],
            personalSpace: null,
            hasInitialized: false,

            getTeams: async () => {
                try {
                    const response = await axiosInstance.get("/api/users/teams");
                    const parsed = TeamsResponseSchema.parse(response.data);

                    set((state) => {
                        return {
                          teams: parsed.teams,
                          personalSpace: parsed.personalSpace,
                          activeTeam: !state.hasInitialized
                            ? parsed.personalSpace ?? parsed.teams[0] ?? null
                            : state.activeTeam,
                          hasInitialized: true,
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