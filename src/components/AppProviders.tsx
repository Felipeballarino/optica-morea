"use client"

import { AuthProvider } from "@/lib/auth-store"
import { CartProvider } from "@/lib/cart-store"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  )
}
