import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Mail } from "lucide-react";
import relationship from "../data/relationship.js";
import { sfx } from "../lib/sound.js";

const STEPS = ["envelope", "hi", "made", "justForYou"];

export default function Opening({ onEnter }) {
  const [step, setStep] = useState(0);
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    sfx.open();
    setTimeout(() => setStep(1), 900);
  };

  const fragments = Array.from({ length: 14 }, (_, i) => i);

  return (
    <div className="fixed inset-0 z-[100] bg-cream flex items-center justify-center overflow-hidden paper-grain">
      {/* ambient floating doodles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-dusty-pink/40"
            style={{
              left: `${10 + ((i * 11) % 80)}%`,
              top: `${8 + ((i * 23) % 80)}%`,
            }}
            animate={{ y: [0, -14, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
          >
            {i % 2 === 0 ? <Heart size={14 + (i % 3) * 4} /> : <Star size={12 + (i % 3) * 3} />}
          </motion.span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="envelope-stage"
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative flex flex-col items-center gap-8 px-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-hand text-2xl sm:text-3xl text-muted-burgundy"
            >
              something was left here for you ♡
            </motion.p>

            <motion.button
              type="button"
              onClick={handleOpen}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative"
              aria-label="open envelope"
            >
              <motion.div
                animate={opened ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="relative w-56 h-40 sm:w-64 sm:h-44"
              >
                {/* envelope body */}
                <div className="absolute inset-0 rounded-md bg-noir shadow-soft border border-dusty-pink/40" />
                {/* envelope flap */}
                <motion.div
                  className="absolute left-0 right-0 top-0 h-1/2 origin-top"
                  style={{
                    background: "linear-gradient(135deg, #ffb3d1, #ff5c93)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                  animate={opened ? { rotateX: 180, opacity: 0.3 } : { rotateX: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-md bg-noir" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Mail className="text-muted-burgundy/70" size={30} />
                </div>

                {/* burst fragments */}
                {opened && (
                  <div className="absolute inset-0">
                    {fragments.map((i) => {
                      const angle = (Math.PI * 2 * i) / fragments.length;
                      const dist = 90 + (i % 4) * 20;
                      const x = Math.cos(angle) * dist;
                      const y = Math.sin(angle) * dist - 60;
                      const Icon = i % 3 === 0 ? Star : Heart;
                      const color = i % 2 === 0 ? "#ff2d75" : "#ff5c93";
                      return (
                        <motion.span
                          key={i}
                          className="absolute left-1/2 top-1/2"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                          animate={{ x, y, opacity: 0, scale: 1, rotate: (Math.random() - 0.5) * 180 }}
                          transition={{ duration: 1.3, ease: "easeOut" }}
                        >
                          <Icon size={12 + (i % 3) * 5} fill={color} color={color} />
                        </motion.span>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </motion.button>

            <p className="font-body text-sm text-off-white/40">tap the envelope</p>
          </motion.div>
        )}

        {step === 1 && (
          <TextStep key="hi" onDone={() => setStep(2)}>
            hi {relationship.nickname}
          </TextStep>
        )}
        {step === 2 && (
          <TextStep key="made" onDone={() => setStep(3)}>
            I made you a little place on the internet.
          </TextStep>
        )}
        {step === 3 && (
          <motion.div
            key="justForYou"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-8 px-6 text-center"
          >
            <p className="font-serif italic text-2xl sm:text-3xl text-off-white">just for you.</p>
            <motion.button
              type="button"
              onClick={() => {
                sfx.click();
                onEnter();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-muted-burgundy text-off-white font-body font-medium px-8 py-3.5 shadow-glow text-base sm:text-lg"
            >
              come look around ♡
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextStep({ children, onDone }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.7 }}
      onAnimationComplete={() => {
        const t = setTimeout(onDone, 1400);
        return () => clearTimeout(t);
      }}
      className="px-6 text-center"
    >
      <p className="font-serif text-3xl sm:text-4xl text-off-white">{children}</p>
    </motion.div>
  );
}
