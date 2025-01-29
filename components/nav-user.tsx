import { User } from "lucide-react"

export default function NavUser() {
  return (
    <div className="flex items-center gap-3">
      <span className="font-medium">John Doe</span>
      <User className="h-[1.4rem] w-[1.4rem]" />
    </div>
  )
}

