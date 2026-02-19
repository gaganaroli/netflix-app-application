import React from 'react';
import { X, Check } from 'lucide-react';

interface MoviePlayerProps {
    movieTitle: string;
    onClose: () => void;
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({ movieTitle, onClose }) => {
    // We'll use a YouTube search URL to find the trailer
    const trailerSearchUrl = `https://www.youtube.com/embed?listType=search&list=${movieTitle}+official+trailer&autoplay=1`;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-5xl aspect-video bg-netflix-black rounded-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300">
                {/* Controls Overlay (Top) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Video Embed */}
                <iframe
                    src={trailerSearchUrl}
                    title={`${movieTitle} Trailer`}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>

                {/* Info Overlay (Bottom) - Appears on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                    <h2 className="text-3xl font-bold mb-2">{movieTitle}</h2>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1 text-green-500 font-bold">
                            <Check size={16} /> 98% Match
                        </div>
                        <span className="text-gray-400">2024</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviePlayer;
