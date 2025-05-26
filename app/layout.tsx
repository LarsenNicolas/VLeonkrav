import type { Metadata } from "next"
import "./globals.css"
import { LayoutWrapper } from "@/components/LayoutWrapper"


export const metadata: Metadata = {
  title: "Leonkrav - Griferías de Lujo",
  description: "Importamos calidad, entregamos confianza",
  generator: 'Rasen Web'
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="es">
      <body>
      <LayoutWrapper>{children}</LayoutWrapper>
      </body>
      </html>
  )
}
