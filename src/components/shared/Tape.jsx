// A little washi-tape strip, purely decorative. Pass rotate/left/top for placement.
export default function Tape({ rotate = -8, className = "", style }) {
  return (
    <span
      className={`tape rounded-[2px] ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden="true"
    />
  );
}
