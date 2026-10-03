import { motion } from "framer-motion";
import relationship from "../../data/relationship.js";
import SectionHeading from "../shared/SectionHeading.jsx";
import SecretHeart from "../shared/SecretHeart.jsx";
import { DoodleHeartOutline } from "../shared/Doodles.jsx";

export default function Timeline() {
  const { timeline } = relationship;

  return (
    <section id="timeline" className="relative px-5 sm:px-10 py-20 sm:py-28 max-w-3xl mx-auto">
      <SectionHeading
        eyebrow="how we got here"
        title="our little timeline"
        subtitle="a few stops along the way."
      />

      <div className="relative pl-8 sm:pl-10">
        <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-dusty-pink/50" />

        {timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.05 * i }}
            className="relative pb-12 last:pb-0"
          >
            <span
              className={`absolute -left-8 sm:-left-10 top-1.5 w-4 h-4 rounded-full border-2 ${
                item.isFuture
                  ? "bg-cream border-muted-burgundy animate-pulse"
                  : "bg-muted-burgundy border-muted-burgundy"
              }`}
            />
            {i === 3 && <SecretHeart id="timeline" className="absolute -left-1 -top-4" />}

            {item.date && (
              <p className="font-hand text-lg text-warm-brown mb-1">{item.date}</p>
            )}

            <div
              className={`bg-noir rounded-2xl shadow-paper p-5 ${
                item.isFuture ? "border-2 border-dashed border-dusty-pink" : ""
              }`}
            >
              <h3 className="font-serif text-xl sm:text-2xl text-off-white mb-1.5">{item.title}</h3>

              {item.photo && (
                <img
                  src={item.photo}
                  alt={item.title}
                  className="w-full rounded-lg mb-3 object-cover aspect-[16/10]"
                />
              )}

              {item.isFuture ? (
                <div className="flex flex-col items-center text-center gap-2 py-2">
                  <DoodleHeartOutline className="w-8 h-8" />
                  <p className="font-serif italic text-lg text-muted-burgundy">
                    {item.description}
                  </p>
                  <p className="font-hand text-xl sm:text-2xl text-muted-burgundy mt-1">
                    because we're not done making memories yet.
                  </p>
                </div>
              ) : (
                <p className="font-body text-sm sm:text-base text-off-white/65">{item.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
