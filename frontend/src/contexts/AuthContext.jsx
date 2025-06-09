"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (check localStorage or session)
    const token = localStorage.getItem("adminToken")
    if (token) {
      setIsAuthenticated(true)
      setUser({ role: "admin", name: "Administrator" })
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    // Simulate API call
    if (credentials.username === "admin" && credentials.password === "admin123") {
      const token = "mock-jwt-token"
      localStorage.setItem("adminToken", token)
      setIsAuthenticated(true)
      setUser({ role: "admin", name: "Administrator" })
      return { success: true }
    }
    return { success: false, error: "Invalid credentials" }
  }

  const logout = () => {
    localStorage.removeItem("adminToken")
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
