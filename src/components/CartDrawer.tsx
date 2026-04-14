"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { useAuth } from "@/lib/auth-store"
import { useCart } from "@/lib/cart-store"
import { whatsappOrderPhoneDigits } from "@/lib/api-routes"
import {
  buildWhatsAppOrderMessage,
  openWhatsAppOrder,
  orderReferenceFromApi,
} from "@/lib/whatsapp-order"
import { newSale } from "@/services/order-services"

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(price)
}

export function CartDrawer() {
  const [sendingOrder, setSendingOrder] = useState(false)
  const [showGuestForm, setShowGuestForm] = useState(false)
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [guestError, setGuestError] = useState("")
  const { user, isAuthenticated } = useAuth()
  const {
    cart,
    isOpen,
    subtotal,
    closeCart,
    clearCart,
    removeFromCart,
    updateQuantity,
  } = useCart()

  if (!isOpen) return null

  const resetGuestForm = () => {
    setShowGuestForm(false)
    setGuestName("")
    setGuestEmail("")
    setGuestError("")
  }

  const handleCloseCart = () => {
    resetGuestForm()
    closeCart()
  }

  const submitOrder = async (guestInfo?: { name: string; email: string }) => {
    const cartSnapshot = cart.map((item) => ({ ...item }))
    const totalSnapshot = subtotal

    setSendingOrder(true)
    const response = await newSale(cartSnapshot, totalSnapshot, guestInfo)
    setSendingOrder(false)

    if (response?.success) {
      const customerName = guestInfo?.name ?? user?.nombre ?? user?.usuario
      const msg = buildWhatsAppOrderMessage(cartSnapshot, totalSnapshot, {
        orderRef: orderReferenceFromApi(response),
        customerName: typeof customerName === "string" ? customerName : undefined,
        customerEmail: guestInfo?.email,
      })
      if (msg && whatsappOrderPhoneDigits) {
        openWhatsAppOrder(whatsappOrderPhoneDigits, msg)
      }
      resetGuestForm()
      clearCart()
      closeCart()
      return
    }

    window.alert("No se pudo generar el pedido. Revisa el servicio de nuevopedido.")
  }

  const handleFinalizeClick = () => {
    if (!isAuthenticated) {
      setShowGuestForm(true)
      return
    }
    void submitOrder()
  }

  const handleGuestSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = guestName.trim()
    const email = guestEmail.trim()
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!name || !emailOk) {
      setGuestError("Ingresa un nombre y un email valido para continuar.")
      return
    }

    setGuestError("")
    void submitOrder({ name, email })
  }

  return (
    <div className="fixed inset-0 z-75 bg-black/40">
      <div
        className="absolute inset-0"
        onClick={handleCloseCart}
        aria-hidden="true"
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md border-l border-border bg-background p-5 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingCart className="h-5 w-5" />
            Carrito
          </h3>
          <button
            type="button"
            onClick={handleCloseCart}
            className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex h-[calc(100%-2.5rem)] flex-col">
          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Todavia no agregaste productos.
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-primary">{item.brand}</p>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatPrice(item.unitPrice)} c/u
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      aria-label={`Quitar ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-semibold text-foreground">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-semibold">{formatPrice(subtotal)}</span>
            </div>
            {showGuestForm ? (
              <form onSubmit={handleGuestSubmit} className="mb-4 space-y-3 rounded-lg border border-border p-3">
                <p className="text-sm text-muted-foreground">
                  Para enviar el pedido como invitado, necesitamos tus datos.
                </p>
                <div className="space-y-1.5">
                  <label className="text-sm text-foreground">Nombre</label>
                  <Input
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm text-foreground">Email</label>
                  <Input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                {guestError ? <p className="text-sm text-red-600">{guestError}</p> : null}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={resetGuestForm}
                    disabled={sendingOrder}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1" disabled={sendingOrder}>
                    {sendingOrder ? "Enviando..." : "Confirmar pedido"}
                  </Button>
                </div>
              </form>
            ) : null}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={clearCart}
                disabled={cart.length === 0}
              >
                Vaciar
              </Button>
              <Button
                type="button"
                className="flex-1"
                disabled={cart.length === 0 || sendingOrder}
                onClick={handleFinalizeClick}
              >
                {sendingOrder ? "Enviando..." : isAuthenticated ? "Finalizar" : "Finalizar como invitado"}
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
