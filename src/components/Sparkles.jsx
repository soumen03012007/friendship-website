import React, { useMemo } from 'react';

/**
 * Gentle Sparkles Component
 * Adds soft, twinkling fairy-like golden and pink sparkles.
 */
export default function Sparkles({ count = 10 }) {
  const sparkles = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        top: Math.random() * 90 + 5 + '%',
        left: Math.random() * 90 + 5 + '%',
        size: Math.floor(Math.random() * 12) + 8,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 3,
        type: i % 2 === 0 ? '✨' : '⭐'
      });
    }
    return items;
  }, [count]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 2
      }}
      aria-hidden="true"
    >
      {sparkles.map((s) => (
        <span
          key={s.id}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            fontSize: `${s.size}px`,
            animation: `sparkleGlow ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
            filter: 'drop-shadow(0 0 4px rgba(255, 214, 231, 0.8))'
          }}
        >
          {s.type}
        </span>
      ))}
    </div>
  );
}
