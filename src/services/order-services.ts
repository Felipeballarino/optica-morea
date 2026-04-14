import {
  NEW_SALE,
  hasRequiredApiEnv,
  requiredApiEnvErrorMessage,
} from "@/lib/api-routes"
import { session } from "@/lib/session"
import { CartItem } from "@/lib/cart-store"

interface GuestOrderInfo {
  name: string
  email: string
}

const armarBody = (
  user: { codclientez?: number; codusuario?: number },
  cart: CartItem[],
  cartTotal: number,
  guestInfo?: GuestOrderInfo,
) => {
  const detalles = cart.map((item) => {
    const precio = Number(item.unitPrice)
    const cantidad = item.quantity
    const total = precio * cantidad

    return {
      codigo: item.codigo ?? String(item.id),
      descripcion: item.name,
      importe: precio,
      descuento: 0,
      importetotal: total,
      cantidad,
      codtalle: 1,
      codoferta: 0,
    }
  })

  const observacionBase = "Pedido web Optica Morea"
  const observacion =
    guestInfo?.name && guestInfo?.email
      ? `${observacionBase} - Invitado: ${guestInfo.name} (${guestInfo.email})`
      : observacionBase

  return {
    codclientez: user.codclientez ?? 0,
    codcliente: user.codusuario ?? 0,
    importe: cartTotal,
    importetotal: cartTotal,
    observacion,
    detalles,
  }
}

export const newSale = async (
  cart: CartItem[],
  cartTotal: number,
  guestInfo?: GuestOrderInfo,
) => {
  if (!hasRequiredApiEnv) {
    console.error(requiredApiEnvErrorMessage)
    return null
  }

  const token = session.getToken()
  const user = session.getUser<{ codclientez?: number; codusuario?: number }>() ?? {}
  const saleBody = armarBody(user, cart, cartTotal, guestInfo)

  try {
    const res = await fetch(NEW_SALE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: JSON.stringify(saleBody),
    })
    return await res.json()
  } catch (error) {
    console.error(error)
    return null
  }
}
