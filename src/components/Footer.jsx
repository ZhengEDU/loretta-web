import { Heart } from "lucide-react";
import relationship from "../data/relationship.js";
import useHearts from "../hooks/useHearts.js";
import SecretHeart from "./shared/SecretHeart.jsx";
import { DoodleFlower, DoodleStar } from "./shared/Doodles.jsx";

export default function Footer() {
  const { count, total } = useHearts();

  return (
    <footer className="relative px-5 sm:px-10 py-16 pb-28 sm:pb-16 text-center overflow-hidden">
      <div className="pointer-events-none absolute left-6 top-6 opacity-60">
        <DoodleFlower className="w-8 h-8" />
      </div>
      <div className="pointer-events-none absolute right-8 bottom-10 opacity-50">
        <DoodleStar className="w-6 h-6" />
      </div>
      <SecretHeart id="footer" className="absolute bottom-4 left-1/2 -translate-x-1/2" />

      <p className="font-hand text-2xl text-muted-burgundy mb-2">
        made by {relationship.myName}, for {relationship.herName}
      </p>
      <p className="font-body text-xs text-off-white/40 flex items-center justify-center gap-1.5">
        <Heart size={11} fill="#ff2d75" color="#ff2d75" />
        {count}/{total} hearts found · keep looking
      </p>
    </footer>
  );
}
