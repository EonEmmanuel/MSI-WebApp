import React, { useEffect, useState } from 'react';
import { FaBloggerB } from "react-icons/fa6";
import { TiVideo } from "react-icons/ti";
import { RiTableFill } from "react-icons/ri";
import { MdOutlineSettingsSystemDaydream, MdPalette, MdPriorityHigh } from "react-icons/md";
import { GiBookCover} from "react-icons/gi";
import { SiCardmarket } from "react-icons/si";
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes countUp {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    .fade-up  { animation: fadeUp  0.5s cubic-bezier(.22,1,.36,1) both; }
    .count-up { animation: countUp 0.4s cubic-bezier(.22,1,.36,1) both; }

    .stat-card {
      transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
    }
    .stat-card:hover { transform: translateY(-3px); }

    .grid-bg {
      background-image:
        linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px);
      background-size: 36px 36px;
    }
  `}</style>
);

function DisplayBoard() {

  const [data,       setData]       = useState();
  const [videoData,  setVideoData]  = useState();
  const [tableData,  setTableData]  = useState();
  const [teamData,   setTeamData]   = useState();
  const [coachData,  setCoachData]  = useState();
  const [playerData, setPlayerData] = useState();
  const [marketData, setMarketData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallmarket');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setMarketData(result.total);
      } catch (error) { console.error('Error fetching data:', error); }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallplayer');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setPlayerData(result.total);
      } catch (error) { console.error('Error fetching data:', error); }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallteam');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setTeamData(result.total);
      } catch (error) { console.error('Error fetching data:', error); }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallblog');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setData(result.total);
      } catch (error) { console.error('Error fetching data:', error); }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallhighlight');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setVideoData(result.total);
      } catch (error) { console.error('Error fetching data:', error); }
    };
    fetchData();
  }, []);

  // ── card config ──────────────────────────────────────────────
  const cards = [
    {
      label: 'Article',     count: data,       to: '/adminarticle',
      Icon: FaBloggerB,
      iconBg: 'bg-indigo-100 text-indigo-600',
      numColor: 'text-indigo-600',
      accent: 'bg-indigo-500',
      hover: 'hover:border-indigo-300 hover:shadow-[0_12px_32px_rgba(99,102,241,0.18)]',
      delay: 0,
    },
    {
      label: 'Emission', count: videoData,  to: '/adminvideo',
      Icon: TiVideo,
      iconBg: 'bg-pink-100 text-pink-600',
      numColor: 'text-pink-600',
      accent: 'bg-pink-500',
      hover: 'hover:border-pink-300 hover:shadow-[0_12px_32px_rgba(236,72,153,0.18)]',
      delay: 1,
    },
    {
      label: 'Championnat',    count: marketData, to: '/adminleague',
      Icon: SiCardmarket,
      iconBg: 'bg-amber-100 text-amber-600',
      numColor: 'text-amber-600',
      accent: 'bg-amber-500',
      hover: 'hover:border-amber-300 hover:shadow-[0_12px_32px_rgba(245,158,11,0.18)]',
      delay: 3,
    },
    {
      label: 'Schedule',  to: '/adminschedule',
      Icon: RiTableFill,
      iconBg: 'bg-cyan-100 text-cyan-600',
      numColor: 'text-cyan-600',
      accent: 'bg-cyan-500',
      hover: 'hover:border-cyan-300 hover:shadow-[0_12px_32px_rgba(6,182,212,0.18)]',
      delay: 2,
    },
    {
      label: 'Program',  count: null,       to: '/adminprogram',
      Icon: MdPalette,
      iconBg: 'bg-orange-100 text-orange-600',
      numColor: 'text-orange-600',
      accent: 'bg-orange-500',
      hover: 'hover:border-emerald-300 hover:shadow-[0_12px_32px_rgba(16,185,129,0.18)]',
      delay: 4,
    },
    {
      label: 'Gallery',  count: null,       to: '/gslfixture?tab=fixmatchday',
      Icon: MdOutlineSettingsSystemDaydream,
      iconBg: 'bg-emerald-100 text-emerald-600',
      numColor: 'text-emerald-600',
      accent: 'bg-emerald-500',
      hover: 'hover:border-emerald-300 hover:shadow-[0_12px_32px_rgba(16,185,129,0.18)]',
      delay: 4,
    },
    {
      label: 'Live link',   count: null,       to: '/gslresult?tab=resultmatchday',
      Icon: GiBookCover,
      iconBg: 'bg-lime-100 text-lime-600',
      numColor: 'text-lime-600',
      accent: 'bg-lime-500',
      hover: 'hover:border-lime-300 hover:shadow-[0_12px_32px_rgba(132,204,22,0.18)]',
      delay: 5,
    }
  ];

  return (
    <div className="font-outfit min-h-screen bg-slate-50 grid-bg">
      <FontImport />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-12">

        {/* ── Header ── */}
        <div className="fade-up mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="block h-px w-8 bg-indigo-500" />
            <span className="font-anton text-indigo-500 text-xs tracking-[0.25em] uppercase">Admin Panel</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <h1 className="font-anton text-slate-800 text-5xl md:text-6xl leading-none">
              MSI <span className="text-indigo-500 font-bold">Dashboard</span>
            </h1>

            {/* Quick-stat pills */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Emission',  val: playerData, color: 'text-rose-500',   bg: 'bg-rose-50   border-rose-200'   },
                { label: 'Championnat',    val: teamData,   color: 'text-blue-500',   bg: 'bg-blue-50   border-blue-200'   },
                { label: 'Articles', val: data,       color: 'text-indigo-500', bg: 'bg-indigo-50 border-indigo-200' },
              ].map((s) => (
                <div key={s.label} className={`flex flex-col items-center border rounded-xl px-4 py-2.5 ${s.bg}`}>
                  <span className={`font-anton text-2xl ${s.color}`}>{s.val ?? '…'}</span>
                  <span className="font-outfit text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {cards.map(({ label, count, to, Icon, iconBg, numColor, accent, hover, delay }) => (
            <Link
              key={label}
              to={to}
              className={`stat-card fade-up group relative flex flex-col justify-between
                bg-white border border-slate-200 rounded-2xl p-5 overflow-hidden no-underline
                ${hover}`}
              style={{ animationDelay: `${delay * 50}ms`, textDecoration: 'none' }}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${accent} rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Icon row */}
              <div className="flex items-start justify-between mb-5 pt-1">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${iconBg} shrink-0`}>
                  <Icon />
                </div>
                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-slate-200">
                  <ArrowUpRight size={13} className="text-slate-500" />
                </div>
              </div>

              {/* Label + count */}
              <div>
                <p className="font-outfit text-xs font-semibold text-slate-400 uppercase tracking-[0.18em] mb-1">
                  {label}
                </p>

                {count !== null && count !== undefined ? (
                  <div className="flex items-end gap-2">
                    <p className={`count-up font-anton text-4xl ${numColor} leading-none`}
                      style={{ animationDelay: `${delay * 50 + 150}ms` }}>
                      {count}
                    </p>
                    <span className="font-outfit text-[10px] text-slate-400 mb-1 flex items-center gap-0.5">
                      <TrendingUp size={10} /> total
                    </span>
                  </div>
                ) : (
                  <p className={`font-outfit text-sm font-semibold ${numColor}`}>View →</p>
                )}

                <div className={`mt-4 h-px ${accent} opacity-10 group-hover:opacity-30 transition-opacity duration-300`} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayBoard;