import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const YOUTUBE_VIDEO_ID = 'RSF8KL3xaIk';
const YOUTUBE_WATCH_URL = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`;
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&enablejsapi=1`;

export default function Video() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
        setShowControls(true);
        // Hide controls after 3 seconds
        setTimeout(() => setShowControls(false), 3000);
    };

    const handlePause = () => {
        setIsPlaying(false);
        setShowControls(false);
    };

    const handleMouseEnter = () => {
        if (isPlaying) {
            setShowControls(true);
        }
    };

    const handleMouseLeave = () => {
        if (isPlaying) {
            setShowControls(false);
        }
    };

    const handleOpenYouTube = () => {
        window.open(YOUTUBE_WATCH_URL, '_blank');
    };

    return (
        <section className="w-full px-4">
            <div className="container mx-auto">
                <div
                    className="relative flex h-[610px] items-center justify-center overflow-hidden rounded-3xl bg-zinc-300"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {!isPlaying ? (
                        <>
                            {/* Video Thumbnail */}
                            <img
                                className="h-full w-full object-cover cursor-pointer"
                                src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                                alt="Video thumbnail"
                                onClick={handleOpenYouTube}
                            />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                                <button
                                    type="button"
                                    onClick={handlePlay}
                                    className="pointer-events-auto flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-b from-red-600 to-stone-950 outline-1 outline-white/40 transition-opacity hover:opacity-90"
                                    aria-label="Play video"
                                >
                                    <Play className="h-16 w-16 text-white fill-white ml-1" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* YouTube Video Embed */}
                            <iframe
                                className="h-full w-full"
                                src={YOUTUBE_EMBED_URL}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />

                            {/* Pause Button Overlay - Shows when playing and controls are visible */}
                            {showControls && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <button
                                        type="button"
                                        onClick={handlePause}
                                        className="pointer-events-auto flex h-40 w-40 items-center justify-center rounded-full bg-black/50 outline-1 outline-white/40 transition-opacity hover:opacity-90"
                                        aria-label="Pause video"
                                    >
                                        <Pause className="h-16 w-16 text-white fill-white" />
                                    </button>
                                </div>
                            )}

                            {/* Fallback for embedding disabled - Shows on hover */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-8 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                                <p className="mb-4 text-center text-sm">
                                    If video is unavailable, click to watch on YouTube
                                </p>
                                <button
                                    type="button"
                                    onClick={handleOpenYouTube}
                                    className="pointer-events-auto rounded-2xl bg-gradient-to-b from-red-600 to-stone-950 px-6 py-3 text-white transition-opacity hover:opacity-90"
                                >
                                    Watch on YouTube
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
