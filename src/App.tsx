import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown, ArrowRight, Cake, Check, Code2, Heart,
  PartyPopper, Sparkles, Terminal, X
} from "lucide-react";

type Photo = { src: string; caption: string; date: string; };

const photos: Photo[] = [
  { src: "/photos/memory-1.jpg", caption: "One for the memory bank.", date: "A good day" },
  { src: "/photos/memory-2.jpg", caption: "Proof that we do have fun outside the IDE.", date: "Good company" },
  { src: "/photos/memory-3.jpg", caption: "A moment worth keeping.", date: "A little throwback" },
];

const checks = [
  "Checking birthday permissions...",
  "Connecting to the good-vibes API...",
  "Loading another year of possibilities...",
  "Compiling smiles...",
];

function PhotoCard({ photo, index, onOpen }: { photo: Photo; index: number; onOpen: () => void }) {
  const [failed, setFailed] = useState(false);
  return (
    <button className="photo-card" onClick={onOpen} aria-label={`Open memory ${index + 1}`}>
      <div className="photo-frame">
        {!failed ? (
          <img src={photo.src} alt={photo.caption} onError={() => setFailed(true)} />
        ) : (
          <div className={`photo-placeholder placeholder-${index + 1}`}>
            <div className="placeholder-icon"><Heart size={24} /></div>
            <span>YOUR MEMORY HERE</span>
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

  const launch = () => {
    setStarted(true);
    window.setTimeout(() => setReady(true), 1750);
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
        <div className="topbar-right"><span className="status-dot" /> SPECIAL RELEASE <span className="version">v1.0.0</span></div>
      </header>

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.section key="intro" className="hero" id="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
            <div className="eyebrow"><Sparkles size={13} /> A LITTLE SOMETHING FOR YOU</div>
            <div className="hero-orbit">
              <div className="orbit orbit-a" /><div className="orbit orbit-b" />
              <div className="orbit-core"><Cake size={43} strokeWidth={1.25} /></div>
              <span className="orbit-star star-a">✦</span><span className="orbit-star star-b">✧</span>
            </div>
            <h1>Hey, Vesa<span className="purple-period">.</span></h1>
            <p className="hero-subtitle">You have a new notification.</p>
            <div className="terminal-card">
              <div className="terminal-head">
                <div className="window-dots"><i /><i /><i /></div>
                <span><Terminal size={12} /> birthday.init</span>
                <span className="terminal-lock">LOCAL / PRIVATE</span>
              </div>
              <div className="terminal-body">
                <p><span className="prompt">→</span> Initializing <b>vesa.exe</b>...</p>
                <p><span className="prompt">→</span> Birthday protocol detected.</p>
                <p><span className="prompt">→</span> Preparing something nice<span className="cursor">_</span></p>
              </div>
            </div>
            <button className="primary-button" onClick={launch}>
              Open your surprise <ArrowRight size={17} />
            </button>
            <p className="microcopy">No bugs were harmed in the making of this birthday.</p>
            <div className="scroll-hint"><ArrowDown size={14} /> SCROLL A LITTLE, STAY A WHILE</div>
          </motion.section>
        ) : (
          <motion.section key="content" className="content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            {!ready ? (
              <div className="loading-panel">
                <div className="loading-icon"><Terminal size={24} /></div>
                <p className="eyebrow">PLEASE WAIT</p>
                <h2>Making a little magic...</h2>
                <div className="loading-lines">{checks.map((item, i) => <motion.p key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.35 }}><Check size={13} /> {item}</motion.p>)}</div>
                <div className="progress-track"><motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.6 }} /></div>
              </div>
            ) : (
              <>
                <section className="birthday-heading">
                  <div className="eyebrow"><PartyPopper size={14} /> DEPLOYMENT SUCCESSFUL</div>
                  <h1>Happy Birthday,<br /><em>Vesa!</em></h1>
                  <p className="heading-note">Another trip around the sun. Another version worth celebrating.</p>
                  <div className="success-pill"><span /> HTTP 200 · ALL SYSTEMS HAPPY</div>
                </section>

                <section className="message-card">
                  <div className="message-icon"><Heart size={18} /></div>
                  <p className="section-kicker">A NOTE FROM THE DEVELOPER</p>
                  <h2>Some people make the journey better.</h2>
                  <p className="message-copy">
                    I'm really glad our paths crossed. From the days of sharing an office to all the little moments and laughs along the way, I'm grateful for the memories we've made. Even though life took us to different places, I hope Vienna is treating you well and bringing you plenty of new adventures.
                  </p>
                  <p className="message-copy">
                    Wishing you a year full of good people, exciting opportunities, spontaneous plans, and the kind of happiness that doesn't need debugging. Keep being you. You deserve good things.
                  </p>
                  <div className="signature">Have the loveliest birthday <span>♡</span></div>
                </section>

                <section className="memories-section">
                  <div className="section-heading">
                    <div><p className="section-kicker">THE MEMORY DATABASE</p><h2>A few good snapshots.</h2></div>
                    <span className="memory-count">03 OBJECTS</span>
                  </div>
                  <p className="section-description">A tiny gallery for moments worth keeping. Add your favourite photos to make it yours.</p>
                  <div className="photo-grid">
                    {photos.map((photo, index) => <PhotoCard key={photo.src} photo={photo} index={index} onOpen={() => setActivePhoto(index)} />)}
                  </div>
                </section>

                <section className="wish-section">
                  <div className="wish-glow"><Sparkles size={22} /></div>
                  <p className="section-kicker">ONE LAST THING</p>
                  <h2>Make a wish, <em>Vesa.</em></h2>
                  <p>May the year ahead be kind to you. May the good days outnumber the bad ones, and may every new chapter bring something worth smiling about.</p>
                  <button className={`primary-button wish-button ${wishMade ? "is-done" : ""}`} onClick={() => setWishMade(true)}>
                    {wishMade ? <>Wish successfully saved <Check size={17} /></> : <>I made a wish <Sparkles size={17} /></>}
                  </button>
                </section>

                <footer className="footer">
                  <div className="footer-rule" />
                  <div className="footer-brand"><Code2 size={15} /> vesa.exe</div>
                  <p>Built with a little code and a lot of good intentions.</p>
                  <span className="footer-status"><span /> RELEASED WITH CARE · 2026</span>
                </footer>
              </>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePhoto(null)}>
            <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Close photo"><X /></button>
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
