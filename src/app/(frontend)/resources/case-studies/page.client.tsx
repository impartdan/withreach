'use client'
import React, { useEffect } from 'react'
import { useAdmin } from '@/providers/AdminContext'

const PageClient: React.FC<{ id: string; collection: string }> = ({ id, collection }) => {
  const { setDocument, clearDocument } = useAdmin()

  useEffect(() => {
    setDocument(id, collection)
    return () => clearDocument()
  }, [id, collection, setDocument, clearDocument])

  return null
}

export default PageClient
