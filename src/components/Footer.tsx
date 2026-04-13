import Link from "next/link"
import {  Mail, MapPin, Phone } from "lucide-react"
import { FiInstagram } from "react-icons/fi"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y descripcion */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <h1 className="text-6xl">OM</h1>
              <span className="text-xl tracking-[0.5rem]  text-foreground">
                OPTICA <br /> MOREA
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu optica de confianza. Anteojos recetados, anteojos de sol, lentes de contacto y mas.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Navegacion</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Catalogo
                </Link>
              </li>
              <li>
                <Link href="/#nosotros" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Servicios
                </Link>
              </li>
            </ul>
          </div>

          {/* Sucursales */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Sucursales</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-foreground">9 de Julio 291</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" /> 3534117540
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-foreground">Jose Ingenieros 244</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" /> 3534117494
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:opticamorea@gmail.com" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  opticamorea@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/opticamorea" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <FiInstagram className="h-4 w-4 text-primary" />
                  @opticamorea
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} Optica Morea. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
