import React from 'react';
import type { Movie } from '../types';
import { Play, Plus, Info } from 'lucide-react';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="group relative bg-[#141414] rounded-md overflow-hidden transition-all duration-300 hover:scale-110 hover:z-10 shadow-lg cursor-pointer">
            <div className="aspect-[2/3] w-full relative">
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play fill="white" size={48} className="text-white" />
                </div>
            </div>

            <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-white font-bold text-sm truncate">{movie.Title}</h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-green-500 font-bold text-xs">{movie.Year}</span>
                    <span className="border border-gray-500 px-1 text-[10px] text-gray-400 rounded uppercase">{movie.Type}</span>
                </div>
                <div className="flex gap-2 mt-3">
                    <button
                        className="bg-white text-black rounded-full p-1.5 hover:bg-white/80 transition shadow-md active:scale-90"
                        onClick={(e) => { e.stopPropagation(); alert(`Playing: ${movie.Title}`); }}
                    >
                        <Play fill="black" size={14} />
                    </button>
                    <button
                        className="border-2 border-gray-500 text-white rounded-full p-1.5 hover:border-white transition shadow-md active:scale-90"
                        onClick={(e) => { e.stopPropagation(); alert(`Added ${movie.Title} to My List`); }}
                    >
                        <Plus size={14} />
                    </button>
                    <button
                        className="border-2 border-gray-500 text-white rounded-full p-1.5 hover:border-white transition shadow-md ml-auto active:scale-90"
                        onClick={(e) => { e.stopPropagation(); alert(`Information about ${movie.Title} (${movie.Year})`); }}
                    >
                        <Info size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
