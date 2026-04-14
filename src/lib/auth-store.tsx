"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { loginUser, loginUserNot, verificarToken } from "@/services/auth-services"
import { session } from "@/lib/session"

interface AuthUser {
  codusuario: number
  codclientez?: number
  nombre?: string
  usuario?: string
  [key: string]: unknown
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isReady: boolean
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initAuth = async () => {
      const token = session.getToken()

      if (!token) {
        const anonData = await loginUserNot()
        if (anonData?.token && anonData?.usuario) {
          session.set(anonData.token, anonData.usuario)
          setUser(anonData.usuario)
        }
        setIsReady(true)
        return
      }

      const verify = await verificarToken(token)
      if (verify?.success) {
        const storedUser = session.getUser<AuthUser>()
        if (storedUser) {
          setUser(storedUser)
        } else {
          const anonData = await loginUserNot()
          if (anonData?.token && anonData?.usuario) {
            session.set(anonData.token, anonData.usuario)
            setUser(anonData.usuario)
          }
        }
      } else {
        const anonData = await loginUserNot()
        if (anonData?.token && anonData?.usuario) {
          session.set(anonData.token, anonData.usuario)
          setUser(anonData.usuario)
        }
      }

      setIsReady(true)
    }

    void initAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const data = await loginUser(email, password)
    if (!data?.success || !data.token || !data.usuario) {
      return {
        ok: false,
        message: "Correo o contrasena incorrectos.",
      }
    }

    session.set(data.token, data.usuario)
    setUser(data.usuario)
    return { ok: true }
  }, [])

  const logout = useCallback(async () => {
    session.clear()
    const anonData = await loginUserNot()
    if (anonData?.token && anonData?.usuario) {
      session.set(anonData.token, anonData.usuario)
      setUser(anonData.usuario)
    } else {
      setUser(null)
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user && user.codusuario !== 0),
      isReady,
      login,
      logout,
    }),
    [isReady, login, logout, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return context
}
