const brands = [
  "Ray-Ban",
  "Oakley",
  "Prada",
  "Gucci",
  "Versace",
  "Emporio Armani",
  "Carrera",
  "Vogue",
]

export function Brands() {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest">
          Trabajamos con las mejores marcas
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {brands.map((brand, index) => (
            <span
              key={index}
              className="text-lg font-serif text-muted-foreground hover:text-foreground transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
