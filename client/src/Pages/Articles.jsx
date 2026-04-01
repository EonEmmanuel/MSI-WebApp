import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Clock, 
  User, 
  Play, 
  Search, 
  Filter, 
  ChevronRight,
  ArrowUpRight,
  Calendar,
  Share2
} from 'lucide-react';

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');

    .font-anton { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fade-up {
      animation: fadeUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .glass-card:hover {
      background: rgba(255, 255, 255, 0.07);
      border-color: rgba(232, 25, 44, 0.4);
      transform: translateY(-8px);
    }

    .image-zoom {
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .glass-card:hover .image-zoom {
      transform: scale(1.05);
    }

    .category-pill {
      transition: all 0.3s ease;
    }
  `}</style>
);

const ARTICLES = [
  {
    id: 1,
    category: "Sports",
    subCategory: "Football",
    tag: "Premier League",
    title: "Haaland Breaks Another Record as City Cruise Past Arsenal",
    excerpt: "Erling Haaland scored his 35th league goal of the season as Manchester City secured a crucial 2-1 win at the Etihad.",
    author: "Chidi Okafor",
    date: "March 25, 2026",
    time: "2 hours ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
  },
  {
    id: 2,
    category: "Sports",
    subCategory: "Basketball",
    tag: "NBA Playoffs",
    title: "LeBron James Leads Lakers to Overtime Victory Against Celtics",
    excerpt: "In a gripping Game 5 thriller, LeBron posted 34 points and 12 assists to keep the Lakers' championship hopes alive.",
    author: "Amara Diallo",
    date: "March 24, 2026",
    time: "4 hours ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
  },
  {
    id: 3,
    category: "International",
    subCategory: "African Cup of Nations",
    tag: "AFCON",
    title: "Super Eagles Named in Preliminary AFCON 2027 Squad",
    excerpt: "Coach Finidi George has announced a 35-man preliminary squad ahead of the highly anticipated continental tournament.",
    author: "Ngozi Eze",
    date: "March 24, 2026",
    time: "6 hours ago",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
  },
  {
    id: 4,
    category: "Sports",
    subCategory: "Tennis",
    tag: "Wimbledon",
    title: "Djokovic Survives Five-Set Battle to Reach Wimbledon Quarters",
    excerpt: "The 24-time Grand Slam champion showed trademark resilience to outlast his opponent in a record-breaking match.",
    author: "Kwame Asante",
    date: "March 23, 2026",
    time: "8 hours ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
  },
  {
    id: 5,
    category: "Sports",
    subCategory: "Football",
    tag: "CAF Champions League",
    title: "Zamalek and Al Ahly Share Spoils in Cairo Derby Thriller",
    excerpt: "The Egyptian giants played out a pulsating 1-1 draw in the first leg of the CAF Champions League semi-final.",
    author: "Fatou Diop",
    date: "March 23, 2026",
    time: "10 hours ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1517747614396-d21a78b850e8?w=800&q=80",
  },
  {
    id: 6,
    category: "Sports",
    subCategory: "Basketball",
    tag: "College Basketball",
    title: "Duke Dominates with Record-Breaking Performance",
    excerpt: "The Blue Devils set a new school record with an impressive 89-72 victory over their long-standing rivals.",
    author: "Michael Chen",
    date: "March 22, 2026",
    time: "12 hours ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=80",
  },
  {
    id: 7,
    category: "International",
    subCategory: "UEFA Championship",
    tag: "Euro 2024",
    title: "Mbappé Shines as France Secure Spot in Semi-Finals",
    excerpt: "A masterclass performance from the captain ensures Les Bleus continue their dominant run in the championship.",
    author: "Julian Bernard",
    date: "March 21, 2026",
    time: "1 day ago",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1511406384665-27178ebec662?w=800&q=80",
  },
  {
    id: 8,
    category: "International",
    subCategory: "FIFA World Cup",
    tag: "World Cup Qualifiers",
    title: "Argentina Face Tough Test Against Brazil in Qualifiers",
    excerpt: "The world champions travel to Rio for a high-stakes clash that could define their qualifying campaign.",
    author: "Ricardo G. ",
    date: "March 20, 2026",
    time: "2 days ago",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
  }
];

const CATEGORIES = [
  { label: "All", value: "All" },
  { label: "Sports", value: "Sports", sub: ["Football", "Basketball", "Tennis", "Athletics", "Rugby", "Boxing", "Swimming", "Cycling"] },
  { label: "International", value: "International", sub: ["African Cup of Nations", "UEFA Championship", "FIFA World Cup", "Copa América"] },
];

export default function Articles() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || "All";
  const initialSubCategory = queryParams.get('sub') || "All";

  const [articleData, setArticleData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3002/api/msi/getallarticle?limit=10');
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const result = await response.json();
          setArticleData(result.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSubCategory, setActiveSubCategory] = useState(initialSubCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setActiveCategory(queryParams.get('category') || "All");
    setActiveSubCategory(queryParams.get('sub') || "All");
    setCurrentPage(1);
  }, [location.search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubCategory, searchQuery]);

  const filteredArticles = ARTICLES.filter(article => {
    const matchesCategory = activeCategory === "All" || article.category === activeCategory;
    const matchesSubCategory = activeSubCategory === "All" || article.subCategory === activeSubCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const getSubCategories = () => {
    const cat = CATEGORIES.find(c => c.value === activeCategory);
    return cat && cat.sub ? ["All", ...cat.sub] : [];
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500/30 font-outfit">
      <FontImport />

      {/* Hero Header */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] -translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="fade-up mb-6 flex items-center gap-3">
             <span className="h-px w-12 bg-red-600" />
             <span className="font-anton text-red-600 text-sm tracking-[0.4em] uppercase">Latest Reports</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-3xl">
              <h1 className="fade-up font-anton text-6xl md:text-8xl lg:text-9xl mb-6 leading-none tracking-tight uppercase">
                MSI <span className="text-red-600">Articles</span>
              </h1>
              <p className="fade-up text-xl text-white/50 leading-relaxed" style={{ animationDelay: '100ms' }}>
                In-depth analysis, breaking news, and exclusive stories from the world of sports and international competitions.
              </p>
            </div>
            
            <div className="fade-up flex flex-col sm:flex-row gap-4 w-full md:w-auto" style={{ animationDelay: '200ms' }}>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-red-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 outline-none focus:border-red-500/50 focus:bg-white/10 transition-all w-full sm:w-80"
                />
              </div>
            </div>
          </div>

          {/* Main Category Filters */}
          <div className="fade-up flex flex-wrap items-center gap-3 mb-6" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-2 mr-4 text-white/40 text-sm font-anton tracking-widest uppercase">
              <Filter size={16} /> Category:
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                    setActiveCategory(cat.value);
                    setActiveSubCategory("All");
                }}
                className={`px-8 py-2.5 rounded-full font-anton tracking-wider text-sm transition-all border ${
                  activeCategory === cat.value 
                  ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/20" 
                  : "bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                {cat.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Sub Category Filters */}
          {activeCategory !== "All" && (
            <div className="fade-up flex flex-wrap items-center gap-2 mb-12 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: '400ms' }}>
              <div className="w-full mb-2 md:w-auto md:mb-0 md:mr-4 text-white/30 text-[10px] font-anton tracking-[0.2em] uppercase">
                Refine by:
              </div>
              {getSubCategories().map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubCategory(sub)}
                  className={`px-5 py-1.5 rounded-full font-outfit font-medium text-xs transition-all border ${
                    activeSubCategory === sub 
                    ? "bg-white text-black border-white" 
                    : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Main Layout: Articles + Sidebar */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Articles Grid & Pagination */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {currentArticles.map((article, idx) => (
                  <Link 
                    key={article.id} 
                    to={`/articles/${article.id}`}
                    className="fade-up group h-full"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="glass-card rounded-[2.5rem] overflow-hidden p-3 h-full flex flex-col">
                      {/* Image Container */}
                      <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 relative">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover image-zoom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        
                        {/* Tag Badge */}
                        <div className="absolute top-4 left-4">
                          <div className="bg-red-600 px-4 py-1.5 rounded-full text-[10px] font-anton tracking-widest uppercase">
                            {article.tag}
                          </div>
                        </div>

                        <div className="absolute bottom-4 right-4">
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="px-4 pb-6 flex-grow">
                        <div className="flex items-center gap-4 text-white/40 text-[10px] font-anton tracking-widest uppercase mb-4">
                            <span className="flex items-center gap-1.5">
                                <Calendar size={12} className="text-red-500" /> {article.date}
                            </span>
                            <span className="w-1 h-1 bg-white/20 rounded-full" />
                            <span className="flex items-center gap-1.5">
                                <Clock size={12} className="text-red-500" /> {article.readTime}
                            </span>
                        </div>

                        <h3 className="font-anton text-2xl mb-4 uppercase group-hover:text-red-500 transition-colors leading-tight line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-3 font-outfit">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-[10px] font-anton border border-white/10">
                                    {article.author.charAt(0)}
                                </div>
                                <span className="text-xs font-anton tracking-widest text-white/60 uppercase">{article.author}</span>
                            </div>
                            <button className="text-white/20 hover:text-red-500 transition-colors">
                                <Share2 size={16} />
                            </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination UI */}
              {totalPages > 1 && (
                <div className="fade-up flex items-center justify-center gap-2 mb-16" style={{ animationDelay: '500ms' }}>
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-white/10 transition-all"
                  >
                    <ChevronRight className="rotate-180" size={16} />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full border font-anton text-sm transition-all ${
                        currentPage === i + 1 
                        ? "bg-red-600 border-red-600 text-white" 
                        : "border-white/10 text-white/40 hover:border-white/30 hover:bg-white/5"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-white/10 transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {filteredArticles.length === 0 && (
                <div className="text-center py-32 fade-up">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-white/20" />
                  </div>
                  <h3 className="font-anton text-3xl mb-2 uppercase">No articles found</h3>
                  <p className="text-white/40 max-w-md mx-auto">We couldn't find any articles matching your current search or filter criteria. Try adjusting your filters.</p>
                  <button 
                    onClick={() => {
                        setActiveCategory("All");
                        setActiveSubCategory("All");
                        setSearchQuery("");
                    }}
                    className="mt-8 px-8 py-3 bg-white/5 border border-white/10 rounded-full font-anton tracking-widest text-xs hover:bg-white/10 transition-all"
                  >
                    RESET FILTERS
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <aside className="lg:w-1/3 space-y-12">
              {/* Profile Card */}
              <div className="fade-up glass-card rounded-[2.5rem] p-8" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-3xl font-anton border-2 border-white/10">
                    M
                  </div>
                  <div>
                    <h3 className="font-anton text-2xl uppercase">MSI Editorial</h3>
                    <p className="text-red-500 font-anton text-xs tracking-widest uppercase">Global Sports Network</p>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-8 font-outfit">
                  Delivering the most comprehensive sports coverage across the globe. Our team of experts provides in-depth analysis and breaking news 24/7.
                </p>
                <div className="flex items-center gap-3">
                  {['Twitter', 'Instagram', 'Youtube', 'Facebook'].map(social => (
                    <div key={social} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all cursor-pointer group">
                      <Share2 size={16} className="text-white/40 group-hover:text-white" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Posts */}
              <div className="fade-up" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-3 mb-8">
                  <span className="h-px w-8 bg-red-600" />
                  <h3 className="font-anton text-xl tracking-widest uppercase">Featured Posts</h3>
                </div>
                <div className="space-y-6">
                  {ARTICLES.slice(0, 3).map((article) => (
                    <div key={article.id} className="flex gap-4 group cursor-pointer">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-anton text-red-500 uppercase tracking-widest mb-1">{article.tag}</span>
                        <h4 className="font-anton text-sm uppercase group-hover:text-red-500 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h4>
                        <span className="text-[10px] text-white/30 uppercase mt-1">{article.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Categories */}
              <div className="fade-up" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center gap-3 mb-8">
                  <span className="h-px w-8 bg-red-600" />
                  <h3 className="font-anton text-xl tracking-widest uppercase">Quick Links</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Champions League", "NBA", "World Cup", "Transfer News", "Grand Slam", "Formula 1", "Olympic Games"].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-anton tracking-widest uppercase text-white/50 hover:text-red-500 hover:border-red-500/50 cursor-pointer transition-all">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ad Placeholder */}
              <div className="fade-up glass-card rounded-[2.5rem] p-8 aspect-square flex flex-col items-center justify-center text-center border-dashed border-2 border-white/10" style={{ animationDelay: '500ms' }}>
                <span className="text-[10px] font-anton text-white/20 uppercase tracking-[0.3em] mb-4">Advertisement</span>
                <div className="w-full h-full bg-white/5 rounded-2xl flex items-center justify-center">
                  <span className="font-anton text-white/10 text-4xl">MSI TV</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Featured/News Section */}
      <section className="py-24 px-6 md:px-10 bg-zinc-950/50">
          <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="fade-up">
                      <div className="flex items-center gap-3 mb-6">
                          <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                          <span className="font-anton text-red-500 text-sm tracking-[0.3em] uppercase">Live Coverage</span>
                      </div>
                      <h2 className="font-anton text-4xl md:text-6xl mb-8 leading-none">
                          STAY AHEAD OF THE <span className="text-red-600">GAME</span>
                      </h2>
                      <p className="font-outfit text-lg text-white/50 leading-relaxed mb-10">
                          From post-match analysis to exclusive interviews with athletes and coaches, MSI TV brings you closer to the action than ever before. Subscribe to our newsletter to receive the latest updates directly in your inbox.
                      </p>
                      <div className="flex flex-wrap gap-4">
                          <input 
                            type="email" 
                            placeholder="Enter your email"
                            className="bg-white/5 border border-white/10 rounded-full py-4 px-8 outline-none focus:border-red-500/50 transition-all flex-grow w-full sm:max-w-sm"
                          />
                          <button className="bg-red-600 w-full sm:w-44 hover:bg-red-700 text-white font-anton tracking-widest px-8 py-4 rounded-full text-sm transition-all shadow-lg shadow-red-900/20">
                              JOIN NOW
                          </button>
                      </div>
                  </div>
                  <div className="fade-up relative">
                      <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 relative group">
                          <img 
                            src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200" 
                            alt="Sports Coverage" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl shadow-red-600/40">
                                  <Play size={32} className="text-white fill-white ml-1" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
