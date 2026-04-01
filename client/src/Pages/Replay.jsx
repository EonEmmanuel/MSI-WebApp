import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Play,
  Filter,
  X,
  ChevronLeft,
  ChevronDown,
  Folder,
  Film,
  Clock,
  Calendar,
} from "lucide-react";

let REPLAY_DATA;
REPLAY_DATA = [
  {
    id: 1,
    title: "Match Highlights: Man City 2-1 Arsenal",
    showName: "La Matinale des Sports",
    category: "Sports",
    showColor: "bg-yellow-600",
    thumbnail:
        "https://res.cloudinary.com/drzoiigek/image/upload/v1774432658/mgm7z6stvgqkkuodnisp.png",
    videoUrl: "https://www.youtube.com/embed/oNmLssf5kfM",
    date: "2026-03-25",
    duration: "10:15",
    views: "1.2M views",
  },
  {
    id: 2,
    title: "Le Club",
    showName: "Le Club",
    category: "Sports",
    showColor: "bg-gray-500",
    thumbnail: "https://res.cloudinary.com/drzoiigek/image/upload/v1774434166/lvsm7qx3el225pejbwaq.png",
    videoUrl: "https://www.youtube.com/embed/qYv2r_vS4Xo",
    date: "2026-03-24",
    duration: "45:20",
    views: "45K views",
  },
  {
    id: 3,
    title: "Pelouse",
    showName: "Pelouse",
    category: "Debate",
    showColor: "bg-blue-500",
    thumbnail:
        "https://res.cloudinary.com/drzoiigek/image/upload/v1774432659/e13emr5jqhaauvzvlmor.png",
    videoUrl: "https://www.youtube.com/embed/eZXVFKDux3s",
    date: "2026-03-24",
    duration: "15:00",
    views: "120K views",
  },
  {
    id: 4,
    title: "Tout Sauf Le Foot",
    showName: "Tout Sauf Le Foot",
    category: "Sports",
    showColor: "bg-green-600",
    thumbnail:
        "https://res.cloudinary.com/drzoiigek/image/upload/v1774434177/tzayfbcsnjok0evkt3jc.png",
    videoUrl: "https://www.youtube.com/embed/mfGL4HepT_E",
    date: "2026-03-23",
    duration: "09:45",
    views: "800K views",
  },
  {
    id: 5,
    title: "A L'International",
    showName: "A L'International",
    category: "Talk Shows",
    showColor: "bg-slate-300",
    thumbnail: "https://res.cloudinary.com/drzoiigek/image/upload/v1774432660/xczz6p0w7sblmszsaycs.png",
    videoUrl: "https://www.youtube.com/embed/V_YxSJXR9D4",
    date: "2026-03-22",
    duration: "12:30",
    views: "2.5M views",
  },
  {
    id: 6,
    title: "Femmes et Sport",
    showName: "Femmes et Sports",
    category: "Documentary",
    showColor: "bg-pink-500",
    thumbnail:
        "https://res.cloudinary.com/drzoiigek/image/upload/v1774432657/ndpimpbhf50wfnqx6qpy.png",
    videoUrl: "https://www.youtube.com/embed/UjZ5x_pU8-M",
    date: "2026-03-21",
    duration: "25:00",
    views: "30K views",
  },
  {
    id: 7,
    title: "Fighter",
    showName: "Fighter",
    category: "Documentary",
    showColor: "bg-gray-200",
    thumbnail:
        "https://res.cloudinary.com/drzoiigek/image/upload/v1774432657/avhzevinyw0wcb9xgedx.png",
    videoUrl: "https://www.youtube.com/embed/UjZ5x_pU8-M",
    date: "2026-03-21",
    duration: "25:00",
    views: "30K views",
  },
  {
    id: 8,
    title: "Sport Le Mag",
    showName: "Sport Le Mag",
    category: "Documentary",
    showColor: "bg-yellow-600",
    thumbnail:
        "https://res.cloudinary.com/drzoiigek/image/upload/v1774436072/bjrs10w3kdcgbtoeqflq.png",
    videoUrl: "https://www.youtube.com/embed/UjZ5x_pU8-M",
    date: "2026-03-21",
    duration: "25:00",
    views: "30K views",
  },
];


export default function Replay() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterShow, setFilterShow] = useState("All Shows");
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const show = params.get("show");
    if (show) {
      setSelectedShow(show);
    }
  }, []);

  // Group data by showName
  const shows = useMemo(() => {
    const showGroups = {};
    REPLAY_DATA.forEach((item) => {
      if (!showGroups[item.showName]) {
        showGroups[item.showName] = {
          name: item.showName,
          category: item.category,
          color: item.showColor || "bg-gray-600",
          episodes: [],
          latestThumbnail: item.thumbnail,
        };
      }
      showGroups[item.showName].episodes.push(item);
    });
    return Object.values(showGroups);
  }, []);

  // Filter shows based on search and selected show name
  const filteredShows = useMemo(() => {
    return shows.filter((show) => {
      const matchesSearch =
        show.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        show.episodes.some((ep) =>
          ep.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      const matchesFilter =
        filterShow === "All Shows" || show.name === filterShow;
      return matchesSearch && matchesFilter;
    });
  }, [shows, searchTerm, filterShow]);

  // If a show is selected, filter its episodes
  const filteredEpisodes = useMemo(() => {
    if (!selectedShow) return [];
    const show = shows.find((s) => s.name === selectedShow);
    if (!show) return [];
    return show.episodes.filter((ep) =>
      ep.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [selectedShow, shows, searchTerm]);

  const handleBack = () => {
    setSelectedShow(null);
    setSearchTerm("");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto mt-10">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            {selectedShow && (
              <button
                onClick={handleBack}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-red-500"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              {selectedShow ? selectedShow : "TV Replays"}
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">
            {selectedShow
              ? `Browse all episodes and highlights from ${selectedShow}.`
              : "Catch up on all the shows and live events you missed. Organized by show for your convenience."}
          </p>
        </header>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder={
                selectedShow
                  ? "Search in this show..."
                  : "Search shows, matches..."
              }
              className="w-full bg-[#111] border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {!selectedShow && (
            <div className="relative w-full md:w-64">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <Filter size={18} />
              </div>
              <select
                value={filterShow}
                onChange={(e) => setFilterShow(e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-xl py-3 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all text-sm appearance-none cursor-pointer text-gray-300"
              >
                <option value="All Shows">All Shows</option>
                {[...new Set(shows.map((s) => s.name))].sort().map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 flex flex-col items-center">
                <ChevronDown size={14} className="rotate-180 -mb-1" />
                <ChevronDown size={14} className="-mt-1" />
              </div>
            </div>
          )}
        </div>

        {/* Shows Grid (Folders) */}
        {!selectedShow && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredShows.map((show) => (
              <div
                key={show.name}
                onClick={() => setSelectedShow(show.name)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] mb-4">
                  {/* Folder effect / Stack effect */}
                  <div className={`absolute inset-0 ${show.color} rounded-2xl translate-x-2 -translate-y-2 opacity-20 group-hover:opacity-40 transition-all duration-300`} />
                  <div className={`absolute inset-0 ${show.color} rounded-2xl translate-x-1 -translate-y-1 opacity-40 group-hover:opacity-60 transition-all duration-300`} />

                  <div className="relative h-full w-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover:-translate-y-1">
                    <img
                      src={show.latestThumbnail}
                      alt={show.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Folder size={16} className={show.color.replace('bg-', 'text-')} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${show.color.replace('bg-', 'text-')}`}>
                          {show.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold line-clamp-1">
                        {show.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {show.episodes.length} Videos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Episode Grid (Contents of a Show) */}
        {selectedShow && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEpisodes.map((replay) => (
              <div
                key={replay.id}
                className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden transition-all hover:border-red-500/30 hover:-translate-y-1 shadow-xl"
              >
                {/* Thumbnail Container */}
                <div
                  className="relative aspect-video overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideo(replay)}
                >
                  <img
                    src={replay.thumbnail}
                    alt={replay.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                      <Play fill="white" size={32} className="ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-bold">
                    {replay.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="font-bold text-lg mb-2 line-clamp-2 hover:text-red-500 transition-colors cursor-pointer"
                    onClick={() => setActiveVideo(replay)}
                  >
                    {replay.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Film size={14} /> {replay.views}
                    </span>
                    <span>{new Date(replay.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {((!selectedShow && filteredShows.length === 0) ||
          (selectedShow && filteredEpisodes.length === 0)) && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No results found.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterShow("All Shows");
                setSelectedShow(null);
              }}
              className="mt-4 text-red-500 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-start p-4 md:p-8 bg-black/95 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 mt-8 md:mt-12">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-[70] p-2 bg-black/50 hover:bg-red-600 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>
            <iframe
              src={`${activeVideo.videoUrl}?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&controls=1`}
              title={activeVideo.title}
              className="w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Information */}
          <div className="w-full max-w-5xl mt-6 px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {activeVideo.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm md:text-base">
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                <Clock size={16} className="text-red-500" />
                {activeVideo.duration}
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                <Calendar size={16} className="text-red-500" />
                {new Date(activeVideo.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                <Film size={16} className="text-red-500" />
                {activeVideo.views}
              </span>
            </div>
            <p className="mt-4 text-gray-400 leading-relaxed max-w-3xl mb-12 md:mb-20">
              Now playing: {activeVideo.showName} - {activeVideo.title}. 
              Catch all the highlights and full episodes on our Replay page.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
