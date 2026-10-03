import { motion } from "framer-motion";
import relationship from "../../data/relationship.js";
import SectionHeading from "../shared/SectionHeading.jsx";
import SecretHeart from "../shared/SecretHeart.jsx";
import useLocalStorage from "../../hooks/useLocalStorage.js";
import { sfx } from "../../lib/sound.js";
import { useToast } from "../../lib/ToastContext.jsx";

export default function Coupons() {
  const { coupons } = relationship;
  const [claimed, setClaimed] = useLocalStorage("claimedCoupons", []);
  const showToast = useToast();

  const claim = (title) => {
    if (claimed.includes(title)) return;
    setClaimed((prev) => [...prev, title]);
    sfx.stamp();
    showToast("screenshot this and send it to me 😭", { icon: "♡" });
  };

  return (
    <section id="coupons" className="relative px-5 sm:px-10 py-20 sm:py-28 max-w-4xl mx-auto">
      <SectionHeading
        eyebrow="redeemable, ideally soon"
        title="relationship coupons"
        subtitle="claim one. I'll actually deliver."
      />

      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
        {coupons.map((coupon, i) => {
          const isClaimed = claimed.includes(coupon.title);
          return (
            <motion.div
              key={coupon.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              className="relative flex bg-noir rounded-2xl shadow-paper overflow-hidden"
            >
              <div className="w-16 sm:w-20 bg-muted-burgundy/90 flex flex-col items-center justify-center gap-1 shrink-0">
                <span className="text-off-white text-xl">{coupon.stamp}</span>
                <span
                  className="text-off-white/70 text-[10px] font-body tracking-widest"
                  style={{ writingMode: "vertical-rl" }}
                >
                  ADMIT ONE
                </span>
              </div>
              <div className="perforated w-0" />
              <div className="flex-1 p-4 sm:p-5 flex items-center justify-between gap-3">
                <p className="font-serif text-base sm:text-lg text-off-white capitalize leading-snug">
                  {coupon.title}
                </p>
                <button
                  onClick={() => claim(coupon.title)}
                  disabled={isClaimed}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-body transition-colors ${
                    isClaimed
                      ? "bg-blush/50 text-muted-burgundy/60"
                      : "bg-blush text-muted-burgundy hover:bg-dusty-pink/60"
                  }`}
                >
                  {isClaimed ? "claimed" : "claim"}
                </button>
              </div>

              {isClaimed && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.4, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: -12 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <span className="border-2 border-muted-burgundy/70 text-muted-burgundy/80 font-hand text-xl sm:text-2xl px-4 py-1 rounded-md bg-off-white/70">
                    REDEEMED ♡
                  </span>
                </motion.div>
              )}

              {i === 3 && <SecretHeart id="coupon" className="absolute top-1.5 right-1.5" />}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
