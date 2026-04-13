import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CatalogClient } from "@/components/catalogo/catalog-client"

export const metadata = {
  title: "Catalogo - Optica Morea",
  description: "Explora nuestra coleccion de anteojos recetados, anteojos de sol, lentes de contacto y accesorios.",
}

export default function CatalogoPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24">
        <CatalogClient />
      </div>
      <Footer />
    </main>
  )
}
