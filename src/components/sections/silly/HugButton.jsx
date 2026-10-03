import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import HeartParticles from "../../shared/HeartParticles.jsx";
import { sfx } from "../../../lib/sound.js";

export default function HugButton() {
  const [burst, setBurst] = useState(0);
  const [hugged, setHugged] = useState(false);

  const handleHug = () => {
    setBurst((b) => b + 1);
    setHugged(true);
    sfx.heart();

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([40, 30, 40]);
    }

    const root = document.getElementById("root");
    if (root) {
      root.style.transition = "transform 0.5s ease";
      root.style.transform = "scale(0.975)";
      setTimeout(() => {
        root.style.transform = "scale(1)";
      }, 380);
    }
  };

  return (
    <div className="bg-noir rounded-2xl shadow-paper p-6 sm:p-8 flex flex-col items-center text-center gap-4 relative">
      <p className="font-serif text-xl sm:text-2xl text-off-white">need a hug?</p>
      <motion.button
        type="button"
        onClick={handleHug}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        className="relative rounded-full bg-lavender/70 text-muted-burgundy font-body px-8 py-4 shadow-soft flex items-center gap-2"
      >
        <Heart size={18} />
        I need a hug
        <HeartParticles burstKey={burst} count={14} colors={["#e8a9ff", "#ff5c93", "#ff2d75"]} />
      </motion.button>
      {hugged && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <p className="font-hand text-xl text-muted-burgundy">virtual hug delivered ♡</p>
          <p className="font-body text-xs text-off-white/40">real version available whenever you want.</p>
        </motion.div>
      )}
    </div>
  );
}
