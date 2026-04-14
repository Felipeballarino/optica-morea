"use client"

import { CatalogProduct } from "@/lib/catalog"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

const CART_STORAGE_KEY = "optica-morea-cart"

export interface CartItem {
  id: number
  name: string
  brand: string
  image: string
  codigo?: string
  unitPrice: number
  quantity: number
}

interface CartContextValue {
  cart: CartItem[]
  isOpen: boolean
  totalItems: number
  subtotal: number
  addToCart: (product: CatalogProduct, unitPrice: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return []

    const stored = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return []

    try {
      return JSON.parse(stored) as CartItem[]
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY)
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: CatalogProduct, unitPrice: number) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          codigo: product.codigo,
          unitPrice,
          quantity: 1,
        },
      ]
    })
    setIsOpen(true)
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const nextQuantity = Math.max(1, quantity)
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item,
      ),
    )
  }

  const clearCart = () => setCart([])
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      isOpen,
      totalItems,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [cart, isOpen, subtotal, totalItems],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider")
  }
  return context
}
