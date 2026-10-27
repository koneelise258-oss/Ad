import React, { useState } from 'react';
import { EventItem } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Share2,
  ArrowLeft,
  ChevronRight,
  User,
  CalendarPlus
} from 'lucide-react';

interface EventDetailPageProps {
  event: EventItem;
  onBack: () => void;
  onToggleRegister: (eventId: string) => void;
  onOpenShare: (title: string, summary: string) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  event,
  onBack,
  onToggleRegister,
  onOpenShare
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-24">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-3 bg-[#173567] text-white text-xs font-medium rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white/60 hover:text-white text-xs">
            Fermer
          </button>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav aria-label="Fil d'Ariane" className="flex items-center justify-between gap-3 text-xs text-[#343B46]/70 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-1.5 truncate">
          <button
            onClick={onBack}
            className="hover:text-[#173567] transition-colors font-medium flex items-center gap-1 shrink-0 text-[#173567]"
          >
            <ArrowLeft className="w-4 h-4 text-[#2854A6]" />
            <span>Retour aux événements</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate text-slate-400">{event.title}</span>
        </div>

        <button
          onClick={() => onOpenShare(event.title, event.description)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F6F9] hover:bg-slate-200 text-[#173567] text-xs font-semibold border border-slate-200 transition-colors shrink-0"
        >
          <Share2 className="w-3.5 h-3.5 text-[#2854A6]" />
          <span>Partager</span>
        </button>
      </nav>

      <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Cover Photo */}
        <div className="relative aspect-16/9 max-h-[380px] w-full bg-[#173567] overflow-hidden">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173567]/90 via-black/30 to-transparent" />

          <div className="absolute top-4 left-4">
            <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-xs font-semibold">
              {event.category}
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 text-white">
            <span className="text-xs text-white/80 font-medium block mb-1">
              {event.date}
            </span>
            <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-white leading-tight">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Info Grid */}
        <div className="p-5 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#F4F6F9] border border-slate-200 text-xs">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#2854A6] shrink-0" />
              <div>
                <span className="text-[#343B46]/60 block text-[10px] uppercase font-semibold">Date</span>
                <span className="font-medium text-[#173567]">{event.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#2854A6] shrink-0" />
              <div>
                <span className="text-[#343B46]/60 block text-[10px] uppercase font-semibold">Horaire</span>
                <span className="font-medium text-[#173567]">{event.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#2854A6] shrink-0" />
              <div className="truncate">
                <span className="text-[#343B46]/60 block text-[10px] uppercase font-semibold">Lieu</span>
                <span className="font-medium text-[#173567] truncate block">{event.location}</span>
              </div>
            </div>
          </div>

          {event.speaker && (
            <div className="p-4 rounded-xl bg-[#F4F6F9] border-l-4 border-[#2854A6] text-xs flex items-center gap-3">
              <User className="w-5 h-5 text-[#2854A6] shrink-0" />
              <div>
                <span className="font-semibold text-[#173567] block">Orateur / Intervenant principal</span>
                <span className="text-[#343B46]">{event.speaker}</span>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-heading font-bold text-base text-[#173567] mb-2">
              Description du programme
            </h3>
            <p className="text-xs sm:text-sm text-[#343B46] leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Action strip */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#343B46]/70 font-medium">
              <Users className="w-4 h-4 text-slate-400" />
              <span>{event.attendeesCount} participants inscrits ou intéressés</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  showNotification(`Rappel programmé pour : ${event.title}`);
                }}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-[#343B46] text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <CalendarPlus className="w-4 h-4 text-[#2854A6]" />
                <span>Ajouter à mon agenda</span>
              </button>

              <button
                onClick={() => onToggleRegister(event.id)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  event.isRegistered
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-[#2854A6] hover:bg-[#1f4489] text-white'
                }`}
              >
                {event.isRegistered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Inscrit(e)</span>
                  </>
                ) : (
                  <span>Confirmer ma présence</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
