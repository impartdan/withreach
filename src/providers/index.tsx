import React from 'react'
import { AdminProvider } from './AdminContext'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <AdminProvider>{children}</AdminProvider>
}
