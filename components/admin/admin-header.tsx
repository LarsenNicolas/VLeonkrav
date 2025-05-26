import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, Settings, LogOut } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image src="/logo.png" alt="Leonkrav" width={120} height={40} className="h-8 w-auto" />
          </Link>
          <span className="text-gray-400">|</span>
          <h1 className="text-xl font-semibold text-gray-800">Panel de Administración</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
