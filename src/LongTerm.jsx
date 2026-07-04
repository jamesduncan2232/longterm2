import { useState, useRef } from "react";



const C = {
  bg: "#05060A",
  card: "#0C0E14",
  cardHover: "#111520",
  blue: "#2B7FFF",
  blueGlow: "#1A5FCC",
  blueDim: "#0D3A80",
  blueLight: "#5B9FFF",
  white: "#F4F4F6",
  muted: "#6B7080",
  border: "#1A1E2E",
  green: "#22C55E",
  red: "#EF4444",
};

const PICKS = [
  { id:1, match:"Man City vs Arsenal", pick:"Both Teams to Score", odds:1.72, result:"W", league:"Premier League", date:"Jun 10" },
  { id:2, match:"Real Madrid vs Barcelona", pick:"Over 2.5 Goals", odds:1.85, result:"W", league:"La Liga", date:"Jun 8" },
  { id:3, match:"Bayern vs Dortmund", pick:"Bayern -1 AH", odds:2.10, result:"L", league:"Bundesliga", date:"Jun 6" },
  { id:4, match:"PSG vs Lyon", pick:"PSG Win & Over 1.5", odds:1.65, result:"W", league:"Ligue 1", date:"Jun 4" },
  { id:5, match:"Juventus vs Inter", pick:"Under 3.5 Goals", odds:1.55, result:"W", league:"Serie A", date:"Jun 2" },
  { id:6, match:"Chelsea vs Liverpool", pick:"Draw No Bet - Liverpool", odds:1.90, result:"W", league:"Premier League", date:"May 30" },
];

const WALLET = {
  btc: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  usdt: "TYASr8gDgMCQbBE3VHXQN9EHXb89zCBf1c",
};

const TICKER = [
  "✅ Man City vs Arsenal — BTTS — WIN @1.72",
  "✅ Real Madrid vs Barca — O2.5 — WIN @1.85",
  "❌ Bayern vs Dortmund — Bayern -1 — LOSS @2.10",
  "✅ PSG vs Lyon — WIN & O1.5 — WIN @1.65",
  "✅ Chelsea vs Liverpool — DNB Liverpool — WIN @1.90",
  "✅ Juventus vs Inter — U3.5 — WIN @1.55",
];

function Ticker() {
  const text = TICKER.join("   ·   ") + "   ·   " + TICKER.join("   ·   ");
  return (
    <div style={{ overflow:"hidden", whiteSpace:"nowrap", borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:"9px 0", background: C.card }}>
      <div style={{ display:"inline-block", animation:"ticker 45s linear infinite", color:C.blue, fontSize:12, fontWeight:600, letterSpacing:"0.04em" }}>
        {text}
      </div>
    </div>
  );
}

function StatBox({ label, value, sub }) {
  return (
    <div style={{ flex:1, minWidth:110, background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"20px 16px", textAlign:"center" }}>
      <div style={{ fontSize:30, fontWeight:800, color:C.blue, fontVariantNumeric:"tabular-nums", letterSpacing:"-0.02em" }}>{value}</div>
      <div style={{ fontSize:11, color:C.muted, marginTop:4, textTransform:"uppercase", letterSpacing:"0.1em" }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:C.green, marginTop:2 }}>{sub}</div>}
    </div>
  );
}

function PickRow({ p }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 20px", borderBottom:`1px solid ${C.border}`, flexWrap:"wrap", gap:10 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ width:26, height:26, borderRadius:6, background:p.result==="W"?"#0d2a1a":"#2a0d0d", color:p.result==="W"?C.green:C.red, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:11, flexShrink:0 }}>{p.result}</span>
        <div>
          <div style={{ color:C.white, fontSize:14, fontWeight:600 }}>{p.match}</div>
          <div style={{ color:C.muted, fontSize:12 }}>{p.pick}</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        <span style={{ background:C.border, color:C.muted, fontSize:11, padding:"3px 8px", borderRadius:4 }}>{p.league}</span>
        <span style={{ color:C.blue, fontWeight:700, fontSize:14 }}>@{p.odds}</span>
        <span style={{ color:C.muted, fontSize:12 }}>{p.date}</span>
      </div>
    </div>
  );
}

function CryptoModal({ onClose }) {
  const [coin, setCoin] = useState("usdt");
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(WALLET[coin]); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:20 }} onClick={onClose}>
      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:32, maxWidth:420, width:"100%", boxShadow:`0 0 60px rgba(43,127,255,0.1)` }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <h3 style={{ color:C.white, margin:0, fontSize:20 }}>Pay with Crypto</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:20 }}>✕</button>
        </div>
        <p style={{ color:C.muted, fontSize:14, marginBottom:20 }}>
          Send exactly <strong style={{ color:C.blue }}>$29 worth</strong> to the address below. After payment, send your TX ID to our Telegram — access granted within 1 hour.
        </p>
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {["btc","eth","usdt"].map(c=>(
            <button key={c} onClick={()=>setCoin(c)} style={{ flex:1, padding:"8px 0", borderRadius:8, border:`1px solid ${coin===c?C.blue:C.border}`, background:coin===c?`rgba(43,127,255,0.12)`:"transparent", color:coin===c?C.blue:C.muted, cursor:"pointer", fontWeight:700, fontSize:12, textTransform:"uppercase" }}>{c}</button>
          ))}
        </div>
        <div style={{ background:C.bg, borderRadius:10, padding:16, border:`1px solid ${C.border}`, marginBottom:16 }}>
          <div style={{ color:C.muted, fontSize:11, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.1em" }}>{coin.toUpperCase()} Address</div>
          <div style={{ color:C.white, fontSize:12, wordBreak:"break-all", fontFamily:"monospace" }}>{WALLET[coin]}</div>
        </div>
        <button onClick={copy} style={{ width:"100%", padding:"12px 0", borderRadius:10, background:copied?C.green:C.blue, color:"#fff", border:"none", cursor:"pointer", fontWeight:800, fontSize:14, transition:"background 0.2s" }}>
          {copied?"✓ Copied!":"Copy Address"}
        </button>
        <p style={{ color:C.muted, fontSize:12, textAlign:"center", marginTop:16, marginBottom:0 }}>After sending, contact us on Telegram with your TX ID</p>
      </div>
    </div>
  );
}

function Members({ onBack }) {
  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"system-ui, sans-serif" }}>
      <nav style={{ background:C.card, borderBottom:`1px solid ${C.border}`, padding:"14px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <img src={`/logo.png`} alt="Longterm." style={{ height:36 }} />
        <button onClick={onBack} style={{ background:"none", border:`1px solid ${C.border}`, color:C.muted, padding:"6px 14px", borderRadius:8, cursor:"pointer", fontSize:13 }}>← Back</button>
      </nav>
      <div style={{ maxWidth:720, margin:"0 auto", padding:"40px 20px" }}>
        <div style={{ marginBottom:6, color:C.blue, fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em" }}>Members Area</div>
        <h2 style={{ color:C.white, margin:"0 0 32px", fontSize:26 }}>This Week's Picks</h2>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden", marginBottom:28 }}>
          <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between" }}>
            <span style={{ color:C.white, fontWeight:700 }}>Active Picks</span>
            <span style={{ color:C.green, fontSize:13 }}>● Live</span>
          </div>
          {[
            { match:"Atletico Madrid vs Sevilla", pick:"Under 2.5 Goals", odds:1.75, league:"La Liga", kickoff:"Jun 15, 20:00" },
            { match:"Liverpool vs Wolves", pick:"Liverpool Win & BTTS", odds:2.20, league:"Premier League", kickoff:"Jun 16, 17:30" },
          ].map((p,i)=>(
            <div key={i} style={{ padding:"16px 20px", borderBottom:i===0?`1px solid ${C.border}`:"none" }}>
              <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                <div>
                  <div style={{ color:C.white, fontWeight:600, fontSize:15 }}>{p.match}</div>
                  <div style={{ color:C.blue, fontSize:13, marginTop:4 }}>{p.pick}</div>
                  <div style={{ color:C.muted, fontSize:12, marginTop:4 }}>{p.league} · {p.kickoff}</div>
                </div>
                <div style={{ color:C.blue, fontSize:22, fontWeight:800 }}>@{p.odds}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:"#0a1a0f", border:`1px solid #1a3a22`, borderRadius:10, padding:16, color:C.green, fontSize:13 }}>
          💬 Full analysis for each pick is in our Telegram group. Check the link in your welcome message.
        </div>
      </div>
    </div>
  );
}

export default function LongTerm() {
  const [page, setPage] = useState("home");
  const [showCrypto, setShowCrypto] = useState(false);
  const [pass, setPass] = useState("");
  const [passErr, setPassErr] = useState(false);

  const checkPass = () => {
    if (pass === "longterm2024") { setPage("members"); }
    else { setPassErr(true); setTimeout(()=>setPassErr(false),2000); }
  };

  if (page==="members") return <Members onBack={()=>setPage("home")} />;

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Inter', system-ui, sans-serif", color:C.white }}>
      <style>{`
        @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-track{background:#05060A;} ::-webkit-scrollbar-thumb{background:#1A1E2E;}
      `}</style>

      {/* Nav */}
      <nav style={{ background:"rgba(5,6,10,0.97)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"12px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:100 }}>
        <img src={`/logo.png`} alt="Longterm." style={{ height:38 }} />
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={()=>document.getElementById("pricing")?.scrollIntoView({behavior:"smooth"})} style={{ background:"none", border:`1px solid ${C.border}`, color:C.muted, padding:"7px 16px", borderRadius:8, cursor:"pointer", fontSize:13 }}>Pricing</button>
          <button onClick={()=>setPage("members")} style={{ background:C.blue, border:"none", color:"#fff", padding:"7px 16px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:700, boxShadow:`0 0 20px rgba(43,127,255,0.4)` }}>Members</button>
        </div>
      </nav>

      <Ticker />

      {/* Hero */}
      <div style={{ maxWidth:900, margin:"0 auto", padding:"80px 24px 60px", textAlign:"center", animation:"fadeUp 0.6s ease" }}>
        {/* Blue arc glow */}
        <div style={{ position:"relative", display:"inline-block", marginBottom:28 }}>
          <div style={{ width:200, height:3, background:`linear-gradient(90deg, transparent, ${C.blue}, transparent)`, margin:"0 auto", borderRadius:2, animation:"glow 3s ease-in-out infinite" }}></div>
        </div>
        <div style={{ display:"inline-block", background:`rgba(43,127,255,0.1)`, border:`1px solid rgba(43,127,255,0.3)`, color:C.blue, padding:"6px 16px", borderRadius:20, fontSize:12, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:24 }}>
          Sports Betting Intelligence
        </div>
        <h1 style={{ fontSize:"clamp(40px, 8vw, 74px)", fontWeight:900, lineHeight:1.05, letterSpacing:"-0.02em", marginBottom:20 }}>
          Picks built for<br />
          <span style={{ color:C.blue, textShadow:`0 0 40px rgba(43,127,255,0.5)` }}>the long game.</span>
        </h1>
        <p style={{ color:C.muted, fontSize:"clamp(15px, 2vw, 17px)", maxWidth:500, margin:"0 auto 40px", lineHeight:1.7 }}>
          No noise. No parlays. Disciplined, researched picks across Europe's top leagues — with a record that speaks for itself.
        </p>
        <button onClick={()=>document.getElementById("pricing")?.scrollIntoView({behavior:"smooth"})} style={{ background:C.blue, color:"#fff", border:"none", padding:"15px 40px", borderRadius:10, fontSize:16, fontWeight:800, cursor:"pointer", boxShadow:`0 0 30px rgba(43,127,255,0.5)`, letterSpacing:"0.02em" }}>
          Join Now — €29/month
        </button>
      </div>

      {/* Stats */}
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px 80px" }}>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
          <StatBox label="Total Picks" value="59" />
          <StatBox label="Win Rate" value="79.7%" sub="Last 90 days" />
          <StatBox label="Avg Odds" value="1.84" />
          <StatBox label="ROI" value="+31.2%" sub="All time" />
          <StatBox label="Record" value="47W-12L" />
        </div>
      </div>

      {/* Recent Results */}
      <div style={{ maxWidth:820, margin:"0 auto", padding:"0 24px 80px" }}>
        <div style={{ marginBottom:6, color:C.blue, fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em" }}>Transparency</div>
        <h2 style={{ fontSize:26, fontWeight:800, marginBottom:24 }}>Recent Results</h2>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
          {PICKS.map(p=><PickRow key={p.id} p={p}/>)}
        </div>
        <p style={{ color:C.muted, fontSize:13, textAlign:"center", marginTop:14 }}>Full history available to members</p>
      </div>

      {/* Pricing */}
      <div id="pricing" style={{ maxWidth:820, margin:"0 auto", padding:"0 24px 100px" }}>
        <div style={{ marginBottom:6, color:C.blue, fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em" }}>Simple Pricing</div>
        <h2 style={{ fontSize:26, fontWeight:800, marginBottom:8 }}>One plan. Full access.</h2>
        <p style={{ color:C.muted, marginBottom:40 }}>Cancel anytime. No hidden fees.</p>

        <div style={{ background:C.card, border:`1px solid ${C.blue}`, borderRadius:16, padding:40, maxWidth:460, margin:"0 auto", textAlign:"center", boxShadow:`0 0 50px rgba(43,127,255,0.1)` }}>
          <div style={{ fontSize:12, color:C.blue, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:12 }}>Monthly Membership</div>
          <div style={{ fontSize:54, fontWeight:900, lineHeight:1 }}>€29</div>
          <div style={{ color:C.muted, fontSize:14, marginBottom:32 }}>/month</div>

          <div style={{ textAlign:"left", marginBottom:36 }}>
            {["All picks — every league, every week","Pre-match analysis & reasoning","Private Telegram group access","Full results history & stats","Direct access to the analyst"].map(f=>(
              <div key={f} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, color:C.white, fontSize:14 }}>
                <span style={{ color:C.green }}>✓</span> {f}
              </div>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <button style={{ background:C.blue, color:"#fff", border:"none", padding:"13px 0", borderRadius:10, fontSize:14, fontWeight:800, cursor:"pointer", boxShadow:`0 0 20px rgba(43,127,255,0.4)` }}>
              💳 Pay with Card (Stripe)
            </button>
            <button onClick={()=>setShowCrypto(true)} style={{ background:"transparent", color:C.blue, border:`1px solid ${C.blue}`, padding:"13px 0", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer" }}>
              ₿ Pay with Crypto
            </button>
          </div>
        </div>
      </div>

      {/* Member Login */}
      <div style={{ maxWidth:460, margin:"0 auto", padding:"0 24px 100px", textAlign:"center" }}>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:32 }}>
          <div style={{ fontSize:22, marginBottom:8 }}>🔒</div>
          <h3 style={{ fontSize:17, fontWeight:700, marginBottom:8 }}>Already a member?</h3>
          <p style={{ color:C.muted, fontSize:14, marginBottom:20 }}>Enter your access code to view this week's picks</p>
          <input type="password" placeholder="Access code" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&checkPass()}
            style={{ width:"100%", padding:"11px 14px", borderRadius:8, background:C.bg, border:`1px solid ${passErr?C.red:C.border}`, color:C.white, fontSize:14, marginBottom:12, outline:"none" }} />
          <button onClick={checkPass} style={{ width:"100%", padding:"11px 0", borderRadius:8, background:C.blue, color:"#fff", border:"none", fontWeight:700, fontSize:14, cursor:"pointer" }}>Access Picks</button>
          {passErr && <p style={{ color:C.red, fontSize:13, marginTop:10 }}>Invalid code. Check your email or Telegram.</p>}
          <p style={{ color:C.muted, fontSize:12, marginTop:12 }}>Demo code: longterm2024</p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop:`1px solid ${C.border}`, padding:"28px 24px", textAlign:"center" }}>
        <img src={`/logo.png`} alt="Longterm." style={{ height:32, marginBottom:10 }} />
        <p style={{ color:C.muted, fontSize:13 }}>Responsible gambling. 18+ only. Picks are for informational purposes.</p>
      </div>

      {showCrypto && <CryptoModal onClose={()=>setShowCrypto(false)} />}
    </div>
  );
}
