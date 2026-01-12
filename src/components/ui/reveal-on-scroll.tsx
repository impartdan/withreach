'use client'

import { motion, type Variants } from 'framer-motion'
import { type HTMLMotionProps } from 'framer-motion'

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
  amount = 0.2,
  once = true,
  className,
  ...props
}: RevealOnScrollProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
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
