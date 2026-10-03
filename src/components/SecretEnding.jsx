import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";
import relationship from "../data/relationship.js";
import { sfx } from "../lib/sound.js";

export default function SecretEnding({ onClose }) {
  const [step, setStep] = useState(0);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    sfx.unlock();
    const t1 = setTimeout(() => setStep(1), 2200);
    const t2 = setTimeout(() => setStep(2), 4400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const letterLines = relationship.finalLetter.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[300] overflow-y-auto"
      style={{
        background: "linear-gradient(160deg, #0d0a0d 0%, #2a0f1e 45%, #3d1428 100%)",
      }}
    >
      {/* floating glow lights */}
      <div className="pointer-events-none fixed inset-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: 4 + (i % 4) * 3,
              height: 4 + (i % 4) * 3,
              background: i % 2 === 0 ? "#ffb3d1" : "#e8a9ff",
              filter: "blur(1px)",
              boxShadow: "0 0 10px 2px rgba(255,92,147,0.6)",
            }}
            animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.35 }}
          />
        ))}
      </div>

      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-10 p-2.5 rounded-full bg-off-white/10 text-off-white hover:bg-off-white/20 transition-colors"
        aria-label="close"
      >
        <X size={18} />
      </button>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.p
              key="okay"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="font-serif text-3xl sm:text-4xl text-off-white"
            >
              okay.
            </motion.p>
          )}
          {step === 1 && (
            <motion.p
              key="serious"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="font-serif italic text-2xl sm:text-3xl text-off-white/90"
            >
              this part is actually serious.
            </motion.p>
          )}
          {step === 2 && (
            <motion.div
              key="letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="max-w-lg w-full"
            >
              <div className="bg-off-white/95 text-ink rounded-xl shadow-2xl px-6 py-8 sm:px-10 sm:py-12 text-left torn-edge">
                {letterLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                    className={`font-serif text-base sm:text-lg leading-relaxed ${
                      line === "" ? "h-3" : "mb-1"
                    } ${i === letterLines.length - 1 ? "font-hand text-2xl text-muted-burgundy mt-3" : ""}`}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + letterLines.length * 0.12 + 0.6, duration: 0.8 }}
                className="flex flex-col items-center gap-4 mt-10"
              >
                <p className="font-hand text-2xl text-off-white/90">one last thing</p>
                <motion.button
                  type="button"
                  onClick={() => {
                    setExploded(true);
                    sfx.heart();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-off-white text-muted-burgundy font-body font-medium px-8 py-3.5 shadow-soft"
                >
                  click me
                </motion.button>
              </motion.div>

              {exploded && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="font-hand text-3xl sm:text-4xl text-off-white mt-10"
                >
                  now come give me a kiss.
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {exploded && <Explosion />}
    </motion.div>
  );
}

function Explosion() {
  const pieces = Array.from({ length: 60 }, (_, i) => i);
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {pieces.map((i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const duration = 2 + Math.random() * 1.8;
        const size = 10 + Math.random() * 16;
        const colors = ["#ffb3d1", "#ff5c93", "#e8a9ff", "#ffffff"];
        const color = colors[i % colors.length];
        return (
          <motion.span
            key={i}
            className="absolute"
            style={{ left: `${left}%`, top: "-5%" }}
            initial={{ y: 0, opacity: 0, rotate: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: (Math.random() - 0.5) * 360 }}
            transition={{ duration, delay, ease: "easeIn" }}
          >
            <Heart size={size} fill={color} color={color} />
          </motion.span>
        );
      })}
    </div>
  );
}
