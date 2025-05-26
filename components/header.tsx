"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "./cart-provider"

export function Header() {
  const { state } = useCart()
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Leonkrav" width={120} height={40} className="h-10 w-auto" />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-black transition-colors font-medium">
              Inicio
            </Link>
            <Link href="/productos" className="text-gray-700 hover:text-black transition-colors font-medium">
              Productos
            </Link>
            <Link
              href="/productos?category=cocina"
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Cocina
            </Link>
            <Link
              href="/productos?category=baño"
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Baño
            </Link>
            <Link
              href="/productos?category=ducha"
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Ducha
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Buscar griferías..." className="pl-10 bg-gray-50 border-gray-200" />
            </div>
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/carrito">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs bg-gold-600 hover:bg-gold-700">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="text-gray-700 hover:text-black transition-colors font-medium">
                    Inicio
                  </Link>
                  <Link href="/productos" className="text-gray-700 hover:text-black transition-colors font-medium">
                    Productos
                  </Link>
                  <Link
                    href="/productos?category=cocina"
                    className="text-gray-700 hover:text-black transition-colors font-medium"
                  >
                    Cocina
                  </Link>
                  <Link
                    href="/productos?category=baño"
                    className="text-gray-700 hover:text-black transition-colors font-medium"
                  >
                    Baño
                  </Link>
                  <Link
                    href="/productos?category=ducha"
                    className="text-gray-700 hover:text-black transition-colors font-medium"
                  >
                    Ducha
                  </Link>
                  <Link href="/admin" className="text-gray-700 hover:text-black transition-colors font-medium">
                    Admin
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
