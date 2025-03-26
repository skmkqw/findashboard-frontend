"use client";

import { useAuthStore } from "@/stores/auth-store";
import { User } from "lucide-react"

export default function NavUser() {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center gap-3">
      <span className="font-medium">{`${user?.firstName} ${user?.lastName}`}</span>
      <User className="h-[1.4rem] w-[1.4rem]" />
    </div>
  )
}