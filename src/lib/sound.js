// Tiny synthesized sound effects via WebAudio — no audio files required.
// Respects a global mute flag stored in localStorage ("loretta-web:soundOn").

let ctx = null;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    ctx = new Ctx();
  }
  return ctx;
}

function isSoundOn() {
  try {
    const raw = localStorage.getItem("loretta-web:soundOn");
    return raw === null ? true : JSON.parse(raw);
  } catch {
    return true;
  }
}

function tone({ freq = 440, duration = 0.12, type = "sine", gain = 0.05, delay = 0 }) {
  if (!isSoundOn()) return;
  const audioCtx = getCtx();
  if (!audioCtx) return;
  if (audioCtx.state === "suspended") audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const start = audioCtx.currentTime + delay;
  gainNode.gain.setValueAtTime(0, start);
  gainNode.gain.linearRampToValueAtTime(gain, start + 0.015);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export const sfx = {
  click: () => tone({ freq: 720, duration: 0.06, type: "sine", gain: 0.04 }),
  open: () => {
    tone({ freq: 420, duration: 0.18, type: "sine", gain: 0.05 });
    tone({ freq: 620, duration: 0.22, type: "sine", gain: 0.04, delay: 0.08 });
  },
  heart: () => {
    tone({ freq: 660, duration: 0.1, type: "sine", gain: 0.05 });
    tone({ freq: 880, duration: 0.14, type: "sine", gain: 0.04, delay: 0.06 });
  },
  stamp: () => tone({ freq: 180, duration: 0.09, type: "square", gain: 0.03 }),
  unlock: () => {
    [523, 659, 784, 1046].forEach((f, i) =>
      tone({ freq: f, duration: 0.3, type: "sine", gain: 0.045, delay: i * 0.09 })
    );
  },
  pop: () => tone({ freq: 900, duration: 0.05, type: "triangle", gain: 0.03 }),
};

export function getSoundPref() {
  return isSoundOn();
}

export function setSoundPref(value) {
  try {
    localStorage.setItem("loretta-web:soundOn", JSON.stringify(value));
  } catch {
    /* noop */
  }
}
