import { CONFIG } from "../config";

export function LoveDeclaration() {
  return (
    <section className="section" id="s3">
      <p className="section-label">Declaração de amor</p>
      <h2 className="section-title" style={{ marginBottom: 8 }}>
        Para você, com amor 💌
      </h2>
      <p className="section-sub">Do fundo do meu coração</p>
      <div className="love-card fade-in">
        <div className="love-quote">"</div>
        <p className="love-text">{CONFIG.loveMessage}</p>
        <p className="love-sig">— Com todo o meu amor ❤️</p>
      </div>
    </section>
  );
}
