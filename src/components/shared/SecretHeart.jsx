import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import useHearts, { TOTAL_HEARTS } from "../../hooks/useHearts.js";
import { useToast } from "../../lib/ToastContext.jsx";
import { sfx } from "../../lib/sound.js";

// A tiny hidden collectible heart. Drop <SecretHeart id="unique-id" /> anywhere
// in the site — positioning is the parent's responsibility (usually
// `absolute` inside a `relative` wrapper).
export default function SecretHeart({ id, className = "", style }) {
  const { collect, isFound } = useHearts();
  const showToast = useToast();
  const found = isFound(id);

  const handleClick = (e) => {
    e.stopPropagation();
    const isNew = collect(id);
    if (isNew) {
      sfx.heart();
      const count = readCountAfter(id);
      showToast(`${count}/${TOTAL_HEARTS} hearts found ♡`, { icon: "✦" });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={found ? "heart found" : "a tiny secret"}
      className={`group outline-none ${className}`}
      style={style}
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.9 }}
      animate={found ? {} : { opacity: [0.35, 0.7, 0.35] }}
      transition={found ? {} : { duration: 2.6, repeat: Infinity }}
    >
      <Heart
        size={16}
        className={found ? "opacity-0" : "opacity-70"}
        fill={found ? "transparent" : "#ff2d75"}
        color="#ff2d75"
      />
    </motion.button>
  );
}

function readCountAfter(id) {
  try {
    const raw = localStorage.getItem("loretta-web:heartsFound");
    const arr = raw ? JSON.parse(raw) : [];
    const set = new Set(arr);
    set.add(id);
    return set.size;
  } catch {
    return 1;
  }
}
