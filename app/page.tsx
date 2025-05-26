import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { ArrowRight, Truck, Shield, Headphones, Star, Crown } from "lucide-react"

// Mock data para productos destacados
const featuredProducts = [
  {
    id: "1",
    name: "Grifo Monomando Cocina Premium",
    price: 189.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Cocina",
    finish: "Negro Mate",
    brand: "Leonkrav",
    featured: true,
  },
  {
    id: "2",
    name: "Grifo Lavabo Cascada Moderno",
    price: 159.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Baño",
    finish: "Dorado",
    brand: "Leonkrav",
    featured: true,
  },
  {
    id: "3",
    name: "Columna de Ducha Termostática",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ducha",
    finish: "Negro Mate",
    brand: "Leonkrav",
    featured: true,
  },
  {
    id: "4",
    name: "Grifo Bañera Empotrado",
    price: 219.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Baño",
    finish: "Dorado",
    brand: "Leonkrav",
    featured: true,
  },
]

const categories = [
  {
    name: "Cocina",
    description: "Griferías de lujo para tu cocina",
    image: "/placeholder.svg?height=200&width=300",
    href: "/productos?category=cocina",
  },
  {
    name: "Baño",
    description: "Elegancia premium para tu baño",
    image: "/placeholder.svg?height=200&width=300",
    href: "/productos?category=baño",
  },
  {
    name: "Ducha",
    description: "Sistemas de ducha de alta gama",
    image: "/placeholder.svg?height=200&width=300",
    href: "/productos?category=ducha",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[700px] hero-bg flex items-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-white">
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="w-8 h-8 text-gold-500" />
              <span className="text-gold-500 font-semibold text-lg">LEONKRAV</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Griferías de <span className="text-gold-500">Lujo</span> para tu Hogar
            </h1>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              Descubre nuestra exclusiva colección de griferías premium. Diseño excepcional, calidad superior y
              elegancia sin igual para cocina, baño y ducha.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gold-600 text-black hover:bg-gold-700 font-semibold">
                <Link href="/productos" className="flex items-center">
                  Explorar Colección
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Ofertas Exclusivas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Envío Premium</h3>
              <p className="text-gray-600">Entrega gratuita en pedidos superiores a $10.000</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Garantía de Lujo</h3>
              <p className="text-gray-600">10 años de garantía en todos los productos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Soporte VIP</h3>
              <p className="text-gray-600">Atención personalizada 24/7</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">Calidad Premium</h3>
              <p className="text-gray-600">Materiales de la más alta calidad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Explora por Categorías</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Encuentra la grifería perfecta para cada espacio de tu hogar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-gold-500">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-6">{category.description}</p>
                    <Button
                      variant="outline"
                      className="group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors"
                    >
                      Ver Productos
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Productos Destacados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Descubre nuestras griferías más exclusivas con ofertas especiales
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800" asChild>
              <Link href="/productos">
                Ver Toda la Colección
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Únete a la Exclusividad</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Suscríbete a nuestro newsletter VIP y recibe ofertas exclusivas, lanzamientos anticipados y consejos de
            diseño de lujo.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-6 py-3 rounded-lg text-black border-2 border-gold-500 focus:outline-none focus:border-gold-400"
            />
            <Button className="bg-gold-600 text-black hover:bg-gold-700 font-semibold px-8">Suscribirse</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
