import React, { useEffect, useState } from 'react';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';
import { fetchMovieDetails } from '../services/api';
import type { Movie } from '../types';

interface MovieDetailModalProps {
    movie: Movie;
    onClose: () => void;
    onPlay: (title: string) => void;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ movie, onClose, onPlay }) => {
    const [details, setDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const data = await fetchMovieDetails(movie.imdbID);
                setDetails(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadDetails();

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, [movie.imdbID]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                className="absolute inset-0"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-4xl bg-netflix-black rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Poster/Backdrop Area */}
                <div className="relative h-[250px] md:h-[400px]">
                    <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/1200x600?text=No+Preview'}
                        alt={movie.Title}
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/20 to-transparent"></div>

                    <div className="absolute bottom-8 left-8 right-8">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">{movie.Title}</h2>
                        <div className="flex gap-4">
                            <button
                                className="bg-white text-black px-8 py-2 rounded font-bold flex items-center gap-2 hover:bg-white/90 transition active:scale-95"
                                onClick={() => onPlay(movie.Title)}
                            >
                                <Play fill="black" size={20} /> Play
                            </button>
                            <button className="bg-gray-500/50 text-white p-2 rounded-full border-2 border-gray-400 hover:border-white transition">
                                <Plus size={24} />
                            </button>
                            <button className="bg-gray-500/50 text-white p-2 rounded-full border-2 border-gray-400 hover:border-white transition">
                                <ThumbsUp size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-2 text-green-500 font-bold">
                            <span>98% Match</span>
                            <span className="text-gray-400 font-normal">{movie.Year}</span>
                            <span className="border border-gray-400 px-1 text-[10px] text-gray-400 rounded">HD</span>
                        </div>

                        {loading ? (
                            <div className="h-24 bg-gray-800 animate-pulse rounded"></div>
                        ) : (
                            <>
                                <p className="text-lg leading-relaxed text-gray-200">
                                    {details?.Plot || 'No plot description available.'}
                                </p>
                            </>
                        )}
                    </div>

                    <div className="space-y-4 text-gray-400">
                        <div>
                            <span className="text-gray-500">Cast:</span> {details?.Actors || 'Information not available'}
                        </div>
                        <div>
                            <span className="text-gray-500">Genres:</span> {details?.Genre || 'Information not available'}
                        </div>
                        <div>
                            <span className="text-gray-500">Director:</span> {details?.Director || 'Information not available'}
                        </div>
                        <div>
                            <span className="text-gray-500">Awards:</span> {details?.Awards || 'n/a'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailModal;
