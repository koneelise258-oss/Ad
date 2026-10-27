import React, { useState } from 'react';
import { EventItem } from '../types';
import {
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface EventsViewProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onToggleRegister: (eventId: string) => void;
  onOpenShare: (title: string, summary: string) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({
  events,
  onSelectEvent,
  onToggleRegister
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Prière', 'Jeunesse', 'Femmes', 'Évangélisation'];

  const filteredEvents = events.filter(
    (ev) => selectedCategory === 'all' || ev.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-20">
      <div>
        <div className="flex items-center gap-2 text-xs text-[#2854A6] font-bold uppercase tracking-wider mb-1">
          <span>Agenda & Rassemblements</span>
          <span>·</span>
          <span>Anyama, Ran-Extension Résidentiel</span>
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#173567]">
          Événements & Programmes Spéciaux
        </h1>
        <p className="text-sm text-[#343B46]/80 mt-1 max-w-2xl">
          Découvrez les veillées de prière, retraites spirituelles de jeunesse, séminaires et campagnes d’évangélisation prévues dans la commune d’Anyama.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#2854A6] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-[#343B46] hover:bg-[#F4F6F9]'
            }`}
          >
            {cat === 'all' ? 'Tous les événements' : cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#2854A6] transition-colors"
          >
            <div className="relative aspect-16/9 bg-[#173567]">
              <img
                src={ev.coverImage}
                alt={ev.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173567]/80 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-white text-xs font-semibold">
                {ev.category}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-xs text-white/80 font-medium block">
                  {ev.date}
                </span>
                <h3 className="font-heading font-bold text-lg text-white leading-tight">
                  {ev.title}
                </h3>
              </div>
            </div>

            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-[#343B46]/80">
                    <Clock className="w-3.5 h-3.5 text-[#2854A6] shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#343B46]/80">
                    <MapPin className="w-3.5 h-3.5 text-[#2854A6] shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </div>
                </div>

                {ev.speaker && (
                  <div className="p-2.5 rounded-lg bg-[#F4F6F9] border-l-3 border-[#2854A6] text-xs text-[#343B46]">
                    <span className="font-semibold text-[#173567]">Orateur / Responsable :</span> {ev.speaker}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-[#343B46] leading-relaxed">
                  {ev.description}
                </p>
              </div>

              {/* Action row */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-[#343B46]/70 font-medium">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{ev.attendeesCount} participants</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectEvent(ev)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#F4F6F9] hover:bg-slate-200 text-[#173567] text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Détails</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleRegister(ev.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      ev.isRegistered
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#2854A6] hover:bg-[#1f4489] text-white'
                    }`}
                  >
                    {ev.isRegistered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Inscrit</span>
                      </>
                    ) : (
                      <span>Je participe</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
