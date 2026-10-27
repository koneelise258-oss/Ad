import React, { useState } from 'react';
import { NewsItem } from '../types';
import {
  User,
  ArrowRight,
  ShieldAlert,
  Eye
} from 'lucide-react';

interface NewsViewProps {
  news: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
  onOpenShare: (title: string, summary: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  news,
  onSelectNews
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Communiqué officiel', 'Vie de l’église'];

  const filteredNews = news.filter(
    (n) => activeCategory === 'all' || n.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-24">
      <div>
        <div className="flex items-center gap-2 text-xs text-[#2854A6] font-bold uppercase tracking-wider mb-1">
          <span>Communication & Avis Pastoraux</span>
          <span>·</span>
          <span>Anyama, Ran-Extension Résidentiel</span>
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#173567]">
          Actualités & Communiqués
        </h1>
        <p className="text-sm text-[#343B46]/80 mt-1 max-w-2xl">
          Retrouvez les annonces pastorales, les notes du conseil, les avis de formation et les communiqués urgents de l'église d'Anyama.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCategory === c
                ? 'bg-[#2854A6] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-[#343B46] hover:bg-[#F4F6F9]'
            }`}
          >
            {c === 'all' ? 'Toutes les publications' : c}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            onClick={() => onSelectNews(item)}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-[#2854A6] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {item.isUrgent && (
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 font-semibold text-[11px] flex items-center gap-1 border border-rose-200">
                    <ShieldAlert className="w-3 h-3 text-rose-600" />
                    <span>Communiqué Urgent</span>
                  </span>
                )}
                <span className="font-semibold text-[#2854A6]">{item.category}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-[#343B46]/70">{item.date}</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-[#343B46]/70 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{item.readsCount} lectures</span>
                </span>
              </div>

              <h2 className="font-heading font-bold text-lg sm:text-xl text-[#173567] leading-snug">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#343B46] leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#343B46]/70 font-medium">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.author}</span>
              </div>

              <span className="text-[#2854A6] font-semibold flex items-center gap-1">
                <span>Lire le communiqué</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
