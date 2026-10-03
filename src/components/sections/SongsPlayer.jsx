import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Music2 } from "lucide-react";
import relationship from "../../data/relationship.js";
import SectionHeading from "../shared/SectionHeading.jsx";
import SecretHeart from "../shared/SecretHeart.jsx";
import { sfx } from "../../lib/sound.js";

export default function SongsPlayer() {
  const { songs } = relationship;
  const [activeIdx, setActiveIdx] = useState(0);
  const active = songs[activeIdx];

  return (
    <section id="songs" className="relative px-5 sm:px-10 py-20 sm:py-28 max-w-3xl mx-auto">
      <SecretHeart id="player" className="absolute top-6 right-6 sm:right-10" />
      <SectionHeading
        eyebrow="our little playlist"
        title="songs that sound like us"
        subtitle="tap a track. no autoplay, promise."
      />

      <div className="bg-noir rounded-2xl shadow-soft p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mb-8">
        <div className="relative shrink-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-ink shadow-soft flex items-center justify-center"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle, #221722 0px, #221722 2px, #0d0a0d 3px, #0d0a0d 4px)",
            }}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-4 border-off-white/80 bg-dusty-pink flex items-center justify-center">
              {active.cover ? (
                <img src={active.cover} alt="" className="w-full h-full object-cover" />
              ) : (
                <Music2 className="text-off-white/80" size={20} />
              )}
            </div>
          </motion.div>
        </div>

        <div className="text-center sm:text-left">
          <p className="font-serif text-xl sm:text-2xl text-off-white">{active.title}</p>
          <p className="font-body text-sm text-off-white/50 mb-3">{active.artist}</p>
          <p className="font-hand text-lg text-muted-burgundy mb-4">"{active.note}"</p>
          {active.link && (
            <a
              href={active.link}
              target="_blank"
              rel="noreferrer"
              onClick={() => sfx.click()}
              className="inline-flex items-center gap-1.5 rounded-full bg-muted-burgundy text-off-white text-sm px-4 py-2 shadow-paper"
            >
              listen <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>

      <div className="grid gap-2.5">
        {songs.map((song, i) => (
          <button
            key={song.title + i}
            onClick={() => {
              setActiveIdx(i);
              sfx.click();
            }}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors ${
              i === activeIdx ? "bg-blush/50" : "bg-noir hover:bg-blush/25"
            }`}
          >
            <div className="w-9 h-9 rounded-md bg-dusty-pink/50 flex items-center justify-center overflow-hidden shrink-0">
              {song.cover ? (
                <img src={song.cover} alt="" className="w-full h-full object-cover" />
              ) : (
                <Music2 size={14} className="text-muted-burgundy" />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-body text-sm text-off-white truncate">{song.title}</p>
              <p className="font-body text-xs text-off-white/40 truncate">{song.artist}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
