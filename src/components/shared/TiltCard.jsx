import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Wraps children in a card that gently tilts toward the cursor on desktop
// (mousemove) and rises slightly on tap on touch devices. Respects a base
// rotation (`rotate`) so cards can sit crooked, scrapbook-style.
export default function TiltCard({ children, rotate = 0, className = "", onClick, style }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 18 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.045, zIndex: 30 }}
      whileTap={{ y: -10, scale: 1.03, zIndex: 30 }}
      style={{
        rotate,
        rotateX,
        rotateY,
        transformPerspective: 700,
        ...style,
      }}
      className={`relative cursor-pointer will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
