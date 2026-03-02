'use client'
import React, { useEffect } from 'react'
import { useAdmin } from '@/providers/AdminContext'

const IntegrationPageClient: React.FC<{ id: string }> = ({ id }) => {
  const { setDocument, clearDocument } = useAdmin()

  useEffect(() => {
    setDocument(id, 'integrations')
    return () => clearDocument()
  }, [id, setDocument, clearDocument])

  return null
}

export default IntegrationPageClient
