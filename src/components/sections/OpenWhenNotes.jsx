import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X } from "lucide-react";
import relationship from "../../data/relationship.js";
import SectionHeading from "../shared/SectionHeading.jsx";
import SecretHeart from "../shared/SecretHeart.jsx";
import { seededRange } from "../../lib/rand.js";
import { sfx } from "../../lib/sound.js";

const PHONE_RE = /(\d{3}-\d{3}-\d{4})/g;
const PHONE_RE_EXACT = /^\d{3}-\d{3}-\d{4}$/;

function renderMessage(message) {
  const parts = message.split(PHONE_RE);
  return parts.map((part, i) =>
    PHONE_RE_EXACT.test(part) ? (
      <a key={i} href={`tel:${part.replace(/-/g, "")}`} className="text-muted-burgundy underline">
        {part}
      </a>
    ) : (
      part
    )
  );
}

export default function OpenWhenNotes() {
  const { openWhenMessages } = relationship;
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="notes" className="relative px-5 sm:px-10 py-20 sm:py-28 max-w-5xl mx-auto">
      <SectionHeading
        eyebrow="little envelopes"
        title="for when you miss me"
        subtitle="open one whenever you need it."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {openWhenMessages.map((item, i) => {
          const rotate = seededRange(i + 5, -4, 4);
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              whileHover={{ scale: 1.04, rotate: 0 }}
              whileTap={{ scale: 0.96 }}
              style={{ rotate }}
              className="relative"
            >
              <button
                type="button"
                onClick={() => {
                  sfx.open();
                  setOpenIdx(i);
                }}
                className="w-full bg-noir rounded-2xl shadow-paper p-4 sm:p-5 aspect-[4/3] flex flex-col items-center justify-center gap-2 text-center"
              >
                <Mail className="text-muted-burgundy/70" size={22} />
                <span className="font-hand text-base sm:text-lg text-off-white leading-tight">
                  {item.label}
                </span>
              </button>
              {i === openWhenMessages.length - 1 && (
                <SecretHeart id="open-when" className="absolute bottom-1 right-1" />
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)}
            className="fixed inset-0 z-[150] bg-ink/60 backdrop-blur-sm flex items-start sm:items-center justify-center overflow-y-auto p-5 py-16 sm:py-5"
          >
            <motion.div
              initial={{ opacity: 0, scaleY: 0.3, y: -20 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              exit={{ opacity: 0, scaleY: 0.3, y: -10 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              style={{ transformOrigin: "top center" }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-off-white torn-edge rounded-xl shadow-soft max-w-sm w-full p-6 sm:p-8 my-auto"
            >
              <button
                onClick={() => setOpenIdx(null)}
                className="absolute -top-3 -right-3 bg-muted-burgundy text-off-white rounded-full p-2 shadow-soft"
                aria-label="close"
              >
                <X size={16} />
              </button>
              <p className="font-hand text-xl text-warm-brown mb-3 uppercase tracking-wide">
                {openWhenMessages[openIdx].label}
              </p>
              <p className="font-serif text-lg sm:text-xl text-ink leading-relaxed whitespace-pre-line">
                {renderMessage(openWhenMessages[openIdx].message)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
