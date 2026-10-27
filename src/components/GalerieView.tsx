import React, { useState } from 'react';
import { AlbumItem } from '../types';
import {
  Image as ImageIcon,
  Video,
  Play
} from 'lucide-react';

interface GalerieViewProps {
  albums: AlbumItem[];
  onSelectAlbum: (album: AlbumItem) => void;
  onOpenShare: (title: string, summary: string) => void;
}

export const GalerieView: React.FC<GalerieViewProps> = ({
  albums,
  onSelectAlbum
}) => {
  const [selectedType, setSelectedType] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Cultes', 'Jeunesse', 'Chorale & Louange'];

  const filteredAlbums = albums.filter((alb) => {
    const matchType =
      selectedType === 'all' ||
      alb.type === selectedType ||
      (alb.type === 'mixte' && (selectedType === 'photo' || selectedType === 'video'));
    const matchCat = selectedCategory === 'all' || alb.category === selectedCategory;
    return matchType && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-24">
      <div>
        <div className="flex items-center gap-2 text-xs text-[#2854A6] font-bold uppercase tracking-wider mb-1">
          <span>Photothèque & Vidéothèque</span>
          <span>·</span>
          <span>Anyama</span>
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#173567]">
          Galerie Photos & Vidéos
        </h1>
        <p className="text-sm text-[#343B46]/80 mt-1 max-w-2xl">
          Découvrez la vie de notre église à travers nos célébrations, rassemblements de jeunesse, répétitions chorales et sorties fraternelles.
        </p>
      </div>

      {/* Filter tabs: Type and Categories */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        {/* Media type toggle */}
        <div className="flex items-center gap-1 p-1 bg-[#F4F6F9] rounded-xl">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedType === 'all'
                ? 'bg-[#2854A6] text-white shadow-xs'
                : 'text-[#343B46] hover:text-[#173567]'
            }`}
          >
            Tous les médias
          </button>
          <button
            onClick={() => setSelectedType('photo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedType === 'photo'
                ? 'bg-[#2854A6] text-white shadow-xs'
                : 'text-[#343B46] hover:text-[#173567]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photos</span>
          </button>
          <button
            onClick={() => setSelectedType('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedType === 'video'
                ? 'bg-[#2854A6] text-white shadow-xs'
                : 'text-[#343B46] hover:text-[#173567]'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Vidéos</span>
          </button>
        </div>

        {/* Categories selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === c
                  ? 'bg-[#2854A6] text-white shadow-xs'
                  : 'text-[#343B46] hover:bg-[#F4F6F9]'
              }`}
            >
              {c === 'all' ? 'Toutes les catégories' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Albums Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlbums.map((alb) => (
          <div
            key={alb.id}
            onClick={() => onSelectAlbum(alb)}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#2854A6] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 bg-[#173567] overflow-hidden">
              <img
                src={alb.coverImage}
                alt={alb.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173567]/90 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold">
                  {alb.type === 'video' ? 'Vidéo' : alb.type === 'mixte' ? 'Mixte' : 'Photos'}
                </span>
                <span className="px-2 py-0.5 rounded bg-black/50 text-white/90 text-[10px]">
                  {alb.mediaCount} médias
                </span>
              </div>

              {alb.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#2854A6]/90 text-white flex items-center justify-center pl-0.5 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                </div>
              )}

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] text-white/80 font-medium block">
                  {alb.category} · {alb.date}
                </span>
                <h3 className="font-heading font-bold text-base text-white leading-snug">
                  {alb.title}
                </h3>
              </div>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <p className="text-xs text-[#343B46] line-clamp-2 leading-relaxed">
                {alb.description}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#2854A6] font-semibold">
                <span>Ouvrir l'album</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
