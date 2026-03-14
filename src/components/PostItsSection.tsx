import { useState } from "react";

const REASONS = [
  { emoji: "✨", text: "O seu sorriso, que eu faria qualquer coisa pra ver todo dia pelo resto da vida." },
  { emoji: "🌙", text: "Os seus olhos, que às vezes me olham de um jeito que eu ainda não sei descrever, mas que me fazem querer ficar parado no tempo." },
  { emoji: "💬", text: "O seu jeitinho único de falar 'sim'." },
  { emoji: "🫂", text: "Quando você me abraça com força, como se quisesse me dizer algo que as palavras não alcançam." },
  { emoji: "⚡", text: "Quando você tem seus picos de energia e me faz rir." },
  { emoji: "😂", text: "Quando você chama as pessoas de 'safadona' com aquela sua pureza e inocência de uma criança." },
  { emoji: "🥰", text: "Quando você deita em mim e eu fico com medo de me mexer pra não estragar o momento." },
  { emoji: "🎵", text: "Quando você fala 'uhum' daquele seu jeitinho." },
  { emoji: "🤭", text: "Suas brincadeiras bobas que me fazem rir muito, e me trazem uma felicidade que eu já não sabia mais que tinha." },
  { emoji: "💋", text: "Quando você me beija e fica com os olhos arregalados olhando para os meus." },
  { emoji: "💕", text: "Quando você fala que me ama. Toda vez. Como se fosse a primeira." },
  { emoji: "🌸", text: "O seu cheiro, que eu não consigo comparar com nada, só sei que quando sinto, eu sei que é você." },
];

const COLORS = [
  { bg: "rgba(232,99,122,0.07)", border: "rgba(232,99,122,0.22)" },
  { bg: "rgba(212,169,106,0.07)", border: "rgba(212,169,106,0.22)" },
  { bg: "rgba(180,120,200,0.07)", border: "rgba(180,120,200,0.22)" },
  { bg: "rgba(232,99,122,0.05)", border: "rgba(232,99,122,0.18)" },
  { bg: "rgba(100,160,220,0.06)", border: "rgba(100,160,220,0.18)" },
];

const ROTATIONS = [-2.2, 1.6, -1.0, 2.3, -0.7, 1.8, -2.4, 0.8, -1.5, 2.0, -0.5, 1.3];

const css = `
  .postits-section {
    --postits-rose: #e8637a;
    --postits-rose-light: #f5a0b0;
    --postits-rose-dark: #c0415a;
    --postits-gold: #d4a96a;
    --postits-bg: #0d0a0f;
    --postits-card: rgba(255,255,255,0.04);
    --postits-border: rgba(232,99,122,0.2);
    --postits-text: #f0e6ea;
    --postits-muted: rgba(240,230,234,0.55);
  }

  .postits-section .postits-stage {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 24px 100px;
  }

  .postits-section .postits-header {
    text-align: center;
    margin-bottom: 56px;
    animation: postitsFadeSlide 0.8s ease both;
  }
  @keyframes postitsFadeSlide { from { opacity: 0; transform: translateY(24px); } }

  .postits-section .postits-header-label {
    text-transform: uppercase;
    letter-spacing: 0.22em;
    font-size: 11px;
    color: var(--postits-rose-light);
    margin-bottom: 14px;
    display: block;
  }

  .postits-section .postits-header-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(30px, 5.5vw, 52px);
    font-weight: 400;
    line-height: 1.15;
    color: var(--postits-text);
  }

  .postits-section .postits-header-title em {
    font-style: italic;
    background: linear-gradient(135deg, var(--postits-rose-light), var(--postits-rose));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .postits-section .postits-header-divider {
    width: 48px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--postits-rose), transparent);
    margin: 22px auto 0;
  }

  .postits-section .postits-wall {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 22px;
    width: 100%;
    max-width: 880px;
  }

  .postits-section .postit {
    position: relative;
    border-radius: 4px;
    padding: 30px 22px 34px;
    backdrop-filter: blur(16px);
    opacity: 0;
    will-change: transform, opacity;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .postits-section .postit.entered {
    animation: postitsStickyLand 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes postitsStickyLand {
    0%   { opacity: 0; transform: translateY(-55px) rotate(-10deg) scale(0.8); }
    55%  { opacity: 1; transform: translateY(7px) scale(1.03); }
    75%  { transform: translateY(-4px) scale(0.985); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  .postits-section .postit:hover {
    transform: translateY(-8px) scale(1.04) rotate(0deg) !important;
    z-index: 10;
    box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(232,99,122,0.15) !important;
  }

  .postits-section .postit::before {
    content: '';
    position: absolute;
    top: -9px; left: 50%; transform: translateX(-50%);
    width: 44px; height: 18px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 2px;
    backdrop-filter: blur(4px);
  }

  .postits-section .postit::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 20px; height: 20px;
    background: rgba(0,0,0,0.25);
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
    border-radius: 0 0 4px 0;
  }

  .postits-section .postit-emoji {
    font-size: 24px;
    margin-bottom: 14px;
    display: block;
    line-height: 1;
    filter: drop-shadow(0 0 8px rgba(232,99,122,0.4));
  }

  .postits-section .postit-number {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--postits-gold);
    opacity: 0.6;
    margin-bottom: 8px;
    display: block;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
  }

  .postits-section .postit-text {
    font-family: 'Caveat', cursive;
    font-size: 18px;
    line-height: 1.5;
    color: var(--postits-text);
    font-weight: 400;
  }

  .postits-section .postits-controls {
    margin-top: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }

  .postits-section .postits-btn-primary {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 18px;
    letter-spacing: 0.06em;
    color: #fff;
    background: linear-gradient(135deg, var(--postits-rose), var(--postits-rose-dark));
    border: none;
    border-radius: 50px;
    padding: 16px 48px;
    cursor: pointer;
    box-shadow: 0 10px 36px rgba(232,99,122,0.4);
    transition: transform 0.22s, box-shadow 0.22s, opacity 0.2s;
    animation: postitsFadeSlide 0.6s ease both;
  }
  .postits-section .postits-btn-primary:hover {
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 18px 48px rgba(232,99,122,0.58);
  }
  .postits-section .postits-btn-primary:active { transform: scale(0.97); }
  .postits-section .postits-btn-primary:disabled { opacity: 0.4; cursor: default; transform: none; box-shadow: none; }

  .postits-section .postits-btn-ghost {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    letter-spacing: 0.08em;
    color: var(--postits-muted);
    background: transparent;
    border: 1px solid rgba(232,99,122,0.3);
    border-radius: 50px;
    padding: 10px 28px;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, transform 0.2s;
  }
  .postits-section .postits-btn-ghost:hover { border-color: var(--postits-rose); color: var(--postits-rose-light); transform: translateY(-2px); }

  .postits-section .postits-progress-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: var(--postits-muted);
    letter-spacing: 0.08em;
  }
  .postits-section .postits-progress-bar {
    width: 130px; height: 2px;
    background: rgba(232,99,122,0.15);
    border-radius: 2px;
    overflow: hidden;
  }
  .postits-section .postits-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--postits-rose), var(--postits-gold));
    border-radius: 2px;
    transition: width 0.5s ease;
  }

  .postits-section .postits-finale {
    margin-top: 52px;
    text-align: center;
    max-width: 420px;
    animation: postitsFadeSlide 0.9s ease both;
  }
  .postits-section .postits-finale-heart {
    font-size: 52px;
    display: block;
    margin-bottom: 20px;
    animation: postitsHeartbeat 1.6s ease-in-out infinite;
    filter: drop-shadow(0 0 20px rgba(232,99,122,0.7));
  }
  @keyframes postitsHeartbeat {
    0%,100% { transform: scale(1); }
    14%     { transform: scale(1.22); }
    28%     { transform: scale(1); }
    42%     { transform: scale(1.1); }
  }
  .postits-section .postits-finale-text {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(17px, 2.2vw, 22px);
    line-height: 1.75;
    color: var(--postits-muted);
  }
  .postits-section .postits-finale-sig {
    margin-top: 22px;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(16px, 2vw, 20px);
    background: linear-gradient(135deg, var(--postits-rose-light), var(--postits-rose));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 540px) {
    .postits-section .postits-wall { grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .postits-section .postit { padding: 22px 16px 26px; }
    .postits-section .postit-text { font-size: 16px; }
  }
`;

export function PostItsSection() {
  const [revealed, setRevealed] = useState(0);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const revealNext = () => {
    if (busy || revealed >= REASONS.length) return;
    setBusy(true);
    setTimeout(() => {
      setRevealed((r) => {
        const next = r + 1;
        if (next >= REASONS.length) setDone(true);
        return next;
      });
      setBusy(false);
    }, 80);
  };

  const revealAll = () => {
    let i = revealed;
    const go = () => {
      if (i >= REASONS.length) {
        setDone(true);
        return;
      }
      setRevealed(++i);
      setTimeout(go, 380);
    };
    go();
  };

  const reset = () => {
    setRevealed(0);
    setDone(false);
    setBusy(false);
  };

  const pct = Math.round((revealed / REASONS.length) * 100);

  return (
    <section className="postits-section" id="s6">
      <style>{css}</style>
      <div className="postits-stage">
        <div className="postits-header">
          <span className="postits-header-label">❤ para você</span>
          <h2 className="postits-header-title">
            Coisas que eu
            <br />
            <em>amo em você</em>
          </h2>
          <div className="postits-header-divider" />
        </div>

        {revealed > 0 && (
          <div className="postits-wall">
            {REASONS.slice(0, revealed).map((r, i) => {
              const col = COLORS[i % COLORS.length];
              const rot = ROTATIONS[i % ROTATIONS.length];
              return (
                <div
                  key={i}
                  className="postit entered"
                  style={{
                    background: col.bg,
                    border: `1px solid ${col.border}`,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
                    transform: `rotate(${rot}deg)`,
                  }}
                >
                  <span className="postit-emoji">{r.emoji}</span>
                  <span className="postit-number">
                    #{String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="postit-text">{r.text}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className="postits-controls">
          {!done && (
            <>
              <button
                className="postits-btn-primary"
                onClick={revealNext}
                disabled={busy}
              >
                {revealed === 0 ? "✦ descobrir ✦" : "mais um motivo ↓"}
              </button>

              {revealed > 0 && revealed < REASONS.length && (
                <>
                  <div className="postits-progress-wrap">
                    <span>
                      {revealed} de {REASONS.length}
                    </span>
                    <div className="postits-progress-bar">
                      <div
                        className="postits-progress-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span>{pct}%</span>
                  </div>
                  <button
                    className="postits-btn-ghost"
                    onClick={revealAll}
                  >
                    revelar todos de uma vez
                  </button>
                </>
              )}
            </>
          )}

          {done && (
            <>
              <div className="postits-finale">
                <span className="postits-finale-heart">💕</span>
                <p className="postits-finale-text">
                  Essa lista nunca vai estar completa, porque todo dia que
                  passa, você me dá um motivo novo.
                </p>
                <p className="postits-finale-sig">— com todo o meu amor ❤</p>
              </div>
              <button
                className="postits-btn-ghost"
                style={{ marginTop: 28 }}
                onClick={reset}
              >
                recomeçar ↺
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
