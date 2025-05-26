"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "./cart-provider"
import {Product} from "@prisma/client";

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  return (
    <div className="group relative bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/productos/${product.id}`}>
        <div className="aspect-square relative overflow-hidden bg-slate-50">
          <Image
            src={product.imagesUrl[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/*product.featured && (
            <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600">Destacado</Badge>
          )*/}
          {product.price && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Oferta
            </Badge>
          )}
        </div>

        <div className="p-4">
          <div className="mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          </div>

          <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">{product.name}</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-slate-800">${product.price.toFixed(2)}</span>
              {product.price && (
                <span className="text-sm text-slate-500 line-through">${(product.price - product.discount).toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" size="sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar al Carrito
        </Button>
      </div>
    </div>
  )
}
