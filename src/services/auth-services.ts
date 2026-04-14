import {
  API_URL_LOGIN,
  VERIFICAR_URL,
  hasRequiredApiEnv,
  requiredApiEnvErrorMessage,
} from "@/lib/api-routes"

export interface LoginResponse {
  success?: boolean
  token: string
  usuario: {
    codusuario: number
    codclientez?: number
    nombre?: string
    usuario?: string
    [key: string]: unknown
  }
}

export const loginUser = async (username: string, password: string) => {
  if (!hasRequiredApiEnv) {
    console.error(requiredApiEnvErrorMessage)
    return null
  }
  try {
    const res = await fetch(API_URL_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario: username,
        clave: password,
      }),
    })
    return (await res.json()) as LoginResponse
  } catch (error) {
    console.error(error)
    return null
  }
}

export const loginUserNot = async () => {
  if (!hasRequiredApiEnv) {
    console.error(requiredApiEnvErrorMessage)
    return null
  }
  try {
    const res = await fetch(API_URL_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
    return (await res.json()) as LoginResponse
  } catch (error) {
    console.error(error)
    return null
  }
}

export const verificarToken = async (token: string) => {
  if (!hasRequiredApiEnv) {
    console.error(requiredApiEnvErrorMessage)
    return null
  }
  try {
    const res = await fetch(VERIFICAR_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return (await res.json()) as { success?: boolean }
  } catch (error) {
    console.error(error)
    return null
  }
}
