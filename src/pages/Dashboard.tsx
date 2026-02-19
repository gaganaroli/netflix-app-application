import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchMovies } from '../services/api';
import type { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { Search, Play, LogOut, Loader2, Bell, User, Info } from 'lucide-react';
import MovieDetailModal from '../components/MovieDetailModal';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [trending, setTrending] = useState<Movie[]>([]);
    const [actionMovies, setActionMovies] = useState<Movie[]>([]);
    const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
    const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
    const [heroMovie, setHeroMovie] = useState<Movie | null>(null);

    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handlePlay = (title: string) => {
        const query = encodeURIComponent(`${title} official trailer`);
        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const initDashboard = async () => {
        try {
            setLoading(true);
            const [trend, act, horror, comedy] = await Promise.all([
                fetchMovies('marvel'),
                fetchMovies('action'),
                fetchMovies('horror'),
                fetchMovies('comedy')
            ]);

            if (trend.Search) {
                setTrending(trend.Search);
                setHeroMovie(trend.Search[Math.floor(Math.random() * trend.Search.length)]);
            }
            if (act.Search) setActionMovies(act.Search);
            if (horror.Search) setHorrorMovies(horror.Search);
            if (comedy.Search) setComedyMovies(comedy.Search);

            setError(null);
        } catch (err) {
            setError('Failed to fetch movies');
        } finally {
            setLoading(false);
        }
    };

    const loadSearchResults = async (query: string) => {
        if (!query) {
            setSearchResults([]);
            return;
        }
        try {
            setLoading(true);
            const data = await fetchMovies(query);
            if (data.Response === 'True' && data.Search) {
                setSearchResults(data.Search);
                setError(null);
            } else {
                setError(data.Error || 'No movies found');
                setSearchResults([]);
            }
        } catch (err) {
            setError('Failed to fetch search results');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initDashboard();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            loadSearchResults(searchQuery);
        }
    };

    const MovieRow = ({ title, moviesList }: { title: string, moviesList: Movie[] }) => (
        <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 px-4 md:px-12 hover:text-white transition cursor-pointer flex items-center gap-2 group">
                {title}
                <span className="text-netflix-red opacity-0 group-hover:opacity-100 transition-opacity text-sm font-normal">Explore All &gt;</span>
            </h2>
            <div className="relative group/row">
                <div className="flex gap-4 overflow-x-auto overflow-y-hidden px-4 md:px-12 pb-4 no-scrollbar scroll-smooth">
                    {moviesList.map((movie) => (
                        <div key={movie.imdbID} className="flex-none w-[160px] md:w-[220px]">
                            <MovieCard
                                movie={movie}
                                onPlay={() => handlePlay(movie.Title)}
                                onInfo={(m) => setSelectedMovie(m)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-netflix-black text-white selection:bg-netflix-red selection:text-white">
            {/* Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-12 py-4 flex items-center justify-between ${isScrolled ? 'bg-netflix-black shadow-2xl' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
                <div className="flex items-center gap-10">
                    <div
                        className="text-netflix-red flex items-center gap-2 cursor-pointer transition-transform active:scale-95 group"
                        onClick={() => {
                            setSearchQuery('');
                            setSearchResults([]);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <Play fill="currentColor" size={28} className="group-hover:animate-pulse" />
                        <span className="text-2xl font-black tracking-tighter uppercase italic">MyFlix</span>
                    </div>
                    <ul className="hidden lg:flex gap-4 text-sm font-medium">
                        {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map((tab) => (
                            <li
                                key={tab}
                                className={`label-nav cursor-pointer transition-all duration-300 ${activeTab === tab ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-200'}`}
                                onClick={() => {
                                    setActiveTab(tab);
                                    if (tab === 'Home') setSearchResults([]);
                                    else loadSearchResults(tab);
                                }}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center gap-6">
                    <form onSubmit={handleSearch} className="relative hidden md:block group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Titles, people, genres"
                            className="bg-black/40 border border-white/20 rounded-sm py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all w-48 focus:w-80 backdrop-blur-md"
                        />
                    </form>
                    <Bell className="cursor-pointer hover:text-gray-300 transition-colors" size={20} />
                    <div className="relative group/profile">
                        <div className="flex items-center gap-1 cursor-pointer">
                            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center overflow-hidden">
                                <User size={20} className="text-white" />
                            </div>
                            <span className="border-t-4 border-l-4 border-r-4 border-transparent border-t-white ml-2"></span>
                        </div>
                        <div className="absolute right-0 mt-2 w-48 bg-black/95 border border-white/10 rounded-sm opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-300 shadow-3xl">
                            <div className="p-4 border-b border-white/10 flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                                    <User size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold truncate max-w-[100px]">{user?.fullName}</p>
                                    <p className="text-[10px] text-gray-500 underline">Manage Profile</p>
                                </div>
                            </div>
                            <button
                                onClick={logout}
                                className="w-full text-left p-4 text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
                            >
                                <LogOut size={16} /> Sign out of MyFlix
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            {heroMovie && !searchQuery ? (
                <section className="relative h-[85vh] md:h-[95vh] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={heroMovie.Poster}
                            className="w-full h-full object-cover object-center scale-105"
                            alt="Hero Movie"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/30 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent"></div>
                    </div>

                    <div className="absolute bottom-[25%] left-4 md:left-12 max-w-2xl space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="bg-netflix-red text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg uppercase tracking-widest text-white">Movie</span>
                            <span className="text-white/60 text-sm font-medium tracking-widest uppercase">MyFlix Original</span>
                        </div>
                        <h1 className="text-4xl md:text-8xl font-black drop-shadow-2xl uppercase tracking-tighter leading-none italic">{heroMovie.Title}</h1>
                        <p className="text-lg md:text-xl text-gray-200 line-clamp-3 drop-shadow-lg max-w-lg font-medium leading-relaxed">
                            Watch the incredible story of {heroMovie.Title}. An epic journey through the world of {heroMovie.Type} released in {heroMovie.Year}.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <button
                                className="bg-white text-black px-10 py-3 rounded-md font-bold flex items-center gap-3 hover:bg-white/85 transition active:scale-95 text-lg"
                                onClick={() => handlePlay(heroMovie.Title)}
                            >
                                <Play fill="black" size={28} /> Play
                            </button>
                            <button
                                className="bg-gray-500/40 text-white px-10 py-3 rounded-md font-bold flex items-center gap-3 hover:bg-gray-500/60 transition backdrop-blur-xl border border-white/20 active:scale-95 text-lg"
                                onClick={() => setSelectedMovie(heroMovie)}
                            >
                                <Info size={28} /> More Info
                            </button>
                        </div>
                    </div>
                </section>
            ) : null}

            {/* Standard Grid for Search Results */}
            {searchQuery && (
                <main className="pt-32 pb-20 px-4 md:px-12">
                    <h2 className="text-3xl font-bold mb-10 flex items-center gap-4">
                        Explore: "{searchQuery}"
                        {loading && <Loader2 className="animate-spin text-netflix-red" size={24} />}
                    </h2>

                    {error && (
                        <div className="text-center py-32 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                            <p className="text-gray-400 text-2xl font-medium">{error}</p>
                            <button onClick={() => { setSearchQuery(''); setSearchResults([]); }} className="text-netflix-red font-bold hover:underline mt-6 flex items-center gap-2 mx-auto">
                                <Play size={16} fill="currentColor" /> Return Home
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-12">
                        {searchResults.map((movie) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                                onPlay={() => handlePlay(movie.Title)}
                                onInfo={(m) => setSelectedMovie(m)}
                            />
                        ))}
                    </div>
                </main>
            )}

            {/* Multi-Row Content for Home */}
            {!searchQuery && (
                <main className="relative z-10 -mt-32 pb-32 space-y-12">
                    {loading && trending.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4">
                            <Loader2 className="animate-spin text-netflix-red" size={48} />
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Generating your popcorn...</p>
                        </div>
                    ) : (
                        <>
                            <MovieRow title="Trending Now" moviesList={trending} />
                            <MovieRow title="Action Blockbusters" moviesList={actionMovies} />
                            <MovieRow title="Hair-Raising Horror" moviesList={horrorMovies} />
                            <MovieRow title="Laugh-Out-Loud Comedies" moviesList={comedyMovies} />
                        </>
                    )}
                </main>
            )}

            <footer className="px-4 md:px-12 py-20 bg-black/40 border-t border-white/5 text-gray-500 text-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div className="space-y-4">
                            <p className="hover:underline cursor-pointer">Audio Description</p>
                            <p className="hover:underline cursor-pointer">Investor Relations</p>
                            <p className="hover:underline cursor-pointer">Legal Notices</p>
                        </div>
                        <div className="space-y-4">
                            <p className="hover:underline cursor-pointer">Help Center</p>
                            <p className="hover:underline cursor-pointer">Jobs</p>
                            <p className="hover:underline cursor-pointer">Cookie Preferences</p>
                        </div>
                        <div className="space-y-4">
                            <p className="hover:underline cursor-pointer">Gift Cards</p>
                            <p className="hover:underline cursor-pointer">Terms of Use</p>
                            <p className="hover:underline cursor-pointer">Corporate Information</p>
                        </div>
                        <div className="space-y-4">
                            <p className="hover:underline cursor-pointer">Media Center</p>
                            <p className="hover:underline cursor-pointer">Privacy</p>
                            <p className="hover:underline cursor-pointer">Contact Us</p>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs uppercase tracking-widest text-gray-600 font-bold">© 1997-2025 MyFlix Entertainment Inc.</p>
                        <button className="border border-white/20 px-4 py-1.5 text-xs font-bold hover:bg-white/5 transition">Service Code</button>
                    </div>
                </div>
            </footer>

            {selectedMovie && (
                <MovieDetailModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                    onPlay={(title) => handlePlay(title)}
                />
            )}
        </div>
    );
};

export default Dashboard;
