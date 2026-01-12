'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type AdminContextType = {
  documentId?: string
  collection?: string
  setDocument: (id: string, collection: string) => void
  clearDocument: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [documentId, setDocumentId] = useState<string>()
  const [collection, setCollection] = useState<string>()

  const setDocument = (id: string, coll: string) => {
    setDocumentId(id)
    setCollection(coll)
  }

  const clearDocument = () => {
    setDocumentId(undefined)
    setCollection(undefined)
  }

  return (
    <AdminContext.Provider value={{ documentId, collection, setDocument, clearDocument }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
