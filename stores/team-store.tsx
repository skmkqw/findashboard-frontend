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
    createPersonalSpace: (data: { spaceName: string }) => Promise<void>;
    createTeam: (data: { name: string; description: string }) => Promise<void>;
    reset: () => void;
};

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

            createPersonalSpace: async (data: { spaceName: string }) => {
                try {
                    const response = await axiosInstance.post("/api/personalSpaces", data);
                    const personalSpace = TeamSchema.parse(response.data);

                    set(() => ({
                        personalSpace: personalSpace,
                        activeTeam: personalSpace,
                    }));
                } catch (error: any) {
                    if (axios.isAxiosError(error)) {
                        if (error.response?.status === 409) {
                            throw new Error("Personal space already exists");
                        }
                        throw new Error(error.response?.data?.message || "Failed to create personal space. Please try again later");
                    }
                    throw new Error("An unexpected error occurred");
                }
            },

            createTeam: async (data: { name: string; description: string }) => {
                try {
                    const response = await axiosInstance.post("/api/teams", data);
                    const newTeam = TeamSchema.parse(response.data);

                    set((state) => ({
                        teams: [...state.teams, newTeam],
                        activeTeam: newTeam,
                    }));
                } catch (error: any) {
                    if (axios.isAxiosError(error)) {
                        if (error.response?.status === 409) {
                            throw new Error("Team name already exists");
                        }
                        throw new Error(error.response?.data?.message || "Failed to create team. Please try again later");
                    }
                    throw new Error("An unexpected error occurred");
                }
            },

            reset: () => {
                set(initialState);
            }
        }),
        {
            name: "team-storage",
        }
    )
);