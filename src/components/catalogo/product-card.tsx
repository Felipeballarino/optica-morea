"use client"

import { Glasses } from "lucide-react"

interface Product {
  id: number
  name: string
  brand: string
  category: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300">
      {/* Image placeholder */}
      <div className="aspect-square bg-secondary flex items-center justify-center relative overflow-hidden">
        <Glasses className="h-16 w-16 text-muted-foreground/30" />
        <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <span className="text-xs text-primary font-medium uppercase tracking-wider">
          {product.brand}
        </span>
        <h3 className="mt-1 text-foreground font-medium group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {product.category}
        </p>
        <p className="mt-3 text-lg font-semibold text-foreground">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  )
}
