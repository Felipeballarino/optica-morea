import { Check, Award, Users, Clock } from "lucide-react"
import Image from "next/image"
import interiorPhoto from "@/assets/IMG_9901.jpeg"
import storefrontPhoto from "@/assets/EXTERIOR.webp"

const features = [
  "Trabajamos con todas las obras sociales",
  "Todos los medios de pago aceptados",
  "Atencion personalizada",
  "Profesionales capacitados",
]

const stats = [
  { icon: Award, value: "+15", label: "Anos de experiencia" },
  { icon: Users, value: "+5000", label: "Clientes satisfechos" },
  { icon: Clock, value: "2", label: "Sucursales" },
]

export function About() {
  return (
    <section id="nosotros" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-widest">
              Sobre Nosotros
            </span>
            <h2 className="mt-4 italic  text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Cuidamos tu vision con dedicacion y profesionalismo
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              En Optica Morea nos especializamos en brindar soluciones visuales de calidad. 
              Contamos con un equipo de profesionales comprometidos con tu bienestar visual, 
              ofreciendo productos de las mejores marcas y servicios personalizados.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Nuestra mision es mejorar la calidad de vida de nuestros clientes a traves 
              de una atencion excepcional y productos de primera calidad.
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual + Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative min-h-[360px] sm:min-h-[420px] overflow-hidden rounded-2xl border border-border sm:row-span-2">
                <Image
                  src={interiorPhoto}
                  alt="Interior de Optica Morea con exhibicion de anteojos"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority={false}
                />
              </div>
              <div className="relative min-h-[200px] overflow-hidden rounded-2xl border border-border">
                <Image
                  src={storefrontPhoto}
                  alt="Frente del local de Optica Morea"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-sm uppercase tracking-widest text-primary">
                  Nuestros espacios
                </p>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  Un ambiente moderno y comodo para elegir tus anteojos con tranquilidad.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="grid grid-cols-1 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <div className="shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className=" text-3xl text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
