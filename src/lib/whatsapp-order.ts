import type { CartItem } from "@/lib/cart-store"

const formatMoney = (n: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(n)

const ORDER_REF_KEYS = [
  "nropedido",
  "nro_pedido",
  "numeroPedido",
  "idpedido",
  "nrocomprobante",
  "numero",
] as const

export function orderReferenceFromApi(response: unknown): string | undefined {
  if (!response || typeof response !== "object") return undefined
  const r = response as Record<string, unknown>
  for (const key of ORDER_REF_KEYS) {
    const v = r[key]
    if (v != null && String(v).trim() !== "") return String(v)
  }
  return undefined
}

export function buildWhatsAppOrderMessage(
  cart: CartItem[],
  subtotal: number,
  options?: { orderRef?: string; customerName?: string; customerEmail?: string },
): string {
  if (!cart.length) return ""

  const lines: string[] = [
    "Hola, acabo de realizar un pedido en la web de Óptica Morea.",
    "",
  ]

  if (options?.customerName) {
    lines.push(`Cliente: ${options.customerName}`, "")
  }
  if (options?.customerEmail) {
    lines.push(`Email: ${options.customerEmail}`, "")
  }
  if (options?.orderRef) {
    lines.push(`Referencia de pedido: ${options.orderRef}`, "")
  }

  lines.push("Detalle:", "")

  for (const item of cart) {
    const code = item.codigo ?? String(item.id)
    const lineSubtotal = item.unitPrice * item.quantity
    lines.push(`• ${item.name} (${item.brand})`)
    lines.push(`  Código: ${code}`)
    lines.push(`  Cantidad: ${item.quantity}`)
    lines.push(`  Precio unit.: ${formatMoney(item.unitPrice)}`)
    lines.push(`  Subtotal: ${formatMoney(lineSubtotal)}`)
    lines.push("")
  }

  lines.push(`Total: ${formatMoney(subtotal)}`, "")
  lines.push("¿Podrían confirmarme el pedido? Gracias.")

  return lines.join("\n")
}

export function openWhatsAppOrder(phoneDigits: string, message: string) {
  if (!phoneDigits) return
  const url = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank", "noopener,noreferrer")
}
