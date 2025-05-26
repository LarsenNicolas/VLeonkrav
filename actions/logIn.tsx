"use server"

import { prisma } from "@/lib/prisma"

export async function logIn(formData: FormData): Promise<{ error?: string }> {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user || user.password !== password) {
            return { error: "Credenciales inválidas." }
        }

        return {}
    } catch (err) {
        console.error("Login error:", err)
        return { error: "Ocurrió un error inesperado. Intente nuevamente." }
    }
}
