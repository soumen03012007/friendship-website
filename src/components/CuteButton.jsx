import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/sound';

export default function CuteButton({
  children,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'outline'
  icon = null,
  disabled = false,
  className = '',
  soundType = 'pop', // 'pop', 'chime', 'boing', 'hug'
  ariaLabel
}) {
  const handleClick = (e) => {
    if (disabled) return;
    if (soundType === 'pop') sound.playPop();
    else if (soundType === 'chime') sound.playChime();
    else if (soundType === 'boing') sound.playBoing();
    else if (soundType === 'hug') sound.playHug();

    if (onClick) onClick(e);
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'btn-cute-secondary';
      case 'outline':
        return 'btn-cute-outline';
      case 'primary':
      default:
        return 'btn-cute-primary';
    }
  };

  return (
    <motion.button
      type="button"
      className={`${getVariantClass()} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}
