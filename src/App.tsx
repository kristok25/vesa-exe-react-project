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
  { src: "/photos/memory-1.jpg", caption: "Kjo foto thjesht ben shume sens.", date: "momenti i pare" },
  { src: "/photos/memory-2.jpg", caption: "Kur jemi ne versionin me te thjeshte.", date: "shume qeshje" },
  { src: "/photos/memory-3.jpg", caption: "Pak kaos, shume buzqeshje.", date: "little chaos" },
  { src: "/photos/memory-4.jpg", caption: "Ne, me dritat e ngrohta.", date: "finale" },
];

const checks = [
  "Duke gatuar pak surprize...",
  "Duke shtuar disa qesharje...",
  "Duke vendosur dritat e ngrohta...",
  "Duke bere gati ditelindjen...",
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
  const closingPhoto = photos[photos.length - 1];

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
        <div className="topbar-right"><span className="status-dot" /> simple mode <span className="version">v1.1</span></div>
      </header>

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.section key="intro" className="hero" id="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
            <div className="eyebrow"><Sparkles size={13} /> nje surprize e vogel</div>
            <div className="hero-orbit">
              <div className="orbit orbit-a" /><div className="orbit orbit-b" />
              <div className="orbit-core"><Cake size={43} strokeWidth={1.25} /></div>
              <span className="orbit-star star-a">✦</span><span className="orbit-star star-b">✧</span>
            </div>
            <h1>Hey, Vesa<span className="purple-period">.</span></h1>
            <p className="hero-subtitle">Ka nje lajm te mire.</p>
            <div className="terminal-card">
              <div className="terminal-head">
                <div className="window-dots"><i /><i /><i /></div>
                <span><Terminal size={12} /> birthday.init</span>
                <span className="terminal-lock">fun mode</span>
              </div>
              <div className="terminal-body">
                <p><span className="prompt">→</span> Duke hapur <b>surprizen</b>...</p>
                <p><span className="prompt">→</span> U gjet pak dashuri.</p>
                <p><span className="prompt">→</span> Drite, qeshje dhe nje shaka e mire<span className="cursor">_</span></p>
              </div>
            </div>
            <button className="primary-button" onClick={launch}>
              Hap surprizen <ArrowRight size={17} />
            </button>
            <p className="microcopy">Pa drama, vetem bukuri dhe qeshje.</p>
            <div className="scroll-hint"><ArrowDown size={14} /> vazhdo pak</div>
          </motion.section>
        ) : (
          <motion.section key="content" className="content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            {!ready ? (
              <div className="loading-panel">
                <div className="loading-icon"><Terminal size={24} /></div>
                <p className="eyebrow">prit pak</p>
                <h2>Po vendosim disa gjera te mira...</h2>
                <div className="loading-lines">{checks.map((item, i) => <motion.p key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.35 }}><Check size={13} /> {item}</motion.p>)}</div>
                <div className="progress-track"><motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.6 }} /></div>
              </div>
            ) : (
              <>
                <section className="birthday-heading">
                  <div className="eyebrow"><PartyPopper size={14} /> gëzuar ditelindjen</div>
                  <h1>Gëzuar,<br /><em>Vesa!</em></h1>
                  <p className="heading-note">Nuk ka nevoje per gjëra te shtrenjta. Vetem ulet, qesh dhe beje nje xhiro me te mire.</p>
                  <div className="success-pill"><span /> all systems: funny mode</div>
                </section>

                <section className="message-card">
                  <div className="message-icon"><Heart size={18} /></div>
                  <p className="section-kicker">nje mesazh i thjeshte</p>
                  <h2>Ti je e vecante, por jo e komplikuar.</h2>
                  <p className="message-copy">
                    Une e dua stilin tend te thjeshte dhe te ngrohte. Ti je ajo qe e bën cdo gjë te duket me e lehte dhe me e bukur. Kemi qesharake, kaos, te mira dhe disa momentet qe na ndajne nga turma.
                  </p>
                  <p className="message-copy">
                    Uroj qe viti i ri te jete i mbushur me gëzim, te mira, raste te qeshura dhe pak edhe magji. Ti meriton cdo gjë e ngrohte dhe e teper e bukur.
                  </p>
                  <div className="signature">me dashuri <span>♡</span></div>
                </section>

                <section className="memories-section">
                  <div className="section-heading">
                    <div><p className="section-kicker">momente</p><h2>Disa foto te hidhura.</h2></div>
                    <span className="memory-count">03</span>
                  </div>
                  <p className="section-description">Disa foto te vogla me momentet qe e din se si te bejne diten me me te mire.</p>
                  <div className="photo-grid">
                    {galleryPhotos.map((photo, index) => <PhotoCard key={photo.src} photo={photo} index={index} onOpen={() => setActivePhoto(index)} />)}
                  </div>
                </section>

                <section className="closing-photo-card">
                  <div className="closing-photo-frame">
                    <img src={closingPhoto.src} alt={closingPhoto.caption} />
                  </div>
                  <div className="closing-photo-copy">
                    <p className="section-kicker">finale</p>
                    <h2>Ne dhe dritat e ngrohta.</h2>
                    <p>Vetem nje foto e thjeshte, por me te gjitha kuptimet e nje dite te bukur.</p>
                  </div>
                </section>

                <section className="wish-section">
                  <div className="wish-glow"><Sparkles size={22} /></div>
                  <p className="section-kicker">gjëja e fundit</p>
                  <h2>Bëj një dëshirë, <em>Vesa.</em></h2>
                  <p>Deshiro nje vit me bukur, me pak stres dhe me shume qeshje. Dhe nese ndodh edhe pak kaos, atehere ne e bejme te ngrohte.</p>
                  <button className={`primary-button wish-button ${wishMade ? "is-done" : ""}`} onClick={triggerWish}>
                    {wishMade ? <>Dëshira u ruajt <Check size={17} /></> : <>Bëj një dëshirë <Sparkles size={17} /></>}
                  </button>

                  {wishMade && (
                    <motion.div
                      className="final-message"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3>Shumë fat, Vesa! ✨</h3>
                      <p>
                        Prit nje vit me dashuri, shendet, qeshje, pak magji dhe shume gjera te mira. Ti je e mira dhe e duhur per cdo diell qe vjen.
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
