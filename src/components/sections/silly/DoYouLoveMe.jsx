import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import HeartParticles from "../../shared/HeartParticles.jsx";
import { sfx } from "../../../lib/sound.js";

export default function DoYouLoveMe() {
  const containerRef = useRef(null);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [burst, setBurst] = useState(0);

  const dodge = () => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const maxX = Math.max(rect.width - 90, 40);
    const maxY = Math.max(rect.height - 40, 40);
    setNoPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    });
    setAttempts((a) => a + 1);
    sfx.pop();
  };

  const scale = Math.max(1 - attempts * 0.07, 0.35);
  const giveUp = attempts >= 6;

  return (
    <div className="bg-noir rounded-2xl shadow-paper p-6 sm:p-8 flex flex-col items-center text-center gap-5">
      <p className="font-serif text-xl sm:text-2xl text-off-white">do you still like me?</p>

      {!answered ? (
        <div ref={containerRef} className="relative w-full h-32 sm:h-36 flex items-center justify-center gap-4">
          <motion.button
            type="button"
            onClick={() => {
              setAnswered(true);
              setBurst((b) => b + 1);
              sfx.heart();
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-muted-burgundy text-off-white font-body px-6 py-3 shadow-soft z-10"
          >
            YES ♡
          </motion.button>

          <motion.button
            type="button"
            onPointerDown={dodge}
            onMouseEnter={dodge}
            animate={{ x: noPos.x, y: noPos.y, scale }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="rounded-full bg-blush text-off-white/70 font-body px-6 py-3 shadow-paper absolute"
            style={{ opacity: giveUp ? 0.6 : 1 }}
          >
            NO
          </motion.button>
        </div>
      ) : (
        <div className="relative h-32 sm:h-36 flex flex-col items-center justify-center gap-2">
          <HeartParticles burstKey={burst} count={24} />
          <Heart size={48} className="text-muted-burgundy" fill="currentColor" />
          <p className="font-hand text-2xl text-muted-burgundy">correct answer.</p>
        </div>
      )}

      <AnimatePresence>
        {giveUp && !answered && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-hand text-lg text-off-white/40"
          >
            girl give it up 😭
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
