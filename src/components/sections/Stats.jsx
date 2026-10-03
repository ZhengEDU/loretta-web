import { motion } from "framer-motion";
import relationship from "../../data/relationship.js";
import { haversineMiles } from "../../lib/geo.js";
import SectionHeading from "../shared/SectionHeading.jsx";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import useHearts from "../../hooks/useHearts.js";

export default function Stats() {
  const [kissCount] = useLocalStorage("kissCount", 0);
  const [savedDates] = useLocalStorage("savedDates", []);
  const { count: heartsCount, total: heartsTotal } = useHearts();
  const miles = haversineMiles(
    relationship.locations.me.coordinates,
    relationship.locations.her.coordinates
  );

  const stats = [
    { label: "photos together", value: "3,000+" },
    { label: "dates survived", value: "undefeated" },
    { label: "miles between us", value: miles.toFixed(0) },
    { label: "kisses owed", value: kissCount },
    { label: "saved date ideas", value: savedDates.length },
    { label: "hearts collected", value: `${heartsCount}/${heartsTotal}` },
    { label: "chance I think you're pretty", value: "100%" },
    { label: "chance I'll deny saying that", value: "also 100%" },
    { label: "times you've been right", value: "data unavailable" },
  ];

  return (
    <section id="stats" className="relative px-5 sm:px-10 py-20 sm:py-28 max-w-4xl mx-auto">
      <SectionHeading
        eyebrow="peer-reviewed, probably"
        title="very official relationship statistics"
        subtitle="numbers don't lie. mostly."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            className="bg-noir rounded-2xl shadow-paper px-4 py-5 text-center"
          >
            <p className="font-serif text-xl sm:text-2xl text-muted-burgundy tabular-nums">
              {s.value}
            </p>
            <p className="font-body text-[11px] sm:text-xs text-off-white/50 mt-1.5 uppercase tracking-wide leading-snug">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
