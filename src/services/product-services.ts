import {
  API_URL_PRODUCTOS,
  hasRequiredApiEnv,
  requiredApiEnvErrorMessage,
} from "@/lib/api-routes"
import { session } from "@/lib/session"

export interface ApiProduct {
  codproducto: number
  codigo?: string
  nombre?: string
  descripcion: string
  grupo?: string
  marcaNombre?: string
  img1?: string
  precio_final: number | string
  descuento?: number | string
  [key: string]: unknown
}

export const getProducts = async () => {
  if (!hasRequiredApiEnv) {
    console.error(requiredApiEnvErrorMessage)
    return []
  }
  try {
    const token = session.getToken()
    const user = session.getUser<{ codusuario?: number }>()
    const codusuario = user?.codusuario ?? 0

    const res = await fetch(`${API_URL_PRODUCTOS}/${codusuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Error ${res.status}: ${errorText}`)
    }

    const data = (await res.json()) as { productos?: ApiProduct[] }
    return data.productos ?? []
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return []
  }
}
