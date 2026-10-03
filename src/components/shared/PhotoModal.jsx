import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function PhotoModal({ photo, onClose }) {
  if (!photo) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[150] bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-noir rounded-sm shadow-soft max-w-md w-full p-4 pb-6"
      >
        <button
          onClick={onClose}
          aria-label="close"
          className="absolute -top-3 -right-3 bg-muted-burgundy text-off-white rounded-full p-2 shadow-soft"
        >
          <X size={16} />
        </button>
        <div className="overflow-hidden rounded-sm bg-blush/30">
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-full max-h-[60vh] object-contain"
            style={{ objectPosition: photo.objectPosition || "center" }}
          />
        </div>
        <div className="mt-4 space-y-1.5">
          <p className="font-hand text-2xl text-muted-burgundy leading-tight">{photo.caption}</p>
          {(photo.date || photo.location) && (
            <p className="font-body text-xs uppercase tracking-wide text-off-white/40">
              {[photo.date, photo.location].filter(Boolean).join(" · ")}
            </p>
          )}
          {photo.memory && (
            <p className="font-body text-sm text-off-white/70 pt-1">{photo.memory}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
