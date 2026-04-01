import { useState, useRef, useEffect } from "react";

const channel = {
  name: "MEDIA SPORT INFO TV",
  tag: "SPORTS",
  src: "https://player.twitch.tv/?channel=msitvyoupwe&parent=localhost",
};

const relatedChannels = [
  { name: "La Matinale des Sports", tag: "Sport", color: "#fcdf03", dot: "#fcdf03" },
  { name: "Le Club",    tag: "Divertisement", color: "#cfcfcf", dot: "#cfcfcf" },
  { name: "Pelouse",    tag: "Debat", color: "#2563eb", dot: "#3b82f6" },
  { name: "TSF",          tag: "SPORT", color: "#16a34a", dot: "#22c55e" },
];

const schedule = [
  { time: "07:00", show: "La Matinale des Sports",  live: false },
  { time: "10:15", show: "A L'Internationale",  live: false },
  { time: "10:30", show: "Le Club",      live: false },
  { time: "15:00", show: "Pelouse",           live: true  },
  { time: "17:30", show: "Fighter",           live: false },
  { time: "19:00", show: "JTF",               live: false },
];

export default function LiveTV() {
  const [show, setShow]     = useState(true);
  const [fs, setFs]         = useState(false);
  const [clock, setClock]   = useState(new Date());
  const [viewers]           = useState((Math.floor(Math.random() * 40) + 18) + "K");
  const wrapRef = useRef(null);
  const timer   = useRef(null);

  /* live clock */
  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const onMove = () => {
    setShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2500);
  };

  const toggleFs = () => {
    if (!document.fullscreenElement) {
      wrapRef.current.requestFullscreen();
      setFs(true);
    } else {
      document.exitFullscreen();
      setFs(false);
    }
  };

  const fmt = (d) =>
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const fmtDate = (d) =>
    d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-4">

        {/* ── Main Player Card ── */}
        <div className="rounded-2xl overflow-hidden bg-[#111118] border border-[#1c1c2e] shadow-[0_40px_100px_rgba(0,0,0,0.7)]">

          {/* Video */}
          <div
            className="relative aspect-video bg-black"
          >
            <iframe
              src={channel.src}
              allowFullScreen
              className="w-full h-full border-0 block"
            />

            {/* Live badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 px-2.5 py-1 rounded-md pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-[11px] font-semibold tracking-widest">LIVE</span>
            </div>

            {/* Viewer count */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md pointer-events-none border border-white/10">
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-white/70"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              <span className="text-white/70 text-[11px] font-semibold tracking-wider">{viewers} watching</span>
            </div>
          </div>

          {/* ── Info bar ── */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-[#1c1c2e]">
            <div>
              <div className="text-white font-bold text-xl tracking-wide">{channel.name}</div>
              <div className="text-red-500 text-[11px] font-medium tracking-widest mt-0.5 uppercase">{channel.tag} · Live Broadcast</div>
            </div>
            <div className="flex items-center gap-4">
              {/* Clock */}
              <div className="text-right hidden sm:block">
                <div className="text-white font-mono text-lg font-bold tracking-widest">{fmt(clock)}</div>
                <div className="text-white/30 text-[10px] tracking-wider">{fmtDate(clock)}</div>
              </div>
              <div className="flex items-center gap-2 text-white/30 text-[11px] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                On Air
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom two-column row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* ── Schedule ── */}
          <div className="md:col-span-2 rounded-2xl bg-[#111118] border border-[#1c1c2e] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                <span className="text-white/70 text-xs font-bold uppercase tracking-widest">Today's Schedule</span>
              </div>
              <span className="text-white/20 text-[10px] tracking-wider uppercase">UTC+1</span>
            </div>

            <div className="space-y-1">
              {schedule.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${item.live ? "bg-red-500/10 border border-red-500/20" : "hover:bg-white/[0.03]"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-sm font-semibold w-12 ${item.live ? "text-red-400" : "text-white/40"}`}>{item.time}</span>
                    <span className={`text-sm font-medium ${item.live ? "text-white" : "text-white/50"}`}>{item.show}</span>
                  </div>
                  {item.live && (
                    <span className="flex items-center gap-1.5 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Now
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Other Channels ── */}
          <div className="rounded-2xl bg-[#111118] border border-[#1c1c2e] p-5">
            <div className="flex items-center gap-2 mb-4">
              <svg width="14" height="14" fill="none" stroke="#a78bfa" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M17 7V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2"/></svg>
              <span className="text-white/70 text-xs font-bold uppercase tracking-widest">More Channels</span>
            </div>

            <div className="space-y-2">
              {relatedChannels.map((ch, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#0d0d16] border border-[#1c1c2e] hover:border-[#2a2a40] cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ch.dot }} />
                    <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">{ch.name}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md" style={{ color: ch.color, background: `${ch.color}18`, border: `1px solid ${ch.color}30` }}>
                    {ch.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Signal quality */}
            <div className="mt-5 pt-4 border-t border-[#1c1c2e]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/30 text-[10px] uppercase tracking-wider">Signal Quality</span>
                <span className="text-green-400 text-[10px] font-bold uppercase tracking-wider">Excellent</span>
              </div>
              <div className="flex items-end gap-0.5 h-5">
                {[40, 55, 65, 80, 100, 100, 90].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-green-500" style={{ height: `${h}%`, opacity: 0.6 + i * 0.06 }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Breaking News Ticker ── */}
        <div className="rounded-xl bg-[#111118] border border-[#1c1c2e] flex items-center overflow-hidden">
          <div className="bg-red-600 px-3 py-2 flex-shrink-0">
            <span className="text-white text-[11px] font-black uppercase tracking-widest">Breaking</span>
          </div>
          <div className="overflow-hidden flex-1 px-4">
            <div className="whitespace-nowrap text-white/60 text-xs tracking-wide animate-[marquee_28s_linear_infinite]">
              MEDIA SPORT INFO TV · Sports News Coverage · Latest Scores · Global Updates · Stay Informed · Breaking Sports News · Live Coverage from Around the World · MEDIA SPORT INFO TV Live ·
            </div>
          </div>
          <div className="flex-shrink-0 px-4 border-l border-[#1c1c2e]">
            <span className="text-white/20 text-[10px] font-mono tracking-widest">{fmt(clock)}</span>
          </div>
        </div>

      </div>

      {/* marquee keyframe */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(100%); }
          to   { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}