import React from 'react'

export const LogoIcon = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--logo-grad-0)" />
          <stop offset="50%" stopColor="var(--logo-grad-50)" />
          <stop offset="100%" stopColor="var(--logo-grad-100)" />
        </linearGradient>
        <radialGradient id="hole-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--hole-grad-0)" />
          <stop offset="100%" stopColor="var(--hole-grad-100)" />
        </radialGradient>
      </defs>
      {/* Outer top bar and right-down diagonal */}
      <path 
        d="M20 30H80L40 70" 
        stroke="url(#logo-grad)" 
        strokeWidth="11" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Outer bottom bar and right-up diagonal */}
      <path 
        d="M20 70H80L40 30" 
        stroke="url(#logo-grad)" 
        strokeWidth="11" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Left endpoint dots to match the logo image */}
      <circle cx="20" cy="30" r="4.5" fill="url(#hole-grad)" />
      <circle cx="20" cy="70" r="4.5" fill="url(#hole-grad)" />
    </svg>
  )
}

const Logo = ({ size = "normal" }) => {
  const iconSize = size === "large" ? "w-12 h-12" : "w-8 h-8 sm:w-10 sm:h-10"
  const titleSize = size === "large" ? "text-2xl" : "text-lg sm:text-xl"
  const tagSize = size === "large" ? "text-[8px]" : "text-[6px] sm:text-[7px]"
  
  return (
    <div className="flex items-center gap-2 sm:gap-3 group">
      <LogoIcon className={`${iconSize} transition-transform duration-500 group-hover:rotate-12`} />
      <div className="flex flex-col -space-y-0.5">
        <span className={`${titleSize} font-black tracking-[0.05em] text-main uppercase`}>
          ZENBYTE LABS
        </span>
        <span className={`${tagSize} font-sans tracking-[0.28em] text-muted uppercase font-bold leading-none`}>
          DIGITAL CRAFTSMANSHIP
        </span>
      </div>
    </div>
  )
}

export default Logo
