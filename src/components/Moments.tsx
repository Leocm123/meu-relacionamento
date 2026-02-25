import { useState } from "react";
import { CONFIG } from "../config";

export function Moments() {
  const [current, setCurrent] = useState(0);
  const photos = CONFIG.photos;
  const prev = () =>
    setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1));

  return (
    <section className="section" id="s4">
      <p className="section-label">Galeria</p>
      <h2 className="section-title" style={{ marginBottom: 8 }}>
        Nossos Momentos 📸
      </h2>
      <p className="section-sub">Cada foto, uma memória para sempre</p>
      <div className="carousel-wrap fade-in">
        <div className="carousel-main">
          <img
            className="carousel-img"
            src={photos[current].src}
            alt={photos[current].caption}
          />
          <div className="carousel-caption">{photos[current].caption}</div>
        </div>
        <div className="carousel-nav">
          <button className="carousel-arrow" onClick={prev}>
            ‹
          </button>
          <span style={{ color: "var(--muted)", fontSize: 14 }}>
            {current + 1} / {photos.length}
          </span>
          <button className="carousel-arrow" onClick={next}>
            ›
          </button>
        </div>
        <div className="carousel-dots">
          {photos.map((p, i) => (
            <div
              key={i}
              className={`carousel-dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
            >
              <img src={p.src} alt={p.caption} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
