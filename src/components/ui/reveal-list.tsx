'use client'

import { motion, type Variants } from 'framer-motion'
import { type HTMLMotionProps } from 'framer-motion'
import { useEffect, useState } from 'react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

interface RevealListProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  staggerDelay?: number
  amount?: number
  once?: boolean
}

export function RevealList({
  children,
  staggerDelay = 0.1,
  amount,
  once = true,
  className,
  ...props
}: RevealListProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Use a lower threshold on mobile for better trigger behavior
  // On mobile: 0.05 (5% visible) - triggers earlier for grid layouts
  // On desktop: 0.2 (20% visible) - original behavior
  const viewportAmount = amount !== undefined ? amount : (isMobile ? 0.05 : 0.2)

  const customContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      variants={customContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount, margin: '0px 0px -50px 0px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface RevealListItemProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {}

export function RevealListItem({ children, className, ...props }: RevealListItemProps) {
  return (
    <motion.div variants={itemVariants} className={`h-full ${className || ''}`} {...props}>
      {children}
    </motion.div>
  )
}
