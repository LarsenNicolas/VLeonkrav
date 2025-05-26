'use client'

import { usePathname } from 'next/navigation'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import React from 'react'

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const isDashboardOrLogin = pathname.startsWith('/admin')

    return (
        <CartProvider>
            <div className="min-h-screen flex flex-col">
                {!isDashboardOrLogin && <Header />}
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </CartProvider>
    )
}
