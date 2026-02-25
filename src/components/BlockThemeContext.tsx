'use client'
import React from 'react'

export type BlockTheme = 'dark' | 'light'

export const BlockThemeContext = React.createContext<BlockTheme>('dark')

export const useBlockTheme = () => React.useContext(BlockThemeContext)
