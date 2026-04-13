import { Glasses, Sun, Eye, Droplets, Gem, Brain } from "lucide-react"

const services = [
  {
    icon: Glasses,
    title: "Anteojos Recetados",
    description: "Amplia variedad de monturas y cristales de las mejores marcas para tu graduacion.",
  },
  {
    icon: Sun,
    title: "Anteojos de Sol",
    description: "Protege tus ojos con estilo. Modelos exclusivos con proteccion UV certificada.",
  },
  {
    icon: Eye,
    title: "Lentes de Contacto",
    description: "Lentes blandas y rigidas adaptadas a tus necesidades visuales.",
  },
  {
    icon: Droplets,
    title: "Liquidos y Soluciones",
    description: "Productos de limpieza y mantenimiento para tus lentes de contacto.",
  },
  {
    icon: Gem,
    title: "Accesorios",
    description: "Estuches, panos, cadenas y todo lo que necesitas para cuidar tus anteojos.",
  },
  {
    icon: Brain,
    title: "Terapia Visual",
    description: "Tratamientos especializados para mejorar la funcion visual y el rendimiento.",
  },
]

export function Services() {
  return (
    <section id="servicios" className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Nuestros Servicios
          </span>
          <h2 className="mt-4 italic text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Todo lo que necesitas para tu vision
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una amplia gama de productos y servicios para cuidar tu salud visual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-background rounded-xl p-8 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
