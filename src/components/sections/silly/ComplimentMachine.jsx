import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import relationship from "../../../data/relationship.js";
import { sfx } from "../../../lib/sound.js";

export default function ComplimentMachine() {
  const { compliments } = relationship;
  const [current, setCurrent] = useState(null);
  const [key, setKey] = useState(0);
  const [lastIdx, setLastIdx] = useState(-1);

  const generate = () => {
    sfx.click();
    let idx = Math.floor(Math.random() * compliments.length);
    if (compliments.length > 1) {
      while (idx === lastIdx) idx = Math.floor(Math.random() * compliments.length);
    }
    setLastIdx(idx);
    setCurrent(compliments[idx]);
    setKey((k) => k + 1);
  };

  return (
    <div className="bg-noir rounded-2xl shadow-paper p-6 sm:p-8 flex flex-col items-center text-center gap-4">
      <p className="font-serif text-xl sm:text-2xl text-off-white">need to hear something nice?</p>
      <motion.button
        type="button"
        onClick={generate}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="rounded-full bg-warm-brown/90 text-off-white font-body px-6 py-3 shadow-soft flex items-center gap-2"
      >
        <Sparkles size={16} />
        tell me something
      </motion.button>
      <div className="min-h-[52px] flex items-center">
        <AnimatePresence mode="wait">
          {current && (
            <motion.p
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-hand text-2xl text-muted-burgundy max-w-xs"
            >
              {current}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
