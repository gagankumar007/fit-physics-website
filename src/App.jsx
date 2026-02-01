import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

:root {
  --bg:#0a0e1a; --bg2:#0f1429; --bg3:#141a2e;
  --accent:#00d4ff; --accent2:#7c3aed; --accent3:#00ff88;
  --text:#e2e8f0; --text-dim:#64748b;
  --glow:rgba(0,212,255,0.35); --glow2:rgba(124,58,237,0.3);
}

html { scroll-behavior:smooth; }
body {
  font-family:'Inter',sans-serif; background:var(--bg); color:var(--text);
  overflow-x:hidden; line-height:1.6; -webkit-font-smoothing:antialiased;
}
body.menu-open { overflow:hidden; }

/* ─── NAVBAR ─── */
.navbar {
  position:fixed; top:0; width:100%; z-index:1000;
  padding:16px 20px; display:flex; align-items:center; justify-content:space-between;
  background:rgba(10,14,26,0.82); backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(0,212,255,0.08); transition:background 0.4s;
}
.navbar.scrolled { background:rgba(10,14,26,0.97); }
.logo {
  font-family:'Syne',sans-serif; font-weight:800; font-size:1.25rem;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  letter-spacing:-0.5px; flex-shrink:0;
}
.nav-links { display:none; gap:28px; list-style:none; }
.nav-links a {
  color:var(--text-dim); text-decoration:none; font-size:0.85rem;
  font-weight:500; transition:color 0.3s;
}
.nav-links a:hover { color:var(--accent); }
.nav-cta {
  display:none; background:var(--accent); color:#0a0e1a; border:none;
  padding:9px 22px; border-radius:50px; font-weight:600; font-size:0.82rem;
  cursor:pointer; transition:box-shadow 0.3s,transform 0.2s;
}
.nav-cta:hover { box-shadow:0 0 18px var(--glow); transform:scale(1.04); }

/* hamburger */
.hamburger {
  display:flex; flex-direction:column; gap:5px; width:28px;
  cursor:pointer; z-index:10; background:none; border:none; padding:6px;
}
.hamburger span {
  display:block; height:2.5px; width:100%; border-radius:2px;
  background:var(--text); transition:transform 0.35s,opacity 0.3s;
}
.hamburger.active span:nth-child(1){ transform:translateY(7.5px) rotate(45deg); }
.hamburger.active span:nth-child(2){ opacity:0; }
.hamburger.active span:nth-child(3){ transform:translateY(-7.5px) rotate(-45deg); }

/* drawer */
.mobile-drawer {
  position:fixed; top:0; right:-100%; width:75vw; max-width:280px; height:100vh;
  background:#0d1120; z-index:999; padding:88px 28px 40px;
  transition:right 0.4s cubic-bezier(.4,0,.2,1);
  display:flex; flex-direction:column; gap:4px;
  border-left:1px solid rgba(0,212,255,0.1);
}
.mobile-drawer.open { right:0; }
.mobile-drawer a {
  color:var(--text); text-decoration:none; font-family:'Syne',sans-serif;
  font-size:1.05rem; font-weight:600; padding:15px 0;
  border-bottom:1px solid rgba(255,255,255,0.06); transition:color 0.3s;
}
.mobile-drawer a:hover { color:var(--accent); }
.mobile-drawer .drawer-cta {
  margin-top:28px; background:linear-gradient(135deg,var(--accent),#06b6d4);
  color:#0a0e1a; border:none; padding:15px; border-radius:50px;
  font-weight:700; font-size:0.92rem; cursor:pointer;
}
.drawer-overlay {
  position:fixed; inset:0; background:rgba(0,0,0,0.5);
  z-index:998; opacity:0; pointer-events:none; transition:opacity 0.35s;
}
.drawer-overlay.show { opacity:1; pointer-events:all; }

/* ─── HERO ─── */
.hero {
  min-height:100vh; display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  padding:104px 20px 60px; gap:28px;
  position:relative; overflow:hidden; width:100%;
  background:
    radial-gradient(ellipse 80% 50% at 70% 50%,rgba(124,58,237,0.07) 0%,transparent 70%),
    radial-gradient(ellipse 60% 50% at 30% 60%,rgba(0,212,255,0.05) 0%,transparent 60%),
    var(--bg);
}
.hero-left {
  width:100%; max-width:500px; z-index:2;
  display:flex; flex-direction:column; align-items:center; text-align:center;
}
.hero-badge {
  display:inline-flex; align-items:center; gap:8px;
  background:rgba(0,212,255,0.08); border:1px solid rgba(0,212,255,0.2);
  padding:7px 16px; border-radius:50px; font-size:0.74rem;
  color:var(--accent); font-weight:500;
  animation:fadeDown 0.8s ease both; white-space:nowrap;
}
.badge-dot { width:7px; height:7px; background:var(--accent3); border-radius:50%; animation:pulse-dot 2s infinite; }
@keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }

.hero h1 {
  font-family:'Syne',sans-serif; font-size:2.25rem; font-weight:800;
  line-height:1.14; letter-spacing:-0.8px; color:#fff; width:100%;
  animation:fadeUp 0.9s ease 0.15s both;
}
.hero h1 .glow-word {
  background:linear-gradient(135deg,var(--accent),#a78bfa);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
}
.hero-sub {
  margin-top:18px; font-size:0.92rem; color:var(--text-dim);
  line-height:1.9; width:100%;
  animation:fadeUp 0.9s ease 0.3s both;
}
.hero-sub .line { display:flex; align-items:center; justify-content:center; gap:10px; }
.hero-sub .dot { width:6px; height:6px; border-radius:50%; background:var(--accent); opacity:0.6; flex-shrink:0; }

.hero-highlights {
  margin-top:18px; display:flex; flex-wrap:wrap; gap:8px;
  justify-content:center; width:100%;
  animation:fadeUp 0.9s ease 0.45s both;
}
.highlight-tag {
  display:flex; align-items:center; gap:6px;
  background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
  padding:7px 12px; border-radius:8px; font-size:0.74rem; color:var(--text);
  white-space:nowrap;
}
.highlight-tag .hl-icon { color:var(--accent3); }

.hero-btns {
  margin-top:24px; display:flex; flex-direction:column; align-items:center;
  gap:10px; width:100%;
  animation:fadeUp 0.9s ease 0.6s both;
}
.btn-primary {
  background:linear-gradient(135deg,var(--accent),#06b6d4);
  color:#0a0e1a; border:none; padding:14px 32px; border-radius:50px;
  font-weight:700; font-size:0.88rem; cursor:pointer; width:100%; max-width:260px;
  box-shadow:0 0 24px var(--glow); transition:transform 0.25s,box-shadow 0.3s;
  animation:pulse-btn 3s ease-in-out infinite;
}
.btn-primary:hover { transform:translateY(-2px) scale(1.02); box-shadow:0 0 36px var(--glow); }
@keyframes pulse-btn { 0%,100%{box-shadow:0 0 24px var(--glow)} 50%{box-shadow:0 0 38px var(--glow)} }

.btn-secondary {
  background:transparent; color:var(--text); border:1px solid rgba(255,255,255,0.15);
  padding:13px 24px; border-radius:50px; font-weight:500; font-size:0.86rem;
  cursor:pointer; transition:border-color 0.3s,color 0.3s,background 0.3s;
  display:flex; align-items:center; justify-content:center; gap:8px;
  width:100%; max-width:260px;
}
.btn-secondary:hover { border-color:var(--accent); color:var(--accent); background:rgba(0,212,255,0.05); }
.play-icon {
  width:30px; height:30px; border-radius:50%; flex-shrink:0;
  background:rgba(0,212,255,0.1); border:1px solid rgba(0,212,255,0.25);
  display:flex; align-items:center; justify-content:center;
  font-size:0.68rem; color:var(--accent);
}

.hero-emotion {
  margin-top:22px; font-size:0.76rem; color:var(--text-dim);
  font-style:italic; opacity:0.7; width:100%; max-width:320px;
  animation:fadeUp 0.9s ease 0.75s both;
  border-left:2px solid rgba(0,212,255,0.3); padding-left:14px;
  text-align:left;
}

/* hero visual */
.hero-right {
  width:100%; max-width:220px; z-index:1;
  display:flex; align-items:center; justify-content:center;
}
.hero-visual-wrap {
  width:100%; aspect-ratio:1 / 1; position:relative; overflow:hidden;
}
.hero-visual {
  position:absolute; inset:0; animation:float 6s ease-in-out infinite;
}
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

.visual-core {
  position:absolute; inset:0; border-radius:50%;
  background:radial-gradient(circle at 40% 40%,rgba(0,212,255,0.14),rgba(124,58,237,0.08),transparent 70%);
  border:1px solid rgba(0,212,255,0.12);
}
.visual-ring { position:absolute; border-radius:50%; border:1px solid rgba(0,212,255,0.07); }
.visual-ring.r1 { inset:-12%; }
.visual-ring.r2 { inset:-24%; border-color:rgba(124,58,237,0.05); }

.symbol {
  position:absolute; font-family:'Syne',sans-serif; font-weight:700;
  color:var(--accent); opacity:0.65; text-shadow:0 0 10px var(--glow);
  animation:drift 4s ease-in-out infinite; font-size:0.85rem;
}
.symbol.s1 { top:6%; left:10%; font-size:0.95rem; }
.symbol.s2 { top:12%; right:8%; font-size:0.8rem; color:var(--accent2); animation-delay:0.6s; text-shadow:0 0 10px var(--glow2); }
.symbol.s3 { bottom:18%; left:6%; font-size:1rem; animation-delay:1.2s; }
.symbol.s4 { bottom:10%; right:12%; font-size:0.7rem; color:var(--accent3); animation-delay:0.3s; text-shadow:0 0 8px rgba(0,255,136,0.3); }
.symbol.s5 { top:40%; left:1%; font-size:0.65rem; color:var(--accent2); animation-delay:0.9s; }
.symbol.s6 { top:28%; right:2%; font-size:0.75rem; animation-delay:1.5s; }
@keyframes drift { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-6px) rotate(2deg)} }

.notebook-card {
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  width:38%; height:44%;
  background:linear-gradient(145deg,#1a2240,#151d35);
  border-radius:10px; border:1px solid rgba(0,212,255,0.12);
  box-shadow:0 8px 28px rgba(0,0,0,0.4),0 0 14px rgba(0,212,255,0.05);
  padding:12%; display:flex; flex-direction:column; gap:6%;
}
.nb-line { height:2px; border-radius:1px; background:linear-gradient(90deg,rgba(0,212,255,0.25),rgba(124,58,237,0.15)); }
.nb-line:nth-child(2){ width:75%; }
.nb-line:nth-child(3){ width:58%; }
.nb-formula { font-family:'Syne',sans-serif; font-size:0.55rem; color:var(--accent); opacity:0.85; margin-top:2%; }
.nb-sub { font-size:0.42rem; color:var(--text-dim); margin-top:1%; }

.particle {
  position:absolute; width:3px; height:3px; border-radius:50%;
  background:var(--accent); opacity:0.35;
  animation:particle-float 5s ease-in-out infinite;
}
.particle:nth-child(1){ top:8%; left:22%; }
.particle:nth-child(2){ top:55%; left:68%; animation-delay:1s; background:var(--accent2); }
.particle:nth-child(3){ top:75%; left:28%; animation-delay:2s; background:var(--accent3); }
.particle:nth-child(4){ top:22%; left:78%; animation-delay:1.5s; }
.particle:nth-child(5){ top:68%; left:12%; animation-delay:0.7s; background:var(--accent2); }
@keyframes particle-float { 0%,100%{transform:translateY(0) scale(1);opacity:0.35} 50%{transform:translateY(-14px) scale(1.3);opacity:0.7} }

/* ─── SHARED ─── */
.section { padding:64px 20px; position:relative; width:100%; }
.section-alt { background:var(--bg2); }
.section-inner { max-width:1100px; margin:0 auto; width:100%; }
.section-label {
  display:inline-flex; align-items:center; gap:8px;
  font-size:0.7rem; text-transform:uppercase; letter-spacing:2.5px;
  color:var(--accent); font-weight:600; margin-bottom:12px;
}
.section-label::before { content:''; width:24px; height:2px; background:var(--accent); border-radius:1px; }
.section-title {
  font-family:'Syne',sans-serif; font-size:1.85rem; font-weight:800;
  color:#fff; line-height:1.2; letter-spacing:-0.5px; width:100%;
}
.section-title .acc { color:var(--accent); }
.section-desc { color:var(--text-dim); font-size:0.86rem; margin-top:10px; line-height:1.8; width:100%; }
.reveal { opacity:0; transform:translateY(22px); transition:opacity 0.7s ease,transform 0.7s ease; }
.reveal.visible { opacity:1; transform:translateY(0); }
@keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }

/* ─── ABOUT ─── */
.about-grid { display:flex; flex-direction:column; gap:28px; margin-top:32px; }
.about-visual {
  position:relative; height:190px; border-radius:14px;
  background:linear-gradient(135deg,#131a30,#1a2240);
  border:1px solid rgba(0,212,255,0.08);
  overflow:hidden; display:flex; align-items:center; justify-content:center;
}
.about-visual::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(circle at 60% 40%,rgba(0,212,255,0.07),transparent 60%);
}
.about-visual-inner { font-family:'Syne',sans-serif; text-align:center; z-index:1; }
.about-visual-inner .av-icon { font-size:2.4rem; margin-bottom:6px; }
.about-visual-inner p { font-size:0.74rem; color:var(--text-dim); max-width:200px; line-height:1.6; margin:0 auto; }
.about-stat-row { display:flex; gap:24px; flex-wrap:wrap; margin-top:20px; }
.stat-num {
  font-family:'Syne',sans-serif; font-size:1.8rem; font-weight:800;
  background:linear-gradient(135deg,var(--accent),#a78bfa);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
}
.stat-label { font-size:0.72rem; color:var(--text-dim); margin-top:2px; }

/* ─── CARDS ─── */
.card-grid { display:flex; flex-direction:column; gap:12px; margin-top:32px; }
.card {
  background:linear-gradient(145deg,rgba(20,26,46,0.9),rgba(15,20,41,0.7));
  border:1px solid rgba(255,255,255,0.06);
  border-radius:14px; padding:22px 18px;
  transition:border-color 0.35s,transform 0.3s,box-shadow 0.35s;
  position:relative; overflow:hidden; width:100%;
}
.card:hover { border-color:rgba(0,212,255,0.25); transform:translateY(-3px); box-shadow:0 6px 24px rgba(0,0,0,0.3); }
.card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(90deg,var(--accent),var(--accent2));
  opacity:0; transition:opacity 0.35s;
}
.card:hover::before { opacity:1; }
.card-icon {
  width:42px; height:42px; border-radius:10px;
  display:flex; align-items:center; justify-content:center; font-size:1.15rem;
  margin-bottom:12px;
}
.icon-blue { background:rgba(0,212,255,0.1); }
.icon-purple { background:rgba(124,58,237,0.1); }
.icon-green { background:rgba(0,255,136,0.1); }
.card h3 { font-family:'Syne',sans-serif; font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:5px; }
.card p { font-size:0.78rem; color:var(--text-dim); line-height:1.7; }
.card-tag {
  display:inline-block; margin-top:10px; font-size:0.66rem; font-weight:600;
  color:var(--accent); background:rgba(0,212,255,0.08);
  padding:3px 9px; border-radius:20px;
}

/* ─── RESOURCES ─── */
.resource-row { display:flex; align-items:center; gap:10px; padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.05); }
.resource-row:last-child { border-bottom:none; }
.res-icon {
  width:38px; height:38px; border-radius:9px; flex-shrink:0;
  display:flex; align-items:center; justify-content:center; font-size:0.95rem;
}
.res-info { flex:1; min-width:0; }
.res-info h4 { font-family:'Syne',sans-serif; font-size:0.78rem; font-weight:600; color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.res-info span { font-size:0.68rem; color:var(--text-dim); }
.res-btn {
  background:transparent; border:1px solid rgba(0,212,255,0.3); color:var(--accent);
  padding:6px 12px; border-radius:50px; font-size:0.66rem; font-weight:600;
  cursor:pointer; transition:background 0.3s,color 0.3s; flex-shrink:0; white-space:nowrap;
}
.res-btn:hover { background:var(--accent); color:#0a0e1a; }
.two-col { display:flex; flex-direction:column; gap:16px; margin-top:32px; }
.res-card-wrap {
  background:linear-gradient(145deg,#141a2e,#0f1429);
  border-radius:14px; border:1px solid rgba(255,255,255,0.06); padding:18px;
}
.res-upsell {
  background:linear-gradient(145deg,#141a2e,#0f1429);
  border-radius:14px; border:1px solid rgba(124,58,237,0.15);
  padding:24px 18px; display:flex; flex-direction:column; align-items:center; text-align:center;
}

/* ─── TOPPERS ─── */
.topper-scroll {
  display:flex; gap:12px; overflow-x:auto; padding:14px 2px 18px;
  -webkit-overflow-scrolling:touch; scrollbar-width:none; margin-top:32px;
}
.topper-scroll::-webkit-scrollbar { display:none; }
.topper-card {
  background:linear-gradient(145deg,#141a2e,#0f1429);
  border:1px solid rgba(255,255,255,0.06); border-radius:14px;
  padding:20px 14px; text-align:center; position:relative;
  flex-shrink:0; width:158px;
  transition:transform 0.3s,border-color 0.35s;
}
.topper-card:hover { transform:translateY(-3px); border-color:rgba(124,58,237,0.3); }
.topper-rank {
  position:absolute; top:-10px; left:50%; transform:translateX(-50%);
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  color:#fff; font-family:'Syne',sans-serif; font-weight:800; font-size:0.66rem;
  padding:3px 13px; border-radius:20px; white-space:nowrap;
}
.topper-avatar {
  width:52px; height:52px; border-radius:50%; margin:10px auto 8px;
  display:flex; align-items:center; justify-content:center;
  font-family:'Syne',sans-serif; font-size:1.1rem; font-weight:800; color:#fff;
}
.av-blue { background:linear-gradient(135deg,#0891b2,#06b6d4); }
.av-purple { background:linear-gradient(135deg,#7c3aed,#a78bfa); }
.av-green { background:linear-gradient(135deg,#059669,#34d399); }
.av-pink { background:linear-gradient(135deg,#ec4899,#f472b6); }
.topper-card h4 { font-family:'Syne',sans-serif; font-size:0.82rem; font-weight:700; color:#fff; }
.topper-card .tc-exam { font-size:0.64rem; color:var(--text-dim); margin-top:3px; }
.topper-card .tc-score { margin-top:5px; font-family:'Syne',sans-serif; font-size:1.1rem; font-weight:800; color:var(--accent3); }
.topper-card .tc-score-label { font-size:0.6rem; color:var(--text-dim); }

/* ─── TESTIMONIALS ─── */
.testimonial-list { display:flex; flex-direction:column; gap:14px; margin-top:32px; }
.testi-card {
  background:linear-gradient(145deg,#141a2e,#0f1429);
  border:1px solid rgba(255,255,255,0.06); border-radius:14px;
  padding:20px; transition:border-color 0.35s;
}
.testi-card:hover { border-color:rgba(0,212,255,0.2); }
.testi-quote { font-size:1.4rem; color:var(--accent); opacity:0.3; font-family:'Syne',sans-serif; line-height:1; margin-bottom:6px; }
.testi-card p { font-size:0.78rem; color:var(--text-dim); line-height:1.75; font-style:italic; }
.testi-author { display:flex; align-items:center; gap:10px; margin-top:14px; }
.testi-avatar {
  width:34px; height:34px; border-radius:50%; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  font-size:0.76rem; font-weight:700; color:#fff;
}
.testi-author-info h5 { font-family:'Syne',sans-serif; font-size:0.76rem; font-weight:600; color:#fff; }
.testi-author-info span { font-size:0.66rem; color:var(--text-dim); }
.stars { color:#fbbf24; font-size:0.66rem; letter-spacing:2px; margin-bottom:6px; }

/* ─── WHY CHOOSE ─── */
.why-list { display:flex; flex-direction:column; gap:12px; margin-top:32px; }
.why-card {
  background:linear-gradient(145deg,rgba(20,26,46,0.85),rgba(15,20,41,0.6));
  border:1px solid rgba(255,255,255,0.06); border-radius:14px;
  padding:20px 18px; text-align:left; position:relative;
  transition:transform 0.3s,border-color 0.35s,box-shadow 0.35s;
}
.why-card:hover { transform:translateY(-2px); border-color:rgba(0,212,255,0.2); box-shadow:0 6px 24px rgba(0,0,0,0.25); }
.why-number {
  position:absolute; top:8px; right:14px;
  font-family:'Syne',sans-serif; font-size:2.4rem; font-weight:800;
  color:rgba(0,212,255,0.06); line-height:1;
}
.why-icon { font-size:1.5rem; margin-bottom:8px; }
.why-card h3 { font-family:'Syne',sans-serif; font-size:0.92rem; font-weight:700; color:#fff; margin-bottom:5px; }
.why-card p { font-size:0.76rem; color:var(--text-dim); line-height:1.7; }

/* ─── FACULTY ─── */
.faculty-list { display:flex; flex-direction:column; gap:12px; margin-top:32px; }
.faculty-card {
  background:linear-gradient(145deg,#141a2e,#0f1429);
  border:1px solid rgba(255,255,255,0.06); border-radius:14px;
  overflow:hidden; display:flex; flex-direction:row;
  transition:transform 0.3s,border-color 0.35s;
}
.faculty-card:hover { transform:translateY(-2px); border-color:rgba(124,58,237,0.25); }
.faculty-header {
  width:88px; min-height:100%; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
}
.fh-blue { background:linear-gradient(135deg,rgba(8,145,178,0.28),rgba(6,182,212,0.1)); }
.fh-purple { background:linear-gradient(135deg,rgba(124,58,237,0.28),rgba(167,139,250,0.1)); }
.fh-green { background:linear-gradient(135deg,rgba(5,150,105,0.28),rgba(52,211,153,0.1)); }
.faculty-avatar {
  width:50px; height:50px; border-radius:50%; border:2px solid rgba(255,255,255,0.1);
  display:flex; align-items:center; justify-content:center;
  font-family:'Syne',sans-serif; font-size:1rem; font-weight:800; color:#fff;
}
.faculty-body { padding:14px; flex:1; min-width:0; }
.faculty-body h3 { font-family:'Syne',sans-serif; font-size:0.86rem; font-weight:700; color:#fff; }
.faculty-body .f-subject { font-size:0.68rem; color:var(--accent); font-weight:600; margin-top:2px; }
.faculty-body p { font-size:0.72rem; color:var(--text-dim); margin-top:5px; line-height:1.6; }
.faculty-exp {
  display:inline-block; margin-top:6px; font-size:0.6rem; font-weight:600;
  color:var(--accent2); background:rgba(124,58,237,0.1);
  padding:2px 8px; border-radius:20px;
}

/* ─── CTA ─── */
.cta-section {
  text-align:center; padding:64px 20px 100px;
  background:linear-gradient(180deg,var(--bg2),var(--bg));
  position:relative; overflow:hidden;
}
.cta-section::before {
  content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  width:300px; height:300px; border-radius:50%;
  background:radial-gradient(circle,rgba(0,212,255,0.06),transparent 65%);
  pointer-events:none;
}
.cta-section h2 {
  font-family:'Syne',sans-serif; font-size:1.85rem; font-weight:800;
  color:#fff; line-height:1.2; letter-spacing:-0.5px; position:relative; z-index:1;
}
.cta-section h2 .acc { color:var(--accent); }
.cta-desc { color:var(--text-dim); font-size:0.86rem; margin-top:12px; line-height:1.7; position:relative; z-index:1; }
.cta-btns { display:flex; flex-direction:column; align-items:center; gap:10px; margin-top:24px; position:relative; z-index:1; }
.cta-btns .btn-primary { max-width:260px; }
.cta-btns .btn-secondary { max-width:260px; }
.cta-trust { color:var(--text-dim); font-size:0.68rem; margin-top:20px; position:relative; z-index:1; }
.cta-trust span { color:var(--accent); font-weight:600; }

/* ─── FOOTER ─── */
.footer { background:var(--bg); border-top:1px solid rgba(255,255,255,0.05); padding:32px 20px 20px; }
.footer-row { display:flex; flex-direction:column; align-items:center; gap:16px; }
.footer .logo { font-size:1.1rem; }
.footer-links { display:flex; gap:16px; list-style:none; flex-wrap:wrap; justify-content:center; }
.footer-links a { color:var(--text-dim); text-decoration:none; font-size:0.72rem; transition:color 0.3s; }
.footer-links a:hover { color:var(--accent); }
.footer-bottom { text-align:center; margin-top:22px; padding-top:14px; border-top:1px solid rgba(255,255,255,0.04); }
.footer-bottom p { font-size:0.66rem; color:var(--text-dim); }

/* ─── MOBILE STICKY BAR ─── */
.mobile-cta-bar {
  position:fixed; bottom:0; left:0; right:0; z-index:500;
  background:rgba(10,14,26,0.92); backdrop-filter:blur(16px);
  border-top:1px solid rgba(0,212,255,0.12);
  padding:10px 16px; display:flex; justify-content:center;
}
.mobile-cta-bar .btn-primary { animation:none; max-width:280px; font-size:0.82rem; padding:12px 22px; }

/* ═══════════════════════════════════════════════════
   DESKTOP  (> 700px)
   ═══════════════════════════════════════════════════ */
@media (min-width: 701px) {
  .navbar { padding:18px 48px; }
  .logo { font-size:1.45rem; }
  .nav-links { display:flex; }
  .nav-cta { display:block; }
  .hamburger { display:none !important; }
  .mobile-drawer, .drawer-overlay { display:none !important; }
  .mobile-cta-bar { display:none !important; }

  .hero {
    flex-direction:row; align-items:center; justify-content:flex-start;
    padding:120px 60px 80px; gap:48px; min-height:100vh;
  }
  .hero-left { align-items:flex-start; text-align:left; max-width:520px; }
  .hero h1 { font-size:3.5rem; letter-spacing:-1.5px; }
  .hero-sub .line { justify-content:flex-start; }
  .hero-highlights { justify-content:flex-start; }
  .hero-btns { flex-direction:row; align-items:flex-start; }
  .btn-primary { width:auto; max-width:none; }
  .btn-secondary { width:auto; max-width:none; }
  .hero-emotion { text-align:left; max-width:380px; }

  .hero-right { max-width:400px; flex:1; }
  .hero-visual-wrap { max-width:370px; margin:0 auto; }
  .symbol.s1 { font-size:1.6rem; }
  .symbol.s2 { font-size:1.3rem; }
  .symbol.s3 { font-size:1.8rem; }
  .symbol.s4 { font-size:1.1rem; }
  .symbol.s5 { font-size:0.95rem; }
  .symbol.s6 { font-size:1.3rem; }
  .nb-formula { font-size:0.75rem; }
  .nb-sub { font-size:0.6rem; }

  .section { padding:100px 60px; }
  .section-title { font-size:2.6rem; letter-spacing:-1px; }
  .section-desc { font-size:0.95rem; max-width:480px; }

  .about-grid { flex-direction:row; gap:52px; align-items:flex-start; }
  .about-grid > .reveal { flex:1; }
  .about-visual { height:300px; }

  .card-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .two-col { flex-direction:row; gap:36px; }
  .two-col > .reveal { flex:1; }

  .topper-scroll { flex-wrap:wrap; justify-content:center; overflow:visible; }
  .topper-card { width:calc(25% - 10px); min-width:160px; }

  .testimonial-list { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
  .why-list { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
  .why-card { text-align:center; }

  .faculty-list { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
  .faculty-card { flex-direction:column; }
  .faculty-header { width:100%; height:100px; }
  .faculty-avatar { width:64px; height:64px; font-size:1.3rem; }

  .cta-section { padding:110px 60px; }
  .cta-section h2 { font-size:2.8rem; letter-spacing:-1px; }
  .cta-desc { font-size:1rem; max-width:460px; margin-left:auto; margin-right:auto; }
  .cta-btns { flex-direction:row; justify-content:center; }
  .cta-btns .btn-primary { max-width:none; width:auto; }
  .cta-btns .btn-secondary { max-width:none; width:auto; }

  .footer { padding:48px 60px 28px; }
  .footer-row { flex-direction:row; justify-content:space-between; }
}

/* tablet 701-900 */
@media (min-width:701px) and (max-width:900px) {
  .hero { padding:110px 44px 60px; }
  .hero h1 { font-size:2.8rem; }
  .card-grid { grid-template-columns:repeat(2,1fr); }
  .testimonial-list { grid-template-columns:1fr; max-width:540px; margin-left:auto; margin-right:auto; }
  .why-list { grid-template-columns:repeat(2,1fr); }
  .faculty-list { grid-template-columns:repeat(2,1fr); }
  .topper-card { width:calc(50% - 8px); }
  .section { padding:80px 44px; }
}

/* tiny 360 and below */
@media (max-width: 360px) {
  .hero h1 { font-size:1.9rem; }
  .section-title { font-size:1.7rem; }
  .hero-right { max-width:180px; }
  .topper-card { width:140px; }
  .highlight-tag { font-size:0.68rem; padding:6px 9px; }
}
`;

// ─── DATA ───
const toppers = [
  { name:"Arjun Mehta", exam:"JEE Advanced 2024", score:"AIR 47", initials:"AM", avClass:"av-blue", rank:"🏆 Top 50" },
  { name:"Sneha Rao", exam:"NEET 2024", score:"720/720", initials:"SR", avClass:"av-purple", rank:"⭐ Perfect" },
  { name:"Ravi Kumar", exam:"JEE Main 2024", score:"AIR 312", initials:"RK", avClass:"av-green", rank:"🥇 Top 500" },
  { name:"Priya Nair", exam:"NEET 2024", score:"698/720", initials:"PN", avClass:"av-pink", rank:"🌟 Top 100" },
];
const testimonials = [
  { text:"Physics lagta tha bahut mushkil, par Fit Physics ke concept-based videos ne sab kuch clear kar diya. JEE Main mein 95 percentile aaya!", name:"Rahul S.", cls:"Class XII, Delhi", initials:"RS", avClass:"av-blue" },
  { text:"Teachers yahan sachchi care karte hain. Har doubt solve hota hai — class mein bhi, doubt session mein bhi. NEET preparation perfect rahi.", name:"Aisha K.", cls:"Class XI, Mumbai", initials:"AK", avClass:"av-purple" },
  { text:"1-minute revision videos are a game changer! Exam se pehle sirf 2 ghante mein sab kuch refresh kar liya. Highly recommend!", name:"Vikram P.", cls:"Class X, Bangalore", initials:"VP", avClass:"av-green" },
];
const faculty = [
  { name:"Mr. Deepak Arora", subject:"Mechanics & Thermodynamics", exp:"12 Years Experience", initials:"DA", headerClass:"fh-blue", avClass:"av-blue", desc:"IIT-BHU alumnus. Specializes in making Newton's laws and energy concepts crystal clear." },
  { name:"Ms. Priya Sharma", subject:"Electromagnetism & Optics", exp:"9 Years Experience", initials:"PS", headerClass:"fh-purple", avClass:"av-purple", desc:"Former NEET expert. Known for her unique visual teaching approach to wave physics." },
  { name:"Mr. Anand Joshi", subject:"Modern Physics & Quantum", exp:"15 Years Experience", initials:"AJ", headerClass:"fh-green", avClass:"av-green", desc:"IIT-Delhi graduate. Makes quantum mechanics and nuclear physics feel accessible." },
];
const whyChoose = [
  { icon:"🧠", title:"Concept-Based Learning", desc:"Rote memorization nahi — har concept ko root se samajho. Formulas automatically yaad hote hain jab samajh aata hai.", num:"01" },
  { icon:"⚡", title:"1-Minute Smart Revision", desc:"Exam se pehle quick revision ke liye short, punchy videos. Poori chapter 1 minute mein refresh.", num:"02" },
  { icon:"🎯", title:"Board + Competitive Prep", desc:"CBSE Board, JEE, aur NEET — ek hi platform par sab kuch. Integrated curriculum jo sab exams cover karta hai.", num:"03" },
  { icon:"💬", title:"Personal Doubt Sessions", desc:"Har student ka doubt important hai. Weekly live sessions mein seedha teacher se poochh sakte ho.", num:"04" },
  { icon:"📱", title:"Online + Offline Flexibility", desc:"Ghar se padho ya coaching center aao — apni convenience se. Hybrid model fully available.", num:"05" },
  { icon:"📊", title:"Track Your Progress", desc:"Regular tests aur analytics batayenge kitna improve hua hai. Weak spots identify karke strengthen karo.", num:"06" },
];

// ─── COMPONENTS ───
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);
  const close = () => setMenuOpen(false);
  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="logo">⚡ Fit Physics</div>
        <ul className="nav-links">
          {["About","Courses","Resources","Toppers","Faculty"].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <button className="nav-cta">Start Free</button>
        <button className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`drawer-overlay ${menuOpen ? "show" : ""}`} onClick={close}/>
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        {["About","Courses","Resources","Toppers","Faculty"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={close}>{l}</a>
        ))}
        <button className="drawer-cta" onClick={close}>🚀 Start Learning Free</button>
      </div>
    </>
  );
}

function RevealSection({ children, delay = 0 }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} className={`reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-badge"><span className="badge-dot"></span> Now enrolling — Class 9 to 12</div>
        <h1>Physics jo <span className="glow-word">dil se</span> samajh aaye.</h1>
        <div className="hero-sub">
          <div className="line"><span className="dot"></span> Board ke liye clarity.</div>
          <div className="line"><span className="dot"></span> Exam ke liye confidence.</div>
          <div className="line"><span className="dot"></span> Aur physics jo dar nahi — dost ban jaaye.</div>
        </div>
        <div className="hero-highlights">
          <div className="highlight-tag"><span className="hl-icon">✔</span> Class 9–12 Physics</div>
          <div className="highlight-tag"><span className="hl-icon">✔</span> Concept clarity guaranteed</div>
          <div className="highlight-tag"><span className="hl-icon">✔</span> Short revision videos</div>
        </div>
        <div className="hero-btns">
          <button className="btn-primary">Start Learning Free</button>
          <button className="btn-secondary"><span className="play-icon">▶</span> Watch Demo Class</button>
        </div>
        <p className="hero-emotion">"Har baccha physics samajh sakta hai — bas tareeka sahi hona chahiye."</p>
      </div>
      <div className="hero-right">
        <div className="hero-visual-wrap">
          <div className="hero-visual">
            <div className="visual-core"></div>
            <div className="visual-ring r1"></div>
            <div className="visual-ring r2"></div>
            <span className="symbol s1">⚡</span>
            <span className="symbol s2">∿</span>
            <span className="symbol s3">Ω</span>
            <span className="symbol s4">E=mc²</span>
            <span className="symbol s5">F=ma</span>
            <span className="symbol s6">λ</span>
            <div className="notebook-card">
              <div className="nb-line"></div>
              <div className="nb-line"></div>
              <div className="nb-line"></div>
              <div className="nb-formula">F = ma</div>
              <div className="nb-sub">Newton's 2nd Law</div>
              <div className="nb-line" style={{marginTop:'4%'}}></div>
            </div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="section-inner">
        <RevealSection>
          <div className="section-label">About Us</div>
          <h2 className="section-title">Physics ko <span className="acc">samajhne</span> ka sahi jagah</h2>
          <p className="section-desc">Fit Physics ek specialized coaching center hai jahan concept-based learning se har student apni pace par physics master kar sakta hai — Board ho ya Competitive exam.</p>
        </RevealSection>
        <div className="about-grid">
          <RevealSection>
            <div className="about-visual">
              <div className="about-visual-inner">
                <div className="av-icon">🏫</div>
                <p>Established in 2015 — Trusted by thousands of students across India for CBSE, JEE & NEET preparation.</p>
              </div>
            </div>
            <div className="about-stat-row">
              <div><div className="stat-num">12K+</div><div className="stat-label">Students Trained</div></div>
              <div><div className="stat-num">95%</div><div className="stat-label">Success Rate</div></div>
              <div><div className="stat-num">50+</div><div className="stat-label">AIR Toppers</div></div>
            </div>
          </RevealSection>
          <RevealSection delay={120}>
            <p style={{color:'var(--text-dim)',fontSize:'0.86rem',lineHeight:1.9}}>
              Fit Physics ka philosophy simple hai — <strong style={{color:'#fff'}}>har baccha intelligent hai, bas sahi direction chahiye.</strong> Hamare experienced teachers har concept ko aise explain karte hain ki dil se samajh aata hai, sirf rote se nahi.
            </p>
            <p style={{color:'var(--text-dim)',fontSize:'0.86rem',lineHeight:1.9,marginTop:14}}>
              Online aur in-person dono options available hain taaki har student apni comfort zone mein padh sake. Hamara goal hai ki physics har student ke liye ek <strong style={{color:'var(--accent)'}}>strength</strong> ban jaaye, ek <strong style={{color:'var(--accent)'}}>dar</strong> nahi.
            </p>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

function Notes() {
  const categories = [
    { title:"Mechanics", icon:"🔧", topics:14, color:"icon-blue" },
    { title:"Thermodynamics", icon:"🌡️", topics:8, color:"icon-purple" },
    { title:"Electromagnetism", icon:"⚡", topics:11, color:"icon-green" },
    { title:"Optics", icon:"🔦", topics:9, color:"icon-blue" },
    { title:"Modern Physics", icon:"⚛️", topics:7, color:"icon-purple" },
    { title:"Waves & Sound", icon:"🎵", topics:6, color:"icon-green" },
  ];
  return (
    <section className="section" id="courses">
      <div className="section-inner">
        <RevealSection>
          <div className="section-label">Notes & Study Material</div>
          <h2 className="section-title">Structured notes jo <span className="acc">samajhne mein</span> help karte hain</h2>
          <p className="section-desc">Har topic ke liye clean, color-coded notes prepared by expert teachers. PDF + video combo available.</p>
        </RevealSection>
        <div className="card-grid">
          {categories.map((c, i) => (
            <RevealSection key={c.title} delay={i * 70}>
              <div className="card">
                <div className={`card-icon ${c.color}`}>{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.topics} detailed topic modules with practice problems aur solved examples.</p>
                <span className="card-tag">{c.topics} Topics Available →</span>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function FreeResources() {
  const resources = [
    { icon:"📄", title:"Class 11 Mechanics — Full PDF Notes", sub:"45 pages • Concepts + Practice", color:"icon-blue" },
    { icon:"🎥", title:"Newton's Laws — 1-Min Revision Video", sub:"Quick recap before exam", color:"icon-purple" },
    { icon:"📝", title:"JEE Starter Quiz — 20 Questions", sub:"Test your understanding", color:"icon-green" },
    { icon:"🎧", title:"Doubt Session — Electromagnetism", sub:"60 min • Confusions cleared", color:"icon-blue" },
  ];
  return (
    <section className="section section-alt" id="resources">
      <div className="section-inner">
        <RevealSection>
          <div className="section-label">Free Resources</div>
          <h2 className="section-title">Bilkul <span className="acc">free</span> — koi compromise nahi</h2>
          <p className="section-desc">Shuru karne ke liye koi payment nahi. Ye resources directly download karo aur apni journey start karo.</p>
        </RevealSection>
        <div className="two-col">
          <RevealSection>
            <div className="res-card-wrap">
              {resources.map((r, i) => (
                <div className="resource-row" key={i}>
                  <div className={`res-icon ${r.color}`}>{r.icon}</div>
                  <div className="res-info"><h4>{r.title}</h4><span>{r.sub}</span></div>
                  <button className="res-btn">Free ↓</button>
                </div>
              ))}
            </div>
          </RevealSection>
          <RevealSection delay={120}>
            <div className="res-upsell">
              <div style={{fontSize:'2.2rem',marginBottom:10}}>🎯</div>
              <h3 style={{fontFamily:'Syne, sans-serif',color:'#fff',fontSize:'1rem',marginBottom:6}}>Ready to go deeper?</h3>
              <p style={{color:'var(--text-dim)',fontSize:'0.78rem',lineHeight:1.7,marginBottom:16}}>Full course access unlock karo aur structured learning path pe ho jao. Online + offline dono options.</p>
              <button className="btn-primary" style={{animation:'none',fontSize:'0.8rem',padding:'10px 22px',maxWidth:210}}>See Full Courses</button>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

function Toppers() {
  return (
    <section className="section" id="toppers">
      <div className="section-inner">
        <RevealSection>
          <div className="section-label">Our Toppers</div>
          <h2 className="section-title">Results jo <span className="acc">baat bolte</span> hain</h2>
          <p className="section-desc">Ye sirf numbers nahi — ye hai mehnat aur sahi guidance ka result. Har topper ki story inspiration hai.</p>
        </RevealSection>
        <div className="topper-scroll">
          {toppers.map((t) => (
            <div className="topper-card" key={t.name}>
              <div className="topper-rank">{t.rank}</div>
              <div className={`topper-avatar ${t.avClass}`}>{t.initials}</div>
              <h4>{t.name}</h4>
              <div className="tc-exam">{t.exam}</div>
              <div className="tc-score">{t.score}</div>
              <div className="tc-score-label">Final Result</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section section-alt">
      <div className="section-inner">
        <RevealSection>
          <div className="section-label">Student Stories</div>
          <h2 className="section-title">Wo kya kehte <span className="acc">hain</span></h2>
          <p className="section-desc">Real students, real experiences. Unki journey hamari sabse badi motivation hai.</p>
        </RevealSection>
        <div className="testimonial-list">
          {testimonials.map((t, i) => (
            <RevealSection key={i} delay={i * 90}>
              <div className="testi-card">
                <div className="testi-quote">❝</div>
                <div className="stars">★★★★★</div>
                <p>"{t.text}"</p>
                <div className="testi-author">
                  <div className={`testi-avatar ${t.avClass}`}>{t.initials}</div>
                  <div className="testi-author-info"><h5>{t.name}</h5><span>{t.cls}</span></div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="section" id="why">
      <div className="section-inner">
        <RevealSection>
          <div className="section-label">Why Choose Us</div>
          <h2 className="section-title">Kyun <span className="acc">Fit Physics</span> choose karo</h2>
          <p className="section-desc">Sirf ek coaching center nahi — ek complete learning ecosystem jo aapko success tak pahunchata hai.</p>
        </RevealSection>
        <div className="why-list">
          {whyChoose.map((w, i) => (
            <RevealSection key={i} delay={i * 70}>
              <div className="why-card">
                <div className="why-number">{w.num}</div>
                <div className="why-icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faculty() {
  return (
    <section className="section section-alt" id="faculty">
      <div className="section-inner">
        <RevealSection>
          <div className="section-label">Our Faculty</div>
          <h2 className="section-title">Teachers jo <span className="acc">inspire</span> karte hain</h2>
          <p className="section-desc">IIT aur top university alumni — experienced, passionate, aur genuinely dedicated about teaching.</p>
        </RevealSection>
        <div className="faculty-list">
          {faculty.map((f, i) => (
            <RevealSection key={f.name} delay={i * 100}>
              <div className="faculty-card">
                <div className={`faculty-header ${f.headerClass}`}>
                  <div className={`faculty-avatar ${f.avClass}`}>{f.initials}</div>
                </div>
                <div className="faculty-body">
                  <h3>{f.name}</h3>
                  <div className="f-subject">{f.subject}</div>
                  <p>{f.desc}</p>
                  <span className="faculty-exp">{f.exp}</span>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="cta-section">
      <RevealSection>
        <div className="section-label" style={{justifyContent:'center',display:'flex'}}>Get Started</div>
        <h2>Physics ab <span className="acc">dar nahi</span> —<br/>strength banegi.</h2>
        <p className="cta-desc">Aaj shuru karo. Free resources se begin karo, ya directly full course join karo. Apni journey yahan start hai.</p>
        <div className="cta-btns">
          <button className="btn-primary" style={{animation:'none'}}>🚀 Start Learning Free</button>
          <button className="btn-secondary">📞 Talk to Counselor</button>
        </div>
        <p className="cta-trust">Already trusted by <span>12,000+ students</span> across India • No credit card required</p>
      </RevealSection>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row">
        <div className="logo">⚡ Fit Physics</div>
        <ul className="footer-links">
          {["About","Courses","Resources","Toppers","Faculty","Contact"].map(l => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Fit Physics CBSE Classes. All rights reserved. | Delhi, India</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <Hero />
      <About />
      <Notes />
      <FreeResources />
      <Toppers />
      <Testimonials />
      <WhyChoose />
      <Faculty />
      <FinalCTA />
      <Footer />
      <div className="mobile-cta-bar">
        <button className="btn-primary">🚀 Start Learning Free</button>
      </div>
    </>
  );
}