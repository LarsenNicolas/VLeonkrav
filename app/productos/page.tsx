"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"
import { useSearchParams } from "next/navigation"

// Mock data para productos
const allProducts = [
  {
    id: "1",
    name: "Grifo Monomando Cocina Premium",
    price: 189.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Cocina",
    finish: "Cromo",
    brand: "AquaLux",
    featured: true,
  },
  {
    id: "2",
    name: "Grifo Lavabo Cascada Moderno",
    price: 159.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Baño",
    finish: "Negro Mate",
    brand: "ModernFlow",
    featured: true,
  },
  {
    id: "3",
    name: "Columna de Ducha Termostática",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ducha",
    finish: "Dorado",
    brand: "LuxShower",
    featured: true,
  },
  {
    id: "4",
    name: "Grifo Bañera Empotrado",
    price: 219.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Baño",
    finish: "Cromo",
    brand: "AquaLux",
  },
  {
    id: "5",
    name: "Grifo Cocina Extraíble",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Cocina",
    finish: "Negro Mate",
    brand: "KitchenPro",
  },
  {
    id: "6",
    name: "Grifo Lavabo Sensor",
    price: 279.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Baño",
    finish: "Cromo",
    brand: "SmartFlow",
  },
  {
    id: "7",
    name: "Ducha de Mano Premium",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ducha",
    finish: "Dorado",
    brand: "LuxShower",
  },
  {
    id: "8",
    name: "Grifo Cocina Industrial",
    price: 349.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Cocina",
    finish: "Acero Inoxidable",
    brand: "ProChef",
  },
]

const categories = ["Cocina", "Baño", "Ducha"]
const finishes = ["Cromo", "Negro Mate", "Dorado", "Acero Inoxidable"]
const brands = ["AquaLux", "ModernFlow", "LuxShower", "KitchenPro", "SmartFlow", "ProChef"]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || ""

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : [])
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 400])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
        const matchesFinish = selectedFinishes.length === 0 || selectedFinishes.includes(product.finish)
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

        return matchesSearch && matchesCategory && matchesFinish && matchesBrand && matchesPrice
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "name":
            return a.name.localeCompare(b.name)
          case "featured":
          default:
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        }
      })
  }, [searchTerm, selectedCategories, selectedFinishes, selectedBrands, priceRange, sortBy])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleFinishChange = (finish: string, checked: boolean) => {
    if (checked) {
      setSelectedFinishes([...selectedFinishes, finish])
    } else {
      setSelectedFinishes(selectedFinishes.filter((f) => f !== finish))
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedFinishes([])
    setSelectedBrands([])
    setPriceRange([0, 400])
    setSearchTerm("")
  }

  const activeFiltersCount = selectedCategories.length + selectedFinishes.length + selectedBrands.length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Catálogo de Productos</h1>
        <p className="text-slate-600">Descubre nuestra amplia selección de griferías premium</p>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
            <Filter className="w-4 h-4 mr-2" />
            Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Destacados</SelectItem>
              <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="name">Nombre A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Filtros</CardTitle>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Limpiar
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Categories */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Categoría</Label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <Label htmlFor={category} className="text-sm font-normal">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Finishes */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Acabado</Label>
                <div className="space-y-2">
                  {finishes.map((finish) => (
                    <div key={finish} className="flex items-center space-x-2">
                      <Checkbox
                        id={finish}
                        checked={selectedFinishes.includes(finish)}
                        onCheckedChange={(checked) => handleFinishChange(finish, checked as boolean)}
                      />
                      <Label htmlFor={finish} className="text-sm font-normal">
                        {finish}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Marca</Label>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                      />
                      <Label htmlFor={brand} className="text-sm font-normal">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Precio: €{priceRange[0]} - €{priceRange[1]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={400}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-slate-600">Mostrando {filteredProducts.length} productos</div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">No se encontraron productos con los filtros seleccionados</p>
              <Button onClick={clearFilters}>Limpiar Filtros</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
