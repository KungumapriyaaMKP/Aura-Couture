import React from 'react';

interface AuraCoutureVectorLogoProps {
  className?: string;
  color?: string;
}

export const AuraCoutureVectorLogo: React.FC<AuraCoutureVectorLogoProps> = ({
  className = "w-full max-w-[340px] md:max-w-[420px]",
  color = "#a02e46",
}) => (
  <svg viewBox="0 0 460 210" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M 102 108 C 40 120, -10 100, 18 52 C 45 10, 120 40, 105 82 C 95 105, 55 125, 20 135 C 75 142, 175 122, 235 98"
      stroke={color}
      strokeWidth="3.4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 270 102 C 295 115, 340 138, 410 135 C 435 133, 445 125, 430 120"
      stroke={color}
      strokeWidth="3.0"
      strokeLinecap="round"
      fill="none"
    />
    <text
      x="45"
      y="104"
      fill={color}
      fontFamily="'Playfair Display', 'Cormorant Garamond', serif"
      fontSize="96"
      fontWeight="700"
      letterSpacing="0.08em"
    >
      AURA
    </text>
    <text
      x="85"
      y="172"
      fill={color}
      fontFamily="'Cormorant Garamond', 'Bodoni Moda', serif"
      fontSize="44"
      fontWeight="600"
      letterSpacing="0.45em"
    >
      COUTURE
    </text>
  </svg>
);
