import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

// Fires a small burst of floating hearts from the center of its container.
// Trigger by bumping `burstKey` (e.g. a click counter) — a new value = a new burst.
export default function HeartParticles({ burstKey, count = 10, colors }) {
  if (!burstKey) return null;
  const palette = colors || ["#ff5c93", "#ff2d75", "#e8a9ff", "#ffb3d1"];
  const hearts = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible z-50">
      <AnimatePresence>
        <motion.div key={burstKey} className="absolute inset-0">
          {hearts.map((i) => {
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
            const distance = 60 + Math.random() * 90;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance - 40;
            const size = 10 + Math.random() * 14;
            const color = palette[i % palette.length];
            return (
              <motion.span
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                animate={{
                  opacity: 0,
                  x,
                  y: y - 60,
                  scale: 1,
                  rotate: (Math.random() - 0.5) * 90,
                }}
                transition={{ duration: 1.1 + Math.random() * 0.4, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2"
                style={{ marginLeft: -size / 2, marginTop: -size / 2 }}
              >
                <Heart size={size} fill={color} color={color} />
              </motion.span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
