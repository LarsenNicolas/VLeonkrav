"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, ArrowLeft, Check, Minus, Plus } from "lucide-react"
import dynamic from 'next/dynamic'

const ModelViewer = dynamic(() => import("@/components/modelViewer/ModelViewer"), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

// Mock data para el producto
const product = {
  id: "1",
  name: "Grifo Monomando Cocina Premium",
  price: 189.99,
  originalPrice: 249.99,
  images: [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ],
  category: "Cocina",
  finish: "Cromo",
  brand: "AquaLux",
  rating: 4.8,
  reviews: 127,
  inStock: true,
  description:
    "Grifo monomando de alta calidad para cocina con acabado cromado brillante. Diseño moderno y funcional con caño giratorio 360° y cartucho cerámico de larga duración.",
  features: [
    "Caño giratorio 360°",
    "Cartucho cerámico de 40mm",
    "Acabado cromado resistente",
    "Instalación estándar",
    "Garantía 5 años",
    "Certificación CE",
  ],
  specifications: {
    Material: "Latón cromado",
    Altura: "32 cm",
    Alcance: "22 cm",
    "Presión mínima": "0.5 bar",
    "Presión máxima": "5 bar",
    "Temperatura máxima": "80°C",
    Conexión: '1/2" BSP',
    Peso: "1.8 kg",
  },
}

const relatedProducts = [
  {
    id: "5",
    name: "Grifo Cocina Extraíble",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Cocina",
    finish: "Negro Mate",
    brand: "KitchenPro",
  },
  {
    id: "8",
    name: "Grifo Cocina Industrial",
    price: 349.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Cocina",
    finish: "Acero Inoxidable",
    brand: "ProChef",
  },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_ITEM", payload: product })
    }
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
        <Link href="/" className="hover:text-slate-800">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-slate-800">
          Productos
        </Link>
        <span>/</span>
        <Link href={`/productos?category=${product.category.toLowerCase()}`} className="hover:text-slate-800">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-800">{product.name}</span>
      </nav>

      {/* Back Button */}
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/productos">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al catálogo
        </Link>
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square relative mb-4 bg-slate-50 rounded-lg overflow-hidden">
            <ModelViewer />
            {/*
              <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          */}
            {product.originalPrice && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                -{discount}%
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-slate-800" : "border-slate-200"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{product.name}</h1>
            <p className="text-slate-600 mb-4">
              {product.brand} • {product.finish}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-600">
              {product.rating} ({product.reviews} reseñas)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-3xl font-bold text-slate-800">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-slate-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {product.originalPrice && (
              <p className="text-green-600 font-medium">
                Ahorras ${(product.originalPrice - product.price).toFixed(2)}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2 mb-6">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">En stock</span>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mb-8">
            <Label className="text-sm font-medium mb-2 block">Cantidad</Label>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center border border-slate-200 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleAddToCart} className="flex-1" size="lg">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Agregar al Carrito
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-4 h-4 mr-2" />
                Favoritos
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center space-x-3">
              <Truck className="w-5 h-5 text-slate-600" />
              <span className="text-sm">Envío gratuito en pedidos superiores a $10.000</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-slate-600" />
              <span className="text-sm">Garantía extendida de 5 años</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas ({product.reviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-slate-700 mb-6">{product.description}</p>
                <h3 className="font-semibold mb-4">Características principales:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-slate-100">
                      <span className="font-medium text-slate-700">{key}:</span>
                      <span className="text-slate-600">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <p className="text-slate-600">Las reseñas se mostrarían aquí</p>
                  <p className="text-sm text-slate-500 mt-2">Funcionalidad de reseñas pendiente de implementación</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">Productos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Link key={relatedProduct.id} href={`/productos/${relatedProduct.id}`}>
              <Card className="group hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  <p className="text-sm text-slate-600 mb-2">
                    {relatedProduct.brand} • {relatedProduct.finish}
                  </p>
                  <p className="font-bold text-slate-800">${relatedProduct.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
