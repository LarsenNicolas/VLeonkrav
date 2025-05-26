"use client"

import {useState} from "react"
import Link from "next/link"
import Image from "next/image"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Plus, Search, MoreHorizontal, Edit, Trash2, Eye} from "lucide-react"
import {Product} from "@prisma/client";

// @ts-ignore
export default function ProductClient({ initialProducts: products }: { initialProducts: Product[] }) {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredProducts = products?.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];


    const getStockBadge = (stock: number, status: string) => {
        if (status === "out_of_stock" || stock === 0) {
            return <Badge variant="destructive">Sin Stock</Badge>
        }
        if (status === "low_stock" || stock <= 5) {
            return (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Stock Bajo
                </Badge>
            )
        }
        return (
            <Badge variant="default" className="bg-green-100 text-green-800">
                En Stock
            </Badge>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
                    <p className="text-gray-600">Gestiona tu catálogo de griferías</p>
                </div>
                <Button asChild className="bg-gold-600 text-black hover:bg-gold-700">
                    <Link href="/admin/productos/nuevo">
                        <Plus className="w-4 h-4 mr-2"/>
                        Nuevo Producto
                    </Link>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{products?.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">En Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="text-2xl font-bold text-green-600">{products?.filter((p: Product) => p.stock > 5).length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {products?.filter((p: Product) => p.stock > 0 && p.stock <= 5).length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Sin Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="text-2xl font-bold text-red-600">{products?.filter((p: Product) => p.stock === 0).length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-4">
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                            <Input
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Producto</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product: Product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Image
                                                src={product.imagesUrl[0] || "/placeholder.svg"}
                                                alt={product.name}
                                                width={40}
                                                height={40}
                                                className="rounded-lg h-[50px]"
                                            />
                                            <div>
                                                <p className="font-medium">{product.name}</p>
                                                <p className="text-sm text-gray-600">{product.category}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{getStockBadge(product.stock, "")}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="w-4 h-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="w-4 h-4 mr-2"/>
                                                    Ver
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="w-4 h-4 mr-2"/>
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="w-4 h-4 mr-2"/>
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
