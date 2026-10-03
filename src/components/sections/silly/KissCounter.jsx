import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import relationship from "../../../data/relationship.js";
import useLocalStorage from "../../../hooks/useLocalStorage.js";
import HeartParticles from "../../shared/HeartParticles.jsx";
import { sfx } from "../../../lib/sound.js";
import { useToast } from "../../../lib/ToastContext.jsx";

export default function KissCounter() {
  const [count, setCount] = useLocalStorage("kissCount", 0);
  const [burst, setBurst] = useState(0);
  const showToast = useToast();
  const clickTimes = useRef([]);
  const milestoneShownRef = useRef(new Set());

  const handleClick = () => {
    const now = Date.now();
    clickTimes.current = [...clickTimes.current.filter((t) => now - t < 1500), now];
    if (clickTimes.current.length >= 8) {
      showToast("RELAX", { icon: "😅" });
      clickTimes.current = [];
      return;
    }

    const next = count + 1;
    setCount(next);
    setBurst((b) => b + 1);
    sfx.heart();

    const milestone = relationship.kissMilestones.find((m) => m.at === next);
    if (milestone && !milestoneShownRef.current.has(next)) {
      milestoneShownRef.current.add(next);
      showToast(milestone.message, { icon: "♡" });
    }
  };

  return (
    <div className="bg-noir rounded-2xl shadow-paper p-6 sm:p-8 flex flex-col items-center text-center gap-4 relative overflow-visible">
      <p className="font-serif text-xl sm:text-2xl text-off-white">how many kisses do I owe you?</p>
      <div className="relative">
        <motion.button
          type="button"
          onClick={handleClick}
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.06 }}
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-muted-burgundy flex items-center justify-center shadow-soft"
          aria-label="add a kiss"
        >
          <Heart size={40} className="text-off-white" fill="currentColor" />
        </motion.button>
        <HeartParticles burstKey={burst} count={10} />
      </div>
      <p className="font-hand text-3xl text-muted-burgundy tabular-nums">{count}</p>
      <p className="font-body text-xs text-off-white/40">tap the heart</p>
    </div>
  );
}
