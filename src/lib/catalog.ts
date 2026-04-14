export interface CatalogProduct {
  id: number
  codigo?: string
  name: string
  brand: string
  category: string
  image: string
  price: number
}

interface ApiProductInput {
  codproducto: number
  codigo?: string
  nombre?: string
  descripcion?: string
  marcaNombre?: string
  grupo?: string
  img1?: string
  precio_final?: number | string
}

export const mapApiProductToCatalog = (product: ApiProductInput): CatalogProduct => {
  return {
    id: product.codproducto,
    codigo: product.codigo,
    name: product.nombre || product.descripcion || "Producto sin nombre",
    brand: product.marcaNombre || "Sin marca",
    category: product.grupo || "General",
    image: product.img1 || "/products/placeholder.jpg",
    price: Number(product.precio_final ?? 0),
  }
}
