const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? ""
const userType = process.env.NEXT_PUBLIC_USER_TYPE ?? ""
const sendEmail = process.env.NEXT_PUBLIC_SEND_EMAIL ?? ""

export const missingRequiredApiEnv = [
  !apiUrl ? "NEXT_PUBLIC_API_URL" : "",
  !userType ? "NEXT_PUBLIC_USER_TYPE" : "",
].filter(Boolean)

export const hasRequiredApiEnv = missingRequiredApiEnv.length === 0
export const requiredApiEnvErrorMessage =
  missingRequiredApiEnv.length > 0
    ? `Faltan variables de entorno: ${missingRequiredApiEnv.join(", ")}`
    : ""

export const API_URL_CATEGORIAS = `${apiUrl}/api/grupos/${userType}`
export const API_URL_MARCAS = `${apiUrl}/api/marcas/${userType}`
export const API_URL_PRODUCTOS = `${apiUrl}/api/productos/${userType}`
export const API_URL_LOGIN = `${apiUrl}/api/login/${userType}`
export const SEND_ORDER = `${apiUrl}/api/nuevopedido`
export const NEW_SALE = `${apiUrl}/api/nuevopedido`
export const VERIFICAR_URL = `${apiUrl}/verificar_token`
export const SEND_EMAIL = `${sendEmail}`

/** Solo dígitos, ej. 5493534117540 — usado en wa.me tras confirmar pedido */
export const whatsappOrderPhoneDigits = (
  process.env.NEXT_PUBLIC_WHATSAPP_ORDER ?? ""
).replace(/\D/g, "")
