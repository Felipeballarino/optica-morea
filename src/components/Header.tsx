"use client"

import Link from "next/link"
import { useState } from "react"
import { LogOut, Menu, ShoppingCart, User, X } from "lucide-react"
import Button from "./ui/Button"
import { useAuth } from "@/lib/auth-store"
import { useCart } from "@/lib/cart-store"
import { LoginModal } from "./LoginModal"
import { CartDrawer } from "./CartDrawer"
import logoOM from "@/assets/logoBocha.png"
import Image from "next/image"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Catalogo", href: "/catalogo" },
  { name: "Nosotros", href: "/#nosotros" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Contacto", href: "/#contacto" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const { user, isAuthenticated, logout, isReady } = useAuth()
  const { openCart, totalItems } = useCart()

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border uppercase">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2">
              <div className="relative h-12 w-48 object-cover overflow-hidden ">
                <Image
                  src={logoOM}
                  alt="Interior de Optica Morea con exhibicion de anteojos"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority={false}
                />
              </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-md border border-border p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Abrir carrito"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 ? (
                <span className="absolute -right-2 -top-2 rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                  {totalItems}
                </span>
              ) : null}
            </button>

            {isReady && isAuthenticated ? (
              <>
                <span className="text-xs text-muted-foreground">
                  Hola, {user?.nombre || user?.usuario || "Cliente"}
                </span>
                <Button variant="outline" size="sm" onClick={() => void logout()}>
                  <LogOut className="h-4 w-4" />
                  Cerrar sesion
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => setLoginOpen(true)}
              >
                <User className="h-4 w-4" />
                Iniciar sesion
              </Button>
            )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-6 pb-6 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
              <div className="pt-4 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    openCart()
                    setMobileMenuOpen(false)
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Carrito ({totalItems})
                </Button>

                {isReady && isAuthenticated ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      void logout()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesion
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      setLoginOpen(true)
                      setMobileMenuOpen(false)
                    }}
                  >
                    <User className="h-4 w-4" />
                    Iniciar sesion
                  </Button>
                )}
            </div>
          </div>
        </div>
      )}
    </header>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <CartDrawer />
    </>
  )
}
