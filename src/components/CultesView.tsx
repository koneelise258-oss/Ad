import React, { useState, useMemo } from 'react';
import { Culte } from '../types';
import {
  Search,
  Calendar,
  User,
  BookOpen,
  ArrowRight,
  Play,
  Share2,
  Clock,
  Filter
} from 'lucide-react';

interface CultesViewProps {
  cultes: Culte[];
  onSelectCulte: (culte: Culte) => void;
  onOpenShare: (title: string, summary: string) => void;
}

export const CultesView: React.FC<CultesViewProps> = ({
  cultes,
  onSelectCulte,
  onOpenShare
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPreacher, setSelectedPreacher] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  const preachersList = useMemo(() => {
    const list = Array.from(new Set(cultes.map(c => c.preacher)));
    return ['all', ...list];
  }, [cultes]);

  const filteredCultes = useMemo(() => {
    return cultes.filter(c => {
      const matchSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.sermonSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.scriptureRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.preacher.toLowerCase().includes(searchTerm.toLowerCase());

      const matchPreacher = selectedPreacher === 'all' || c.preacher === selectedPreacher;

      const matchMonth =
        selectedMonth === 'all' ||
        (selectedMonth === '2026-10' && c.date.startsWith('2026-10'));

      return matchSearch && matchPreacher && matchMonth;
    });
  }, [cultes, searchTerm, selectedPreacher, selectedMonth]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-20">
      {/* Page Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#2854A6] font-bold uppercase tracking-wider mb-1">
          <span>Archives & Enseignements</span>
          <span>·</span>
          <span>Anyama, Ran-Extension Résidentiel</span>
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#173567]">
          Cultes & Prédications
        </h1>
        <p className="text-sm text-[#343B46]/80 mt-1 max-w-2xl">
          Consultez les comptes-rendus complets de nos cultes d’adoration, les références bibliques, les résumés des prédications et les supports téléchargeables.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par thème, passage biblique, orateur (ex: Philippiens, Emmanuel Kouassi, Foi)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#F4F6F9] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2854A6]"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-[#343B46]/70 font-medium mr-1">
            <Filter className="w-3.5 h-3.5 text-[#2854A6]" />
            <span>Filtres :</span>
          </div>

          {/* Preacher Selector */}
          <select
            value={selectedPreacher}
            onChange={(e) => setSelectedPreacher(e.target.value)}
            className="px-3 py-1.5 bg-[#F4F6F9] hover:bg-slate-200/70 border border-slate-200 rounded-lg text-[#343B46] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2854A6]"
          >
            <option value="all">Tous les prédicateurs</option>
            {preachersList.filter(p => p !== 'all').map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          {/* Month / Period Selector */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-1.5 bg-[#F4F6F9] hover:bg-slate-200/70 border border-slate-200 rounded-lg text-[#343B46] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2854A6]"
          >
            <option value="all">Toutes les dates</option>
            <option value="2026-10">Octobre 2026</option>
          </select>

          {(searchTerm || selectedPreacher !== 'all' || selectedMonth !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedPreacher('all');
                setSelectedMonth('all');
              }}
              className="text-xs text-[#2854A6] hover:underline font-semibold ml-2"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Services List Chronological */}
      {filteredCultes.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-[#343B46]/70">
          <p className="text-sm font-medium">Aucun culte ne correspond à votre recherche.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedPreacher('all');
            }}
            className="mt-3 px-4 py-2 bg-[#2854A6] text-white rounded-xl text-xs font-semibold"
          >
            Afficher tous les cultes
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCultes.map((culte) => (
            <article
              key={culte.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#2854A6] transition-all overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0"
            >
              {/* Media Thumbnail */}
              <div
                onClick={() => onSelectCulte(culte)}
                className="relative md:col-span-4 aspect-video md:aspect-auto bg-[#173567] cursor-pointer group"
              >
                <img
                  src={culte.coverImage}
                  alt={culte.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173567]/80 via-transparent to-transparent md:hidden" />
                {culte.hasVideo && (
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#173567]/80 backdrop-blur-xs text-white text-[10px] font-semibold flex items-center gap-1">
                    <Play className="w-3 h-3 text-white fill-white" />
                    <span>Vidéo ({culte.videoDuration})</span>
                  </div>
                )}
              </div>

              {/* Information body */}
              <div className="md:col-span-8 p-5 sm:p-6 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#343B46]/80">
                    <div className="flex items-center gap-1 font-semibold text-[#173567]">
                      <Calendar className="w-3.5 h-3.5 text-[#2854A6]" />
                      <span>{culte.date}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1 text-[#343B46]/70">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{culte.time}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1 text-[#2854A6] font-medium">
                      <User className="w-3.5 h-3.5" />
                      <span>{culte.preacher}</span>
                    </div>
                    {culte.isDemo && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500 font-medium text-[10px]">
                        Données de démonstration
                      </span>
                    )}
                  </div>

                  <h2
                    onClick={() => onSelectCulte(culte)}
                    className="font-heading font-bold text-lg sm:text-xl text-[#173567] cursor-pointer hover:text-[#2854A6] transition-colors"
                  >
                    {culte.title}
                  </h2>

                  <div className="p-2.5 rounded-lg bg-[#F4F6F9] border-l-3 border-[#2854A6] text-xs text-[#343B46] flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#2854A6] shrink-0" />
                    <span className="font-semibold text-[#173567]">Texte biblique :</span>
                    <span className="truncate">{culte.scriptureRef}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#343B46] line-clamp-2 leading-relaxed">
                    {culte.sermonSummary}
                  </p>
                </div>

                {/* Footer Reactions and CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#343B46]/70 font-mono">
                    <span>👍 {culte.reactions.likes}</span>
                    <span>❤️ {culte.reactions.hearts}</span>
                    <span>🙏 {culte.reactions.prayers}</span>
                    <span>💬 {culte.comments.length}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenShare(culte.title, culte.sermonSummary)}
                      className="p-2 rounded-lg text-[#343B46]/70 hover:text-[#173567] hover:bg-[#F4F6F9] transition-colors"
                      title="Partager"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectCulte(culte)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#2854A6] hover:bg-[#1f4489] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <span>Voir le culte complet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
