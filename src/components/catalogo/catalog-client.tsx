"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { ProductCard } from "./product-card"
import { FilterSidebar } from "./filter-sidebar"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { useAuth } from "@/lib/auth-store"
import { CatalogProduct, mapApiProductToCatalog } from "@/lib/catalog"
import { getProducts } from "@/services/product-services"
import { getBrands, getGroups } from "@/services/group-services"
import { hasRequiredApiEnv, requiredApiEnvErrorMessage } from "@/lib/api-routes"

export function CatalogClient() {
  const { isAuthenticated, isReady } = useAuth()
  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [categoriesFromApi, setCategoriesFromApi] = useState<string[]>([])
  const [brandsFromApi, setBrandsFromApi] = useState<string[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedBrand, setSelectedBrand] = useState("Todas")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (!isReady) return

    const loadData = async () => {
      setLoadingProducts(true)

      const [productsData, groupsData, brandsData] = await Promise.all([
        getProducts(),
        getGroups(),
        getBrands(),
      ])

      setProducts(productsData.map(mapApiProductToCatalog))

      const normalizedGroups = groupsData
        .map((item) => item.nombre || item.grupo || "")
        .filter(Boolean)
      setCategoriesFromApi(normalizedGroups)

      const normalizedBrands = brandsData
        .map((item) => item.nombre || item.marca || "")
        .filter(Boolean)
      setBrandsFromApi(normalizedBrands)

      setLoadingProducts(false)
    }

    void loadData()
  }, [isAuthenticated, isReady])

  const categories = useMemo(
    () =>
      ["Todos", ...Array.from(new Set([...categoriesFromApi, ...products.map((p) => p.category)]))],
    [categoriesFromApi, products],
  )

  const brands = useMemo(
    () => ["Todas", ...Array.from(new Set([...brandsFromApi, ...products.map((p) => p.brand)]))],
    [brandsFromApi, products],
  )

  const effectiveCategory = categories.includes(selectedCategory)
    ? selectedCategory
    : "Todos"
  const effectiveBrand = brands.includes(selectedBrand) ? selectedBrand : "Todas"

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        effectiveCategory === "Todos" || product.category === effectiveCategory
      const matchesBrand =
        effectiveBrand === "Todas" || product.brand === effectiveBrand
      return matchesSearch && matchesCategory && matchesBrand
    })
  }, [effectiveBrand, effectiveCategory, products, searchQuery])

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
        {!hasRequiredApiEnv ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Configuracion faltante: {requiredApiEnvErrorMessage}
          </p>
        ) : null}
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
            selectedCategory={effectiveCategory}
            selectedBrand={effectiveBrand}
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
              selectedCategory={effectiveCategory}
              selectedBrand={effectiveBrand}
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

          {loadingProducts ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Cargando productos...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
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
