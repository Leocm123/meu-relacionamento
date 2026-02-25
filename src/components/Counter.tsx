import { CONFIG } from "../config";
import { useCounter } from "../hooks/useCounter";

export function Counter() {
  const t = useCounter(CONFIG.relationshipStart);
  const dateStr = CONFIG.relationshipStart.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <section className="section" id="s1">
      <div className="counter-wrap fade-in">
        <p className="section-label">Nossa história</p>
        <h2 className="counter-title">
          Juntos desde <span>{dateStr}</span> 💑
        </h2>
        <div className="counter-grid">
          <div className="counter-item">
            <span className="counter-num">{t.years ?? "—"}</span>
            <span className="counter-label">Anos</span>
          </div>
          <span className="heart-sep">💕</span>
          <div className="counter-item">
            <span className="counter-num">{t.months ?? "—"}</span>
            <span className="counter-label">Meses</span>
          </div>
          <span className="heart-sep">💕</span>
          <div className="counter-item">
            <span className="counter-num">{t.days ?? "—"}</span>
            <span className="counter-label">Dias</span>
          </div>
        </div>
        <div className="counter-days">
          <div className="counter-days-num">
            {t.totalDays?.toLocaleString("pt-BR") ?? "—"}
          </div>
          <div className="counter-days-label">dias incríveis ao seu lado ✨</div>
        </div>
      </div>
    </section>
  );
}
