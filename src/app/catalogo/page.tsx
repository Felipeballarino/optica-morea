import type { Metadata } from "next"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CatalogClient } from "@/components/catalogo/catalog-client"

export const metadata: Metadata = {
  title: "Catalogo de Anteojos y Lentes",
  description: "Explora nuestra coleccion de anteojos recetados, anteojos de sol, lentes de contacto y accesorios. Trabajamos con todas las obras sociales.",
  keywords: ["anteojos", "lentes", "catalogo", "anteojos recetados", "anteojos de sol", "lentes de contacto"],
  openGraph: {
    title: "Catalogo de Anteojos y Lentes | Optica Morea",
    description: "Explora nuestra coleccion de anteojos recetados, anteojos de sol, lentes de contacto y accesorios.",
    url: "/catalogo",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://optica-morea.vercel.app/",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Catalogo",
      "item": "https://optica-morea.vercel.app/catalogo",
    },
  ],
};

export default function CatalogoPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <div className="pt-24">
        <CatalogClient />
      </div>
      <Footer />
    </main>
  )
}
