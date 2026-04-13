"use client"

import { useState, useMemo } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { ProductCard } from "./product-card"
import { FilterSidebar } from "./filter-sidebar"
import Input from "../ui/Input"
import Button from "../ui/Button"

// Sample products data
const products = [
  {
    id: 1,
    name: "Aviator Classic",
    brand: "Ray-Ban",
    category: "Anteojos de Sol",
    price: 185000,
    image: "/products/rayban-aviator.jpg",
  },
  {
    id: 2,
    name: "Holbrook",
    brand: "Oakley",
    category: "Anteojos de Sol",
    price: 220000,
    image: "/products/oakley-holbrook.jpg",
  },
  {
    id: 3,
    name: "Linea Rossa",
    brand: "Prada",
    category: "Anteojos Recetados",
    price: 350000,
    image: "/products/prada-linea.jpg",
  },
  {
    id: 4,
    name: "GG Squared",
    brand: "Gucci",
    category: "Anteojos de Sol",
    price: 420000,
    image: "/products/gucci-squared.jpg",
  },
  {
    id: 5,
    name: "Medusa Head",
    brand: "Versace",
    category: "Anteojos Recetados",
    price: 380000,
    image: "/products/versace-medusa.jpg",
  },
  {
    id: 6,
    name: "EA4033",
    brand: "Emporio Armani",
    category: "Anteojos de Sol",
    price: 195000,
    image: "/products/armani-ea4033.jpg",
  },
  {
    id: 7,
    name: "Champion",
    brand: "Carrera",
    category: "Anteojos de Sol",
    price: 165000,
    image: "/products/carrera-champion.jpg",
  },
  {
    id: 8,
    name: "VO5286",
    brand: "Vogue",
    category: "Anteojos Recetados",
    price: 145000,
    image: "/products/vogue-vo5286.jpg",
  },
  {
    id: 9,
    name: "Wayfarer",
    brand: "Ray-Ban",
    category: "Anteojos de Sol",
    price: 175000,
    image: "/products/rayban-wayfarer.jpg",
  },
  {
    id: 10,
    name: "Frogskins",
    brand: "Oakley",
    category: "Anteojos de Sol",
    price: 180000,
    image: "/products/oakley-frogskins.jpg",
  },
  {
    id: 11,
    name: "Acuvue Oasys",
    brand: "Johnson & Johnson",
    category: "Lentes de Contacto",
    price: 45000,
    image: "/products/acuvue-oasys.jpg",
  },
  {
    id: 12,
    name: "Air Optix",
    brand: "Alcon",
    category: "Lentes de Contacto",
    price: 52000,
    image: "/products/air-optix.jpg",
  },
  {
    id: 13,
    name: "Solucion Multiproposito",
    brand: "ReNu",
    category: "Liquidos",
    price: 12000,
    image: "/products/renu-solution.jpg",
  },
  {
    id: 14,
    name: "Estuche Premium",
    brand: "Optica Morea",
    category: "Accesorios",
    price: 8500,
    image: "/products/case-premium.jpg",
  },
  {
    id: 15,
    name: "Clubmaster",
    brand: "Ray-Ban",
    category: "Anteojos Recetados",
    price: 195000,
    image: "/products/rayban-clubmaster.jpg",
  },
]

const categories = [
  "Todos",
  "Anteojos de Sol",
  "Anteojos Recetados",
  "Lentes de Contacto",
  "Liquidos",
  "Accesorios",
]

const brands = [
  "Todas",
  "Ray-Ban",
  "Oakley",
  "Prada",
  "Gucci",
  "Versace",
  "Emporio Armani",
  "Carrera",
  "Vogue",
  "Johnson & Johnson",
  "Alcon",
  "ReNu",
  "Optica Morea",
]

export function CatalogClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedBrand, setSelectedBrand] = useState("Todas")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory
      const matchesBrand =
        selectedBrand === "Todas" || product.brand === selectedBrand
      return matchesSearch && matchesCategory && matchesBrand
    })
  }, [searchQuery, selectedCategory, selectedBrand])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Todos")
    setSelectedBrand("Todas")
  }

  const hasActiveFilters =
    searchQuery || selectedCategory !== "Todos" || selectedBrand !== "Todas"

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <span className="text-primary text-sm font-medium uppercase tracking-widest">
          Catalogo
        </span>
        <h1 className="mt-4 italic text-3xl font-bold text-foreground sm:text-4xl">
          Nuestra Coleccion
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Explora nuestra amplia seleccion de anteojos, lentes de contacto y accesorios de las mejores marcas.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar productos, marcas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <Button
          variant="outline"
          className="sm:hidden border-border"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filtros
        </Button>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Limpiar filtros
          </Button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterSidebar
            categories={categories}
            brands={brands}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            onCategoryChange={setSelectedCategory}
            onBrandChange={setSelectedBrand}
          />
        </aside>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="lg:hidden">
            <FilterSidebar
              categories={categories}
              brands={brands}
              selectedCategory={selectedCategory}
              selectedBrand={selectedBrand}
              onCategoryChange={setSelectedCategory}
              onBrandChange={setSelectedBrand}
            />
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} productos encontrados
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No se encontraron productos con los filtros seleccionados.
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4 border-border"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
