'use client'

import { motion, type Variants } from 'framer-motion'
import { type HTMLMotionProps } from 'framer-motion'
import { useEffect, useState } from 'react'

const variants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
}

interface RevealOnScrollProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  variant?: keyof typeof variants
  delay?: number
  duration?: number
  amount?: number
  once?: boolean
}

export function RevealOnScroll({
  children,
  variant = 'fadeIn',
  delay = 0,
  duration = 0.5,
  amount,
  once = true,
  className,
  ...props
}: RevealOnScrollProps) {
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
  // On mobile: 0.1 (10% visible) - triggers earlier
  // On desktop: 0.2 (20% visible) - original behavior
  const viewportAmount = amount !== undefined ? amount : (isMobile ? 0.1 : 0.2)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount, margin: '0px 0px -50px 0px' }}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
