export const TOKEN_STORAGE_KEY = "user_data_token"
export const USER_STORAGE_KEY = "user_data"

export const session = {
  getToken: () => {
    if (typeof window === "undefined") return null
    return window.localStorage.getItem(TOKEN_STORAGE_KEY)
  },
  getUser: <T = unknown>() => {
    if (typeof window === "undefined") return null
    const raw = window.localStorage.getItem(USER_STORAGE_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  },
  set: (token: string, user: unknown) => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  },
  clear: () => {
    if (typeof window === "undefined") return
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
    window.localStorage.removeItem(USER_STORAGE_KEY)
  },
}
