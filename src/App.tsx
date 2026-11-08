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
  { src: "/photos/memory-1.jpg", caption: "Një për bankën e kujtimeve.", date: "Një ditë e mirë" },
  { src: "/photos/memory-2.jpg", caption: "Dëshmi që kemi qejf jashtë IDE-së.", date: "Kompani e mirë" },
  { src: "/photos/memory-3.jpg", caption: "Një moment i çmuar për t'u ruajtur.", date: "Një rikthim i vogël" },
  { src: "/photos/memory-4.jpg", caption: "Një fotografi për t'u mbajtur mend përgjithmonë.", date: "Momenti i fundit" },
];

const checks = [
  "Duke kontrolluar lejet e ditëlindjes...",
  "Duke lidhur me API-në e gëzimit...",
  "Duke ngarkuar një vit tjetër mundësish...",
  "Duke kompiluar buzëqeshje...",
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
            <div className="eyebrow"><Sparkles size={13} /> DIÇKA E VEÇANTË PËR JU</div>
            <div className="hero-orbit">
              <div className="orbit orbit-a" /><div className="orbit orbit-b" />
              <div className="orbit-core"><Cake size={43} strokeWidth={1.25} /></div>
              <span className="orbit-star star-a">✦</span><span className="orbit-star star-b">✧</span>
            </div>
            <h1>Hej, Vesa<span className="purple-period">.</span></h1>
            <p className="hero-subtitle">Ke një njoftim të ri.</p>
            <div className="terminal-card">
              <div className="terminal-head">
                <div className="window-dots"><i /><i /><i /></div>
                <span><Terminal size={12} /> birthday.init</span>
                <span className="terminal-lock">LOKALE / PRIVATE</span>
              </div>
              <div className="terminal-body">
                <p><span className="prompt">→</span> Duke inicializuar <b>vesa.exe</b>...</p>
                <p><span className="prompt">→</span> U zbulua protokolli i ditëlindjes.</p>
                <p><span className="prompt">→</span> Duke përgatitur diçka të bukur<span className="cursor">_</span></p>
              </div>
            </div>
            <button className="primary-button" onClick={launch}>
              Hap surprizën <ArrowRight size={17} />
            </button>
            <p className="microcopy">Asnjë bug nuk u lëndua në prodhimin e kësaj ditëlindjeje.</p>
            <div className="scroll-hint"><ArrowDown size={14} /> ROLLO A KËTU, QËNDRO DISA</div>
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
                  <h1>Gëzuar Ditëlindjen,<br /><em>Vesa!</em></h1>
                  <p className="heading-note">Një tjetër udhëtim rreth diellit. Një version tjetër i vlefshëm për t'u festuar.</p>
                  <div className="success-pill"><span /> HTTP 200 · TË GJITHA SISTEMET TË GËZUARA</div>
                </section>

                <section className="message-card">
                  <div className="message-icon"><Heart size={18} /></div>
                  <p className="section-kicker">NJË SHËNIM NGA ZHVILLUESI</p>
                  <h2>Disa njerëz e bëjnë udhëtimin më të mirë.</h2>
                  <p className="message-copy">
                    Jam shumë i lumtur që rrugët tona u kryqëzuan. Nga ditët e ndarjes së zyrës deri te momentet e vogla dhe buzëqeshjet përgjatë rrugës, jam falënderues për kujtimet që kemi ndërtuar. Edhe pse jeta na çoi në vende të ndryshme, shpresoj që Vienna të të trajtojë mirë dhe të të sjellë aventura të reja dhe të bukura.
                  </p>
                  <p className="message-copy">
                    Ju dërgoj një vit të plotë me njerëz të mirë, mundësi të mahnitshme, plane spontane dhe lumturi të tillë që nuk ka nevojë të depërtojë në debug. Mbaji veten si je. Ti meriton gjëra të mira.
                  </p>
                  <div className="signature">Gëzu ditëlindjen më të bukur <span>♡</span></div>
                </section>

                <section className="memories-section">
                  <div className="section-heading">
                    <div><p className="section-kicker">BAZA E KUJTIMEVE</p><h2>Disa fotografi të bukura.</h2></div>
                    <span className="memory-count">03 OBJEKTE</span>
                  </div>
                  <p className="section-description">Një galeri e vogël për momente që vlen të ruash. Shto fotot e tua të preferuara për ta bërë akoma më tënd.</p>
                  <div className="photo-grid">
                    {galleryPhotos.map((photo, index) => <PhotoCard key={photo.src} photo={photo} index={index} onOpen={() => setActivePhoto(index)} />)}
                  </div>
                </section>

                <section className="closing-photo-card">
                  <div className="closing-photo-frame">
                    <img src={closingPhoto.src} alt={closingPhoto.caption} />
                  </div>
                  <div className="closing-photo-copy">
                    <p className="section-kicker">PËR TË KËNDUAR</p>
                    <h2>Një kujtim i parë, që do të mbetet gjithmonë.</h2>
                    <p>Edhe një herë, një fotografi e parë që e mban në mendje tërë atë çfarë shoqëron këtë ditë dhe këtë moment të veçantë.</p>
                  </div>
                </section>

                <section className="wish-section">
                  <div className="wish-glow"><Sparkles size={22} /></div>
                  <p className="section-kicker">GJËJA E FUNDIT</p>
                  <h2>Bëj një ëndërr, <em>Vesa.</em></h2>
                  <p>Le të jetë viti i ardhshëm i butë me ty. Le të jenë ditët e mira më të shumta se ato të këqija dhe le të sjellë çdo kapitull i ri diçka që vlen të qeshë.</p>
                  <button className={`primary-button wish-button ${wishMade ? "is-done" : ""}`} onClick={triggerWish}>
                    {wishMade ? <>Ëndrra u ruajt me sukses <Check size={17} /></> : <>Bëra një ëndërr <Sparkles size={17} /></>}
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
                        Uroj që jeta të japë një vit të plotë me dashuri, shëndet, sukses, gëzim të paparë dhe ëndërrat më të bukura që t'i dëshironit. Ti meriton çdo diell, çdo buzëqeshje dhe çdo moment të lumtur që vjen. Gëzuar ditëlindjen dhe vazhdo të shkëlqesh!
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
                  <p>E ndërtuar me pak kod dhe shumë mirëdashje.</p>
                  <span className="footer-status"><span /> LIRUAR ME KËRKIM · 2026</span>
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
