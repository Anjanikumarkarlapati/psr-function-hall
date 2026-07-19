'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { glass } from '@/styles/glass';
import { VideoPreviewTile } from './VideoPreviewTile';

const VIDEOS = [
  { id: 1, src: '/videos/hall-tour-1.mp4', label: 'Hall Interior' },
  { id: 2, src: '/videos/hall-tour-2.mp4', label: 'Grand Setup' },
  { id: 3, src: '/videos/hall-tour-3.mp4', label: 'Event Decoration' },
  { id: 4, src: '/videos/hall-tour-4.mp4', label: 'Venue Overview' },
  { id: 5, src: '/videos/hall-tour-5.mp4', label: 'Celebration Moments' },
];

export function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { t } = useTranslation();

  return (
    <section className="py-14 sm:py-24 px-3 sm:px-4 bg-dark-card">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-14">
          <span
            className="inline-block text-gold text-[9px] tracking-[0.48em] uppercase px-3 py-1.5 mb-4 sm:mb-5"
            style={glass.gold as React.CSSProperties}
          >
            {t.home.videoLabel}
          </span>
          <h2 className="text-[24px] sm:text-4xl text-cream font-light mb-3 font-display">
            {t.home.videoHeading}{' '}
            <span className="text-gold-light font-semibold italic">
              {t.home.videoHeadingAccent}
            </span>
          </h2>
          <div className="flex items-center gap-3 justify-center my-2">
            <div className="h-[1px] w-12 bg-gold/40" />
            <div className="w-1 h-1 rounded-full bg-gold/70" />
            <div className="h-[1px] w-12 bg-gold/40" />
          </div>
          <p className="text-silver text-xs sm:text-sm mt-4 max-w-md mx-auto leading-relaxed">
            {t.home.videoSubtitle}
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {VIDEOS.map((video) => (
            <VideoPreviewTile key={video.id} video={video} onPlay={setActiveVideo} />
          ))}

          {/* CTA tile */}
          <div
            className="relative flex flex-col items-center justify-center text-center p-6 sm:p-8 gap-3 sm:gap-4 h-[180px] sm:h-[240px] rounded-xl"
            style={glass.dark as React.CSSProperties}
          >
            <div className="w-8 h-[1px] bg-gold/40" />
            <div>
              <div className="text-white/75 text-[15px] sm:text-[16px] font-light mb-1 font-display">
                {t.home.videoCta}
              </div>
              <div className="text-silver text-xs leading-relaxed">
                {t.home.videoCtaDesc}
              </div>
            </div>
            <a
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-dark font-bold text-[10px] tracking-widest uppercase hover:bg-gold-bright active:bg-gold-bright transition-colors touch-manipulation"
            >
              {t.home.heroBookBtn}
            </a>
            <div className="w-8 h-[1px] bg-gold/20" />
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/70 hover:text-white active:text-white transition-colors z-10 p-2 touch-manipulation"
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
          >
            <X size={28} />
          </button>
          <video
            src={activeVideo}
            className="w-full h-full object-contain"
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
