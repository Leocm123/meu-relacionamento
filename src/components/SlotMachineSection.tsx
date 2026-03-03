import { useState, useRef, useEffect } from "react";

const ACOES = [
  { text: "me manda áudios longos", emoji: "🎙️" },
  { text: "dá risada das minhas piadas idiotas", emoji: "😂" },
  { text: "presta atenção nas minhas nerdolices mesmo sem ter o menor interesse", emoji: "🤓" },
  { text: "trata a minha família com tanto carinho", emoji: "🥰" },
  { text: "dança comigo", emoji: "💃" },
  { text: "fica deitadinha agarradinha comigo", emoji: "🫂" },
  { text: "adormece do meu lado sem querer e acorda assustada", emoji: "😴" },
  { text: "não se aguenta e me dá spoilers do filme com o olhinho brilhando", emoji: "✨" },
  { text: "me mostra seus bíceps com toda aquela confiança", emoji: "💪" },
];

const COMPLEMENTOS = [
  "e eu percebo que sou o cara mais sortudo do mundo.",
  "e entendo porque escolhi você sem hesitar.",
  "e o dia muda completamente.",
  "e penso que não existe lugar melhor do que do seu lado.",
  "e fico com aquela certeza gostosa no peito de que é você.",
  "e eu percebo o quanto te amo.",
  "e esqueço qualquer coisa ruim que tava sentindo.",
  "e fico com um sorriso bobo que não consigo esconder.",
];

const css = `
  .slot-section {
    --slot-rose: #e8637a;
    --slot-rose-light: #f5a0b0;
    --slot-rose-dark: #c0415a;
    --slot-gold: #d4a96a;
    --slot-bg: #0d0a0f;
    --slot-card: rgba(255,255,255,0.04);
    --slot-border: rgba(232,99,122,0.2);
    --slot-text: #f0e6ea;
    --slot-muted: rgba(240,230,234,0.55);
  }

  .slot-section .slot-stage {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 24px;
  }

  .slot-section .slot-header {
    text-align: center;
    margin-bottom: 52px;
    animation: slotFadeSlide 0.8s ease both;
  }
  @keyframes slotFadeSlide { from { opacity: 0; transform: translateY(24px); } }

  .slot-section .slot-header-label {
    text-transform: uppercase;
    letter-spacing: 0.22em;
    font-size: 11px;
    color: var(--slot-rose-light);
    margin-bottom: 14px;
    display: block;
  }

  .slot-section .slot-header-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 400;
    line-height: 1.2;
  }
  .slot-section .slot-header-title em {
    font-style: italic;
    background: linear-gradient(135deg, var(--slot-rose-light), var(--slot-rose));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .slot-section .slot-header-divider {
    width: 48px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--slot-rose), transparent);
    margin: 20px auto 0;
  }

  .slot-section .slot-machine {
    width: 100%;
    max-width: 680px;
    background: var(--slot-card);
    border: 1px solid var(--slot-border);
    border-radius: 28px;
    padding: clamp(32px, 5vw, 56px);
    backdrop-filter: blur(20px);
    box-shadow: 0 30px 90px rgba(0,0,0,0.5);
    animation: slotFadeSlide 0.9s 0.1s ease both;
    position: relative;
    overflow: hidden;
  }

  .slot-section .slot-machine.spinning::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 28px;
    background: linear-gradient(135deg, var(--slot-rose-dark), transparent, var(--slot-gold));
    opacity: 0.12;
    animation: slotGlowPulse 0.4s ease infinite alternate;
    pointer-events: none;
  }
  @keyframes slotGlowPulse { to { opacity: 0.25; } }

  .slot-section .slot-prefix {
    font-family: 'Playfair Display', serif;
    font-size: clamp(16px, 2.2vw, 20px);
    font-style: italic;
    color: var(--slot-muted);
    text-align: center;
    margin-bottom: 28px;
    letter-spacing: 0.02em;
  }

  .slot-section .slot-reels {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 36px;
  }

  .slot-section .slot-reel-wrap {
    position: relative;
    height: 64px;
    border-radius: 14px;
    border: 1px solid var(--slot-border);
    background: rgba(0,0,0,0.3);
    overflow: hidden;
  }

  .slot-section .slot-reel-wrap::before,
  .slot-section .slot-reel-wrap::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 32px;
    z-index: 2;
    pointer-events: none;
  }
  .slot-section .slot-reel-wrap::before {
    left: 0;
    background: linear-gradient(to right, rgba(13,10,15,0.9), transparent);
  }
  .slot-section .slot-reel-wrap::after {
    right: 0;
    background: linear-gradient(to left, rgba(13,10,15,0.9), transparent);
  }

  .slot-section .slot-reel-track {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    gap: 0;
    will-change: transform;
  }

  .slot-section .slot-reel-item {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: 'Caveat', cursive;
    font-size: clamp(16px, 2.5vw, 21px);
    font-weight: 500;
    color: var(--slot-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 8px;
  }

  .slot-section .slot-reel-item .slot-reel-emoji {
    font-size: 22px;
    flex-shrink: 0;
  }

  .slot-section .slot-reel-highlight {
    position: absolute;
    inset: 8px;
    border-radius: 10px;
    border: 1px solid rgba(232,99,122,0.35);
    pointer-events: none;
    background: rgba(232,99,122,0.04);
    z-index: 1;
  }

  .slot-section .slot-reel-track.spinning {
    animation: slotReelSpin 0.08s steps(1) infinite;
  }
  @keyframes slotReelSpin {
    0%   { transform: translateY(0); }
    25%  { transform: translateY(-3px); }
    50%  { transform: translateY(3px); }
    75%  { transform: translateY(-2px); }
    100% { transform: translateY(0); }
  }

  .slot-section .slot-reel-track.landing {
    animation: slotReelLand 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  @keyframes slotReelLand {
    0%   { transform: translateY(-12px); opacity: 0.5; }
    60%  { transform: translateY(4px); }
    100% { transform: translateY(0); opacity: 1; }
  }

  .slot-section .slot-reel-wrap.slot-complemento {
    height: 72px;
  }
  .slot-section .slot-reel-wrap.slot-complemento .slot-reel-item {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(14px, 2vw, 18px);
    color: var(--slot-rose-light);
    white-space: normal;
    text-align: center;
    line-height: 1.4;
  }

  .slot-section .slot-reel-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 4px;
  }
  .slot-section .slot-reel-divider-line {
    flex: 1;
    height: 1px;
    background: var(--slot-border);
  }
  .slot-section .slot-reel-divider-heart {
    color: var(--slot-rose);
    font-size: 14px;
    opacity: 0.6;
  }

  .slot-section .slot-result-glow {
    position: absolute;
    inset: 0;
    border-radius: 28px;
    pointer-events: none;
    background: radial-gradient(ellipse at 50% 50%, rgba(232,99,122,0.06), transparent 70%);
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  .slot-section .slot-result-glow.visible {
    opacity: 1;
  }

  .slot-section .slot-burst-heart {
    position: absolute;
    font-size: 18px;
    pointer-events: none;
    animation: slotBurstOut 1s ease both;
    z-index: 20;
  }
  @keyframes slotBurstOut {
    0%   { transform: translate(0,0) scale(0.5); opacity: 1; }
    100% { transform: translate(var(--tx), var(--ty)) scale(1.2); opacity: 0; }
  }

  .slot-section .slot-btn-spin {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(17px, 2.2vw, 21px);
    letter-spacing: 0.06em;
    color: #fff;
    background: linear-gradient(135deg, var(--slot-rose), var(--slot-rose-dark));
    border: none;
    border-radius: 50px;
    padding: 18px 48px;
    cursor: pointer;
    box-shadow: 0 10px 36px rgba(232,99,122,0.4);
    transition: transform 0.22s, box-shadow 0.22s, opacity 0.2s;
    position: relative;
    overflow: hidden;
  }
  .slot-section .slot-btn-spin::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
    border-radius: 50px;
  }
  .slot-section .slot-btn-spin:hover:not(:disabled) {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 18px 48px rgba(232,99,122,0.55);
  }
  .slot-section .slot-btn-spin:active:not(:disabled) {
    transform: scale(0.97);
  }
  .slot-section .slot-btn-spin:disabled {
    opacity: 0.5;
    cursor: default;
    transform: none;
    box-shadow: none;
  }
  .slot-section .slot-btn-spin .slot-spin-icon {
    font-size: 20px;
    transition: transform 0.3s;
  }
  .slot-section .slot-btn-spin.spinning .slot-spin-icon {
    animation: slotSpinIcon 0.5s linear infinite;
  }
  @keyframes slotSpinIcon { to { transform: rotate(360deg); } }

  .slot-section .slot-spin-counter {
    margin-top: 20px;
    text-align: center;
    font-size: 12px;
    color: var(--slot-muted);
    letter-spacing: 0.1em;
    font-family: 'Inter', sans-serif;
  }
  .slot-section .slot-spin-counter span {
    color: var(--slot-rose-light);
  }

  @media (max-width: 520px) {
    .slot-section .slot-machine { padding: 28px 20px; }
    .slot-section .slot-reel-item { font-size: 14px; }
  }
`;

function BurstHearts({ active }: { active: boolean }) {
  if (!active) return null;
  const bursts = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const dist = 60 + Math.random() * 40;
    return {
      id: i,
      tx: `${Math.cos(angle) * dist}px`,
      ty: `${Math.sin(angle) * dist}px`,
      emoji: i % 2 === 0 ? "💕" : "❤️",
      delay: `${i * 0.05}s`,
    };
  });
  return (
    <>
      {bursts.map((b) => (
        <span
          key={b.id}
          className="slot-burst-heart"
          style={{
            left: "50%",
            top: "50%",
            ["--tx" as string]: b.tx,
            ["--ty" as string]: b.ty,
            animationDelay: b.delay,
          }}
        >
          {b.emoji}
        </span>
      ))}
    </>
  );
}

interface ReelProps {
  text: string;
  emoji?: string;
  isComplemento?: boolean;
  isSpinning: boolean;
  hasLanded: boolean;
  spinKey: string;
}

function Reel({ text, emoji, isComplemento, isSpinning, hasLanded, spinKey }: ReelProps) {
  return (
    <div className={`slot-reel-wrap ${isComplemento ? "slot-complemento" : ""}`}>
      <div className="slot-reel-highlight" />
      <div
        className={`slot-reel-track ${isSpinning ? "spinning" : ""} ${hasLanded ? "landing" : ""}`}
        key={spinKey}
      >
        <div className="slot-reel-item">
          {!isComplemento && emoji && <span className="slot-reel-emoji">{emoji}</span>}
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}

type Phase = "idle" | "spinning" | "landing" | "done";

export function SlotMachineSection() {
  const [displayAcao, setDisplayAcao] = useState({ text: "...", emoji: "💫" });
  const [displayComp, setDisplayComp] = useState({ text: "..." });
  const [phase, setPhase] = useState<Phase>("idle");
  const [spinCount, setSpinCount] = useState(0);
  const [burst, setBurst] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const addTimeout = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeouts.current.push(id);
    return id;
  };

  useEffect(() => () => clearAllTimeouts(), []);

  useEffect(() => {
    if (phase !== "spinning") return;
    const interval = setInterval(() => {
      setDisplayAcao(ACOES[Math.floor(Math.random() * ACOES.length)]);
      setDisplayComp({ text: COMPLEMENTOS[Math.floor(Math.random() * COMPLEMENTOS.length)] });
    }, 80);
    return () => clearInterval(interval);
  }, [phase]);

  const spin = () => {
    if (phase === "spinning") return;
    clearAllTimeouts();
    setBurst(false);
    setPhase("spinning");
    setSpinKey((k) => k + 1);

    const newAcao = Math.floor(Math.random() * ACOES.length);
    const newComp = Math.floor(Math.random() * COMPLEMENTOS.length);

    addTimeout(() => {
      setDisplayAcao(ACOES[newAcao]);
      setDisplayComp({ text: COMPLEMENTOS[newComp] });
      setPhase("landing");

      addTimeout(() => {
        setPhase("done");
        setSpinCount((c) => c + 1);
        setBurst(true);
        addTimeout(() => setBurst(false), 1200);
      }, 400);
    }, 1400);
  };

  const isSpinning = phase === "spinning";
  const isDone = phase === "done" || phase === "landing";

  return (
    <section className="slot-section" id="s7">
      <style>{css}</style>
      <div className="slot-stage">
        <div className="slot-header">
          <span className="slot-header-label">❤ para você</span>
          <h2 className="slot-header-title">
            Slot Machine
            <br />
            do <em>Amor</em>
          </h2>
          <div className="slot-header-divider" />
        </div>

        <div className={`slot-machine ${isSpinning ? "spinning" : ""}`}>
          <div className={`slot-result-glow ${isDone ? "visible" : ""}`} />
          <BurstHearts active={burst} />

          <p className="slot-prefix">Eu amo quando você…</p>

          <div className="slot-reels">
            <Reel
              text={displayAcao.text}
              emoji={displayAcao.emoji}
              isSpinning={isSpinning}
              hasLanded={phase === "landing"}
              spinKey={`a-${spinKey}`}
            />

            <div className="slot-reel-divider">
              <div className="slot-reel-divider-line" />
              <span className="slot-reel-divider-heart">💕</span>
              <div className="slot-reel-divider-line" />
            </div>

            <Reel
              text={displayComp.text}
              isComplemento
              isSpinning={isSpinning}
              hasLanded={phase === "landing"}
              spinKey={`c-${spinKey}`}
            />
          </div>

          <button
            className={`slot-btn-spin ${isSpinning ? "spinning" : ""}`}
            onClick={spin}
            disabled={isSpinning}
          >
            <span className="slot-spin-icon">✦</span>
            {phase === "idle" ? "girar" : isSpinning ? "girando..." : "girar de novo"}
            <span className="slot-spin-icon">✦</span>
          </button>

          {spinCount > 0 && (
            <p className="slot-spin-counter">
              já girou <span>{spinCount}</span> {spinCount === 1 ? "vez" : "vezes"} 💕
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
