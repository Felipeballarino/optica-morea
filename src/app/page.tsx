import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { About } from "@/components/sections/About";
import { Brands } from "@/components/sections/Brands";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Optician",
  "name": "Optica Morea",
  "description": "Optica de confianza en Villa Maria, Cordoba. Anteojos recetados, anteojos de sol, lentes de contacto, accesorios y terapia visual.",
  "url": "https://optica-morea.vercel.app",
  "telephone": "+543534117540",
  "email": "opticamorea@gmail.com",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "9 de Julio 291",
      "addressLocality": "Villa Maria",
      "addressRegion": "Cordoba",
      "addressCountry": "AR",
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Jose Ingenieros 244",
      "addressLocality": "Villa Maria",
      "addressRegion": "Cordoba",
      "addressCountry": "AR",
    },
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:30",
      "closes": "12:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "16:00",
      "closes": "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "12:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "16:30",
      "closes": "20:00",
    },
  ],
  "sameAs": [
    "https://instagram.com/opticamorea",
  ],
  "priceRange": "$$",
  "image": "https://optica-morea.vercel.app/og-image.jpg",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <Brands />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
