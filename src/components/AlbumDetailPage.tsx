import React, { useState } from 'react';
import { AlbumItem } from '../types';
import {
  Share2,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

interface AlbumDetailPageProps {
  album: AlbumItem;
  onBack: () => void;
  onOpenShare: (title: string, summary: string) => void;
}

export const AlbumDetailPage: React.FC<AlbumDetailPageProps> = ({
  album,
  onBack,
  onOpenShare
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);

  const activeMedia = album.items && album.items[selectedPhotoIndex];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-24">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Fil d'Ariane" className="flex items-center justify-between gap-3 text-xs text-[#343B46]/70 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-1.5 truncate">
          <button
            onClick={onBack}
            className="hover:text-[#173567] transition-colors font-medium flex items-center gap-1 shrink-0 text-[#173567]"
          >
            <ArrowLeft className="w-4 h-4 text-[#2854A6]" />
            <span>Retour à la galerie</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate text-slate-400">{album.title}</span>
        </div>

        <button
          onClick={() => onOpenShare(album.title, album.description)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F6F9] hover:bg-slate-200 text-[#173567] text-xs font-semibold border border-slate-200 transition-colors shrink-0"
        >
          <Share2 className="w-3.5 h-3.5 text-[#2854A6]" />
          <span>Partager l'album</span>
        </button>
      </nav>

      {/* Album Header Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#343B46]/70 font-medium">
          <span className="text-[#2854A6] font-bold">{album.category}</span>
          <span aria-hidden="true">·</span>
          <span>{album.date}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">{album.mediaCount} médias</span>
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#173567]">
          {album.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#343B46] max-w-3xl leading-relaxed">
          {album.description}
        </p>
      </div>

      {/* Main Focus Media View (Video or Large Photo) */}
      {activeMedia && (
        <div className="bg-[#173567] rounded-2xl overflow-hidden shadow-xs border border-slate-800">
          {activeMedia.type === 'video' ? (
            <div className="aspect-video w-full max-h-[500px]">
              <iframe
                title={activeMedia.caption || album.title}
                src={activeMedia.url}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative aspect-16/10 max-h-[500px] w-full flex items-center justify-center bg-black">
              <img
                src={activeMedia.url}
                alt={activeMedia.caption || album.title}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          {activeMedia.caption && (
            <div className="p-3 bg-[#173567]/90 text-white text-xs text-center border-t border-white/10">
              {activeMedia.caption}
            </div>
          )}
        </div>
      )}

      {/* Media Thumbnails Grid */}
      <div className="space-y-3 pt-2">
        <h3 className="font-heading font-bold text-base text-[#173567]">
          Tous les éléments de cet album ({album.items.length})
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {album.items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedPhotoIndex(idx)}
              className={`group relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border transition-all text-left ${
                selectedPhotoIndex === idx
                  ? 'ring-2 ring-[#2854A6] border-transparent shadow-xs'
                  : 'border-slate-200 hover:border-[#2854A6]'
              }`}
            >
              <img
                src={item.url}
                alt={item.caption || `Média ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-1.5 left-1.5 right-1.5 text-white text-[10px] font-medium truncate opacity-0 group-hover:opacity-100 transition-opacity">
                {item.type === 'video' ? '▶ Vidéo' : `Photo ${idx + 1}`}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
