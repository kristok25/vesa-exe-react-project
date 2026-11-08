import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown, ArrowRight, Cake, Check, Code2, Heart,
  PartyPopper, Sparkles, Terminal, X
} from "lucide-react";

type Photo = { src: string; caption: string; date: string; };

type ConfettiPiece = {
  id: number;
  color: string;
  left: string;
  top: string;
  x: number;
  y: number;
  rotate: number;
  delay: number;
  duration: number;
};

const photos: Photo[] = [
  { src: "/photos/memory-1.jpg", caption: "Njera nga keto momente qe e mbajme ne mend.", date: "A nje dite e mire" },
  { src: "/photos/memory-2.jpg", caption: "Disa momente te bukura dhe te thjeshta.", date: "Shume miqesi" },
  { src: "/photos/memory-3.jpg", caption: "Nje moment qe meriton te ruhet.", date: "Nje kthim i vogel" },
  { src: "/photos/memory-4.jpg", caption: "Nje foto qe me shume ka thjeshtesi dhe cilesi.", date: "Momenti i fundit" },
];

const checks = [
  "Duke kontrolluar lejet per dite e lindjes...",
  "Duke lidhur me API te gjerave te mira...",
  "Duke ngarkuar nje vit te ri me shpresa...",
  "Duke kompiluar buzqeshje...",
];

const confettiColors = ["#f9d976", "#ff8fab", "#90cdf4", "#a78bfa", "#86efac", "#fca5a5"];

const createConfetti = (): ConfettiPiece[] =>
  Array.from({ length: 42 }, (_, index) => ({
    id: index,
    color: confettiColors[index % confettiColors.length],
    left: `${50 + (Math.random() - 0.5) * 18}%`,
    top: `${48 + (Math.random() - 0.5) * 12}%`,
    x: (Math.random() - 0.5) * 260,
    y: 120 + Math.random() * 160,
    rotate: (Math.random() - 0.5) * 320,
    delay: Math.random() * 0.2,
    duration: 1.2 + Math.random() * 0.9,
  }));

function PhotoCard({ photo, index, onOpen }: { photo: Photo; index: number; onOpen: () => void }) {
  const [failed, setFailed] = useState(false);
  return (
    <button className="photo-card" onClick={onOpen} aria-label={`Hap kujtimin ${index + 1}`}>
      <div className="photo-frame">
        {!failed ? (
          <img src={photo.src} alt={photo.caption} onError={() => setFailed(true)} />
        ) : (
          <div className={`photo-placeholder placeholder-${index + 1}`}>
            <div className="placeholder-icon"><Heart size={24} /></div>
            <span>KUJTIME TUAJ</span>
            <small>memory-{index + 1}.jpg</small>
          </div>
        )}
        <span className="photo-zoom"><Sparkles size={14} /></span>
      </div>
      <div className="photo-caption">
        <span>{photo.date}</span>
        <p>{photo.caption}</p>
      </div>
    </button>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [wishMade, setWishMade] = useState(false);
  const [confettiBurst, setConfettiBurst] = useState<ConfettiPiece[]>([]);

  const galleryPhotos = photos.slice(0, 3);
  const closingPhoto = photos[0];

  const launch = () => {
    setStarted(true);
    window.setTimeout(() => setReady(true), 1750);
  };

  const triggerWish = () => {
    if (wishMade) return;
    setWishMade(true);
    setConfettiBurst(createConfetti());
  };

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grain" />

      <header className="topbar">
        <a className="brand" href="#home" aria-label="Vesa.exe home">
          <span className="brand-mark"><Code2 size={16} /></span>
          <span>vesa<span className="brand-accent">.exe</span></span>
        </a>
        <div className="topbar-right"><span className="status-dot" /> LANSIM SPECIAL <span className="version">v1.0.0</span></div>
      </header>

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.section key="intro" className="hero" id="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
            <div className="eyebrow"><Sparkles size={13} /> DIÇKA E VEÇANTE PER TY</div>
            <div className="hero-orbit">
              <div className="orbit orbit-a" /><div className="orbit orbit-b" />
              <div className="orbit-core"><Cake size={43} strokeWidth={1.25} /></div>
              <span className="orbit-star star-a">✦</span><span className="orbit-star star-b">✧</span>
            </div>
            <h1>Hej, Vesa<span className="purple-period">.</span></h1>
            <p className="hero-subtitle">Ke nje lajm te ri.</p>
            <div className="terminal-card">
              <div className="terminal-head">
                <div className="window-dots"><i /><i /><i /></div>
                <span><Terminal size={12} /> birthday.init</span>
                <span className="terminal-lock">LOKALE / PRIVATE</span>
              </div>
              <div className="terminal-body">
                <p><span className="prompt">→</span> Duke inicializuar <b>vesa.exe</b>...</p>
                <p><span className="prompt">→</span> U zbulua protokolli i dates.</p>
                <p><span className="prompt">→</span> Duke gati nje surprize te bukur<span className="cursor">_</span></p>
              </div>
            </div>
            <button className="primary-button" onClick={launch}>
              Hap surprizen <ArrowRight size={17} />
            </button>
            <p className="microcopy">Asnje bug nuk u lende ne prodhimin e kesaj dite.</p>
            <div className="scroll-hint"><ArrowDown size={14} /> ROLLO NDERA, QENDRO DISA</div>
          </motion.section>
        ) : (
          <motion.section key="content" className="content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            {!ready ? (
              <div className="loading-panel">
                <div className="loading-icon"><Terminal size={24} /></div>
                <p className="eyebrow">JU LUTEM PRITNI</p>
                <h2>Duke krijuar një pak magji...</h2>
                <div className="loading-lines">{checks.map((item, i) => <motion.p key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.35 }}><Check size={13} /> {item}</motion.p>)}</div>
                <div className="progress-track"><motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.6 }} /></div>
              </div>
            ) : (
              <>
                <section className="birthday-heading">
                  <div className="eyebrow"><PartyPopper size={14} /> LANSIMI U KRYE ME SUKSES</div>
                  <h1>Gëzuar ditelindjen,<br /><em>Vesa!</em></h1>
                  <p className="heading-note">Një udhetim i ri rreth diellit. Një version i ri dhe i bukur per te festuar.</p>
                  <div className="success-pill"><span /> HTTP 200 · TE GJITHA SISTEMET ME GJEK</div>
                </section>

                <section className="message-card">
                  <div className="message-icon"><Heart size={18} /></div>
                  <p className="section-kicker">NJË SHËNIM NGA KRIKIMI</p>
                  <h2>Disa persona e bejne rrugen me te mire.</h2>
                  <p className="message-copy">
                    Jam shume i lumtur qe rrugët tona u kryqezuan. Nga ditët e punes dhe momentet e vogla te buzqeshjes, me ka qene e bukur te ndjekim keshtu. Edhe pse jeta na ka dhene rrugë te ndryshme, shpresoj qe Vienna te te ndjehet e mira dhe te te sjelle aventura te reja.
                  </p>
                  <p className="message-copy">
                    Të uroj nje vit te plotë me persona te mirë, mundesi te bukura, plane spontane dhe lumturi te cila nuk ka nevojë per debug. Qendro si je. Ti meriton cdo gje te mirë.
                  </p>
                  <div className="signature">Me fat te madh <span>♡</span></div>
                </section>

                <section className="memories-section">
                  <div className="section-heading">
                    <div><p className="section-kicker">BAZA E MOMENTEVE</p><h2>Disa foto te mira.</h2></div>
                    <span className="memory-count">03 OBJEKTE</span>
                  </div>
                  <p className="section-description">Një koleksion i vogel me momente qe vlen te mbahen mend. Shto fotot e preferuara dhe beje edhe me te personal.</p>
                  <div className="photo-grid">
                    {galleryPhotos.map((photo, index) => <PhotoCard key={photo.src} photo={photo} index={index} onOpen={() => setActivePhoto(index)} />)}
                  </div>
                </section>

                <section className="closing-photo-card">
                  <div className="closing-photo-frame">
                    <img src={closingPhoto.src} alt={closingPhoto.caption} />
                  </div>
                  <div className="closing-photo-copy">
                    <p className="section-kicker">PER TE MBETUR</p>
                    <h2>Një moment i pare, qe do te mbetet gjithmonë.</h2>
                    <p>Edhe nje here, nje foto e pare qe e mban ne mend cdo moment te ketij dite te vecante.</p>
                  </div>
                </section>

                <section className="wish-section">
                  <div className="wish-glow"><Sparkles size={22} /></div>
                  <p className="section-kicker">GJËJA E FUNDIT</p>
                  <h2>Bej nje enderr, <em>Vesa.</em></h2>
                  <p>Le te jete viti i ardhshëm i bute me ty. Le te jene ditet e mira me te shumta se ato te keqija dhe le te sjelle cdo kapitull i ri diçka qe vlen te qeshesh.</p>
                  <button className={`primary-button wish-button ${wishMade ? "is-done" : ""}`} onClick={triggerWish}>
                    {wishMade ? <>Endrra u ruajt me sukses <Check size={17} /></> : <>Bera nje enderr <Sparkles size={17} /></>}
                  </button>

                  {wishMade && (
                    <motion.div
                      className="final-message"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3>Shume fat, Vesa! ✨</h3>
                      <p>
                        Uroj qe jeta te japë nje vit te plotë me dashuri, shendet, sukses, gëzim te papare dhe enderrat me te bukura qe ti i deshiron. Ti meriton cdo diell, cdo buzqeshje dhe cdo moment te lumtur qe vjen. Gëzuar ditelindjen dhe vazhdo te shkëlqesh!
                      </p>
                    </motion.div>
                  )}

                  {confettiBurst.length > 0 && (
                    <div className="confetti-layer" aria-hidden="true">
                      {confettiBurst.map((piece) => (
                        <span
                          key={piece.id}
                          className="confetti-piece"
                          style={{
                            left: piece.left,
                            top: piece.top,
                            background: piece.color,
                            animationDelay: `${piece.delay}s`,
                            animationDuration: `${piece.duration}s`,
                            ['--x' as any]: `${piece.x}px`,
                            ['--y' as any]: `${piece.y}px`,
                            ['--rotation' as any]: `${piece.rotate}deg`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </section>

                <footer className="footer">
                  <div className="footer-rule" />
                  <div className="footer-brand"><Code2 size={15} /> vesa.exe</div>
                  <p>E ndërtuar me pak kod dhe shume dashuri.</p>
                  <span className="footer-status"><span /> LIRUAR ME KERKIM · 2026</span>
                </footer>
              </>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePhoto(null)}>
            <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Mbyll foton"><X /></button>
            <motion.div className="lightbox-content" initial={{ scale: 0.94 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}>
              <img src={photos[activePhoto].src} alt={photos[activePhoto].caption} />
              <p>{photos[activePhoto].caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
