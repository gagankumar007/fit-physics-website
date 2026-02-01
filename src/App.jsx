import { useState, useEffect, useRef } from "react";

// ─── UTILITY: Intersection Observer Hook ───
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

// ─── CSS INJECTION ───
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #0a0e1a;
  --bg2: #0f1429;
  --bg3: #141a2e;
  --accent: #00d4ff;
  --accent2: #7c3aed;
  --accent3: #00ff88;
  --text: #e2e8f0;
  --text-dim: #64748b;
  --glow: rgba(0, 212, 255, 0.35);
  --glow2: rgba(124, 58, 237, 0.3);
}

html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  line-height: 1.6;
}

/* ─── NAVBAR ─── */
.navbar {
  position: fixed; top: 0; width: 100%; z-index: 1000;
  padding: 18px 40px;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(10,14,26,0.75);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(0,212,255,0.08);
  transition: background 0.4s;
}
.navbar.scrolled { background: rgba(10,14,26,0.95); }
.logo {
  font-family: 'Syne', sans-serif;
  font-weight: 800; font-size: 1.45rem;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}
.nav-links { display: flex; gap: 28px; list-style: none; }
.nav-links a {
  color: var(--text-dim); text-decoration: none; font-size: 0.85rem;
  font-weight: 500; letter-spacing: 0.3px; transition: color 0.3s;
}
.nav-links a:hover { color: var(--accent); }
.nav-cta {
  background: var(--accent); color: #0a0e1a;
  border: none; padding: 9px 22px; border-radius: 50px;
  font-weight: 600; font-size: 0.82rem; cursor: pointer;
  letter-spacing: 0.4px; transition: box-shadow 0.3s, transform 0.2s;
}
.nav-cta:hover { box-shadow: 0 0 18px var(--glow); transform: scale(1.04); }

/* ─── HERO ─── */
.hero {
  min-height: 100vh; display: flex; align-items: center;
  padding: 120px 60px 80px;
  position: relative; overflow: hidden;
  background: radial-gradient(ellipse 80% 60% at 70% 50%, rgba(124,58,237,0.08) 0%, transparent 70%),
              radial-gradient(ellipse 60% 50% at 30% 60%, rgba(0,212,255,0.06) 0%, transparent 60%),
              var(--bg);
}
.hero-left { flex: 1; max-width: 560px; z-index: 2; position: relative; }
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(0,212,255,0.08); border: 1px solid rgba(0,212,255,0.2);
  padding: 7px 16px; border-radius: 50px; font-size: 0.78rem;
  color: var(--accent); font-weight: 500; margin-bottom: 28px;
  animation: fadeDown 0.8s ease both;
}
.badge-dot { width: 7px; height: 7px; background: var(--accent3); border-radius: 50%; animation: pulse-dot 2s infinite; }
@keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }

.hero h1 {
  font-family: 'Syne', sans-serif; font-size: 3.6rem; font-weight: 800;
  line-height: 1.1; letter-spacing: -1.5px; color: #fff;
  animation: fadeUp 0.9s ease 0.15s both;
}
.hero h1 .glow-word {
  background: linear-gradient(135deg, var(--accent), #a78bfa);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.hero-sub {
  margin-top: 22px; font-size: 1.05rem; color: var(--text-dim);
  line-height: 1.8; max-width: 440px;
  animation: fadeUp 0.9s ease 0.3s both;
}
.hero-sub .line { display: flex; align-items: center; gap: 10px; }
.hero-sub .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); opacity: 0.6; }

.hero-highlights {
  margin-top: 30px; display: flex; flex-wrap: wrap; gap: 12px;
  animation: fadeUp 0.9s ease 0.45s both;
}
.highlight-tag {
  display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  padding: 8px 14px; border-radius: 8px; font-size: 0.8rem; color: var(--text);
}
.highlight-tag .hl-icon { color: var(--accent3); font-size: 0.75rem; }

.hero-btns {
  margin-top: 36px; display: flex; gap: 14px; flex-wrap: wrap;
  animation: fadeUp 0.9s ease 0.6s both;
}
.btn-primary {
  background: linear-gradient(135deg, var(--accent), #06b6d4);
  color: #0a0e1a; border: none; padding: 14px 32px; border-radius: 50px;
  font-weight: 700; font-size: 0.9rem; cursor: pointer;
  box-shadow: 0 0 24px var(--glow); transition: transform 0.25s, box-shadow 0.3s;
  animation: pulse-btn 3s ease-in-out infinite;
}
.btn-primary:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 0 36px var(--glow); }
@keyframes pulse-btn { 0%,100%{box-shadow:0 0 24px var(--glow)} 50%{box-shadow:0 0 38px var(--glow)} }

.btn-secondary {
  background: transparent; color: var(--text); border: 1px solid rgba(255,255,255,0.15);
  padding: 14px 28px; border-radius: 50px; font-weight: 500; font-size: 0.9rem;
  cursor: pointer; transition: border-color 0.3s, color 0.3s, background 0.3s;
  display: flex; align-items: center; gap: 8px;
}
.btn-secondary:hover { border-color: var(--accent); color: var(--accent); background: rgba(0,212,255,0.05); }
.play-icon {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.25);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; color: var(--accent);
}

.hero-emotion {
  margin-top: 40px; font-size: 0.82rem; color: var(--text-dim);
  font-style: italic; opacity: 0.7; max-width: 380px;
  animation: fadeUp 0.9s ease 0.75s both;
  border-left: 2px solid rgba(0,212,255,0.3); padding-left: 16px;
}

/* HERO RIGHT ─ floating visual */
.hero-right {
  flex: 1; display: flex; align-items: center; justify-content: center;
  position: relative; min-height: 420px; z-index: 1;
}
.hero-visual {
  width: 380px; height: 380px; position: relative;
  animation: float 6s ease-in-out infinite;
}
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }

.visual-core {
  position: absolute; inset: 0; border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, rgba(0,212,255,0.12), rgba(124,58,237,0.08), transparent 70%);
  border: 1px solid rgba(0,212,255,0.1);
}
.visual-ring {
  position: absolute; border-radius: 50%; border: 1px solid rgba(0,212,255,0.08);
}
.visual-ring.r1 { inset: -30px; }
.visual-ring.r2 { inset: -60px; border-color: rgba(124,58,237,0.06); }

.symbol {
  position: absolute; font-family: 'Syne', sans-serif; font-weight: 700;
  color: var(--accent); opacity: 0.7; text-shadow: 0 0 12px var(--glow);
  animation: drift 4s ease-in-out infinite;
}
.symbol.s1 { top: 8%; left: 12%; font-size: 1.8rem; animation-delay: 0s; }
.symbol.s2 { top: 15%; right: 10%; font-size: 1.4rem; color: var(--accent2); animation-delay: 0.6s; text-shadow: 0 0 12px var(--glow2); }
.symbol.s3 { bottom: 20%; left: 8%; font-size: 2rem; animation-delay: 1.2s; }
.symbol.s4 { bottom: 12%; right: 15%; font-size: 1.2rem; color: var(--accent3); animation-delay: 0.3s; text-shadow: 0 0 10px rgba(0,255,136,0.3); }
.symbol.s5 { top: 42%; left: 2%; font-size: 1rem; color: var(--accent2); animation-delay: 0.9s; }
.symbol.s6 { top: 30%; right: 3%; font-size: 1.5rem; animation-delay: 1.5s; }
@keyframes drift { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(3deg)} }

.notebook-card {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 160px; height: 190px;
  background: linear-gradient(145deg, #1a2240, #151d35);
  border-radius: 12px; border: 1px solid rgba(0,212,255,0.12);
  box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(0,212,255,0.05);
  padding: 18px; display: flex; flex-direction: column; gap: 8px;
}
.nb-line {
  height: 3px; border-radius: 2px;
  background: linear-gradient(90deg, rgba(0,212,255,0.25), rgba(124,58,237,0.15));
}
.nb-line:nth-child(2) { width: 75%; }
.nb-line:nth-child(3) { width: 60%; }
.nb-formula {
  margin-top: 6px; font-family: 'Syne', sans-serif; font-size: 0.85rem;
  color: var(--accent); opacity: 0.85;
}
.nb-sub { font-size: 0.65rem; color: var(--text-dim); margin-top: 2px; }

/* floating particles */
.particle {
  position: absolute; width: 4px; height: 4px; border-radius: 50%;
  background: var(--accent); opacity: 0.4;
  animation: particle-float 5s ease-in-out infinite;
}
.particle:nth-child(1) { top: 10%; left: 25%; animation-delay: 0s; }
.particle:nth-child(2) { top: 60%; left: 70%; animation-delay: 1s; background: var(--accent2); }
.particle:nth-child(3) { top: 80%; left: 30%; animation-delay: 2s; background: var(--accent3); }
.particle:nth-child(4) { top: 25%; left: 80%; animation-delay: 1.5s; }
.particle:nth-child(5) { top: 70%; left: 15%; animation-delay: 0.7s; background: var(--accent2); }
@keyframes particle-float { 0%,100%{transform:translateY(0) scale(1);opacity:0.4} 50%{transform:translateY(-20px) scale(1.4);opacity:0.8} }

/* ─── SHARED SECTION STYLES ─── */
.section { padding: 100px 60px; position: relative; }
.section-alt { background: var(--bg2); }
.section-label {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.72rem; text-transform: uppercase; letter-spacing: 2.5px;
  color: var(--accent); font-weight: 600; margin-bottom: 14px;
}
.section-label::before { content: ''; width: 28px; height: 2px; background: var(--accent); border-radius: 1px; }
.section-title {
  font-family: 'Syne', sans-serif; font-size: 2.6rem; font-weight: 800;
  color: #fff; line-height: 1.15; letter-spacing: -1px; max-width: 520px;
}
.section-title .acc { color: var(--accent); }
.section-desc {
  color: var(--text-dim); font-size: 0.95rem; max-width: 480px;
  margin-top: 14px; line-height: 1.8;
}
.reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

@keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }

/* ─── ABOUT ─── */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-top: 50px; }
.about-visual {
  position: relative; height: 340px;
  background: linear-gradient(135deg, #131a30, #1a2240);
  border-radius: 20px; border: 1px solid rgba(0,212,255,0.08);
  overflow: hidden; display: flex; align-items: center; justify-content: center;
}
.about-stat-row { display: flex; gap: 32px; margin-top: 32px; flex-wrap: wrap; }
.stat-card {
  text-align: left;
}
.stat-num {
  font-family: 'Syne', sans-serif; font-size: 2.2rem; font-weight: 800;
  background: linear-gradient(135deg, var(--accent), #a78bfa);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.stat-label { font-size: 0.78rem; color: var(--text-dim); margin-top: 2px; }

.about-visual-inner {
  font-family: 'Syne', sans-serif; text-align: center; z-index: 1;
}
.about-visual-inner .av-icon { font-size: 3.2rem; margin-bottom: 10px; }
.about-visual-inner p { font-size: 0.82rem; color: var(--text-dim); max-width: 220px; line-height: 1.6; }
.about-visual::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 60% 40%, rgba(0,212,255,0.07), transparent 60%);
}

/* ─── CARDS GENERIC ─── */
.card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 48px; }
.card {
  background: linear-gradient(145deg, rgba(20,26,46,0.9), rgba(15,20,41,0.7));
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px; padding: 30px 24px;
  transition: border-color 0.35s, transform 0.3s, box-shadow 0.35s;
  position: relative; overflow: hidden;
}
.card:hover { border-color: rgba(0,212,255,0.25); transform: translateY(-4px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
.card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  opacity: 0; transition: opacity 0.35s;
}
.card:hover::before { opacity: 1; }
.card-icon {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; font-size: 1.3rem;
  margin-bottom: 18px;
}
.icon-blue { background: rgba(0,212,255,0.1); }
.icon-purple { background: rgba(124,58,237,0.1); }
.icon-green { background: rgba(0,255,136,0.1); }
.card h3 { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 700; color: #fff; margin-bottom: 8px; }
.card p { font-size: 0.82rem; color: var(--text-dim); line-height: 1.7; }
.card-tag {
  display: inline-block; margin-top: 14px; font-size: 0.7rem; font-weight: 600;
  color: var(--accent); background: rgba(0,212,255,0.08);
  padding: 4px 10px; border-radius: 20px;
}

/* ─── FREE RESOURCES ─── */
.resource-row { display: flex; align-items: center; gap: 16px; padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
.resource-row:last-child { border-bottom: none; }
.res-icon {
  width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
}
.res-info { flex: 1; }
.res-info h4 { font-family: 'Syne', sans-serif; font-size: 0.9rem; font-weight: 600; color: #fff; }
.res-info span { font-size: 0.76rem; color: var(--text-dim); }
.res-btn {
  background: transparent; border: 1px solid rgba(0,212,255,0.3); color: var(--accent);
  padding: 7px 18px; border-radius: 50px; font-size: 0.74rem; font-weight: 600;
  cursor: pointer; transition: background 0.3s, color 0.3s;
}
.res-btn:hover { background: var(--accent); color: #0a0e1a; }

.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 48px; }

/* ─── TOPPERS ─── */
.topper-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 48px; }
.topper-card {
  background: linear-gradient(145deg, #141a2e, #0f1429);
  border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;
  padding: 28px 20px; text-align: center; position: relative;
  transition: transform 0.3s, border-color 0.35s;
}
.topper-card:hover { transform: translateY(-4px); border-color: rgba(124,58,237,0.3); }
.topper-rank {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  color: #fff; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 0.75rem;
  padding: 4px 16px; border-radius: 20px;
}
.topper-avatar {
  width: 64px; height: 64px; border-radius: 50%; margin: 14px auto 12px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; color: #fff;
}
.av-blue { background: linear-gradient(135deg, #0891b2, #06b6d4); }
.av-purple { background: linear-gradient(135deg, #7c3aed, #a78bfa); }
.av-green { background: linear-gradient(135deg, #059669, #34d399); }
.av-pink { background: linear-gradient(135deg, #ec4899, #f472b6); }
.topper-card h4 { font-family: 'Syne', sans-serif; font-size: 0.92rem; font-weight: 700; color: #fff; }
.topper-card .tc-exam { font-size: 0.72rem; color: var(--text-dim); margin-top: 4px; }
.topper-card .tc-score { margin-top: 8px; font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; color: var(--accent3); }
.topper-card .tc-score-label { font-size: 0.68rem; color: var(--text-dim); }

/* ─── TESTIMONIALS ─── */
.testimonial-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
.testi-card {
  background: linear-gradient(145deg, #141a2e, #0f1429);
  border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;
  padding: 28px; position: relative; transition: border-color 0.35s;
}
.testi-card:hover { border-color: rgba(0,212,255,0.2); }
.testi-quote { font-size: 1.8rem; color: var(--accent); opacity: 0.3; font-family: 'Syne', sans-serif; line-height: 1; margin-bottom: 12px; }
.testi-card p { font-size: 0.82rem; color: var(--text-dim); line-height: 1.75; font-style: italic; }
.testi-author { display: flex; align-items: center; gap: 12px; margin-top: 20px; }
.testi-avatar {
  width: 38px; height: 38px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem; font-weight: 700; color: #fff;
}
.testi-author-info h5 { font-family: 'Syne', sans-serif; font-size: 0.82rem; font-weight: 600; color: #fff; }
.testi-author-info span { font-size: 0.7rem; color: var(--text-dim); }
.stars { color: #fbbf24; font-size: 0.7rem; letter-spacing: 2px; margin-bottom: 10px; }

/* ─── WHY CHOOSE ─── */
.why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 48px; }
.why-card {
  background: linear-gradient(145deg, rgba(20,26,46,0.85), rgba(15,20,41,0.6));
  border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;
  padding: 32px 24px; text-align: center; position: relative;
  transition: transform 0.3s, border-color 0.35s, box-shadow 0.35s;
}
.why-card:hover { transform: translateY(-4px); border-color: rgba(0,212,255,0.2); box-shadow: 0 8px 30px rgba(0,0,0,0.25); }
.why-number {
  position: absolute; top: 16px; right: 20px;
  font-family: 'Syne', sans-serif; font-size: 3.5rem; font-weight: 800;
  color: rgba(0,212,255,0.06); line-height: 1;
}
.why-icon { font-size: 2rem; margin-bottom: 16px; }
.why-card h3 { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 8px; }
.why-card p { font-size: 0.8rem; color: var(--text-dim); line-height: 1.7; }

/* ─── FACULTY ─── */
.faculty-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 48px; }
.faculty-card {
  background: linear-gradient(145deg, #141a2e, #0f1429);
  border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;
  overflow: hidden; transition: transform 0.3s, border-color 0.35s;
}
.faculty-card:hover { transform: translateY(-3px); border-color: rgba(124,58,237,0.25); }
.faculty-header {
  height: 110px; display: flex; align-items: center; justify-content: center;
  position: relative;
}
.fh-blue { background: linear-gradient(135deg, rgba(8,145,178,0.25), rgba(6,182,212,0.1)); }
.fh-purple { background: linear-gradient(135deg, rgba(124,58,237,0.25), rgba(167,139,250,0.1)); }
.fh-green { background: linear-gradient(135deg, rgba(5,150,105,0.25), rgba(52,211,153,0.1)); }
.faculty-avatar {
  width: 72px; height: 72px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; color: #fff;
  position: relative; z-index: 1;
}
.faculty-body { padding: 20px; }
.faculty-body h3 { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; }
.faculty-body .f-subject { font-size: 0.75rem; color: var(--accent); font-weight: 600; margin-top: 2px; }
.faculty-body p { font-size: 0.78rem; color: var(--text-dim); margin-top: 8px; line-height: 1.6; }
.faculty-exp {
  display: inline-block; margin-top: 10px; font-size: 0.68rem; font-weight: 600;
  color: var(--accent2); background: rgba(124,58,237,0.1);
  padding: 3px 10px; border-radius: 20px;
}

/* ─── FINAL CTA ─── */
.cta-section {
  text-align: center; padding: 120px 60px;
  background: linear-gradient(180deg, var(--bg2), var(--bg));
  position: relative; overflow: hidden;
}
.cta-section::before {
  content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,212,255,0.06), transparent 65%);
  pointer-events: none;
}
.cta-section h2 {
  font-family: 'Syne', sans-serif; font-size: 3rem; font-weight: 800;
  color: #fff; line-height: 1.15; letter-spacing: -1px;
  position: relative; z-index: 1;
}
.cta-section h2 .acc { color: var(--accent); }
.cta-section p { color: var(--text-dim); font-size: 1rem; margin-top: 16px; max-width: 480px; margin-left: auto; margin-right: auto; position: relative; z-index: 1; }
.cta-btns { display: flex; justify-content: center; gap: 16px; margin-top: 36px; flex-wrap: wrap; position: relative; z-index: 1; }
.cta-trust { color: var(--text-dim); font-size: 0.75rem; margin-top: 28px; position: relative; z-index: 1; }
.cta-trust span { color: var(--accent); font-weight: 600; }

/* ─── FOOTER ─── */
.footer {
  background: var(--bg); border-top: 1px solid rgba(255,255,255,0.05);
  padding: 48px 60px 28px;
}
.footer-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
.footer .logo { font-size: 1.2rem; }
.footer-links { display: flex; gap: 24px; list-style: none; }
.footer-links a { color: var(--text-dim); text-decoration: none; font-size: 0.78rem; transition: color 0.3s; }
.footer-links a:hover { color: var(--accent); }
.footer-bottom { text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.04); }
.footer-bottom p { font-size: 0.72rem; color: var(--text-dim); }

/* ─── RESPONSIVE ─── */
@media (max-width: 900px) {
  .hero { flex-direction: column; padding: 130px 36px 60px; text-align: center; }
  .hero-left { max-width: 100%; }
  .hero h1 { font-size: 2.6rem; }
  .hero-sub .line { justify-content: center; }
  .hero-highlights { justify-content: center; }
  .hero-btns { justify-content: center; }
  .hero-emotion { margin-left: auto; margin-right: auto; }
  .hero-right { min-height: 260px; }
  .hero-visual { width: 240px; height: 240px; }
  .card-grid, .why-grid, .faculty-grid { grid-template-columns: 1fr; }
  .topper-grid { grid-template-columns: repeat(2, 1fr); }
  .testimonial-grid { grid-template-columns: 1fr; }
  .about-grid { grid-template-columns: 1fr; }
  .two-col { grid-template-columns: 1fr; }
  .section { padding: 70px 36px; }
  .section-title { font-size: 2rem; }
  .navbar { padding: 16px 24px; }
  .nav-links { display: none; }
}
`;

// ─── DATA ───
const toppers = [
  { name: "Arjun Mehta", exam: "JEE Advanced 2024", score: "AIR 47", initials: "AM", avClass: "av-blue", rank: "🏆 Top 50" },
  { name: "Sneha Rao", exam: "NEET 2024", score: "720/720", initials: "SR", avClass: "av-purple", rank: "⭐ Perfect" },
  { name: "Ravi Kumar", exam: "JEE Main 2024", score: "AIR 312", initials: "RK", avClass: "av-green", rank: "🥇 Top 500" },
  { name: "Priya Nair", exam: "NEET 2024", score: "698/720", initials: "PN", avClass: "av-pink", rank: "🌟 Top 100" },
];
const testimonials = [
  { text: "Physics lagta tha bahut mushkil, par Fit Physics ke concept-based videos ne sab kuch clear kar diya. JEE Main mein 95 percentile aaya!", name: "Rahul S.", class: "Class XII, Delhi", initials: "RS", avClass: "av-blue" },
  { text: "Teachers yahan sachchi care karte hain. Har doubt solve hota hai — class mein bhi, doubt session mein bhi. NEET preparation perfect rahi.", name: "Aisha K.", class: "Class XI, Mumbai", initials: "AK", avClass: "av-purple" },
  { text: "1-minute revision videos are a game changer! Exam se pehle sirf 2 ghante mein sab kuch refresh kar liya. Highly recommend!", name: "Vikram P.", class: "Class X, Bangalore", initials: "VP", avClass: "av-green" },
];
const faculty = [
  { name: "Mr. Deepak Arora", subject: "Mechanics & Thermodynamics", exp: "12 Years Experience", initials: "DA", headerClass: "fh-blue", avClass: "av-blue", desc: "IIT-BHU alumnus. Specializes in making Newton's laws and energy concepts crystal clear." },
  { name: "Ms. Priya Sharma", subject: "Electromagnetism & Optics", exp: "9 Years Experience", initials: "PS", headerClass: "fh-purple", avClass: "av-purple", desc: "Former NEET expert. Known for her unique visual teaching approach to wave physics." },
  { name: "Mr. Anand Joshi", subject: "Modern Physics & Quantum", exp: "15 Years Experience", initials: "AJ", headerClass: "fh-green", avClass: "av-green", desc: "IIT-Delhi graduate. Makes quantum mechanics and nuclear physics feel accessible." },
];
const whyChoose = [
  { icon: "🧠", title: "Concept-Based Learning", desc: "Rote memorization nahi — har concept ko root se samajho. Formulas automatically yaad hote hain jab samajh aata hai.", num: "01" },
  { icon: "⚡", title: "1-Minute Smart Revision", desc: "Exam se pehle quick revision ke liye short, punchy videos. Poori chapter 1 minute mein refresh.", num: "02" },
  { icon: "🎯", title: "Board + Competitive Prep", desc: "CBSE Board, JEE, aur NEET — ek hi platform par sab kuch. Integrated curriculum jo sab exams cover karta hai.", num: "03" },
  { icon: "💬", title: "Personal Doubt Sessions", desc: "Har student ka doubt important hai. Weekly live sessions mein seedha teacher se poochh sakte ho.", num: "04" },
  { icon: "📱", title: "Online + Offline Flexibility", desc: "Ghar se padho ya coaching center aao — apni convenience se. Hybrid model fully available.", num: "05" },
  { icon: "📊", title: "Track Your Progress", desc: "Regular tests aur analytics batayenge kitna improve hua hai. Weak spots identify karke strengthen karo.", num: "06" },
];

// ─── COMPONENTS ───
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">⚡ Fit Physics</div>
      <ul className="nav-links">
        {["About","Courses","Resources","Toppers","Faculty"].map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
        ))}
      </ul>
      <button className="nav-cta">Start Free</button>
    </nav>
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
            <div className="nb-line" style={{marginTop:8}}></div>
          </div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>
    </section>
  );
}

function RevealSection({ children, delay = 0 }) {
  const [ref, inView] = useInView(0.12);
  return (
    <div ref={ref} className={`reveal ${inView ? "visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function About() {
  return (
    <section className="section section-alt" id="about">
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
            <div className="stat-card"><div className="stat-num">12K+</div><div className="stat-label">Students Trained</div></div>
            <div className="stat-card"><div className="stat-num">95%</div><div className="stat-label">Success Rate</div></div>
            <div className="stat-card"><div className="stat-num">50+</div><div className="stat-label">AIR Toppers</div></div>
          </div>
        </RevealSection>
        <RevealSection delay={150}>
          <div style={{paddingTop:24}}>
            <p style={{color:'var(--text-dim)',fontSize:'0.9rem',lineHeight:1.9}}>
              Fit Physics ka philosophy simple hai — <strong style={{color:'#fff'}}>har baccha intelligent hai, bas sahi direction chahiye.</strong> Hamare experienced teachers har concept ko aise explain karte hain ki dil se samajh aata hai, sirf rote se nahi.
            </p>
            <p style={{color:'var(--text-dim)',fontSize:'0.9rem',lineHeight:1.9,marginTop:16}}>
              Online aur in-person dono options available hain taaki har student apni comfort zone mein padh sake. Hamara goal hai ki physics har student ke liye ek <strong style={{color:'var(--accent)'}}>strength</strong> ban jaaye, ek <strong style={{color:'var(--accent)'}}>dar</strong> nahi.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function Notes() {
  const categories = [
    { title: "Mechanics", icon: "🔧", topics: 14, color: "icon-blue" },
    { title: "Thermodynamics", icon: "🌡️", topics: 8, color: "icon-purple" },
    { title: "Electromagnetism", icon: "⚡", topics: 11, color: "icon-green" },
    { title: "Optics", icon: "🔦", topics: 9, color: "icon-blue" },
    { title: "Modern Physics", icon: "⚛️", topics: 7, color: "icon-purple" },
    { title: "Waves & Sound", icon: "🎵", topics: 6, color: "icon-green" },
  ];
  return (
    <section className="section" id="courses">
      <RevealSection>
        <div className="section-label">Notes & Study Material</div>
        <h2 className="section-title">Structured notes jo <span className="acc">samajhne mein</span> help karte hain</h2>
        <p className="section-desc">Har topic ke liye clean, color-coded notes prepared by expert teachers. PDF + video combo available.</p>
      </RevealSection>
      <div className="card-grid">
        {categories.map((c, i) => (
          <RevealSection key={c.title} delay={i * 80}>
            <div className="card">
              <div className={`card-icon ${c.color}`}>{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.topics} detailed topic modules with practice problems aur solved examples.</p>
              <span className="card-tag">{c.topics} Topics Available →</span>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

function FreeResources() {
  const resources = [
    { icon: "📄", title: "Class 11 Mechanics — Full PDF Notes", sub: "45 pages • Concepts + Practice", color: "icon-blue" },
    { icon: "🎥", title: "Newton's Laws — 1-Min Revision Video", sub: "Quick recap before exam", color: "icon-purple" },
    { icon: "📝", title: "JEE Starter Quiz — 20 Questions", sub: "Test your understanding", color: "icon-green" },
    { icon: "🎧", title: "Doubt Session Recording — Electromagnetism", sub: "60 min • Common confusions cleared", color: "icon-blue" },
  ];
  return (
    <section className="section section-alt" id="resources">
      <RevealSection>
        <div className="section-label">Free Resources</div>
        <h2 className="section-title">Bilkul <span className="acc">free</span> — koi compromise nahi</h2>
        <p className="section-desc">Shuru karne ke liye koi payment nahi. Ye resources directly download karo aur apni journey start karo.</p>
      </RevealSection>
      <div className="two-col">
        <RevealSection>
          <div style={{background:'linear-gradient(145deg,#141a2e,#0f1429)',borderRadius:16,border:'1px solid rgba(255,255,255,0.06)',padding:'28px'}}>
            {resources.map((r, i) => (
              <div className="resource-row" key={i}>
                <div className={`res-icon ${r.color}`}>{r.icon}</div>
                <div className="res-info"><h4>{r.title}</h4><span>{r.sub}</span></div>
                <button className="res-btn">Free ↓</button>
              </div>
            ))}
          </div>
        </RevealSection>
        <RevealSection delay={150}>
          <div style={{background:'linear-gradient(145deg,#141a2e,#0f1429)',borderRadius:16,border:'1px solid rgba(124,58,237,0.15)',padding:'32px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',textAlign:'center'}}>
            <div style={{fontSize:'2.8rem',marginBottom:16}}>🎯</div>
            <h3 style={{fontFamily:'Syne, sans-serif',color:'#fff',fontSize:'1.15rem',marginBottom:10}}>Ready to go deeper?</h3>
            <p style={{color:'var(--text-dim)',fontSize:'0.82rem',lineHeight:1.7,marginBottom:20}}>Full course access unlock karo aur structured learning path pe ho jao. Online + offline dono options.</p>
            <button className="btn-primary" style={{fontSize:'0.82rem',padding:'11px 24px'}}>See Full Courses</button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function Toppers() {
  return (
    <section className="section" id="toppers">
      <RevealSection>
        <div className="section-label">Our Toppers</div>
        <h2 className="section-title">Results jo <span className="acc">baat bolte</span> hain</h2>
        <p className="section-desc">Ye sirf numbers nahi — ye hai mehnat aur sahi guidance ka result. Har topper ki story inspiration hai.</p>
      </RevealSection>
      <div className="topper-grid">
        {toppers.map((t, i) => (
          <RevealSection key={t.name} delay={i * 100}>
            <div className="topper-card">
              <div className="topper-rank">{t.rank}</div>
              <div className={`topper-avatar ${t.avClass}`}>{t.initials}</div>
              <h4>{t.name}</h4>
              <div className="tc-exam">{t.exam}</div>
              <div className="tc-score">{t.score}</div>
              <div className="tc-score-label">Final Result</div>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section section-alt">
      <RevealSection>
        <div className="section-label">Student Stories</div>
        <h2 className="section-title">Wo kya kehte <span className="acc">hain</span></h2>
        <p className="section-desc">Real students, real experiences. Unki journey hamari sabse badi motivation hai.</p>
      </RevealSection>
      <div className="testimonial-grid">
        {testimonials.map((t, i) => (
          <RevealSection key={i} delay={i * 100}>
            <div className="testi-card">
              <div className="testi-quote">❝</div>
              <div className="stars">★★★★★</div>
              <p>"{t.text}"</p>
              <div className="testi-author">
                <div className={`testi-avatar ${t.avClass}`}>{t.initials}</div>
                <div className="testi-author-info"><h5>{t.name}</h5><span>{t.class}</span></div>
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="section" id="why">
      <RevealSection>
        <div className="section-label">Why Choose Us</div>
        <h2 className="section-title">Kyun <span className="acc">Fit Physics</span> choose karo</h2>
        <p className="section-desc">Sirf ek coaching center nahi — ek complete learning ecosystem jo aapko success tak pahunchata hai.</p>
      </RevealSection>
      <div className="why-grid">
        {whyChoose.map((w, i) => (
          <RevealSection key={i} delay={i * 80}>
            <div className="why-card">
              <div className="why-number">{w.num}</div>
              <div className="why-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

function Faculty() {
  return (
    <section className="section section-alt" id="faculty">
      <RevealSection>
        <div className="section-label">Our Faculty</div>
        <h2 className="section-title">Teachers jo <span className="acc">inspire</span> karte hain</h2>
        <p className="section-desc">IIT aur top university alumni — experienced, passionate, aur genuinely passionate about teaching.</p>
      </RevealSection>
      <div className="faculty-grid">
        {faculty.map((f, i) => (
          <RevealSection key={f.name} delay={i * 120}>
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
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="cta-section">
      <RevealSection>
        <div className="section-label" style={{justifyContent:'center',display:'flex'}}>Get Started</div>
        <h2>Physics ab <span className="acc">dar nahi</span> — <br/>strength banegi.</h2>
        <p>Aaj shuru karo. Free resources se begin karo, ya directly full course join karo. Apni journey yahan start hai.</p>
        <div className="cta-btns">
          <button className="btn-primary" style={{fontSize:'0.95rem',padding:'15px 36px'}}>🚀 Start Learning Free</button>
          <button className="btn-secondary" style={{fontSize:'0.88rem'}}>📞 Talk to Counselor</button>
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

// ─── MAIN APP ───
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
    </>
  );
}