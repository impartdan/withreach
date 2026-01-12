'use client'

import { motion, type Variants } from 'framer-motion'
import { type HTMLMotionProps } from 'framer-motion'

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
  amount = 0.2,
  once = true,
  className,
  ...props
}: RevealListProps) {
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
      viewport={{ once, amount }}
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
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  )
}
