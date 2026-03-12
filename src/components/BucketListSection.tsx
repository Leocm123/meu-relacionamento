import { useState, useEffect } from "react";

const ITEMS = [
  // Viagens — tamanhos variados
  { id: 1,  cat: "viagens",     emoji: "✈️",  title: "Cabo Frio",                              sub: "praias paradisíacas, lagoa e muito sol",                         size: "tall" },
  { id: 2,  cat: "viagens",     emoji: "🗽",  title: "Estados Unidos",                         sub: "um sonho grande pra gente realizar juntos",         size: "wide" },
  { id: 3,  cat: "viagens",     emoji: "🏔️",  title: "Suíça",                                  sub: "neve, chocolate e você do meu lado",                size: "normal" },
  { id: 4,  cat: "viagens",     emoji: "🗼",  title: "França",                                 sub: "Paris, com você, claro",                            size: "normal" },
  { id: 22, cat: "viagens",     emoji: "🌋",  title: "Chile",                                  sub: "desertos, vulcões e paisagens de outro mundo",      size: "normal" },
  { id: 23, cat: "viagens",     emoji: "🌌",  title: "Lapônia",                                sub: "ver a aurora boreal juntos, vai ser mágico",       size: "tall" },
  { id: 24, cat: "viagens",     emoji: "🐠",  title: "Fernando de Noronha",                    sub: "o paraíso mais bonito do Brasil, com você",         size: "normal" },
  { id: 25, cat: "viagens",     emoji: "⛰️",  title: "Gramado",                                sub: "frio, chocolate quente e você do meu lado",         size: "normal" },
  { id: 5,  cat: "viagens",     emoji: "🌊",  title: "Ilha Vaadhoo, Maldivas",                 sub: "o mar que brilha de noite, quero ver com você",    size: "tall" },

  // Lar
  { id: 6,  cat: "lar",         emoji: "🐶",  title: "Nosso cachorrinho salsicha peludo",       sub: "já tenho o nome na cabeça",                         size: "wide" },
  { id: 7,  cat: "lar",         emoji: "🏠",  title: "Comprar nossa casa",                     sub: "o lugar que vai ser nosso pra sempre",              size: "tall" },
  { id: 8,  cat: "lar",         emoji: "🌱",  title: "Plantar algo juntos e ver crescer",       sub: "cuidar de algo pequeno, como a gente faz com o amor", size: "normal" },
  { id: 9,  cat: "lar",         emoji: "🎄",  title: "Criar nossas tradições de fim de ano",   sub: "todo ano, do nosso jeito",                          size: "normal" },

  // Sonhos grandes
  { id: 10, cat: "sonhos",      emoji: "💍",  title: "Casar",                                  sub: "o dia mais feliz da nossa vida",                    size: "wide" },
  { id: 17, cat: "sonhos",      emoji: "🌅",  title: "Lua de mel dos sonhos",                  sub: "o começo da nossa vida a dois, do jeito que merece",size: "normal" },
  { id: 18, cat: "sonhos",      emoji: "👨‍👩‍👧",  title: "Nossa primeira foto de família",         sub: "o retrato de tudo que construímos juntos",          size: "wide" },
  { id: 19, cat: "sonhos",      emoji: "📝",  title: "Escrever e ler nossos votos em voz alta",sub: "as palavras que só nós dois vamos entender",        size: "tall" },
  { id: 20, cat: "sonhos",      emoji: "🚀",  title: "Realizar um sonho profissional juntos",  sub: "te apoiar em cada passo, e sentir o mesmo de volta", size: "normal" },
  { id: 11, cat: "sonhos",      emoji: "👶",  title: "Ter filhos",                             sub: "ter uma família com você",                        size: "tall" },

  // Memórias
  { id: 12, cat: "memorias",    emoji: "📸",  title: "Tirar as fotos e vídeos que salvamos",   sub: "realizar cada ideia que guardamos juntos",          size: "normal" },
  { id: 13, cat: "memorias",    emoji: "📔",  title: "Montar nosso álbum físico",              sub: "segurar na mão as memórias que vivemos",            size: "wide" },
  { id: 21, cat: "memorias",    emoji: "🐄",  title: "Ver a vaquinha peluda na Suíça",          sub: "ela existe e precisamos encontrá-la",               size: "normal" },

  // Experiências
  { id: 14, cat: "experiencias",emoji: "🤲",  title: "Massagem um no outro",                   sub: "depois de um dia longo, do nosso jeito",            size: "normal" },
  { id: 15, cat: "experiencias",emoji: "🎢",  title: "Parque de diversões juntos",             sub: "gritar, rir e segurar sua mão com força",           size: "tall" },
  { id: 16, cat: "experiencias",emoji: "💃",  title: "Aprender a dançar juntos",               sub: "um forró, uma salsa, qualquer coisa, com você",   size: "wide" },
];

const CAT_LABELS: Record<string, string> = {
  viagens: "Viagens",
  lar: "Nosso Lar",
  sonhos: "Grandes Sonhos",
  memorias: "Memórias",
  experiencias: "Experiências",
};

const CAT_COLORS: Record<string, { bg: string; border: string; accent: string }> = {
  viagens:      { bg: "rgba(100,160,230,0.08)",  border: "rgba(100,160,230,0.25)",  accent: "#7ab4e8" },
  lar:          { bg: "rgba(180,130,80,0.08)",   border: "rgba(180,130,80,0.25)",   accent: "#d4a96a" },
  sonhos:       { bg: "rgba(232,99,122,0.08)",   border: "rgba(232,99,122,0.25)",  accent: "#e8637a" },
  memorias:     { bg: "rgba(160,120,200,0.08)",  border: "rgba(160,120,200,0.25)", accent: "#c8a0e8" },
  experiencias: { bg: "rgba(100,200,140,0.08)",  border: "rgba(100,200,140,0.25)", accent: "#78d4a0" },
};

const STORAGE_KEY = "bucketlist_done_v2";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Caveat:wght@400;500;600&family=Inter:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  .bucket-section{
    --rose:#e8637a;--rose-light:#f5a0b0;--rose-dark:#c0415a;
    --gold:#d4a96a;--bg:#0d0a0f;--border:rgba(232,99,122,0.2);
    --text:#f0e6ea;--muted:rgba(240,230,234,0.55);
  }

  .bucket-section .hearts-bg{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
  .bucket-section .hf{position:absolute;animation:floatUp linear infinite;opacity:0;bottom:-40px;}
  @keyframes floatUp{
    0%{transform:translateY(0) rotate(-10deg);opacity:0;}
    10%{opacity:0.18;}90%{opacity:0.08;}
    100%{transform:translateY(-110vh) rotate(10deg);opacity:0;}
  }

  .bucket-section .stage{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:72px 20px 100px;}
  @media(max-width:600px){.bucket-section .stage{padding:48px 16px 80px;}}

  /* header */
  .bucket-section .hdr{text-align:center;margin-bottom:48px;animation:fadeUp 0.8s ease both;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}}
  .bucket-section .lbl{text-transform:uppercase;letter-spacing:0.22em;font-size:11px;color:var(--rose-light);margin-bottom:14px;display:block;}
  .bucket-section .ttl{font-family:'Playfair Display',serif;font-size:clamp(28px,5.5vw,50px);font-weight:400;line-height:1.2;}
  .bucket-section .ttl em{font-style:italic;background:linear-gradient(135deg,var(--rose-light),var(--rose));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .bucket-section .sub{color:var(--muted);font-size:13px;margin-top:12px;letter-spacing:0.04em;}
  .bucket-section .divd{width:48px;height:1px;background:linear-gradient(90deg,transparent,var(--rose),transparent);margin:18px auto 0;}

  /* progress bar */
  .bucket-section .progress-wrap{width:100%;max-width:860px;margin-bottom:40px;animation:fadeUp 0.8s 0.1s ease both;}
  .bucket-section .progress-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px;}
  .bucket-section .progress-label{font-family:'Playfair Display',serif;font-style:italic;font-size:15px;color:var(--muted);}
  .bucket-section .progress-count{font-family:'Caveat',cursive;font-size:22px;color:var(--rose-light);}
  .bucket-section .progress-track{width:100%;height:3px;background:rgba(232,99,122,0.15);border-radius:2px;overflow:hidden;}
  .bucket-section .progress-fill{height:100%;background:linear-gradient(90deg,var(--rose),var(--gold));border-radius:2px;transition:width 0.6s cubic-bezier(0.22,1,0.36,1);}

  /* masonry grid — 1 coluna em celular, 2 em tablet, 3 em desktop */
  .bucket-section .masonry{
    width:100%;max-width:860px;
    columns:3;
    column-gap:16px;
  }
  @media(max-width:900px){.bucket-section .masonry{columns:2;column-gap:14px;}}
  @media(max-width:600px){
    .bucket-section .masonry{columns:1;column-gap:0;}
    .bucket-section .card{margin-bottom:12px;padding:18px 16px;}
    .bucket-section .card.tall{padding-bottom:28px;}
    .bucket-section .card.wide{padding-top:22px;padding-bottom:22px;}
  }

  /* card */
  .bucket-section .card{
    break-inside:avoid;
    margin-bottom:16px;
    border-radius:20px;
    padding:22px 20px;
    backdrop-filter:blur(16px);
    cursor:pointer;
    transition:transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
    position:relative;
    overflow:hidden;
    animation:fadeUp 0.6s ease both;
    -webkit-tap-highlight-color:transparent;
    user-select:none;
  }
  .bucket-section .card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(0,0,0,0.45);}
  .bucket-section .card:active{transform:scale(0.97);}

  /* done state */
  .bucket-section .card.done{opacity:0.55;}
  .bucket-section .card.done .card-title{text-decoration:line-through;text-decoration-color:rgba(240,230,234,0.4);}

  /* size variants */
  .bucket-section .card.tall{padding-bottom:36px;}
  .bucket-section .card.wide{padding-top:28px;padding-bottom:28px;}

  /* shimmer line at top */
  .bucket-section .card::before{
    content:'';position:absolute;top:0;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);
  }

  .bucket-section .card-cat{
    font-size:10px;letter-spacing:0.18em;text-transform:uppercase;
    margin-bottom:12px;font-weight:500;
    font-family:'Inter',sans-serif;
  }
  .bucket-section .card-emoji{font-size:28px;margin-bottom:12px;display:block;line-height:1;}
  .bucket-section .card-title{
    font-family:'Playfair Display',serif;
    font-size:clamp(15px,2.2vw,18px);
    line-height:1.3;margin-bottom:8px;
    transition:text-decoration 0.2s;
  }
  .bucket-section .card-sub{
    font-family:'Caveat',cursive;
    font-size:clamp(14px,2vw,16px);
    color:var(--muted);
    line-height:1.5;
  }

  /* check indicator */
  .bucket-section .card-check{
    position:absolute;top:14px;right:14px;
    width:24px;height:24px;border-radius:50%;
    border:1.5px solid rgba(255,255,255,0.2);
    display:flex;align-items:center;justify-content:center;
    font-size:13px;
    transition:all 0.3s ease;
    background:rgba(0,0,0,0.2);
  }
  .bucket-section .card.done .card-check{
    background:var(--rose);
    border-color:var(--rose);
    box-shadow:0 0 12px rgba(232,99,122,0.5);
  }

  /* celebration burst */
  .bucket-section .burst{
    position:fixed;top:50%;left:50%;
    pointer-events:none;z-index:300;
    transform:translate(-50%,-50%);
  }
  .bucket-section .burst-heart{
    position:absolute;font-size:20px;
    animation:burstOut 0.9s ease both;
  }
  @keyframes burstOut{
    0%{transform:translate(0,0) scale(0);opacity:1;}
    100%{transform:translate(var(--tx),var(--ty)) scale(1);opacity:0;}
  }

  /* hint */
  .bucket-section .hint{margin-top:8px;font-size:12px;color:var(--muted);letter-spacing:0.1em;text-align:center;opacity:0.6;animation:fadeUp 1s 0.3s ease both;}
`;

const BG_HEARTS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 7.3 + 6) % 100}%`,
  delay: `${(i * 0.85) % 10}s`,
  dur: `${12 + (i % 6)}s`,
  size: `${11 + (i % 8)}px`,
  emoji: i % 3 === 0 ? "💕" : "❤️",
}));

function Burst({ active }: { active: boolean }) {
  if (!active) return null;
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    const d = 60 + Math.random() * 50;
    return {
      id: i,
      tx: `${Math.cos(a) * d}px`,
      ty: `${Math.sin(a) * d}px`,
      e: i % 2 === 0 ? "💕" : "✨",
      delay: `${i * 0.04}s`,
    };
  });
  return (
    <div className="burst">
      {pts.map((p) => (
        <span
          key={p.id}
          className="burst-heart"
          style={{
            ["--tx" as string]: p.tx,
            ["--ty" as string]: p.ty,
            animationDelay: p.delay,
            left: 0,
            top: 0,
          }}
        >
          {p.e}
        </span>
      ))}
    </div>
  );
}

export function BucketListSection() {
  const [done, setDone] = useState<Set<number>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
    } catch {
      return new Set();
    }
  });
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(done)));
    } catch {
      // ignore
    }
  }, [done]);

  const toggle = (id: number) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setBurst(true);
        setTimeout(() => setBurst(false), 1000);
      }
      return next;
    });
  };

  const pct = Math.round((done.size / ITEMS.length) * 100);

  return (
    <section className="bucket-section" id="s10">
      <style>{css}</style>
      <div className="hearts-bg">
        {BG_HEARTS.map((h) => (
          <span
            key={h.id}
            className="hf"
            style={{
              left: h.left,
              animationDelay: h.delay,
              animationDuration: h.dur,
              fontSize: h.size,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>
      <Burst active={burst} />

      <div className="stage">
        <div className="hdr">
          <span className="lbl">❤ para nós dois</span>
          <h2 className="ttl">
            Coisas que quero
            <br />
            <em>fazer com você</em>
          </h2>
          <div className="divd" />
          <p className="sub">marque quando realizarmos juntos 💕</p>
        </div>

        <div className="progress-wrap">
          <div className="progress-top">
            <span className="progress-label">
              {done.size === 0
                ? "tudo pela frente..."
                : done.size === ITEMS.length
                  ? "realizamos tudo! 🥂"
                  : "construindo nossa história"}
            </span>
            <span className="progress-count">
              {done.size}/{ITEMS.length}
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="masonry">
          {ITEMS.map((item, i) => {
            const col = CAT_COLORS[item.cat];
            const isDone = done.has(item.id);
            return (
              <div
                key={item.id}
                className={`card ${item.size} ${isDone ? "done" : ""}`}
                style={{
                  background: col.bg,
                  border: `1px solid ${isDone ? col.accent : col.border}`,
                  boxShadow: isDone
                    ? `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${col.accent}40`
                    : "0 8px 32px rgba(0,0,0,0.3)",
                  animationDelay: `${i * 0.05}s`,
                }}
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => e.key === "Enter" && toggle(item.id)}
                role="button"
                tabIndex={0}
              >
                <div className="card-check">{isDone ? "✓" : ""}</div>
                <span className="card-emoji">{item.emoji}</span>
                <div className="card-cat" style={{ color: col.accent }}>
                  {CAT_LABELS[item.cat]}
                </div>
                <div className="card-title">{item.title}</div>
                <div className="card-sub">{item.sub}</div>
              </div>
            );
          })}
        </div>

        <p className="hint">cada ✓ é um sonho que viramos realidade juntos ✦</p>
      </div>
    </section>
  );
}
