import { useState } from "react";
import { motion } from "framer-motion";
import photos from "../../data/photos.js";
import SectionHeading from "../shared/SectionHeading.jsx";
import TiltCard from "../shared/TiltCard.jsx";
import Tape from "../shared/Tape.jsx";
import PhotoModal from "../shared/PhotoModal.jsx";
import SecretHeart from "../shared/SecretHeart.jsx";
import { seededRange, pick } from "../../lib/rand.js";
import { DoodleStar } from "../shared/Doodles.jsx";

const HANDWRITTEN_NOTES = [
  "these are in no particular order",
  "my camera roll, basically",
  "proof we're cute together",
  "not sorry for how many there are",
];

const FRAME_TYPES = ["polaroid", "tape", "film"];

export default function PhotoCollage() {
  const [selected, setSelected] = useState(null);

  // Interleave a handwritten note card every ~5 photos.
  const items = [];
  let noteIdx = 0;
  photos.forEach((photo, i) => {
    items.push({ kind: "photo", photo, i });
    if ((i + 1) % 5 === 0 && noteIdx < HANDWRITTEN_NOTES.length) {
      items.push({ kind: "note", text: HANDWRITTEN_NOTES[noteIdx], i });
      noteIdx += 1;
    }
  });

  return (
    <section id="photos" className="relative px-5 sm:px-10 py-20 sm:py-28 max-w-6xl mx-auto">
      <SecretHeart id="collage" className="absolute top-6 right-6 sm:right-10" />
      <SectionHeading
        eyebrow="no filter needed"
        title="us, in pictures"
        subtitle="the ones I keep going back to."
      />

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 sm:gap-6">
        {items.map((item, idx) =>
          item.kind === "note" ? (
            <NoteCard key={`note-${idx}`} text={item.text} seed={idx} />
          ) : (
            <PhotoCard
              key={item.photo.src}
              photo={item.photo}
              seed={item.i}
              onOpen={() => setSelected(item.photo)}
              showSecret={item.i === 2}
            />
          )
        )}
      </div>

      {selected && <PhotoModal photo={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function NoteCard({ text, seed }) {
  const rotate = seededRange(seed + 100, -6, 6);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ rotate }}
      className="break-inside-avoid mb-4 sm:mb-6 bg-lavender/40 torn-edge px-5 py-6 flex items-center justify-center text-center shadow-paper"
    >
      <div className="flex flex-col items-center gap-2">
        <DoodleStar className="w-4 h-4" />
        <p className="font-hand text-xl sm:text-2xl text-muted-burgundy leading-snug">{text}</p>
      </div>
    </motion.div>
  );
}

function PhotoCard({ photo, seed, onOpen, showSecret }) {
  const rotate = seededRange(seed, -6, 6);
  const frame = photo.hero ? "polaroid" : pick(seed, FRAME_TYPES);
  const [lastTap, setLastTap] = useState(0);
  const [caught, setCaught] = useState(false);

  const handleDoubleClick = () => {
    setCaught(true);
    setTimeout(() => setCaught(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (seed % 6) * 0.05 }}
      className="break-inside-avoid mb-4 sm:mb-6 relative"
    >
      <TiltCard
        rotate={rotate}
        onClick={onOpen}
        className={frame === "polaroid" ? "polaroid" : frame === "film" ? "bg-ink p-1.5" : "shadow-paper"}
        style={photo.hero ? { transform: `rotate(${rotate}deg) scale(1.02)` } : undefined}
      >
        <div
          onDoubleClick={handleDoubleClick}
          onTouchEnd={() => {
            const now = Date.now();
            if (now - lastTap < 300) handleDoubleClick();
            setLastTap(now);
          }}
          className={`relative overflow-hidden ${frame === "film" ? "border-2 border-ink" : ""}`}
        >
          <img
            src={photo.src}
            alt={photo.caption}
            loading="lazy"
            className={`w-full object-cover ${
              photo.orientation === "portrait"
                ? "aspect-[3/4]"
                : photo.orientation === "landscape"
                ? "aspect-[4/3]"
                : "aspect-square"
            } ${photo.hero ? "sm:aspect-[4/5]" : ""}`}
            style={{ objectPosition: photo.objectPosition || "center" }}
          />
          {caught && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-x-0 bottom-0 bg-ink/70 text-off-white text-xs font-hand text-center py-1"
            >
              caught you looking at yourself
            </motion.div>
          )}
        </div>
        {frame === "polaroid" && (
          <p className="absolute bottom-2 inset-x-0 text-center font-hand text-lg text-muted-burgundy px-2 truncate">
            {photo.caption}
          </p>
        )}
        {frame !== "polaroid" && (
          <p className="mt-2 font-hand text-base text-center text-muted-burgundy/90 px-1">
            {photo.caption}
          </p>
        )}
        {frame === "tape" && (
          <Tape rotate={seededRange(seed + 40, -20, -10)} className="-top-2 left-1/2 -translate-x-1/2" />
        )}
      </TiltCard>
      {showSecret && <SecretHeart id="polaroid" className="absolute -bottom-1 -right-1" />}
    </motion.div>
  );
}
