import {
  API_URL_CATEGORIAS,
  API_URL_MARCAS,
  hasRequiredApiEnv,
  requiredApiEnvErrorMessage,
} from "@/lib/api-routes"
import { session } from "@/lib/session"

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${session.getToken() ?? ""}`,
})

export const getGroups = async () => {
  if (!hasRequiredApiEnv) {
    console.error(requiredApiEnvErrorMessage)
    return []
  }
  try {
    const res = await fetch(API_URL_CATEGORIAS, {
      method: "GET",
      headers: authHeaders(),
      cache: "no-store",
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Error ${res.status}: ${errorText}`)
    }

    const data = (await res.json()) as {
      grupos?: Array<{ nombre?: string; grupo?: string }>
    }
    return data.grupos ?? []
  } catch (error) {
    console.error("Error al obtener grupos:", error)
    return []
  }
}

export const getBrands = async () => {
  if (!hasRequiredApiEnv) {
    console.error(requiredApiEnvErrorMessage)
    return []
  }
  try {
    const res = await fetch(API_URL_MARCAS, {
      method: "GET",
      headers: authHeaders(),
      cache: "no-store",
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Error ${res.status}: ${errorText}`)
    }

    const data = (await res.json()) as {
      marcas?: Array<{ nombre?: string; marca?: string }>
    }
    return data.marcas ?? []
  } catch (error) {
    console.error("Error al obtener marcas:", error)
    return []
  }
}
