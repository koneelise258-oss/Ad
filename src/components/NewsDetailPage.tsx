import React from 'react';
import { NewsItem } from '../types';
import {
  User,
  Share2,
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
  Eye
} from 'lucide-react';

interface NewsDetailPageProps {
  newsItem: NewsItem;
  onBack: () => void;
  onOpenShare: (title: string, summary: string) => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({
  newsItem,
  onBack,
  onOpenShare
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-24">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Fil d'Ariane" className="flex items-center justify-between gap-3 text-xs text-[#343B46]/70 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-1.5 truncate">
          <button
            onClick={onBack}
            className="hover:text-[#173567] transition-colors font-medium flex items-center gap-1 shrink-0 text-[#173567]"
          >
            <ArrowLeft className="w-4 h-4 text-[#2854A6]" />
            <span>Retour aux actualités</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate text-slate-400">{newsItem.title}</span>
        </div>

        <button
          onClick={() => onOpenShare(newsItem.title, newsItem.summary)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F6F9] hover:bg-slate-200 text-[#173567] text-xs font-semibold border border-slate-200 transition-colors shrink-0"
        >
          <Share2 className="w-3.5 h-3.5 text-[#2854A6]" />
          <span>Partager</span>
        </button>
      </nav>

      {/* Main Article Container */}
      <article className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="space-y-3 pb-5 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {newsItem.isUrgent && (
              <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-800 font-semibold text-[11px] flex items-center gap-1 border border-rose-200">
                <ShieldAlert className="w-3 h-3 text-rose-600" />
                <span>Communiqué Urgent</span>
              </span>
            )}
            <span className="font-semibold text-[#2854A6]">{newsItem.category}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-[#343B46]/70">{newsItem.date}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-[#343B46]/70 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{newsItem.readsCount} consultations</span>
            </span>
          </div>

          <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-[#173567] leading-tight">
            {newsItem.title}
          </h1>

          <div className="p-3.5 rounded-xl bg-[#F4F6F9] border-l-4 border-[#2854A6] text-xs text-[#343B46] flex items-center gap-2.5">
            <User className="w-4 h-4 text-[#2854A6] shrink-0" />
            <div>
              <span className="font-semibold text-[#173567]">Émetteur officiel :</span>{' '}
              <span>{newsItem.author}</span> · <span className="text-[#343B46]/70">{newsItem.authorRole}</span>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="space-y-4 text-xs sm:text-sm text-[#343B46] leading-relaxed">
          <div className="p-4 rounded-xl bg-[#F4F6F9] border border-slate-200 font-medium text-[#173567] text-xs sm:text-sm">
            {newsItem.summary}
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm space-y-4 pt-2 leading-relaxed">
            <p className="whitespace-pre-line">{newsItem.fullContent}</p>
          </div>
        </div>

        {/* Footer share action */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-[#343B46]/60">
            Église Évangélique des Assemblées de Dieu de Anyama, Ran-Extension Résidentiel
          </span>
          <button
            onClick={() => onOpenShare(newsItem.title, newsItem.summary)}
            className="flex items-center gap-1.5 text-xs text-[#2854A6] font-semibold hover:text-[#173567] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Partager cette information</span>
          </button>
        </div>
      </article>
    </div>
  );
};
