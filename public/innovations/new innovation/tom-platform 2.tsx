import { useState, useEffect, useRef } from "react";

// ─── Color palette & design tokens ───────────────────────────────────────────
// Deep desert night sky + solar gold + data-green — industrial/precision aesthetic

const LOCATIONS = {
  egypt: {
    label: "صحراء مصر",
    labelEn: "Egypt Desert",
    G: 6.4,          // kWh/m²/day average irradiance
    T_avg: 38,        // °C avg operating temp
    dust_loss: 0.07,  // 7% per month without cleaning
    albedo: 0.22,
    flag: "🇪🇬",
  },
  saudi: {
    label: "صحراء السعودية",
    labelEn: "Saudi Desert",
    G: 7.1,
    T_avg: 42,
    dust_loss: 0.09,
    albedo: 0.25,
    flag: "🇸🇦",
  },
};

const COATINGS = {
  none: { label: "بدون طلاء", gain_ar: 0, gain_sc: 0, gain_bifacial: 0 },
  ar_only: { label: "طلاء مضاد للانعكاس", gain_ar: 0.025, gain_sc: 0, gain_bifacial: 0 },
  sc_only: { label: "طلاء ذاتي التنظيف", gain_ar: 0, gain_sc: 0.03, gain_bifacial: 0 },
  fendy_full: {
    label: "Fendy Smart Coating™ (كامل)",
    gain_ar: 0.028,
    gain_sc: 0.035,
    gain_bifacial: 0.06,
  },
};

const PANEL_ETA = 0.21; // 21% mono-PERC efficiency
const TEMP_COEFF = -0.0035; // -0.35% per °C above 25°C
const T_STC = 25;

// ─── Core simulation engine ───────────────────────────────────────────────────
function simulate({ locationKey, coatingKey, areaM2, cleaningMonths }) {
  const loc = LOCATIONS[locationKey];
  const coat = COATINGS[coatingKey];

  // Thermal loss
  const delta_T = Math.max(0, loc.T_avg - T_STC);
  const L_temp = delta_T * Math.abs(TEMP_COEFF);

  // Dust loss (progressive, reduced by self-cleaning coating)
  const effective_dust = cleaningMonths === 0
    ? loc.dust_loss * (coat.gain_sc > 0 ? 0.4 : 1)
    : loc.dust_loss * (cleaningMonths / 30) * (coat.gain_sc > 0 ? 0.4 : 1);

  // Coating delta
  const delta_coating = coat.gain_ar + coat.gain_sc + coat.gain_bifacial * loc.albedo;

  // Output equation: E = G · A · η · (1 - L_dust) · (1 - L_temp) + Δcoating·G·A·η
  const eta_effective = PANEL_ETA * (1 - L_temp);
  const E_base = loc.G * areaM2 * eta_effective * (1 - effective_dust);
  const E_improved = E_base + delta_coating * loc.G * areaM2 * PANEL_ETA;
  const E_no_coat = loc.G * areaM2 * eta_effective * (1 - loc.dust_loss);

  const annualBase = E_base * 365;
  const annualImproved = E_improved * 365;
  const annualNoCoat = E_no_coat * 365;

  const gain_pct = ((E_improved - E_no_coat) / E_no_coat) * 100;
  const dust_impact_pct = effective_dust * 100;
  const temp_impact_pct = L_temp * 100;

  // Revenue (0.08 USD/kWh utility scale)
  const revenue_improved = annualImproved * 0.08;

  return {
    daily_kWh: +E_improved.toFixed(1),
    daily_base_kWh: +E_no_coat.toFixed(1),
    annual_MWh: +(annualImproved / 1000).toFixed(1),
    annual_base_MWh: +(annualNoCoat / 1000).toFixed(1),
    gain_pct: +gain_pct.toFixed(1),
    dust_impact_pct: +dust_impact_pct.toFixed(1),
    temp_impact_pct: +temp_impact_pct.toFixed(1),
    delta_coating_pct: +(delta_coating * 100).toFixed(2),
    revenue_usd: +revenue_improved.toFixed(0),
    L_temp,
    effective_dust,
    eta_effective: +(eta_effective * 100).toFixed(1),
  };
}

// ─── Animated number ─────────────────────────────────────────────────────────
function AnimatedNumber({ value, decimals = 0, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const duration = 900;
    const step = (timestamp) => {
      if (!ref.current) return;
      if (!ref.current._start) ref.current._start = timestamp;
      const progress = Math.min((timestamp - ref.current._start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(+(start + (value - start) * ease).toFixed(decimals));
      if (progress < 1) requestAnimationFrame(step);
      else { ref.current._start = null; }
    };
    ref.current = {};
    requestAnimationFrame(step);
  }, [value]);
  return <span>{display.toLocaleString("en")}{suffix}</span>;
}

// ─── Bar gauge ────────────────────────────────────────────────────────────────
function Gauge({ pct, color, label }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8899aa", marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ color }}>{pct.toFixed(1)}%</span>
      </div>
      <div style={{ background: "#0d1e2e", borderRadius: 3, height: 6, overflow: "hidden" }}>
        <div style={{
          width: `${Math.min(pct, 100)}%`, height: "100%",
          background: color, borderRadius: 3,
          transition: "width 1s cubic-bezier(0.16,1,0.3,1)"
        }} />
      </div>
    </div>
  );
}

// ─── TOM AI verdict ───────────────────────────────────────────────────────────
function TomVerdict({ result, coatingKey, locationKey }) {
  const loc = LOCATIONS[locationKey];
  const coat = COATINGS[coatingKey];
  const lines = [];

  if (result.gain_pct >= 8) {
    lines.push({ icon: "✅", text: `الطلاء المختار يحقق تحسناً ممتازاً بنسبة ${result.gain_pct}% في ${loc.label}` });
  } else if (result.gain_pct >= 3) {
    lines.push({ icon: "🟡", text: `تحسن معتدل ${result.gain_pct}% — يُنصح بالنسخة الكاملة Fendy Smart Coating™` });
  } else {
    lines.push({ icon: "⚠️", text: "بدون طلاء — أنت تترك نقوداً على الأرض" });
  }

  if (result.dust_impact_pct > 6) {
    lines.push({ icon: "🌪️", text: `خسارة الغبار ${result.dust_impact_pct.toFixed(1)}% حرجة — الطلاء ذاتي التنظيف ضروري في هذا الموقع` });
  }

  if (result.temp_impact_pct > 5) {
    lines.push({ icon: "🌡️", text: `الحرارة تسرق ${result.temp_impact_pct.toFixed(1)}% من الكفاءة — أُوصي بمراقعة تبريد الظهر` });
  }

  if (result.annual_MWh > 500) {
    lines.push({ icon: "💰", text: `عائد سنوي متوقع ${(result.revenue_usd).toLocaleString()} دولار — قابل للتمويل من صندوق PIF` });
  }

  return (
    <div style={{
      background: "linear-gradient(135deg,#071624,#0d2236)",
      border: "1px solid #1a4060",
      borderRadius: 12,
      padding: "16px 20px",
      marginTop: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg,#f0a500,#e06b00)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 900, color: "#000"
        }}>T</div>
        <span style={{ color: "#f0a500", fontFamily: "monospace", fontSize: 13, fontWeight: 700 }}>
          TOM — تحليل الذكاء الهندسي
        </span>
      </div>
      {lines.map((l, i) => (
        <div key={i} style={{
          display: "flex", gap: 10, marginBottom: 8,
          color: "#cde4f7", fontSize: 13, lineHeight: 1.6, direction: "rtl"
        }}>
          <span>{l.icon}</span>
          <span>{l.text}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function TOMPlatform() {
  const [location, setLocation] = useState("egypt");
  const [coating, setCoating] = useState("none");
  const [area, setArea] = useState(1000);
  const [cleaning, setCleaning] = useState(30);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);

  const run = () => {
    setRunning(true);
    setTimeout(() => {
      setResult(simulate({ locationKey: location, coatingKey: coating, areaM2: area, cleaningMonths: cleaning }));
      setRunning(false);
    }, 700);
  };

  useEffect(() => { run(); }, []);

  const loc = LOCATIONS[location];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#030d18",
      fontFamily: "'Cairo', 'Tajawal', 'Segoe UI', sans-serif",
      color: "#cde4f7",
      direction: "rtl",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg,#071c2e,#030d18)",
        borderBottom: "1px solid #0f3050",
        padding: "20px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: "linear-gradient(135deg,#f0a500,#e06b00)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 900, color: "#000", boxShadow: "0 0 20px #f0a50055"
          }}>T</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#f0f8ff", letterSpacing: -0.5 }}>
              منصة TOM
            </div>
            <div style={{ fontSize: 11, color: "#5a8aab", fontFamily: "monospace" }}>
              Desert Energy Digital Twin Platform™
            </div>
          </div>
        </div>
        <div style={{
          fontSize: 11, color: "#2a6a9a", fontFamily: "monospace",
          border: "1px solid #0f3050", borderRadius: 6, padding: "4px 10px"
        }}>
          MVP v1.0 — Honest Fendy™
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        {/* Input Panel */}
        <div style={{
          background: "#071624",
          border: "1px solid #0f3050",
          borderRadius: 14,
          padding: "20px 24px",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 13, color: "#5a8aab", fontFamily: "monospace", marginBottom: 16, fontWeight: 700 }}>
            — INPUT PANEL / لوحة الإدخال
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Location */}
            <div>
              <label style={{ fontSize: 12, color: "#8899aa", display: "block", marginBottom: 8 }}>
                📍 الموقع
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                {Object.entries(LOCATIONS).map(([key, val]) => (
                  <button key={key} onClick={() => setLocation(key)} style={{
                    flex: 1, padding: "10px 8px",
                    background: location === key ? "linear-gradient(135deg,#0d3a5c,#0a2d4a)" : "#030d18",
                    border: location === key ? "1px solid #1a7abf" : "1px solid #0f3050",
                    borderRadius: 8, color: location === key ? "#7dd3fc" : "#4a7a9b",
                    fontSize: 12, cursor: "pointer", transition: "all 0.2s",
                    fontFamily: "inherit",
                  }}>
                    {val.flag} {val.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Coating */}
            <div>
              <label style={{ fontSize: 12, color: "#8899aa", display: "block", marginBottom: 8 }}>
                🧪 نوع الطلاء
              </label>
              <select value={coating} onChange={e => setCoating(e.target.value)} style={{
                width: "100%", padding: "10px 12px",
                background: "#030d18", border: "1px solid #0f3050",
                borderRadius: 8, color: "#cde4f7", fontSize: 12,
                cursor: "pointer", fontFamily: "inherit",
              }}>
                {Object.entries(COATINGS).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>

            {/* Area */}
            <div>
              <label style={{ fontSize: 12, color: "#8899aa", display: "block", marginBottom: 8 }}>
                📐 المساحة: <span style={{ color: "#f0a500" }}>{area.toLocaleString()} م²</span>
              </label>
              <input type="range" min={100} max={100000} step={100} value={area}
                onChange={e => setArea(+e.target.value)} style={{ width: "100%", accentColor: "#f0a500" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#3a6a8a", marginTop: 4 }}>
                <span>100 م²</span><span>1MW ~5,000 م²</span><span>100,000 م²</span>
              </div>
            </div>

            {/* Cleaning interval */}
            <div>
              <label style={{ fontSize: 12, color: "#8899aa", display: "block", marginBottom: 8 }}>
                🧹 دورة التنظيف: <span style={{ color: "#f0a500" }}>
                  {cleaning === 0 ? "بدون تنظيف" : `كل ${cleaning} يوم`}
                </span>
              </label>
              <input type="range" min={0} max={90} step={15} value={cleaning}
                onChange={e => setCleaning(+e.target.value)} style={{ width: "100%", accentColor: "#38bdf8" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#3a6a8a", marginTop: 4 }}>
                <span>يومياً</span><span>شهرياً</span><span>بدون</span>
              </div>
            </div>
          </div>

          <button onClick={run} disabled={running} style={{
            marginTop: 20, width: "100%", padding: "13px",
            background: running
              ? "#0a2d4a"
              : "linear-gradient(135deg,#f0a500,#e06b00)",
            border: "none", borderRadius: 9,
            color: running ? "#5a8aab" : "#000",
            fontWeight: 800, fontSize: 14, cursor: running ? "not-allowed" : "pointer",
            fontFamily: "inherit", letterSpacing: 0.5,
            transition: "all 0.3s",
            boxShadow: running ? "none" : "0 4px 24px #f0a50044",
          }}>
            {running ? "⚙️  جاري تشغيل المحاكاة..." : "▶  تشغيل المحاكاة"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
              {[
                {
                  label: "إنتاج يومي", icon: "⚡",
                  value: result.daily_kWh, suffix: " kWh",
                  sub: `بدون طلاء: ${result.daily_base_kWh} kWh`,
                  color: "#f0a500"
                },
                {
                  label: "إنتاج سنوي", icon: "📊",
                  value: result.annual_MWh, suffix: " MWh",
                  sub: `بدون طلاء: ${result.annual_base_MWh} MWh`,
                  color: "#38bdf8"
                },
                {
                  label: "تحسن الطلاء", icon: "📈",
                  value: result.gain_pct, suffix: "%",
                  sub: `عائد سنوي: $${result.revenue_usd.toLocaleString()}`,
                  color: result.gain_pct >= 5 ? "#4ade80" : result.gain_pct >= 2 ? "#f0a500" : "#ef4444"
                },
              ].map((card, i) => (
                <div key={i} style={{
                  background: "linear-gradient(135deg,#071624,#040f1c)",
                  border: "1px solid #0f3050",
                  borderRadius: 12, padding: "16px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{card.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: card.color }}>
                    <AnimatedNumber value={card.value} decimals={card.suffix === "%" ? 1 : 0} suffix={card.suffix} />
                  </div>
                  <div style={{ fontSize: 11, color: "#5a8aab", marginTop: 4 }}>{card.label}</div>
                  <div style={{ fontSize: 10, color: "#2a4a6a", marginTop: 6 }}>{card.sub}</div>
                </div>
              ))}
            </div>

            {/* Loss breakdown */}
            <div style={{
              background: "#071624", border: "1px solid #0f3050",
              borderRadius: 14, padding: "20px 24px", marginBottom: 20
            }}>
              <div style={{ fontSize: 13, color: "#5a8aab", fontFamily: "monospace", marginBottom: 16, fontWeight: 700 }}>
                — تحليل الخسائر وتأثير الطلاء
              </div>
              <Gauge pct={result.dust_impact_pct} color="#ef4444" label="خسارة الغبار 🌪️" />
              <Gauge pct={result.temp_impact_pct} color="#f97316" label="خسارة الحرارة 🌡️" />
              <Gauge pct={result.delta_coating_pct} color="#4ade80" label="كسب الطلاء الذكي ✨" />
              <Gauge pct={result.eta_effective} color="#38bdf8" label="كفاءة اللوح الفعلية ⚡" />
            </div>

            {/* Location info bar */}
            <div style={{
              background: "#071624", border: "1px solid #0f3050",
              borderRadius: 12, padding: "12px 20px",
              display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 20
            }}>
              {[
                { label: "إشعاع شمسي", value: `${loc.G} kWh/m²/day` },
                { label: "درجة حرارة تشغيل", value: `${loc.T_avg}°C` },
                { label: "خسارة غبار شهرية", value: `${(loc.dust_loss * 100).toFixed(0)}%` },
                { label: "معامل الانعكاس", value: loc.albedo },
              ].map((d, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#7dd3fc" }}>{d.value}</div>
                  <div style={{ fontSize: 10, color: "#3a6a8a", marginTop: 2 }}>{d.label}</div>
                </div>
              ))}
            </div>

            {/* TOM AI Verdict */}
            <TomVerdict result={result} coatingKey={coating} locationKey={location} />

            {/* Equation display */}
            <div style={{
              background: "#020a14", border: "1px solid #0a2030",
              borderRadius: 10, padding: "14px 20px", marginTop: 20,
              fontFamily: "monospace", fontSize: 11, color: "#2a6a8a",
              direction: "ltr"
            }}>
              <span style={{ color: "#1a4a6a" }}>// Core Engine: </span>
              <span style={{ color: "#38bdf8" }}>E_out</span>
              <span style={{ color: "#5a8aab" }}> = G · A · η · (1 − L_dust) · (1 − L_temp) + Δcoating · G · A · η</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }
        * { box-sizing: border-box; }
        input[type=range] { height: 4px; }
        select option { background: #030d18; }
        ::-webkit-scrollbar { width: 4px; background: #030d18; }
        ::-webkit-scrollbar-thumb { background: #0f3050; border-radius: 2px; }
      `}</style>
    </div>
  );
}
