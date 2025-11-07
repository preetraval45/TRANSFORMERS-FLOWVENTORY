'use client';

export default function FlowventoryLogo({ size = 40, className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle cx="50" cy="50" r="48" fill="url(#flowGradient)" opacity="0.1" />

        {/* Main warehouse/box stack */}
        <g transform="translate(50, 50)">
          {/* Bottom box */}
          <path
            d="M -20 10 L 20 10 L 20 20 L -20 20 Z"
            fill="url(#boxGradient)"
            opacity="0.6"
          />
          {/* Middle box */}
          <path
            d="M -18 -2 L 18 -2 L 18 8 L -18 8 Z"
            fill="url(#boxGradient)"
            opacity="0.8"
          />
          {/* Top box */}
          <path
            d="M -16 -14 L 16 -14 L 16 -4 L -16 -4 Z"
            fill="url(#boxGradient)"
          />

          {/* Flow arrows */}
          <g opacity="0.9">
            {/* Right arrow */}
            <path
              d="M 22 0 L 30 0 M 26 -3 L 30 0 L 26 3"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Left arrow */}
            <path
              d="M -22 8 L -30 8 M -26 5 L -30 8 L -26 11"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>

          {/* Letter F in center */}
          <text
            x="0"
            y="6"
            fontFamily="Arial, sans-serif"
            fontSize="24"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
          >
            F
          </text>
        </g>

        {/* Accent dots */}
        <circle cx="20" cy="20" r="2" fill="#2563eb" opacity="0.6" />
        <circle cx="80" cy="80" r="2" fill="#10b981" opacity="0.6" />
      </svg>
    </div>
  );
}
