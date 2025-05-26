"use server"

import {z} from 'zod';
import {revalidatePath} from 'next/cache';
import {prisma} from "@/prisma/prisma"
import {redirect} from "next/navigation";
import {Product} from "@prisma/client";

type GetProductsParams = {
    search?: string;
    category?: string;
    sort?: "asc" | "desc";
};

export async function getProducts({ search, category, sort }: GetProductsParams = {}) {
    try {
        return await prisma.product.findMany({
            where: {
                AND: [
                    search
                        ? {
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        }
                        : {},
                    category ? {category} : {},
                ],
            },
            orderBy: sort ? {price: sort} : undefined,
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
    }
}

export async function getProductById(id: string) {
    try {
        return await prisma.product.findUnique({
            where: { id },
        });
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        return {};
    }
}


export type FormState = {
    success: boolean;
    error?: string;
    issues?: {
        name?: string[];
        description?: string[];
        price?: string[];
        glbUrl?: string[];
        category?: string[];
        subcategory?: string[];
        stock?: string[];
        companyId?: string[];
    };
};

const schema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().min(0),
    glbUrl: z.string().url(),
    category: z.string().min(1),
    subcategory: z.string().min(1),
    stock: z.coerce.number().min(0),
    companyId: z.string().uuid(),
});

export async function createProduct(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const raw = Object.fromEntries(formData.entries());
    const result = schema.safeParse(raw);

    if (!result.success) {
        return {
            success: false,
            error: 'Revisá los campos obligatorios. Todos deben estar completos y válidos.',
            issues: result.error.flatten().fieldErrors,
        };
    }

    const { name, description, price, glbUrl, category, subcategory, stock, companyId } = result.data;

    try {
        await prisma.product.create({
            data: {
                name,
                description,
                price,
                glbUrl,
                category,
                subcategory,
                stock,
                companyId,
            },
        });

        revalidatePath('/dashboard/productos');
        return { success: true };
    } catch (err) {
        return {
            success: false,
            error: 'Ocurrió un error al guardar el producto. Intentalo nuevamente.',
        };
    }
}

export async function updateProduct(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const glbUrl = formData.get('glbUrl') as string;
    const id = formData.get('id') as string;

    if (!name || !description || isNaN(price) || !glbUrl) {
        throw new Error("Todos los campos son requeridos.");
    }

    await prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price,
            glbUrl,
        },
    });

    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');
}
