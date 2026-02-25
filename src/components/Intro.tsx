import { CONFIG } from "../config";

interface IntroProps {
  onReveal: () => void;
}

export function Intro({ onReveal }: IntroProps) {
  return (
    <section className="section" id="s0">
      <span className="intro-heart">❤️</span>
      <p className="section-label">Para você</p>
      <h1 className="intro-title">
        Uma surpresa especial
        <br />
        te espera 💌
      </h1>
      <p className="intro-sub">Feito com amor, só para você</p>
      <button className="btn-love" onClick={onReveal}>
        Clique aqui, {CONFIG.partnerName} ✨
      </button>
    </section>
  );
}
