import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 18,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  out: {
    opacity: 0,
    y: -14,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: 'easeInOut'
    }
  }
};

export default function ScreenTransition({ children, className = '' }) {
  return (
    <motion.div
      className={`screen-transition-wrapper ${className}`}
      style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
    >
      {children}
    </motion.div>
  );
}
