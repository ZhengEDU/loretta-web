import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Images, MapPin, Mail, Gamepad2, Lock, Volume2, VolumeX } from "lucide-react";
import useHearts from "../hooks/useHearts.js";
import { useToast } from "../lib/ToastContext.jsx";
import { getSoundPref, setSoundPref, sfx } from "../lib/sound.js";
import SecretHeart from "./shared/SecretHeart.jsx";

const ITEMS = [
  { id: "top", icon: Home, label: "home" },
  { id: "photos", icon: Images, label: "photos" },
  { id: "map", icon: MapPin, label: "map" },
  { id: "notes", icon: Mail, label: "love notes" },
  { id: "games", icon: Gamepad2, label: "games" },
];

export default function Nav({ onOpenSecret, logoClicks, onLogoClick }) {
  const { count, total, complete } = useHearts();
  const showToast = useToast();
  const [soundOn, setSoundOnState] = useState(getSoundPref());

  const scrollTo = (id) => {
    sfx.click();
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSecretClick = () => {
    if (!complete) {
      sfx.pop();
      showToast("nope. go explore first.", { icon: "🔒" });
      return;
    }
    onOpenSecret();
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOnState(next);
    setSoundPref(next);
    if (next) sfx.click();
  };

  return (
    <>
      {/* Desktop floating nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="hidden sm:flex fixed top-5 left-1/2 -translate-x-1/2 z-40 items-center gap-1 rounded-full bg-noir/90 backdrop-blur shadow-soft border border-dusty-pink/30 px-3 py-2"
      >
        <button
          onClick={onLogoClick}
          className="font-hand text-xl text-muted-burgundy px-3 select-none"
          aria-label="site logo"
          title="our little corner"
        >
          ♡
        </button>
        {ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            title={label}
            className="p-2.5 rounded-full text-off-white/60 hover:text-muted-burgundy hover:bg-blush/50 transition-colors"
          >
            <Icon size={18} />
          </button>
        ))}
        <span className="relative inline-block">
          <button
            onClick={handleSecretClick}
            title="secret"
            className="p-2.5 rounded-full text-off-white/60 hover:text-muted-burgundy hover:bg-blush/50 transition-colors"
          >
            <Lock size={18} />
          </button>
          <SecretHeart id="nav" className="absolute -top-1 -right-1" />
        </span>
        <span className="text-xs font-body text-off-white/40 px-2 tabular-nums">
          {count}/{total}
        </span>
        <button
          onClick={toggleSound}
          title="toggle sound"
          className="p-2.5 rounded-full text-off-white/60 hover:text-muted-burgundy hover:bg-blush/50 transition-colors"
        >
          {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </motion.nav>

      {/* Mobile bottom dock */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="sm:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-0.5 rounded-full bg-noir/95 backdrop-blur shadow-soft border border-dusty-pink/30 px-2 py-2"
      >
        {ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={label}
            className="p-2.5 rounded-full text-off-white/60 active:text-muted-burgundy active:bg-blush/50"
          >
            <Icon size={19} />
          </button>
        ))}
        <button
          onClick={handleSecretClick}
          aria-label="secret"
          className="relative p-2.5 rounded-full text-off-white/60 active:text-muted-burgundy active:bg-blush/50"
        >
          <Lock size={19} />
        </button>
        <button
          onClick={toggleSound}
          aria-label="toggle sound"
          className="p-2.5 rounded-full text-off-white/60 active:text-muted-burgundy active:bg-blush/50"
        >
          {soundOn ? <Volume2 size={19} /> : <VolumeX size={19} />}
        </button>
      </motion.nav>
    </>
  );
}
