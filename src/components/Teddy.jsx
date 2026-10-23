import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Super Adorable Teddy Bear Component
 * Handcrafted vector SVG illustration with expressive moods, outfits, and gentle animations.
 */
export default function Teddy({ 
  mood = 'heart', 
  size = 180, 
  animated = true, 
  className = '',
  onClick = null,
  text = ''
}) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Periodic random blink
  React.useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div 
      className={`teddy-wrapper ${className}`}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none'
      }}
      animate={animated ? {
        y: [0, -6, 0],
        rotate: isHovered ? [0, -2, 2, 0] : 0
      } : {}}
      transition={animated ? {
        y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
        rotate: { duration: 0.4 }
      } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 200 200"
        style={{ width: '100%', height: '100%', display: 'block' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Bear Fur Gradients */}
          <radialGradient id="furGradient" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#DEB887" />
            <stop offset="70%" stopColor="#C89D7C" />
            <stop offset="100%" stopColor="#8D5537" />
          </radialGradient>
          <radialGradient id="snoutGradient" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#FCEFD8" />
          </radialGradient>
          <radialGradient id="earInnerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD6E7" />
            <stop offset="100%" stopColor="#FFADC7" />
          </radialGradient>
          <radialGradient id="heartGradient" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FF75A0" />
            <stop offset="60%" stopColor="#FF4F87" />
            <stop offset="100%" stopColor="#D9225B" />
          </radialGradient>
          {/* Banana peel gradient */}
          <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="85%" stopColor="#FFD000" />
            <stop offset="100%" stopColor="#83B81A" />
          </linearGradient>
          {/* Soft Drop Shadow */}
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#8D5537" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Soft shadow ground oval */}
        <ellipse cx="100" cy="188" rx="55" ry="8" fill="rgba(117, 69, 47, 0.12)" />

        {/* 1. Left & Right Ears */}
        <g id="ears">
          {/* Left Ear */}
          <circle cx="58" cy="62" r="26" fill="url(#furGradient)" filter="url(#softShadow)" />
          <circle cx="58" cy="62" r="15" fill="url(#earInnerGradient)" />

          {/* Right Ear */}
          <circle cx="142" cy="62" r="26" fill="url(#furGradient)" filter="url(#softShadow)" />
          <circle cx="142" cy="62" r="15" fill="url(#earInnerGradient)" />
        </g>

        {/* 2. Teddy Body */}
        <g id="body">
          <ellipse cx="100" cy="138" rx="46" ry="42" fill="url(#furGradient)" filter="url(#softShadow)" />
          {/* Tummy patch */}
          <ellipse cx="100" cy="142" rx="30" ry="26" fill="#FFF2DF" opacity="0.85" />
        </g>

        {/* 3. Feet / Paws */}
        <g id="feet">
          {/* Left Foot */}
          <ellipse cx="68" cy="172" rx="19" ry="14" fill="url(#furGradient)" />
          <ellipse cx="68" cy="172" rx="11" ry="8" fill="url(#earInnerGradient)" opacity="0.8" />
          {/* Foot paw pads */}
          <circle cx="63" cy="167" r="2.2" fill="#FF8BA7" />
          <circle cx="68" cy="165" r="2.2" fill="#FF8BA7" />
          <circle cx="73" cy="167" r="2.2" fill="#FF8BA7" />

          {/* Right Foot */}
          <ellipse cx="132" cy="172" rx="19" ry="14" fill="url(#furGradient)" />
          <ellipse cx="132" cy="172" rx="11" ry="8" fill="url(#earInnerGradient)" opacity="0.8" />
          {/* Foot paw pads */}
          <circle cx="127" cy="167" r="2.2" fill="#FF8BA7" />
          <circle cx="132" cy="165" r="2.2" fill="#FF8BA7" />
          <circle cx="137" cy="167" r="2.2" fill="#FF8BA7" />
        </g>

        {/* Banana Suit Costume Overlay if mood is banana */}
        {mood === 'banana' && (
          <g id="banana-costume">
            {/* Banana peel wrapping body */}
            <path
              d="M50 170 C30 110, 45 60, 100 25 C155 60, 170 110, 150 170 C140 160, 120 175, 100 165 C80 175, 60 160, 50 170 Z"
              fill="url(#bananaGrad)"
              stroke="#D49A00"
              strokeWidth="2"
            />
            {/* Top banana stem */}
            <path d="M96 25 Q100 8 108 5 Q104 15 104 25 Z" fill="#4B6E14" />
            {/* Curved peel flaps peeled back */}
            <path d="M48 95 C30 110, 25 140, 32 155 C38 140, 48 120, 55 110 Z" fill="#FFE552" stroke="#D49A00" strokeWidth="1.5" />
            <path d="M152 95 C170 110, 175 140, 168 155 C162 140, 152 120, 145 110 Z" fill="#FFE552" stroke="#D49A00" strokeWidth="1.5" />
          </g>
        )}

        {/* 4. Head */}
        <g id="head">
          <circle cx="100" cy="95" r="48" fill="url(#furGradient)" filter="url(#softShadow)" />

          {/* Snout Area */}
          <ellipse cx="100" cy="106" rx="24" ry="18" fill="url(#snoutGradient)" />

          {/* Nose */}
          <path
            d="M93 100 C93 96, 107 96, 107 100 C107 105, 102 107, 100 107 C98 107, 93 105, 93 100 Z"
            fill="#4A2818"
          />
          {/* Nose highlight */}
          <ellipse cx="98" cy="99" rx="2.5" ry="1.2" fill="#FFFFFF" opacity="0.6" />

          {/* Mouth */}
          {mood === 'crying' || mood === 'sad' ? (
            <path d="M95 113 Q100 109 105 113" stroke="#4A2818" strokeWidth="2" strokeLinecap="round" fill="none" />
          ) : mood === 'annoyed' ? (
            <path d="M94 112 Q100 111 106 114" stroke="#4A2818" strokeWidth="2" strokeLinecap="round" fill="none" />
          ) : (
            <g>
              <path d="M100 107 L100 111" stroke="#4A2818" strokeWidth="2" strokeLinecap="round" />
              <path d="M94 111 Q100 117 106 111" stroke="#4A2818" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* Eyes with expressions */}
          {isBlinking ? (
            <g>
              <line x1="78" y1="90" x2="88" y2="90" stroke="#2B150A" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="112" y1="90" x2="122" y2="90" stroke="#2B150A" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ) : mood === 'crying' || mood === 'sad' ? (
            <g>
              {/* Droopy sad eyes */}
              <circle cx="83" cy="92" r="5" fill="#2B150A" />
              <circle cx="85" cy="90" r="2" fill="#FFFFFF" />
              <circle cx="117" cy="92" r="5" fill="#2B150A" />
              <circle cx="119" cy="90" r="2" fill="#FFFFFF" />
              {/* Teardrops */}
              <path d="M78 98 C76 104, 73 108, 77 112 C81 112, 80 106, 78 98 Z" fill="#75C6FF" opacity="0.85" />
              <path d="M122 98 C124 104, 127 108, 123 112 C119 112, 120 106, 122 98 Z" fill="#75C6FF" opacity="0.85" />
            </g>
          ) : mood === 'angry' ? (
            <g>
              {/* Angry cute eyebrows */}
              <line x1="76" y1="83" x2="88" y2="87" stroke="#4A2818" strokeWidth="3" strokeLinecap="round" />
              <line x1="124" y1="83" x2="112" y2="87" stroke="#4A2818" strokeWidth="3" strokeLinecap="round" />
              <circle cx="83" cy="91" r="5" fill="#2B150A" />
              <circle cx="85" cy="89.5" r="1.8" fill="#FFFFFF" />
              <circle cx="117" cy="91" r="5" fill="#2B150A" />
              <circle cx="115" cy="89.5" r="1.8" fill="#FFFFFF" />
            </g>
          ) : mood === 'shy' ? (
            <g>
              {/* Shy curved happy eyes ^^ */}
              <path d="M78 92 Q83 86 88 92" stroke="#2B150A" strokeWidth="2.6" strokeLinecap="round" fill="none" />
              <path d="M112 92 Q117 86 122 92" stroke="#2B150A" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            </g>
          ) : (
            <g>
              {/* Default Big Sparkly Eyes */}
              <circle cx="83" cy="90" r="6" fill="#2B150A" />
              <circle cx="85.5" cy="87.5" r="2.4" fill="#FFFFFF" />
              <circle cx="81.5" cy="92.5" r="1.1" fill="#FFFFFF" />

              <circle cx="117" cy="90" r="6" fill="#2B150A" />
              <circle cx="119.5" cy="87.5" r="2.4" fill="#FFFFFF" />
              <circle cx="115.5" cy="92.5" r="1.1" fill="#FFFFFF" />
            </g>
          )}

          {/* Rosy Blushing Cheeks */}
          <ellipse cx="73" cy="102" rx="7" ry="4.5" fill="#FF8BA7" opacity="0.65" />
          <ellipse cx="127" cy="102" rx="7" ry="4.5" fill="#FF8BA7" opacity="0.65" />
        </g>

        {/* Detective or Scientist Hats if pranks */}
        {mood === 'detective' && (
          <g id="detective-hat">
            <ellipse cx="100" cy="52" rx="42" ry="8" fill="#8C6553" />
            <path d="M68 52 Q100 24 132 52 Z" fill="#A87B64" />
            <path d="M74 50 Q100 44 126 50" stroke="#FFD6E7" strokeWidth="3" />
          </g>
        )}

        {/* 5. Arms & Hearts */}
        {mood === 'heart' || mood === 'holding-heart' || mood === 'love' ? (
          <g id="holding-heart">
            {/* Heart */}
            <motion.path
              d="M100 120 C80 92, 45 105, 52 135 C58 158, 88 175, 100 184 C112 175, 142 158, 148 135 C155 105, 120 92, 100 120 Z"
              fill="url(#heartGradient)"
              filter="url(#softShadow)"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
            {/* Heart gleam */}
            <path d="M72 120 C68 128, 70 138, 73 144" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            
            {/* Left & Right Paws holding the heart */}
            <ellipse cx="62" cy="138" rx="13" ry="11" fill="url(#furGradient)" transform="rotate(25 62 138)" />
            <ellipse cx="138" cy="138" rx="13" ry="11" fill="url(#furGradient)" transform="rotate(-25 138 138)" />
          </g>
        ) : mood === 'apology' || mood === 'sorry' ? (
          <g id="sorry-heart">
            {/* Big heart with 'Sorry' text */}
            <path
              d="M100 115 C75 82, 38 98, 46 132 C54 158, 86 178, 100 188 C114 178, 146 158, 154 132 C162 98, 125 82, 100 115 Z"
              fill="url(#heartGradient)"
              filter="url(#softShadow)"
            />
            <path d="M68 116 C63 125, 66 135, 70 142" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" opacity="0.65" />
            <text
              x="100"
              y="148"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="Fredoka, cursive, sans-serif"
              fontSize="16"
              fontWeight="700"
              letterSpacing="1"
            >
              {text || "Sorry"}
            </text>
            <ellipse cx="58" cy="138" rx="13" ry="11" fill="url(#furGradient)" transform="rotate(25 58 138)" />
            <ellipse cx="142" cy="138" rx="13" ry="11" fill="url(#furGradient)" transform="rotate(-25 142 138)" />
          </g>
        ) : mood === 'waving' ? (
          <g id="waving-arms">
            {/* Left Arm Resting */}
            <ellipse cx="60" cy="144" rx="14" ry="11" fill="url(#furGradient)" />
            {/* Right Arm Waving Up */}
            <motion.g
              animate={{ rotate: [-10, 25, -10] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              style={{ transformOrigin: '135px 130px' }}
            >
              <ellipse cx="145" cy="115" rx="12" ry="16" fill="url(#furGradient)" transform="rotate(30 145 115)" />
              <circle cx="148" cy="108" r="5" fill="url(#earInnerGradient)" opacity="0.8" />
            </motion.g>
          </g>
        ) : (
          <g id="default-arms">
            <ellipse cx="60" cy="142" rx="13" ry="11" fill="url(#furGradient)" transform="rotate(20 60 142)" />
            <ellipse cx="140" cy="142" rx="13" ry="11" fill="url(#furGradient)" transform="rotate(-20 140 142)" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
