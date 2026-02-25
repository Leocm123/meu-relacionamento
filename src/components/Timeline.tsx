import { useState } from "react";
import { CONFIG } from "../config";
import type { TimelineItem as TimelineItemType } from "../types";

export function Timeline() {
  const [selected, setSelected] = useState<TimelineItemType | null>(null);

  return (
    <section className="section" id="s5">
      <p className="section-label">Linha do Tempo</p>
      <h2 className="section-title" style={{ marginBottom: 8 }}>
        Nossa História 📖
      </h2>
      <p className="section-sub">
        Os capítulos mais bonitos da nossa vida juntos
      </p>
      <div className="timeline-wrap fade-in">
        {CONFIG.timeline.map((item, i) => (
          <div key={i}>
            <div className="tl-item">
              <div className="tl-line">
                <div className="tl-dot" />
                {i < CONFIG.timeline.length - 1 && (
                  <div className="tl-connector" />
                )}
              </div>
              <div className="tl-card" onClick={() => setSelected(item)}>
                <img className="tl-img" src={item.img} alt={item.title} />
                <div className="tl-body">
                  <div className="tl-date">{item.date}</div>
                  <div className="tl-title">{item.title}</div>
                  <div className="tl-desc">{item.desc}</div>
                  <div className="tl-hint">💕 Clique para ver mais</div>
                </div>
              </div>
            </div>
            {i < CONFIG.timeline.length - 1 && (
              <div className="tl-heart-mid" style={{ marginLeft: 27 }}>
                💕
              </div>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
            <img
              className="modal-img"
              src={selected.img}
              alt={selected.title}
            />
            <div className="modal-body">
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
              >
                ×
              </button>
              <div className="tl-date" style={{ marginBottom: 8 }}>
                {selected.date}
              </div>
              <div
                className="tl-title"
                style={{ fontSize: 26, marginBottom: 14 }}
              >
                {selected.title}
              </div>
              <div
                className="tl-desc"
                style={{ fontSize: 16, lineHeight: 1.75 }}
              >
                {selected.desc}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
