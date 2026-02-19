import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchMovies } from '../services/api';
import type { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { Search, Play, LogOut, Loader2, Bell, User, Info } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('batman');
    const [activeTab, setActiveTab] = useState('Home');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadMovies = async (query: string) => {
        try {
            setLoading(true);
            const data = await fetchMovies(query);
            if (data.Response === 'True' && data.Search) {
                setMovies(data.Search);
                setError(null);
            } else {
                setError(data.Error || 'No movies found');
                setMovies([]);
            }
        } catch (err) {
            setError('Failed to fetch movies');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovies(searchQuery);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            loadMovies(searchQuery);
        }
    };

    return (
        <div className="min-h-screen bg-netflix-black text-white">
            {/* Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 px-4 md:px-12 py-4 flex items-center justify-between ${isScrolled ? 'bg-netflix-black shadow-xl' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
                <div className="flex items-center gap-10">
                    <div
                        className="text-netflix-red flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                        onClick={() => {
                            setSearchQuery('batman');
                            loadMovies('batman');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <Play fill="currentColor" size={28} />
                        <span className="text-2xl font-black tracking-tighter uppercase italic">MyFlix</span>
                    </div>
                    <ul className="hidden lg:flex gap-4 text-sm font-medium">
                        <li
                            className={`label-nav cursor-pointer transition ${activeTab === 'Home' ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => {
                                setActiveTab('Home');
                                setSearchQuery('batman');
                                loadMovies('batman');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            Home
                        </li>
                        <li
                            className={`label-nav cursor-pointer transition ${activeTab === 'TV Shows' ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => {
                                setActiveTab('TV Shows');
                                setSearchQuery('TV Show');
                                loadMovies('TV Show');
                            }}
                        >
                            TV Shows
                        </li>
                        <li
                            className={`label-nav cursor-pointer transition ${activeTab === 'Movies' ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => {
                                setActiveTab('Movies');
                                setSearchQuery('Movie');
                                loadMovies('Movie');
                            }}
                        >
                            Movies
                        </li>
                        <li
                            className={`label-nav cursor-pointer transition ${activeTab === 'New' ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => {
                                setActiveTab('New');
                                setSearchQuery('New');
                                loadMovies('New');
                            }}
                        >
                            New & Popular
                        </li>
                        <li
                            className={`label-nav cursor-pointer transition ${activeTab === 'My List' ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => {
                                setActiveTab('My List');
                                setSearchQuery('Action');
                                loadMovies('Action');
                            }}
                        >
                            My List
                        </li>
                    </ul>
                </div>

                <div className="flex items-center gap-6">
                    <form onSubmit={handleSearch} className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Titles, people, genres"
                            className="bg-black/50 border border-white/20 rounded-md py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white transition-all w-48 focus:w-64"
                        />
                    </form>
                    <Bell className="cursor-pointer hover:text-gray-300" size={20} />
                    <div className="relative group">
                        <div className="flex items-center gap-2 cursor-pointer bg-netflix-lightGray p-1 rounded">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                                <User size={20} className="text-white" />
                            </div>
                        </div>
                        <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-white/10 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="p-4 border-b border-white/10">
                                <p className="text-sm font-bold">{user?.fullName}</p>
                                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="w-full text-left p-4 text-sm hover:underline flex items-center gap-2"
                            >
                                <LogOut size={16} /> Sign out of MyFlix
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[80vh] w-full">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Hero Movie"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent"></div>
                </div>

                <div className="absolute bottom-[20%] left-4 md:left-12 max-w-xl space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold">Batman</h1>
                    <p className="text-lg text-gray-200">The shadowy protector of Gotham City faces his greatest challenge yet as a new villain rises to plunge the city into chaos.</p>
                    <div className="flex gap-4">
                        <button
                            className="bg-white text-black px-8 py-3 rounded font-bold flex items-center gap-2 hover:bg-white/90 transition active:scale-95"
                            onClick={() => alert('Starting playback...')}
                        >
                            <Play fill="black" size={24} /> Play
                        </button>
                        <button
                            className="bg-gray-500/50 text-white px-8 py-3 rounded font-bold flex items-center gap-2 hover:bg-gray-500/70 transition backdrop-blur-md active:scale-95"
                            onClick={() => alert('Batman: The shadowy protector of Gotham City faces his greatest challenge yet.')}
                        >
                            <Info size={24} /> More Info
                        </button>
                    </div>
                </div>
            </section>

            {/* Movie Grid */}
            <main className="relative z-10 -mt-24 pb-20 px-4 md:px-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                    Search Results for "{searchQuery}"
                    {loading && <Loader2 className="animate-spin text-netflix-red" size={24} />}
                </h2>

                {error && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-xl">{error}</p>
                        <button onClick={() => loadMovies('batman')} className="text-netflix-red underline mt-4">Try original search</button>
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
                    {!loading && movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>

                {!loading && movies.length === 0 && !error && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-xl">Search for your favorite movies!</p>
                    </div>
                )}
            </main>

            <footer className="px-12 py-12 border-t border-white/10 text-gray-500 text-sm">
                <div className="flex gap-4 mb-8">
                    <span className="hover:underline cursor-pointer">Audio and Subtitles</span>
                    <span className="hover:underline cursor-pointer">Help Center</span>
                    <span className="hover:underline cursor-pointer">Gift Cards</span>
                    <span className="hover:underline cursor-pointer">Investor Relations</span>
                </div>
                <p>© 1997-2025 MyFlix, Inc.</p>
            </footer>
        </div>
    );
};

export default Dashboard;
