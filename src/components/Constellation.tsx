import { useState, useEffect, useRef, useCallback } from "react";

const MOMENTS = [
  { id: 1, date: "31/10/2025", title: "Nosso primeiro beijo", marco: true, desc: "Já estava quase sem esperanças, não vou negar. Mas foi aqui que a chama se acendeu e tudo começou.", x: 50, y: 10 },
  { id: 2, date: "21/11/2025", title: "Nossa primeira foto juntos", marco: true, desc: "Aqui eu já sabia que você era completamente diferente de tudo que eu poderia imaginar.", x: 24, y: 24 },
  { id: 3, date: "01/12/2025", title: "Corremos na chuva juntos", marco: true, desc: "A virada de chave. O dia em que me apaixonei intensamente e confirmei o que já sabia: era você.", x: 76, y: 22 },
  { id: 4, date: "20/12/2025", title: "Você conheceu meus pais", marco: true, desc: "Estava muito feliz e ansioso, você foi a primeira mulher que apresentei para os meus pais.", x: 14, y: 46 },
  { id: 5, date: "25/12/2025", title: "Nosso primeiro Natal", marco: true, desc: "Fiquei ansioso, com medo de conhecer todo mundo. Mas foi muito mais do que esperava.", x: 86, y: 43 },
  { id: 6, date: "01/01/2026", title: "Nosso primeiro Ano Novo", marco: true, desc: "Logo após a meia noite, saí da festa da minha família e fui te ver. Queria começar o ano novo do seu lado.", x: 35, y: 62 },
  { id: 7, date: "14/01/2026", title: "Te pedi em namoro", marco: true, desc: "Acordamos às 5 da manhã para ver o sol nascer. Pedi sua mão na praia com o coração acelerado, orando para que desse tudo certo. Foi perfeito.", x: 65, y: 66 },
  { id: 8, date: "14/02/2026", title: "Nosso primeiro mês de namoro", marco: true, desc: "Comprei o primeiro buquê de rosas da minha vida. Escolhi uma flor de plástico para simbolizar nosso amor eterno, e fui atrás do pingente de trevo de quatro folhas, nosso símbolo. Estava tremendo de ansiedade.", x: 27, y: 82 },
  { id: 9, date: "01/03/2026", title: "Meu primeiro aniversário com você", marco: true, desc: "Não gosto muito de aniversários, sempre fica um sentimento ruim no peito. Mas você calou esse sentimento completamente. A surpresa no meu quarto, o seu sorriso... cada vez mais tenho certeza de que quero passar a vida toda do seu lado.", x: 73, y: 85 },
  { id: 10, date: "25/11/2025", title: "Começamos a treinar juntos", marco: false, desc: "Sempre amei treinar. Começar isso com você foi especial de um jeito que não esperava.", x: 39, y: 17 },
  { id: 11, date: "28/11/2025", title: "Primeiro filme juntos", marco: false, desc: "Assistimos Interestelar no notebook, nos bancos de trás do carro, depois de um dia de treino. Simples assim, e foi ótimo.", x: 62, y: 15 },
  { id: 12, date: "29/11/2025", title: "Jogo do Palmeiras juntos", marco: false, desc: "Gosto muito de futebol, e dividir isso com você foi importante pra mim.", x: 82, y: 32 },
  { id: 13, date: "03/12/2025", title: "Primeira vez na rua juntos", marco: false, desc: "Parece bobo, mas foi a primeira vez saindo com você na rua, nos expondo ao mundo juntos.", x: 18, y: 35 },
  { id: 14, date: "05/12/2025", title: "Fomos à piscina juntos", marco: false, desc: "Depois de um treino puxado, fomos à piscina e depois comer shawarma. Um dia simples que ficou na memória.", x: 54, y: 34 },
  { id: 15, date: "13/12/2025", title: "Ody Park com sua família", marco: false, desc: "Fiquei com um leve frio na barriga, foi ali que conheci seus pais de verdade. Mas foi muito bom, e fiquei muito próximo do Arthurzinho.", x: 32, y: 44 },
  { id: 16, date: "15/12/2025", title: "Foto com o Papai Noel", marco: false, desc: "Treino, beach tênis, pastel com a Gaby e o Enrico, e uma foto com o Papai Noel no centro. Foi um dia muito completo.", x: 67, y: 41 },
  { id: 17, date: "23/12/2025", title: "Parque do Japão", marco: false, desc: "Fomos ao parque do Japão com seus pais e seu irmão, decorado para o Natal. Minha primeira vez lá, muito lindo.", x: 48, y: 52 },
  { id: 18, date: "02/01/2026", title: "Mato Grosso do Sul", marco: false, desc: "Um convite feito por educação que o meu jeito maluco transformou em nossa primeira viagem juntos. De última hora, em barracas, pescando e jogando buraco. Absurdamente incrível.", x: 20, y: 65 },
  { id: 19, date: "12/01/2026", title: "Balneário Camboriú", marco: false, desc: "A viagem que mudou tudo. Ondas matadoras, caldos, muitas fotos e o plano do pedido tomando forma na minha cabeça. Cada momento ao seu lado foi incrível.", x: 79, y: 60 },
  { id: 20, date: "16/01/2026", title: "Tirolesa de Balneário", marco: false, desc: "Carrinho, torre, mirantes e tirolesa. Passamos por tudo e rimos muito, momentos muito divertidos.", x: 52, y: 57 },
  { id: 21, date: "20/01/2026", title: "Ody Park de novo", marco: false, desc: "Tínhamos acabado de chegar da praia e fomos pro resort de novo. Cansados, mas felizes, foi muito divertido.", x: 40, y: 73 },
  { id: 22, date: "21/01/2026", title: "Argila e filme", marco: false, desc: "Argila no rosto e um filme. Rimos muito, foi um daqueles dias simples que a gente não esquece.", x: 69, y: 75 },
  { id: 23, date: "21/02/2026", title: "Hambúrgueres e caipirinha", marco: false, desc: "Hambúrgueres, caipirinha e 'A Empregada'. Os hambúrgueres não ficaram lá essas coisas, mas a noite foi ótima.", x: 17, y: 88 },
  { id: 24, date: "28/02/2026", title: "Show Cê Tá Doido", marco: false, desc: "Finalmente o show que tanto queríamos. Bebida ruim, estacionamento que nos prendeu, e mesmo assim foi um dia muito especial. Dançamos, rimos muito, fora nossos momentos no hotel.", x: 53, y: 93 },
];

const CONNECTIONS = [
  [1, 10], [10, 11], [11, 2], [2, 12], [12, 3], [3, 13], [13, 14], [14, 15], [15, 4],
  [4, 16], [16, 17], [17, 5], [5, 6], [6, 18], [18, 7], [7, 19], [19, 20], [20, 21],
  [21, 22], [22, 8], [8, 23], [23, 24], [24, 9],
];

const css = `
  .constellation-section{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:64px 16px 80px;}
  .constellation-hearts{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
  .constellation-hf{position:absolute;animation:constFloatUp linear infinite;opacity:0;bottom:-40px;}
  @keyframes constFloatUp{
    0%{transform:translateY(0) rotate(-10deg);opacity:0;}
    10%{opacity:0.15;}90%{opacity:0.07;}
    100%{transform:translateY(-110vh) rotate(10deg);opacity:0;}
  }
  .constellation-stage{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;width:100%;}
  .constellation-hdr{text-align:center;margin-bottom:32px;animation:constFs 0.8s ease both;}
  @keyframes constFs{from{opacity:0;transform:translateY(22px);}}
  .constellation-lbl{text-transform:uppercase;letter-spacing:0.22em;font-size:11px;color:var(--rose-light);margin-bottom:12px;display:block;}
  .constellation-ttl{font-family:'Playfair Display',serif;font-size:clamp(26px,6vw,46px);font-weight:400;line-height:1.2;}
  .constellation-ttl em{font-style:italic;background:linear-gradient(135deg,var(--rose-light),var(--rose));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .constellation-sub{color:var(--muted);font-size:13px;margin-top:12px;letter-spacing:0.04em;}
  .constellation-divd{width:48px;height:1px;background:linear-gradient(90deg,transparent,var(--rose),transparent);margin:16px auto 0;}

  .constellation-sky{
    width:100%;max-width:820px;aspect-ratio:1/1;
    position:relative;border-radius:24px;overflow:hidden;
    border:1px solid var(--border);
    box-shadow:0 32px 80px rgba(0,0,0,0.7),inset 0 0 80px rgba(0,0,0,0.5);
    animation:constFs 1s 0.15s ease both;
    touch-action:manipulation;
  }
  @media(max-width:560px){.constellation-sky{aspect-ratio:1/1.25;border-radius:18px;}}

  .constellation-sky-bg{
    position:absolute;inset:0;
    background:
      radial-gradient(ellipse at 50% 0%,rgba(40,10,30,0.85) 0%,transparent 55%),
      radial-gradient(ellipse at 15% 80%,rgba(15,5,25,0.75) 0%,transparent 50%),
      radial-gradient(ellipse at 85% 55%,rgba(30,8,20,0.65) 0%,transparent 50%),
      linear-gradient(180deg,#050308 0%,#090410 45%,#050210 100%);
  }
  .constellation-neb{position:absolute;border-radius:50%;filter:blur(55px);pointer-events:none;}
  .constellation-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
  .constellation-cline{stroke:rgba(232,99,122,0.13);stroke-width:1;fill:none;transition:stroke 0.28s,stroke-width 0.28s;}
  .constellation-cline.hi{stroke:rgba(232,99,122,0.65);stroke-width:2;}
  .constellation-cline.dm{stroke:rgba(232,99,122,0.04);}

  .constellation-star{
    position:absolute;transform:translate(-50%,-50%);
    border-radius:50%;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    -webkit-tap-highlight-color:transparent;
    transition:opacity 0.22s ease;
    z-index:5;
  }
  .constellation-star.dm2{opacity:0.18;}
  .constellation-star-vis{position:relative;border-radius:50%;transition:transform 0.22s ease;pointer-events:none;}
  .constellation-star:hover .constellation-star-vis,.constellation-star.act .constellation-star-vis{transform:scale(1.55);}
  .constellation-core{position:absolute;inset:0;border-radius:50%;animation:constTwinkle ease-in-out infinite;}
  @keyframes constTwinkle{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.6;transform:scale(0.82);}}
  .constellation-sglow{position:absolute;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
  .constellation-ray{position:absolute;top:50%;left:50%;width:240%;height:1px;transform:translate(-50%,-50%) rotate(var(--a));background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);pointer-events:none;animation:constRp 3.2s ease-in-out infinite;}
  @keyframes constRp{0%,100%{opacity:0.2;}50%{opacity:0.8;}}

  .constellation-info-card{
    width:100%;max-width:820px;
    background:rgba(10,7,14,0.97);
    border:1px solid var(--border);border-radius:20px;
    padding:22px 20px;margin-top:14px;
    backdrop-filter:blur(24px);
    box-shadow:0 16px 50px rgba(0,0,0,0.6);
    min-height:108px;
  }
  .constellation-info-card.anim{animation:constCardIn 0.28s cubic-bezier(0.22,1,0.36,1) both;}
  @keyframes constCardIn{from{opacity:0;transform:translateY(10px);}}
  .constellation-ic-date{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;}
  .constellation-ic-title{font-family:'Playfair Display',serif;font-size:clamp(15px,3vw,19px);margin-bottom:10px;line-height:1.3;}
  .constellation-ic-title.m{background:linear-gradient(135deg,var(--rose-light),var(--rose));-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .constellation-ic-desc{font-family:'Caveat',cursive;font-size:clamp(15px,2.8vw,17px);color:var(--muted);line-height:1.62;}
  .constellation-ic-empty{font-family:'Playfair Display',serif;font-style:italic;font-size:14px;color:rgba(240,230,234,0.22);text-align:center;padding:20px 0;}

  .constellation-legend{display:flex;gap:20px;margin-top:16px;flex-wrap:wrap;justify-content:center;animation:constFs 1s 0.4s ease both;}
  .constellation-leg{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--muted);letter-spacing:0.07em;}
  .constellation-ls-big{width:12px;height:12px;border-radius:50%;background:radial-gradient(circle,#fff 20%,var(--rose-light) 60%,transparent);flex-shrink:0;}
  .constellation-ls-sm{width:7px;height:7px;border-radius:50%;background:radial-gradient(circle,#fff 20%,rgba(255,255,255,0.4) 70%);flex-shrink:0;}
`;

const BG_HEARTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${(i * 8.3 + 5) % 100}%`,
  delay: `${(i * 0.9) % 10}s`,
  dur: `${12 + (i % 6)}s`,
  size: `${10 + (i % 7)}px`,
  emoji: i % 3 === 0 ? "💕" : "❤️",
}));

const NEBULAS = [
  { x: 18, y: 20, w: 200, h: 150, c: "rgba(232,99,122,0.05)" },
  { x: 70, y: 50, w: 180, h: 165, c: "rgba(212,169,106,0.04)" },
  { x: 42, y: 78, w: 210, h: 145, c: "rgba(150,100,210,0.035)" },
];

export function Constellation() {
  const [active, setActive] = useState<{ id: number } | null>(null);
  const [sz, setSz] = useState({ w: 600, h: 600 });
  const [animKey, setAnimKey] = useState(0);
  const skyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new ResizeObserver(([e]) => {
      setSz({ w: e.contentRect.width, h: e.contentRect.height });
    });
    if (skyRef.current) obs.observe(skyRef.current);
    return () => obs.disconnect();
  }, []);

  const toggle = useCallback((m: (typeof MOMENTS)[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setActive((p) => {
      if (p?.id === m.id) return null;
      setAnimKey((k) => k + 1);
      return m;
    });
  }, []);

  const activeMoment = MOMENTS.find((m) => m.id === active?.id);
  const connSet = active
    ? new Set(CONNECTIONS.filter(([a, b]) => a === active.id || b === active.id).flatMap(([a, b]) => [a, b]))
    : null;

  const isMobile = sz.w < 480;
  const marcoVis = isMobile ? 12 : 10;
  const texVis = isMobile ? 8 : 6;
  const touch = isMobile ? 40 : 32;

  return (
    <section className="section constellation-section" id="s8">
      <style>{css}</style>
      <div className="constellation-hearts">
        {BG_HEARTS.map((h) => (
          <span
            key={h.id}
            className="constellation-hf"
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

      <div className="constellation-stage">
        <div className="constellation-hdr">
          <span className="constellation-lbl">❤ para você</span>
          <h2 className="constellation-ttl">
            Constelação de
            <br />
            <em>Memórias</em>
          </h2>
          <div className="constellation-divd" />
          <p className="constellation-sub">toque em uma estrela para ver o momento ✦</p>
        </div>

        <div className="constellation-sky" ref={skyRef} onClick={() => setActive(null)}>
          <div className="constellation-sky-bg" />
          {NEBULAS.map((n, i) => (
            <div
              key={i}
              className="constellation-neb"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                width: n.w,
                height: n.h,
                background: n.c,
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}

          <svg className="constellation-svg" viewBox={`0 0 ${sz.w} ${sz.h}`} preserveAspectRatio="none">
            {CONNECTIONS.map(([aId, bId], i) => {
              const a = MOMENTS.find((m) => m.id === aId),
                b = MOMENTS.find((m) => m.id === bId);
              if (!a || !b) return null;
              const x1 = (a.x / 100) * sz.w,
                y1 = (a.y / 100) * sz.h;
              const x2 = (b.x / 100) * sz.w,
                y2 = (b.y / 100) * sz.h;
              let cls = "constellation-cline";
              if (connSet) cls += connSet.has(aId) && connSet.has(bId) ? " hi" : " dm";
              return <line key={i} className={cls} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </svg>

          {MOMENTS.map((m) => {
            const px = (m.x / 100) * sz.w,
              py = (m.y / 100) * sz.h;
            const vr = m.marco ? marcoVis : texVis;
            const isAct = active?.id === m.id;
            const isDim = !!(active && !isAct && !connSet?.has(m.id));
            const glowC = m.marco ? "rgba(232,99,122,0.5)" : "rgba(200,200,255,0.2)";
            const delay = `${(m.id * 0.43) % 3}s`;
            const tdur = `${2.3 + (m.id % 3) * 0.85}s`;
            return (
              <div
                key={m.id}
                className={`constellation-star${isAct ? " act" : ""}${isDim ? " dm2" : ""}`}
                style={{ left: px, top: py, width: touch, height: touch }}
                onClick={(e) => toggle(m, e)}
              >
                <div className="constellation-star-vis" style={{ width: vr * 2, height: vr * 2 }}>
                  {m.marco &&
                    [0, 45, 90, 135].map((a) => (
                      <div key={a} className="constellation-ray" style={{ "--a": `${a}deg` } as React.CSSProperties} />
                    ))}
                  <div
                    className="constellation-sglow"
                    style={{
                      width: `${m.marco ? 380 : 260}%`,
                      height: `${m.marco ? 380 : 260}%`,
                      background: `radial-gradient(circle,${glowC},transparent 70%)`,
                      opacity: m.marco ? 0.4 : 0.18,
                    }}
                  />
                  <div
                    className="constellation-core"
                    style={{
                      background: m.marco
                        ? "radial-gradient(circle at 35% 35%,#fff 0%,#fff 30%,rgba(232,99,122,0.58) 72%,transparent)"
                        : "radial-gradient(circle at 35% 35%,#fff 0%,rgba(255,255,255,0.58) 55%,transparent)",
                      animationDuration: tdur,
                      animationDelay: delay,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className={`constellation-info-card${activeMoment ? " anim" : ""}`} key={animKey}>
          {activeMoment ? (
            <>
              <div className="constellation-ic-date">{activeMoment.date}</div>
              <div className={`constellation-ic-title${activeMoment.marco ? " m" : ""}`}>
                {activeMoment.marco ? "✦ " : ""}
                {activeMoment.title}
              </div>
              <div className="constellation-ic-desc">{activeMoment.desc}</div>
            </>
          ) : (
            <div className="constellation-ic-empty">toque em uma estrela para ver nossa história ✦</div>
          )}
        </div>

        <div className="constellation-legend">
          <div className="constellation-leg">
            <div className="constellation-ls-big" />
            <span>momentos marcantes</span>
          </div>
          <div className="constellation-leg">
            <div className="constellation-ls-sm" />
            <span>momentos do cotidiano</span>
          </div>
        </div>
      </div>
    </section>
  );
}
