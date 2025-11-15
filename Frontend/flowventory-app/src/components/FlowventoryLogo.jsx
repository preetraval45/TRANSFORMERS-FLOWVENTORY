"use client";

export default function FlowventoryLogo({ size = 40, className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient
            id="inventoryGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient
            id="shelfGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Warehouse shelves background */}
        <rect
          x="10"
          y="20"
          width="100"
          height="8"
          fill="url(#shelfGradient)"
          opacity="0.3"
          rx="2"
        />
        <rect
          x="10"
          y="40"
          width="100"
          height="8"
          fill="url(#shelfGradient)"
          opacity="0.3"
          rx="2"
        />
        <rect
          x="10"
          y="60"
          width="100"
          height="8"
          fill="url(#shelfGradient)"
          opacity="0.3"
          rx="2"
        />
        <rect
          x="10"
          y="80"
          width="100"
          height="8"
          fill="url(#shelfGradient)"
          opacity="0.3"
          rx="2"
        />

        {/* Inventory boxes on shelves */}
        <g opacity="0.8">
          {/* Bottom shelf boxes */}
          <rect
            x="15"
            y="22"
            width="12"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />
          <rect
            x="32"
            y="22"
            width="12"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />
          <rect
            x="49"
            y="22"
            width="12"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />
          <rect
            x="66"
            y="22"
            width="12"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />
          <rect
            x="83"
            y="22"
            width="12"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />

          {/* Middle shelf boxes */}
          <rect
            x="18"
            y="42"
            width="10"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />
          <rect
            x="35"
            y="42"
            width="10"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />
          <rect
            x="52"
            y="42"
            width="10"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />
          <rect
            x="69"
            y="42"
            width="10"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />

          {/* Top shelf boxes */}
          <rect
            x="21"
            y="62"
            width="8"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />
          <rect
            x="38"
            y="62"
            width="8"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />
          <rect
            x="55"
            y="62"
            width="8"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />
          <rect
            x="72"
            y="62"
            width="8"
            height="6"
            fill="url(#boxGradient)"
            rx="1"
          />
        </g>

        {/* Flow arrows indicating movement */}
        <g opacity="0.9">
          {/* Incoming arrow */}
          <path
            d="M 5 30 L 15 30 M 9 26 L 15 30 L 9 34"
            stroke="#1e40af"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Outgoing arrow */}
          <path
            d="M 105 70 L 115 70 M 109 66 L 115 70 L 109 74"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Internal flow */}
          <path
            d="M 45 95 L 55 95 M 49 91 L 55 95 L 49 99"
            stroke="#7c3aed"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* Letter F overlay */}
        <text
          x="60"
          y="110"
          fontFamily="Arial, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          opacity="0.9"
        >
          F
        </text>

        {/* Accent elements */}
        <circle cx="15" cy="15" r="3" fill="#1e40af" opacity="0.7" />
        <circle cx="105" cy="105" r="3" fill="#06b6d4" opacity="0.7" />
      </svg>
    </div>
  );
}
