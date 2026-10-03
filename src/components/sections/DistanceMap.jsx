import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import relationship from "../../data/relationship.js";
import { haversineMiles, estimateDrivingMiles, bezierPoints } from "../../lib/geo.js";
import SectionHeading from "../shared/SectionHeading.jsx";
import SecretHeart from "../shared/SecretHeart.jsx";
import { useToast } from "../../lib/ToastContext.jsx";
import { sfx } from "../../lib/sound.js";

const { me, her } = relationship.locations;

function pinIcon(color) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:16px;height:16px;border-radius:50% 50% 50% 0;
      background:${color};transform:rotate(-45deg);
      box-shadow:0 2px 6px rgba(0,0,0,0.25); border:2px solid white;
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 16],
  });
}

function heartIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="font-size:18px;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.25))">♡</div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(points, { padding: [40, 40] });
  }, [map, points]);
  return null;
}

function TravelingHeart({ points, tick }) {
  const [idx, setIdx] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (tick === 0) return;
    let start = null;
    const duration = 2200;
    const animate = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setIdx(Math.floor(progress * (points.length - 1)));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick, points.length]);

  if (tick === 0) return null;
  return <Marker position={points[idx]} icon={heartIcon()} />;
}

export default function DistanceMap() {
  const showToast = useToast();
  const [sendTick, setSendTick] = useState(0);
  const [delivered, setDelivered] = useState(false);
  const points = useMemo(() => bezierPoints(her.coordinates, me.coordinates), []);
  const bounds = useMemo(() => [me.coordinates, her.coordinates], []);

  const straightMiles = useMemo(() => haversineMiles(me.coordinates, her.coordinates), []);
  const drivingMiles = useMemo(() => estimateDrivingMiles(straightMiles), [straightMiles]);

  const handleSend = () => {
    setDelivered(false);
    setSendTick((n) => n + 1);
    sfx.heart();
    const duration = 2300;
    setTimeout(() => {
      setDelivered(true);
      showToast("delivered ♡", { icon: "♡" });
    }, duration);
  };

  return (
    <section id="map" className="relative px-5 sm:px-10 py-20 sm:py-28 max-w-4xl mx-auto">
      <SecretHeart id="map" className="absolute top-6 right-6 sm:right-10" />
      <SectionHeading
        eyebrow="miles, not distance"
        title="the space between us"
        subtitle="not forever, just for now."
      />

      <div className="rounded-2xl overflow-hidden shadow-soft border border-dusty-pink/30 h-[360px] sm:h-[440px] relative">
        <MapContainer
          center={[33.3, -117.4]}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full w-full grayscale-[15%] sepia-[8%]"
        >
          <TileLayer
            attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />
          <FitBounds points={bounds} />
          <Polyline
            positions={points}
            pathOptions={{ color: "#ff2d75", weight: 2.5, opacity: 0.6, dashArray: "1 10", lineCap: "round" }}
          />
          <Marker position={her.coordinates} icon={pinIcon("#ff2d75")} />
          <Marker position={me.coordinates} icon={pinIcon("#ff6fa5")} />
          <TravelingHeart points={points} tick={sendTick} />
        </MapContainer>
        <div className="absolute top-3 left-3 bg-noir/90 backdrop-blur rounded-full px-3 py-1.5 text-xs sm:text-sm font-body shadow-paper flex items-center gap-1.5">
          <Heart size={12} fill="#ff2d75" color="#ff2d75" />
          {her.short} → {me.short}
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <div className="bg-noir rounded-2xl shadow-paper px-5 py-4 text-center">
          <p className="font-serif text-2xl sm:text-3xl text-muted-burgundy">
            {straightMiles.toFixed(0)} miles
          </p>
          <p className="font-body text-xs text-off-white/50 mt-1">apart, straight line</p>
        </div>
        <div className="bg-noir rounded-2xl shadow-paper px-5 py-4 text-center">
          <p className="font-serif text-2xl sm:text-3xl text-warm-brown">
            ~{drivingMiles.toFixed(0)} miles
          </p>
          <p className="font-body text-xs text-off-white/50 mt-1">approx. by road (rough estimate)</p>
        </div>
      </div>

      <div className="mt-10 text-center space-y-1.5">
        <p className="font-hand text-2xl text-off-white/80">far enough that I miss you</p>
        <p className="font-hand text-2xl text-off-white/80">close enough that I can still come see you</p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSend}
          className="rounded-full bg-muted-burgundy text-off-white font-body px-6 py-3 shadow-glow flex items-center gap-2"
        >
          <Heart size={16} fill="currentColor" />
          send a heart to {me.short}
        </motion.button>
        {delivered && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-hand text-xl text-muted-burgundy"
          >
            delivered ♡
          </motion.p>
        )}
      </div>

      <p className="mt-10 text-center font-serif italic text-lg sm:text-xl text-off-white/70">
        no matter where we are, you're still my favorite place.
      </p>
    </section>
  );
}
