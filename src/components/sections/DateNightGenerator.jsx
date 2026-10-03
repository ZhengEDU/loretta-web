import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dices, Heart, X } from "lucide-react";
import relationship from "../../data/relationship.js";
import SectionHeading from "../shared/SectionHeading.jsx";
import SecretHeart from "../shared/SecretHeart.jsx";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import { sfx } from "../../lib/sound.js";
import { useToast } from "../../lib/ToastContext.jsx";

export default function DateNightGenerator() {
  const { dateIdeas } = relationship;
  const allTags = useMemo(
    () => [...new Set(dateIdeas.flatMap((d) => d.tags))],
    [dateIdeas]
  );
  const [activeTags, setActiveTags] = useState([]);
  const [current, setCurrent] = useState(null);
  const [saved, setSaved] = useLocalStorage("savedDates", []);
  const showToast = useToast();

  const pool = useMemo(() => {
    if (activeTags.length === 0) return dateIdeas;
    const filtered = dateIdeas.filter((d) => d.tags.some((t) => activeTags.includes(t)));
    return filtered.length ? filtered : dateIdeas;
  }, [dateIdeas, activeTags]);

  const pick = () => {
    sfx.click();
    let idea = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1 && current) {
      let tries = 0;
      while (idea.title === current.title && tries < 6) {
        idea = pool[Math.floor(Math.random() * pool.length)];
        tries++;
      }
    }
    setCurrent(idea);
  };

  const toggleTag = (tag) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const saveDate = () => {
    if (!current) return;
    if (saved.includes(current.title)) {
      showToast("already saved ♡", { icon: "♡" });
      return;
    }
    setSaved((prev) => [...prev, current.title]);
    sfx.heart();
    showToast("saved ♡", { icon: "♡" });
  };

  const removeSaved = (title) => setSaved((prev) => prev.filter((t) => t !== title));

  return (
    <section id="dates" className="relative px-5 sm:px-10 py-20 sm:py-28 max-w-2xl mx-auto text-center">
      <SecretHeart id="date-generator" className="absolute top-6 right-6 sm:right-10" />
      <SectionHeading
        eyebrow="bored? here."
        title="what should we do next?"
        subtitle="pick a mood, or don't."
      />

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-body border transition-colors ${
              activeTags.includes(tag)
                ? "bg-muted-burgundy text-off-white border-muted-burgundy"
                : "bg-noir text-off-white/60 border-dusty-pink/40 hover:border-muted-burgundy/50"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="min-h-[120px] flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div
              key={current.title}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="bg-off-white shadow-paper torn-edge px-8 py-6"
            >
              <p className="font-serif text-2xl sm:text-3xl text-ink capitalize">{current.title}</p>
            </motion.div>
          ) : (
            <p className="font-hand text-xl text-off-white/40">tap the dice to get an idea</p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={pick}
          className="rounded-full bg-muted-burgundy text-off-white font-body px-6 py-3 shadow-soft flex items-center gap-2"
        >
          <Dices size={16} />
          {current ? "again 🎲" : "pick our date"}
        </motion.button>
        {current && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={saveDate}
            className="rounded-full bg-blush text-muted-burgundy font-body px-6 py-3 shadow-paper flex items-center gap-2"
          >
            <Heart size={16} />
            save this one ♡
          </motion.button>
        )}
      </div>

      {saved.length > 0 && (
        <div className="mt-10 text-left">
          <p className="font-hand text-lg text-off-white/50 mb-3 text-center">saved dates</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {saved.map((title) => (
              <span
                key={title}
                className="flex items-center gap-1.5 bg-lavender/40 rounded-full pl-3 pr-1.5 py-1.5 text-xs sm:text-sm font-body text-off-white/70 capitalize"
              >
                {title}
                <button
                  onClick={() => removeSaved(title)}
                  className="p-1 rounded-full hover:bg-white/10"
                  aria-label={`remove ${title}`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
