import { useState } from "react";
import { CONFIG } from "../config";

export function Music() {
  const [playerRevealed, setPlayerRevealed] = useState(false);
  const trackId = CONFIG.spotifyTrackId.split("?")[0];

  return (
    <section className="section" id="s2">
      <p className="section-label">Nossa Música</p>
      <h2 className="section-title" style={{ marginBottom: 8 }}>
        A trilha sonora do nosso amor 🎵
      </h2>
      <p className="section-sub">A canção que resume tudo que sentimos</p>
      {!playerRevealed ? (
        <div
          className="music-teaser-card fade-in"
          onClick={() => setPlayerRevealed(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setPlayerRevealed(true)}
          aria-label="Clique para descobrir nossa música"
        >
          <div className="music-teaser-icon">🎵</div>
          <h3 className="music-teaser-title">Nossa Música</h3>
          <p className="music-teaser-sub">A trilha sonora do nosso amor</p>
          <button type="button" className="music-teaser-btn">
            <span className="music-teaser-btn-icon">▶</span>
            clique aqui para descobrir
          </button>
          <div className="music-teaser-notes">
            <span>♪</span>
            <span>♪</span>
            <span>♪</span>
          </div>
        </div>
      ) : (
        <div className="music-player-card fade-in">
          <p className="music-tag">Nossa Música</p>
          <div style={{ marginBottom: 16 }}>
            <iframe
              title="Spotify - Nossa música"
              src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              style={{ borderRadius: 12, border: "none", display: "block" }}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
          <a
            href={`https://open.spotify.com/track/${trackId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13,
              color: "var(--rose-light)",
              textAlign: "center",
              display: "block",
              textDecoration: "none",
              letterSpacing: "0.08em",
            }}
          >
            Não aparece? Abra no Spotify 🎧
          </a>
        </div>
      )}
    </section>
  );
}
