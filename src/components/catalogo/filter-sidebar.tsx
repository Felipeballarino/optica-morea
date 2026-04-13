"use client"

import { cn } from "@/lib/utils"

interface FilterSidebarProps {
  categories: string[]
  brands: string[]
  selectedCategory: string
  selectedBrand: string
  onCategoryChange: (category: string) => void
  onBrandChange: (brand: string) => void
}

export function FilterSidebar({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}: FilterSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
          Categorias
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                  selectedCategory === category
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
          Marcas
        </h3>
        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {brands.map((brand) => (
            <li key={brand}>
              <button
                onClick={() => onBrandChange(brand)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                  selectedBrand === brand
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {brand}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
