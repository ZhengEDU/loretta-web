import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw } from "lucide-react";
import photos from "../../data/photos.js";
import relationship from "../../data/relationship.js";
import SectionHeading from "../shared/SectionHeading.jsx";
import { sfx } from "../../lib/sound.js";

export default function RandomSurprise() {
  const [reveal, setReveal] = useState(null);
  const [key, setKey] = useState(0);

  const press = () => {
    sfx.click();
    const photo = photos[Math.floor(Math.random() * photos.length)];
    const caption =
      relationship.surpriseCaptions[
        Math.floor(Math.random() * relationship.surpriseCaptions.length)
      ];
    setReveal({ photo, caption });
    setKey((k) => k + 1);
  };

  return (
    <section id="surprise" className="relative px-5 sm:px-10 py-20 sm:py-28 max-w-md mx-auto text-center">
      <SectionHeading
        eyebrow="emergency use only (jk, use anytime)"
        title="press this when you miss my face"
        subtitle=""
      />

      <motion.button
        type="button"
        onClick={press}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="rounded-full bg-muted-burgundy text-off-white font-body px-8 py-3.5 shadow-glow flex items-center gap-2 mx-auto"
      >
        <RotateCw size={16} />
        okay
      </motion.button>

      <div className="mt-8 min-h-[280px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {reveal && (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20, rotate: -6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="polaroid inline-block"
            >
              <img
                src={reveal.photo.src}
                alt={reveal.photo.caption}
                className="w-56 sm:w-64 aspect-[3/4] object-cover"
                style={{ objectPosition: reveal.photo.objectPosition || "center" }}
              />
              <p className="mt-3 font-hand text-xl text-muted-burgundy">{reveal.caption}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
