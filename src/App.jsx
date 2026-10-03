import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Opening from "./components/Opening.jsx";
import Nav from "./components/Nav.jsx";
import PhotoCollage from "./components/sections/PhotoCollage.jsx";
import DistanceMap from "./components/sections/DistanceMap.jsx";
import Timeline from "./components/sections/Timeline.jsx";
import OpenWhenNotes from "./components/sections/OpenWhenNotes.jsx";
import ReasonsJar from "./components/sections/ReasonsJar.jsx";
import SillyStuff from "./components/sections/SillyStuff.jsx";
import DateNightGenerator from "./components/sections/DateNightGenerator.jsx";
import Coupons from "./components/sections/Coupons.jsx";
import SongsPlayer from "./components/sections/SongsPlayer.jsx";
import RandomSurprise from "./components/sections/RandomSurprise.jsx";
import Stats from "./components/sections/Stats.jsx";
import Footer from "./components/Footer.jsx";
import SecretEnding from "./components/SecretEnding.jsx";
import ToastProvider, { useToast } from "./lib/ToastContext.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { sfx } from "./lib/sound.js";
import HeartParticles from "./components/shared/HeartParticles.jsx";

function AppInner() {
  const [entered, setEntered] = useState(false);
  const [hasVisited, setHasVisited] = useLocalStorage("hasVisited", false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [loveBurst, setLoveBurst] = useState(0);
  const showToast = useToast();
  const typedRef = useRef("");
  const logoTimerRef = useRef(null);

  // "oh you're back :)" + time-of-day easter eggs, once she's inside the site
  useEffect(() => {
    if (!entered) return;
    const hour = new Date().getHours();
    const timers = [];
    if (hasVisited) {
      timers.push(setTimeout(() => showToast("oh you're back :)", { icon: "♡" }), 1200));
    } else {
      setHasVisited(true);
    }
    if (hour >= 0 && hour < 5) {
      timers.push(
        setTimeout(() => showToast("GO TO SLEEP PRETTY GIRL", { icon: "😴" }), hasVisited ? 3600 : 1200)
      );
    } else if (hour >= 22 || hour < 6) {
      timers.push(setTimeout(() => showToast("why are you awake 🤨", { icon: "🌙" }), 1200));
    }
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entered]);

  // typing "iloveyou" anywhere triggers hearts
  useEffect(() => {
    if (!entered) return;
    const handler = (e) => {
      if (e.key.length !== 1) return;
      typedRef.current = (typedRef.current + e.key.toLowerCase()).slice(-8);
      if (typedRef.current === "iloveyou") {
        setLoveBurst((n) => n + 1);
        sfx.heart();
        showToast("i love you too ♡", { icon: "♡" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [entered, showToast]);

  const handleLogoClick = () => {
    setLogoClicks((n) => {
      const next = n + 1;
      if (next === 5) {
        showToast("bro stop attacking my website 😭", { icon: "😭" });
        clearTimeout(logoTimerRef.current);
        return 0;
      }
      clearTimeout(logoTimerRef.current);
      logoTimerRef.current = setTimeout(() => setLogoClicks(0), 1500);
      return next;
    });
  };

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {!entered && <Opening key="opening" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <>
          <Nav onOpenSecret={() => setSecretOpen(true)} onLogoClick={handleLogoClick} />

          <main id="top">
            <PhotoCollage />
            <DistanceMap />
            <Timeline />
            <OpenWhenNotes />
            <ReasonsJar />
            <SillyStuff />
            <DateNightGenerator />
            <Coupons />
            <SongsPlayer />
            <RandomSurprise />
            <Stats />
          </main>

          <Footer />

          <div className="fixed inset-0 pointer-events-none z-[90]">
            <HeartParticles burstKey={loveBurst} count={18} />
          </div>

          <AnimatePresence>
            {secretOpen && <SecretEnding onClose={() => setSecretOpen(false)} />}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
