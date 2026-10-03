import { motion } from "framer-motion";
import { DoodleSquiggle } from "./Doodles.jsx";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${alignClass} gap-2 mb-10 sm:mb-14`}
    >
      {eyebrow && (
        <span className="font-hand text-xl sm:text-2xl text-muted-burgundy/80">{eyebrow}</span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-off-white font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-body text-off-white/60 text-base sm:text-lg max-w-md">{subtitle}</p>
      )}
      <DoodleSquiggle className="w-20 h-4 mt-1 opacity-70" />
    </motion.div>
  );
}
