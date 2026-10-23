import React, { useMemo } from 'react';

/**
 * Floating Hearts Background Component
 * Generates lightweight, beautifully randomized floating hearts.
 */
export default function FloatingHearts({ count = 15, shape = 'heart' }) {
  const hearts = useMemo(() => {
    const colors = ['#FF4F87', '#FF8BA7', '#FFD6E7', '#FFB3D1', '#FFA3C2'];
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        left: Math.random() * 96 + '%',
        size: Math.floor(Math.random() * 18) + 14,
        duration: Math.random() * 8 + 7,
        delay: Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.45 + 0.35,
        rotation: Math.floor(Math.random() * 40) - 20
      });
    }
    return items;
  }, [count]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1
      }}
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: h.left,
            fontSize: `${h.size}px`,
            color: h.color,
            opacity: h.opacity,
            animation: `floatUp ${h.duration}s ease-in-out infinite`,
            animationDelay: `${h.delay}s`,
            transform: `rotate(${h.rotation}deg)`
          }}
        >
          {shape === 'banana' ? '🍌' : '💖'}
        </span>
      ))}
    </div>
  );
}
