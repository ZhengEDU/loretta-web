import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import relationship from "../../data/relationship.js";
import SectionHeading from "../shared/SectionHeading.jsx";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import { sfx } from "../../lib/sound.js";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const allIndices = relationship.reasonsILoveYou.map((_, i) => i);

export default function ReasonsJar() {
  const { reasonsILoveYou } = relationship;
  const [queue, setQueue] = useLocalStorage("reasonsQueue", shuffle(allIndices));
  const [openedCount, setOpenedCount] = useLocalStorage("reasonsOpenedCount", 0);
  const [current, setCurrent] = useState(null);
  const [drawKey, setDrawKey] = useState(0);

  const draw = () => {
    sfx.pop();
    let q = queue;
    if (!q || q.length === 0) q = shuffle(allIndices);
    const [next, ...rest] = q;
    setCurrent(reasonsILoveYou[next]);
    setQueue(rest);
    setOpenedCount((c) => c + 1);
    setDrawKey((k) => k + 1);
  };

  return (
    <section id="jar" className="relative px-5 sm:px-10 py-20 sm:py-28 max-w-2xl mx-auto text-center">
      <SectionHeading
        eyebrow="a jar of little things"
        title="things I love about you"
        subtitle="whenever you forget, open one."
      />

      <motion.button
        type="button"
        onClick={draw}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative mx-auto flex flex-col items-center gap-3"
        aria-label="open the jar"
      >
        <svg width="140" height="160" viewBox="0 0 140 160" className="drop-shadow-[0_10px_16px_rgba(255,45,117,0.35)]">
          <rect x="30" y="8" width="80" height="18" rx="6" fill="#ff6fa5" opacity="0.85" />
          <path
            d="M20 30 h100 l-10 110 a12 12 0 0 1 -12 12 h-56 a12 12 0 0 1 -12 -12 Z"
            fill="#18141a"
            stroke="#ff5c93"
            strokeWidth="2"
            opacity="0.9"
          />
          {Array.from({ length: 7 }).map((_, i) => (
            <rect
              key={i}
              x={30 + ((i * 13) % 80)}
              y={50 + ((i * 29) % 80)}
              width="14"
              height="9"
              rx="1"
              fill="#ff5c93"
              opacity="0.6"
              transform={`rotate(${(i * 37) % 40 - 20} ${30 + ((i * 13) % 80)} ${50 + ((i * 29) % 80)})`}
            />
          ))}
        </svg>
        <span className="font-body text-sm text-off-white/50">tap the jar</span>
      </motion.button>

      <div className="mt-8 min-h-[140px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={drawKey}
              initial={{ opacity: 0, y: 24, rotate: -6, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="bg-off-white torn-edge shadow-paper px-6 py-5 max-w-sm"
            >
              <p className="font-hand text-2xl sm:text-3xl text-muted-burgundy leading-snug">
                {current}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {openedCount >= 4 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-hand text-xl text-off-white/50 mt-2"
        >
          there are more. obviously.
        </motion.p>
      )}
    </section>
  );
}
