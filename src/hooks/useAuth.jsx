import { createContext, useContext, useState } from 'react'
import { MOCK_USER } from '../constants/data'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authModal, setAuthModal] = useState({ open: false, tab: 'login' })

  const login = (email, password) => {
    // Mock login
    setUser(MOCK_USER)
    setAuthModal({ open: false, tab: 'login' })
    return true
  }

  const register = (data) => {
    setUser({ ...MOCK_USER, name: data.name, email: data.email })
    setAuthModal({ open: false, tab: 'login' })
    return true
  }

  const logout = () => {
    setUser(null)
  }

  const openAuth = (tab = 'login') => {
    setAuthModal({ open: true, tab })
  }

  const closeAuth = () => {
    setAuthModal(prev => ({ ...prev, open: false }))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authModal, openAuth, closeAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
