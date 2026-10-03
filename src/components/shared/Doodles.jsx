// Small inline-SVG decorative doodles — stars, sparkles, squiggles, flowers.
// Pure decoration, no interactivity, kept lightweight and hand-drawn feeling.

export function DoodleStar({ className = "", color = "#ff6fa5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 2c0 4-1 8-4 10 3 2 4 6 4 10 0-4 1-8 4-10-3-2-4-6-4-10Z"
        fill={color}
        opacity="0.8"
      />
    </svg>
  );
}

export function DoodleSparkle({ className = "", color = "#ff2d75" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12 3 L13.5 10.5 L21 12 L13.5 13.5 L12 21 L10.5 13.5 L3 12 L10.5 10.5 Z" fill={color} />
    </svg>
  );
}

export function DoodleSquiggle({ className = "", color = "#ff6fa5" }) {
  return (
    <svg viewBox="0 0 120 20" className={className} fill="none">
      <path
        d="M2 10 Q 15 0, 28 10 T 54 10 T 80 10 T 106 10"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleFlower({ className = "", color = "#ff5c93" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="20"
          cy="12"
          rx="5"
          ry="8"
          fill={color}
          transform={`rotate(${deg} 20 20)`}
          opacity="0.85"
        />
      ))}
      <circle cx="20" cy="20" r="4" fill="#ff6fa5" opacity="0.9" />
    </svg>
  );
}

export function DoodleHeartOutline({ className = "", color = "#ff2d75" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 20.5c-.3 0-.6-.1-.8-.3C7 16.7 3 13.2 3 9.1 3 6.3 5.1 4 7.8 4c1.6 0 3 .8 3.9 2 .1.1.3.1.4 0C13 4.8 14.4 4 16 4c2.7 0 4.8 2.3 4.8 5.1 0 4.1-4 7.6-8.2 11.1-.2.2-.5.3-.6.3Z" />
    </svg>
  );
}

export function DoodleArrow({ className = "", color = "#ff6fa5" }) {
  return (
    <svg viewBox="0 0 60 40" className={className} fill="none">
      <path
        d="M4 30 Q 20 4 40 14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M32 8 L41 14 L34 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
