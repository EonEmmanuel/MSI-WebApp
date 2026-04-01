import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Play,
  ChevronRight,
  Radio,
  Bell,
  Info,
  Calendar,
  Clock,
  ExternalLink,
  History,
  X,
} from "lucide-react";

const REPLAY_DATA = [
  {
    id: 1,
    title: "Match Highlights: Man City 2-1 Arsenal",
    showName: "La Matinale des Sports",
    category: "Sports",
    thumbnail:
      "https://res.cloudinary.com/drzoiigek/image/upload/v1774432658/mgm7z6stvgqkkuodnisp.png",
    videoUrl: "https://www.youtube.com/embed/oNmLssf5kfM",
    date: "2026-03-25",
    duration: "10:15",
    views: "1.2M views",
  },
  {
    id: 2,
    title: "Weekend Preview: Big 5 Leagues",
    showName: "La Matinale des Sports",
    category: "Sports",
    thumbnail: "https://res.cloudinary.com/drzoiigek/image/upload/v1774432658/mgm7z6stvgqkkuodnisp.png",
    videoUrl: "https://www.youtube.com/embed/qYv2r_vS4Xo",
    date: "2026-03-24",
    duration: "45:20",
    views: "45K views",
  },
  {
    id: 3,
    title: "Transfer Window Update: Latest News",
    showName: "Daily Sports News",
    category: "News",
    thumbnail:
      "https://m.media-amazon.com/images/S/pv-target-images/6a2fa5bab48da90f4c2d0a4baaf5f9613326fc4e11f947ba06e11eda3e49f93e._SX1080_FMjpg_.jpg",
    videoUrl: "https://www.youtube.com/embed/eZXVFKDux3s",
    date: "2026-03-24",
    duration: "15:00",
    views: "120K views",
  },
  {
    id: 4,
    title: "NBA Recap: Lakers Victory",
    showName: "Basketball Tonight",
    category: "Sports",
    thumbnail:
      "https://cdn.nba.com/manage/2025/12/brown-lakers-meta-120525-scaled.jpg",
    videoUrl: "https://www.youtube.com/embed/mfGL4HepT_E",
    date: "2026-03-23",
    duration: "09:45",
    views: "800K views",
  },
  {
    id: 5,
    title: "The Road to AFCON: Team Analysis",
    showName: "Inside Football",
    category: "Talk Shows",
    thumbnail: "https://cdn.mos.cms.futurecdn.net/rodd8v8bjoGSJBcWybbNxH.jpg",
    videoUrl: "https://www.youtube.com/embed/V_YxSJXR9D4",
    date: "2026-03-22",
    duration: "12:30",
    views: "2.5M views",
  },
  {
    id: 6,
    title: "Grassroots: The Future of African Sports",
    showName: "Documentary Special",
    category: "Documentary",
    thumbnail: "https://www.newstalkzb.co.nz/media/bh0nnefq/gettyimages-2267630617.jpg?rmode=crop&v=1dcba0ff792a190&height=382&width=680&quality=95&scale=both",
    videoUrl: "https://www.youtube.com/embed/UjZ5x_pU8-M",
    date: "2026-03-21",
    duration: "25:00",
    views: "30K views",
  },
];

// ─────────────────────────── DATA ───────────────────────────
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PROGRAM_DATA = [
  {
    id: 1,
    title: "La Matinale des Sports",
    startTime: "07:00",
    category: "Sports",
    day: "Monday",
    duration: "90 min",
    description: "Start your day with the latest sports highlights and expert analysis from around the world.",
    image: "https://res.cloudinary.com/drzoiigek/image/upload/v1774432658/mgm7z6stvgqkkuodnisp.png",
    live: false,
    themeColor: "#FFB703", // yellow
  },
  {
    id: 2,
    title: "A L'International",
    time: "10:15 - 10:30",
    startTime: "10:15",
    category: "News",
    day: "Monday",
    duration: "15 min",
    description: "The most important sports news stories of the day, updated every hour.",
    image: "https://res.cloudinary.com/drzoiigek/image/upload/v1774432660/xczz6p0w7sblmszsaycs.png",
    live: false,
    themeColor: "#4D81A1", // Sky Blue
  },
  {
    id: 3,
    title: "Le Club",
    time: "10:30 - 11:55",
    startTime: "10:30",
    category: "Sports",
    day: "Monday",
    duration: "90 min",
    description: "Deep dive into tactical analysis and upcoming match previews for the major leagues.",
    image: "https://res.cloudinary.com/drzoiigek/image/upload/v1774434166/lvsm7qx3el225pejbwaq.png",
    live: false,
    themeColor: "#2F2A8D",
  },
  {
    id: 4,
    title: "Pelouse",
    time: "15:00 - 16:30",
    startTime: "15:00",
    category: "Debat",
    day: "Monday",
    duration: "90 min",
    description: "Comprehensive coverage of NBA and international basketball leagues.",
    image: "https://res.cloudinary.com/drzoiigek/image/upload/v1774432659/e13emr5jqhaauvzvlmor.png",
    live: false,
    themeColor: "#3D8ECA",
  },
  {
    id: 5,
    title: "Tout Sauf Le Foot",
    time: "18:07 - 18:55",
    startTime: "18:07",
    category: "Debat",
    day: "Monday",
    duration: "90 min",
    description: "Comprehensive coverage of NBA and international basketball leagues.",
    image: "https://res.cloudinary.com/drzoiigek/image/upload/v1774434177/tzayfbcsnjok0evkt3jc.png",
    live: false,
    themeColor: "#FF7A00",
  },
  {
    id: 9,
    title: "JOURNAL DES SPORTS",
    time: "19:00",
    startTime: "19:00",
    category: "Debat",
    day: "Monday",
    duration: "90 min",
    description: "Comprehensive coverage of NBA and international basketball leagues.",
    image: "https://res.cloudinary.com/drzoiigek/image/upload/v1774432691/jd9diupklxo42ocaf4im.png",
    live: false,
    themeColor: "#1C2438",
  },
  {
    id: 10,
    title: "MTN ELITE TEAM",
    time: "21:00 - 21:30",
    startTime: "21:00",
    category: "Debat",
    day: "Monday",
    duration: "90 min",
    description: "Comprehensive coverage of NBA and international basketball leagues.",
    image: "https://res.cloudinary.com/drzoiigek/image/upload/v1774434177/tzayfbcsnjok0evkt3jc.png",
    live: false,
    themeColor: "#FF7A00",
  },
  {
    id: 5,
    title: "World Cup Classics",
    time: "15:00 - 17:00",
    startTime: "15:00",
    category: "Documentary",
    day: "Tuesday",
    duration: "120 min",
    description: "Relive the greatest moments in FIFA World Cup history with legendary matches.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
    live: false,
    themeColor: "#A855F7", // Purple
  },
  {
    id: 6,
    title: "Tennis Open Review",
    time: "11:00 - 12:30",
    startTime: "11:00",
    category: "Tennis",
    day: "Wednesday",
    duration: "90 min",
    description: "Daily summaries and best plays from the ongoing Grand Slam tournaments.",
    image: "https://images.unsplash.com/photo-1595435066311-66c3a8123869?auto=format&fit=crop&q=80&w=800",
    live: false,
    themeColor: "#EAB308", // Yellow
  },
  {
    id: 7,
    title: "Champions League Live",
    time: "20:00 - 22:45",
    startTime: "20:00",
    category: "Football",
    day: "Tuesday",
    duration: "165 min",
    description: "Live coverage of the UEFA Champions League group stage matches.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
    live: true,
    themeColor: "#EF4444", // Bright Red
  },
];

// Add more mock data for all days
const generateMoreData = () => {
  const extraData = [];
  const themeColors = ["#E8192C", "#0EA5E9", "#22C55E", "#F97316", "#A855F7", "#EAB308", "#EF4444", "#F43F5E", "#8B5CF6", "#F59E0B"];
  
  DAYS.forEach(day => {
    if (day !== "Monday" && day !== "Tuesday" && day !== "Wednesday") {
      extraData.push({
        id: Math.random(),
        title: `${day} Morning Show`,
        time: "08:00 - 09:30",
        startTime: "08:00",
        category: "Talk Show",
        day: day,
        duration: "90 min",
        description: `Join us every ${day} for a light-hearted look at the world of sports and culture.`,
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800",
        live: false,
        themeColor: themeColors[Math.floor(Math.random() * themeColors.length)],
      });
      extraData.push({
        id: Math.random(),
        title: `${day} Night Match`,
        time: "21:00 - 23:00",
        startTime: "21:00",
        category: "Football",
        day: day,
        duration: "120 min",
        description: `The main event of ${day} night. Live coverage of top-tier competitions.`,
        image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800",
        live: false,
        themeColor: themeColors[Math.floor(Math.random() * themeColors.length)],
      });
    }
  });
  return extraData;
};

const ALL_PROGRAMS = [...PROGRAM_DATA, ...generateMoreData()];

const APPOINTMENTS = [
  {
    id: 1,
    event: "UEFA Champions League Quarter-Finals",
    date: "April 14, 2026",
    endDate: "April 22, 2026",
    category: "Football",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/oNmLssf5kfM",
  },
  {
    id: 2,
    event: "NBA Playoffs: Eastern Conference",
    date: "April 18, 2026",
    endDate: "May 10, 2026",
    category: "Basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/mfGL4HepT_E",
  },
  {
    id: 3,
    event: "Formula 1: Miami Grand Prix",
    date: "April 24, 2026",
    endDate: "April 26, 2026",
    category: "Motorsport",
    image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/qYv2r_vS4Xo",
  },
  {
    id: 4,
    event: "Wimbledon Warm-up: Queen's Club",
    date: "April 29, 2026",
    endDate: "May 05, 2026",
    category: "Tennis",
    image: "https://images.unsplash.com/photo-1595435066311-66c3a8123869?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/UjZ5x_pU8-M",
  },
];

// ─────────────────────────── STYLES ───────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');

  @keyframes livePulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(1.4); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .font-anton  { font-family: 'Anton', sans-serif; }
  .font-outfit { font-family: 'Outfit', sans-serif; }

  .live-dot { animation: livePulse 1.8s ease-in-out infinite; }

  .fade-up {
    animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both;
  }
  ${[...Array(12)].map((_, i) => `.fade-up:nth-child(${i + 1}) { animation-delay: ${i * 50}ms; }`).join("\n")}

  .prog-img { transition: transform 0.6s ease, opacity 0.35s ease; }
  .prog-card:hover .prog-img { transform: scale(1.08); opacity: 0.85; }
  
  .prog-card { transition: all 0.3s ease; }

  .live-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    animation: shimmer 2.4s ease-in-out infinite;
  }

  .appointment-card {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
    perspective: 1000px;
  }
  .appointment-card:hover {
    transform: translateY(-5px) rotateX(4deg) rotateY(2deg);
    box-shadow: 0 20px 40px rgba(239, 68, 68, 0.15);
  }
  .appointment-glow {
    position: absolute;
    inset: -20px;
    background: radial-gradient(circle at center, rgba(239, 68, 68, 0.15), transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: -1;
  }
  .appointment-card:hover .appointment-glow {
    opacity: 1;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const categoryStyle = {
  Football:   "bg-red-500/15 text-red-400 border-red-500/20",
  Basketball: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  Tennis:     "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  News:       "bg-sky-500/15 text-sky-400 border-sky-500/20",
  Analysis:   "bg-violet-500/15 text-violet-400 border-violet-500/20",
  Highlights: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Sports:     "bg-red-500/15 text-red-400 border-red-500/20",
  TalkShow:   "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  Documentary: "bg-purple-500/15 text-purple-400 border-purple-500/20",
};

function ProgramRow({ prog, reminders, toggleReminder, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const catStyle = categoryStyle[prog.category.replace(/\s+/g, '')] || "bg-white/10 text-white/50 border-white/10";
  const isSet = reminders[prog.id];
  const isEven = index % 2 === 0;

  return (
    <div
      onClick={() => {
        const targetShow = REPLAY_DATA.find(r => r.showName === prog.title);
        if (targetShow) {
          navigate(`/replay?show=${encodeURIComponent(prog.title)}`);
        } else {
          navigate(`/replay?category=${encodeURIComponent(prog.category === 'Sports' ? 'Sports' : (prog.category === 'News' ? 'News' : 'All'))}`);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`prog-card fade-up group relative flex flex-col md:flex-row ${!isEven ? "md:flex-row-reverse" : ""} 
        rounded-2xl overflow-hidden cursor-pointer border mb-4
        ${prog.live
          ? "bg-zinc-900 border-red-500/30 hover:border-red-500/50 shadow-lg shadow-red-900/10"
          : "bg-zinc-900/40 border-white/[0.05] hover:border-white/[0.15] hover:bg-zinc-900/60"
        }`}
      style={{ 
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Live shimmer overlay */}
      {prog.live && <div className="live-shimmer absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10" />}
      
      {/* Background Gradient based on theme color */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{ 
          background: `linear-gradient(${isEven ? '90deg' : '-90deg'}, ${prog.themeColor}, transparent)` 
        }}
      />

      {/* Image Section */}
      <div className="relative w-full md:w-72 shrink-0 h-48 md:h-auto overflow-hidden bg-zinc-800">
        <img
          src={prog.image}
          alt={prog.title}
          className={`prog-img absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${prog.live ? "opacity-100" : "opacity-80"}`}
        />
        {/* Gradient overlay on image */}
        <div className={`absolute inset-[-1em] ${isEven
          ? "bg-gradient-to-r from-transparent via-transparent to-zinc-900/90"
          : "bg-gradient-to-l from-transparent via-transparent to-zinc-900/90"
        } hidden md:block`} />
        
        {/* Mobile Gradient Overlay */}
        <div className="absolute inset-[-1em] bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:hidden" />

        {/* LIVE badge on image */}
        {prog.live && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full shadow-xl z-20">
            <span className="live-dot w-2 h-2 rounded-full bg-white shrink-0" />
            <span className="font-anton text-[10px] text-white tracking-widest uppercase">LIVE</span>
          </div>
        )}

        {/* Time overlay on image */}
        <div className="absolute bottom-4 left-4 md:left-0 md:right-0 md:text-center z-20">
          <span className="font-anton text-2xl text-white tracking-wider drop-shadow-2xl">
            {prog.startTime}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-6 min-w-0 relative z-20">
        <div className="flex items-center gap-3 mb-3">
          <span className={`font-outfit text-[10px] font-bold px-2.5 py-0.5 rounded-full border tracking-widest uppercase ${catStyle}`}>
            {prog.category}
          </span>
          <span className="font-outfit text-[11px] text-white/30 flex items-center gap-1.5 font-medium">
            <Clock size={12} className="text-white/20" />
            {prog.duration}
          </span>
        </div>

        <h3 className={`font-anton text-2xl md:text-3xl leading-tight mb-3 transition-colors duration-300 ${hovered ? "text-red-500" : "text-white"}`}>
          {prog.title}
        </h3>

        <p className="font-outfit text-sm text-white/40 leading-relaxed mb-6 line-clamp-2 max-w-xl">
          {prog.description}
        </p>

        <div className="flex items-center gap-4">
          {prog.live ? (
            <button 
              onClick={(e) => e.stopPropagation()}
              className="group/btn flex items-center gap-2.5 bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded-full font-outfit text-xs font-bold transition-all shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:shadow-red-500/40"
            >
              <Radio size={14} className="animate-pulse" />
              WATCH LIVE NOW
            </button>
          ) : (
            <div className="flex items-center gap-3">
               <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const targetShow = REPLAY_DATA.find(r => r.showName === prog.title);
                  if (targetShow) {
                    navigate(`/replay?show=${encodeURIComponent(prog.title)}`);
                  } else {
                    navigate(`/replay?category=${encodeURIComponent(prog.category === 'Sports' ? 'Sports' : (prog.category === 'News' ? 'News' : 'All'))}`);
                  }
                }}
                className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white px-5 py-2.5 rounded-full font-outfit text-xs font-bold transition-all border border-white/5"
              >
                <History size={14} />
                REPLAY
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleReminder(prog.id);
                }}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full font-outfit text-xs font-bold transition-all border ${
                  isSet 
                    ? "bg-red-600 border-red-600 text-white" 
                    : "bg-transparent border-white/10 text-white/40 hover:text-white hover:border-white/20"
                }`}
              >
                <Bell size={14} fill={isSet ? "white" : "none"} />
                {isSet ? "REMINDER SET" : "REMIND ME"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar Indicator */}
      <div 
        className="absolute bottom-0 left-0 h-1 transition-all duration-500 ease-out"
        style={{ 
          width: hovered ? '100%' : '0%',
          backgroundColor: prog.themeColor,
          opacity: 0.8
        }}
      />
      
      {/* Side Color Bar */}
      <div 
        className={`absolute top-0 bottom-0 w-1 ${isEven ? "left-0" : "right-0"} hidden md:block`}
        style={{ backgroundColor: prog.themeColor }}
      />
    </div>
  );
}

export default function Programs() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [reminders, setReminders] = useState({});
  const [activeAppointment, setActiveAppointment] = useState(APPOINTMENTS[0]);

  const filteredPrograms = useMemo(() => {
    return ALL_PROGRAMS.filter((p) => p.day === selectedDay).sort((a, b) => 
      a.startTime.localeCompare(b.startTime)
    );
  }, [selectedDay]);

  const toggleReminder = (id) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-black text-white font-outfit selection:bg-red-600/30">
      <style>{STYLES}</style>

      {/* Hero Header */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-600/10 via-black to-black pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block h-px w-12 bg-red-600" />
            <span className="font-anton text-red-600 text-sm tracking-[0.3em] uppercase">Broadcast Guide</span>
            <span className="block h-px w-12 bg-red-600" />
          </div>
          <h1 className="font-anton text-5xl md:text-8xl text-white uppercase mb-8 tracking-tight">
            Weekly <span className="text-red-600">Programs</span>
          </h1>
        </div>
      </div>

      {/* Centralised Day Selector */}
      <div className="sticky top-20 z-40 bg-black/90 backdrop-blur-xl border-y border-white/5 mb-12">
        <div className="max-w-7xl mx-auto px-4 flex justify-center">
          <div className="flex items-center gap-1 md:gap-4 overflow-x-auto scrollbar-hide py-4 px-2">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-shrink-0 px-5 md:px-8 py-2 md:py-3 rounded-full font-bold transition-all duration-300 text-sm md:text-base border ${
                  selectedDay === day
                    ? "bg-red-600 text-white border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                    : "bg-transparent text-gray-500 border-transparent hover:text-white hover:bg-white/5"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 pb-24">
        
        {/* Date Context Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={18} className="text-red-500" />
            <span className="font-bold text-sm tracking-widest uppercase">{selectedDay} Schedule</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-gray-500 text-xs">
            <Clock size={14} />
            <span>Timezone: GMT +1</span>
          </div>
        </div>

        {/* Programs List */}
        <div className="flex flex-col gap-2">
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program, i) => (
              <ProgramRow 
                key={program.id} 
                prog={program} 
                reminders={reminders}
                toggleReminder={toggleReminder}
                index={i}
              />
            ))
          ) : (
            <div className="text-center py-32 bg-zinc-900/30 rounded-3xl border border-white/5">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="text-gray-700" size={40} />
              </div>
              <h3 className="font-anton text-2xl text-white/50 mb-2">No Broadcasts Today</h3>
              <p className="text-gray-600 text-sm">Please check back later for the updated schedule.</p>
            </div>
          )}
        </div>

        {/* This Month's Appointments */}
        <div className="mt-32">
          <div className="flex items-center gap-3 mb-12">
            <span className="block h-px w-8 bg-red-600" />
            <h2 className="font-anton text-white text-5xl md:text-4xl uppercase tracking-tight">
              Les Rendez Vous <span className="text-red-600">Du Mois</span>
            </h2>
          </div>
          
          <div className="flex flex-col gap-8">
            {/* Single Video Player Section */}
            <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-[2rem] overflow-hidden bg-zinc-900 shadow-2xl border border-white/10 group">
              <iframe
                src={`${activeAppointment.videoUrl}?autoplay=0`}
                title={activeAppointment.event}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Simple Selector for Single Video Player */}
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {APPOINTMENTS.map((apt) => (
                <button
                  key={apt.id}
                  onClick={() => setActiveAppointment(apt)}
                  className={`px-6 py-3 rounded-full font-outfit text-sm font-bold transition-all border ${
                    activeAppointment.id === apt.id
                      ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/20"
                      : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {apt.event}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Removed Appointment Detail Modal */}

        {/* Promo Banner */}
        <div className="mt-24 relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-red-600 to-red-900 p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <h2 className="font-anton text-3xl md:text-5xl text-white mb-4 leading-tight">
                NEVER MISS <br />A MOMENT
              </h2>
              <p className="text-white/80 font-medium text-lg mb-8 max-w-md">
                Get our mobile app to set live alerts and stream MSI TV on the go.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button className="flex items-center gap-3 px-8 py-3 bg-white text-red-700 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg">
                  <ExternalLink size={20} />
                  APP STORE
                </button>
                <button className="flex items-center gap-3 px-8 py-3 bg-red-800 text-white rounded-full font-bold hover:bg-red-700 transition-all border border-red-500/30">
                  <ExternalLink size={20} />
                  PLAY STORE
                </button>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="w-72 h-48 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-4 rotate-3 shadow-2xl">
                <div className="w-full h-full bg-red-600/20 rounded-lg flex items-center justify-center">
                  <Play fill="white" size={48} className="text-white" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-72 h-48 bg-zinc-900 rounded-2xl border border-white/10 p-4 -rotate-3 shadow-2xl">
                 <div className="w-full h-3 bg-white/5 rounded mb-2" />
                 <div className="w-2/3 h-3 bg-white/5 rounded mb-4" />
                 <div className="flex gap-2">
                    <div className="w-10 h-10 bg-red-600 rounded-full" />
                    <div className="flex-1 space-y-2">
                       <div className="w-full h-2 bg-white/10 rounded" />
                       <div className="w-1/2 h-2 bg-white/10 rounded" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
