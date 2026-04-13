import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import Button from "../ui/Button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-card" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center lg:px-8">
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm text-muted-foreground border border-border">
            <Sparkles className="h-4 w-4 text-primary" />
            Trabajamos con todas las obras sociales
          </span>
        </div>
        
        <h1 className=" italic text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
          Tu vision,
          <span className="text-primary"> nuestra pasion</span>
        </h1>
        
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto text-pretty">
          Anteojos recetados, anteojos de sol, lentes de contacto, liquidos, accesorios y terapia visual. 
          Aceptamos todos los medios de pago.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button  size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/catalogo" className="flex items-end">
              Ver Catalogo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-border hover:bg-secondary">
            <Link href="#contacto">
              Contactanos
            </Link>
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-widest">Descubre mas</span>
            <div className="w-px h-12 bg-linear-to-b from-muted-foreground to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
