import React from 'react';
import { Culte, EventItem, NewsItem, AlbumItem, DepartmentItem, PageView } from '../types';
import { ChurchLogo } from './ChurchLogo';
import {
  HERO_IMAGE,
  CHURCH_INFO
} from '../mockData';
import {
  Calendar,
  ArrowRight,
  BookOpen,
  Share2,
  MapPin,
  Phone,
  Mail,
  Play,
  Clock,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';

interface HomeViewProps {
  cultes: Culte[];
  events: EventItem[];
  news: NewsItem[];
  albums: AlbumItem[];
  departments: DepartmentItem[];
  onSelectCulte: (culte: Culte) => void;
  onSelectEvent: (event: EventItem) => void;
  onSelectDepartment: (dept: DepartmentItem) => void;
  onSelectNews: (item: NewsItem) => void;
  onSelectAlbum: (album: AlbumItem) => void;
  onNavigate: (page: PageView) => void;
  onOpenNotifications: () => void;
  onOpenShare: (title: string, summary: string) => void;
  logoUrl?: string | null;
}

export const HomeView: React.FC<HomeViewProps> = ({
  cultes,
  events,
  news,
  albums,
  departments,
  onSelectCulte,
  onSelectEvent,
  onSelectDepartment,
  onSelectNews,
  onSelectAlbum,
  onNavigate,
  onOpenNotifications,
  onOpenShare,
  logoUrl
}) => {
  const latestCulte = cultes[0];
  const upcomingEvents = events.slice(0, 3);
  const latestNews = news.slice(0, 2);
  const featuredAlbums = albums.slice(0, 2);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Hero Section - Fond Bleu Foncé Officiel #173567 avec Grand Visuel */}
      <section className="relative bg-[#173567] text-white overflow-hidden rounded-b-3xl sm:rounded-3xl shadow-sm border border-[#2854A6]/30">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Assemblée de Dieu d'Anyama - Culte et Adoration"
            className="w-full h-full object-cover opacity-25 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173567] via-[#173567]/80 to-[#173567]/40" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-8 py-14 sm:py-20 md:py-24 space-y-6">
          {/* National & Parish Hierarchy Tag */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/90 font-medium tracking-wide">
            <span className="text-[#FFFFFF] font-bold uppercase tracking-wider text-[11px] bg-white/15 px-2 py-0.5 rounded">
              Église Évangélique des Assemblées de Dieu de Côte d’Ivoire
            </span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span className="text-white font-semibold">Anyama, Ran-Extension Résidentiel</span>
          </div>

          <h1 className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight text-white leading-tight max-w-3xl text-balance">
            Une église unie pour adorer Dieu, grandir dans la foi et impacter Anyama.
          </h1>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl">
            Bienvenue sur la plateforme officielle de l’Église Évangélique des Assemblées de Dieu d'Anyama, Ran-Extension Résidentiel. Retrouvez les résumés complets de nos cultes, les prédications, nos programmes et la vie des départements.
          </p>

          {/* Action buttons (Touch-friendly 44px+) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => latestCulte && onSelectCulte(latestCulte)}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#2854A6] hover:bg-[#1f4489] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Consulter le dernier culte</span>
            </button>

            <button
              onClick={() => onNavigate('evenements')}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Programmes & Événements</span>
            </button>
          </div>

          {/* Weekly Schedule Strip - Exclusivement les 3 rassemblements officiels */}
          <div className="pt-6 border-t border-white/15">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-semibold text-white/90 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FFFFFF]" />
                Rassemblements réguliers officiels
              </span>
              <a
                href="#horaires"
                className="text-[11px] text-white/80 hover:text-white underline font-medium"
              >
                Détails des créneaux
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold block text-xs">Mardi</span>
                  <span className="text-white font-mono text-[11px] bg-white/15 px-2 py-0.5 rounded font-semibold">18 h 30 – 20 h 00</span>
                </div>
                <span className="text-white/80 font-medium block mt-1">Évangélisation & Prière pour les malades</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold block text-xs">Jeudi</span>
                  <span className="text-white font-mono text-[11px] bg-white/15 px-2 py-0.5 rounded font-semibold">18 h 30 – 20 h 00</span>
                </div>
                <span className="text-white/80 font-medium block mt-1">Édification</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/20 border border-white/30 backdrop-blur-xs ring-1 ring-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold block text-xs">Dimanche</span>
                  <span className="text-white font-mono text-[11px] bg-[#2854A6] px-2 py-0.5 rounded font-bold shadow-xs">7 h 30 – 11 h 00</span>
                </div>
                <span className="text-white font-semibold block mt-1">Culte de louange & d’adoration à l’Éternel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION DÉDIÉE : HORAIRES OFFICIELS DES RASSEMBLEMENTS (#horaires) */}
      <section id="horaires" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 md:p-10 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F6F9] border border-slate-200 text-[#2854A6] text-xs font-bold uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5 text-[#2854A6]" />
                <span>Horaires Réguliers Officiels</span>
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#173567]">
                Nos 3 Rassemblements de la Semaine
              </h2>
              <p className="text-sm text-[#343B46]/80 mt-1 max-w-2xl">
                L’Église Évangélique des Assemblées de Dieu d’Anyama, Ran-Extension Résidentiel vous accueille chaleureusement aux trois moments spirituels officiels ci-dessous.
              </p>
            </div>

            <button
              onClick={onOpenNotifications}
              className="px-4 py-2.5 rounded-xl bg-[#2854A6] hover:bg-[#1f4489] text-white text-xs font-semibold transition-colors flex items-center gap-2 self-start md:self-auto shrink-0 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Recevoir un rappel avant le culte</span>
            </button>
          </div>

          {/* Les 3 créneaux officiels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Mardi */}
            <div className="rounded-2xl border-2 border-slate-200 p-5 bg-[#F4F6F9]/60 hover:border-[#2854A6] transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-heading font-bold text-base text-[#173567]">
                    Mardi
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[#173567] font-mono font-bold text-xs">
                    18 h 30 – 20 h 00
                  </span>
                </div>
                <div className="mt-3 space-y-1.5">
                  <h3 className="font-heading font-semibold text-sm text-[#173567]">
                    Évangélisation et prière pour les malades
                  </h3>
                  <p className="text-xs text-[#343B46]/80 leading-relaxed">
                    Proclamation vivante de la Bonne Nouvelle de l’Évangile, annonce du salut en Jésus-Christ et temps d’intercession fervente pour la guérison divine, la délivrance et le soulagement des malades.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[11px] text-[#343B46]/70 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2854A6] shrink-0" />
                <span>Sanctuaire · Anyama, Ran-Extension Résidentiel</span>
              </div>
            </div>

            {/* 2. Jeudi */}
            <div className="rounded-2xl border-2 border-slate-200 p-5 bg-[#F4F6F9]/60 hover:border-[#2854A6] transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-heading font-bold text-base text-[#173567]">
                    Jeudi
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[#173567] font-mono font-bold text-xs">
                    18 h 30 – 20 h 00
                  </span>
                </div>
                <div className="mt-3 space-y-1.5">
                  <h3 className="font-heading font-semibold text-sm text-[#173567]">
                    Édification
                  </h3>
                  <p className="text-xs text-[#343B46]/80 leading-relaxed">
                    Étude systématique et approfondissement des Saintes Écritures, enseignement doctrinal et communion fraternelle pour grandir dans la foi et affermir chaque croyant au milieu de la semaine.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[11px] text-[#343B46]/70 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2854A6] shrink-0" />
                <span>Sanctuaire · Anyama, Ran-Extension Résidentiel</span>
              </div>
            </div>

            {/* 3. Dimanche - Mise en valeur */}
            <div className="rounded-2xl border-2 border-[#2854A6] p-5 bg-gradient-to-b from-white to-[#F4F6F9] shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#2854A6] text-white text-[10px] font-bold px-3 py-0.5 rounded-bl-lg uppercase tracking-wider">
                Culte Central
              </div>
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-heading font-bold text-base text-[#173567]">
                    Dimanche
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#173567] text-white font-mono font-bold text-xs shadow-xs">
                    7 h 30 – 11 h 00
                  </span>
                </div>
                <div className="mt-3 space-y-1.5">
                  <h3 className="font-heading font-semibold text-sm text-[#173567]">
                    Culte de louange et d’adoration à l’Éternel
                  </h3>
                  <p className="text-xs text-[#343B46]/80 leading-relaxed">
                    Grand rassemblement dominical de toute la communauté : louange inspirée avec la chorale et les chantres, adoration solennelle en esprit et en vérité, prédication de la Parole et bénédiction de l’assemblée.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[11px] text-[#343B46]/70 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2854A6] shrink-0" />
                <span>Sanctuaire · Anyama, Ran-Extension Résidentiel</span>
              </div>
            </div>
          </div>

          {/* Note pastorale claire interdisant l'invention d'autres jours */}
          <div className="p-4 rounded-xl bg-[#F4F6F9] border-l-4 border-[#2854A6] text-xs text-[#343B46] space-y-1">
            <strong className="text-[#173567] font-semibold block">
              Précision officielle concernant les horaires :
            </strong>
            <p className="leading-relaxed">
              Les réunions régulières de l'église sont strictement fixées au <strong>Mardi : Évangélisation et prière pour les malades (18 h 30 – 20 h 00)</strong>, <strong>Jeudi : Édification (18 h 30 – 20 h 00)</strong> et <strong>Dimanche : Culte de louange et d’adoration à l’Éternel (7 h 30 – 11 h 00)</strong>. Aucun rassemblement régulier n’est programmé les autres jours sans avis exceptionnel émanant du Conseil Pastoral.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Dernier Culte à la Une (Surfaces blanches #FFFFFF sur fond gris clair #F4F6F9) */}
      {latestCulte && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-[#2854A6] tracking-wider uppercase block">
                Message & Prédication
              </span>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#173567]">
                Dernier Culte d’Adoration
              </h2>
            </div>
            <button
              onClick={() => onNavigate('cultes')}
              className="text-xs font-semibold text-[#2854A6] hover:text-[#173567] flex items-center gap-1 group"
            >
              <span>Tous les cultes</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Column */}
            <div className="relative lg:col-span-5 aspect-video lg:aspect-auto bg-[#173567] group">
              <img
                src={latestCulte.coverImage}
                alt={latestCulte.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173567]/90 via-[#173567]/20 to-transparent lg:hidden" />
              {latestCulte.hasVideo && (
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#173567]/80 backdrop-blur-xs text-white text-[10px] font-semibold flex items-center gap-1">
                  <Play className="w-3 h-3 text-white fill-white" />
                  <span>Vidéo disponible</span>
                </div>
              )}
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#343B46]/80">
                  <span className="font-semibold text-[#173567]">{latestCulte.date}</span>
                  <span>·</span>
                  <span>{latestCulte.time}</span>
                  <span>·</span>
                  <span className="text-[#2854A6] font-medium">{latestCulte.preacher}</span>
                  {latestCulte.isDemo && (
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500 font-medium text-[10px]">
                      Données de démonstration
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#173567] leading-snug">
                  {latestCulte.title}
                </h3>

                <div className="p-3 rounded-xl bg-[#F4F6F9] border-l-4 border-[#2854A6] text-xs text-[#343B46]">
                  <strong className="text-[#173567] font-semibold block mb-0.5">Passage biblique :</strong>
                  {latestCulte.scriptureRef}
                </div>

                <p className="text-xs sm:text-sm text-[#343B46] line-clamp-3 leading-relaxed">
                  {latestCulte.sermonSummary}
                </p>
              </div>

              {/* Action & Stats footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[#343B46]/70 font-mono">
                  <span>👍 {latestCulte.reactions.likes}</span>
                  <span>❤️ {latestCulte.reactions.hearts}</span>
                  <span>🙏 {latestCulte.reactions.prayers}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenShare(latestCulte.title, latestCulte.sermonSummary)}
                    className="p-2 rounded-lg text-[#343B46]/70 hover:text-[#173567] hover:bg-[#F4F6F9] transition-colors"
                    title="Partager"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onSelectCulte(latestCulte)}
                    className="px-4 py-2 rounded-xl bg-[#2854A6] hover:bg-[#1f4489] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>Consulter le résumé</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Événements à venir & Programmes majeurs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-[#2854A6] tracking-wider uppercase block">
              Agenda Communautaire
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#173567]">
              Prochains Événements & Veillées
            </h2>
          </div>
          <button
            onClick={() => onNavigate('evenements')}
            className="text-xs font-semibold text-[#2854A6] hover:text-[#173567] flex items-center gap-1 group"
          >
            <span>Voir le calendrier</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-[#2854A6] transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#2854A6]">{ev.category}</span>
                  <span className="text-[#343B46]/70 font-mono text-[11px]">{ev.time}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-[#173567] leading-snug">
                  {ev.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-[#343B46]">
                  <Calendar className="w-3.5 h-3.5 text-[#2854A6] shrink-0" />
                  <span className="font-medium">{ev.date}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#343B46]/70">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{ev.location}</span>
                </div>

                <p className="text-xs text-[#343B46] line-clamp-2 leading-relaxed pt-1">
                  {ev.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-[#343B46]/70 font-medium">
                  {ev.attendeesCount} participants
                </span>
                <button
                  onClick={() => onSelectEvent(ev)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F4F6F9] hover:bg-slate-200 text-[#173567] text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Détails & inscription</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Actualités et Communiqués Officiels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-[#2854A6] tracking-wider uppercase block">
              Informations Officielles
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#173567]">
              Actualités & Communiqués
            </h2>
          </div>
          <button
            onClick={() => onNavigate('actualites')}
            className="text-xs font-semibold text-[#2854A6] hover:text-[#173567] flex items-center gap-1 group"
          >
            <span>Tous les communiqués</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {latestNews.map((n) => (
            <div
              key={n.id}
              onClick={() => onSelectNews(n)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-[#2854A6] transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  {n.isUrgent && (
                    <span className="text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded text-[10px]">
                      Urgent
                    </span>
                  )}
                  <span className="text-[#2854A6] font-semibold">{n.category}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-[#343B46]/70">{n.date}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-[#173567] leading-snug">
                  {n.title}
                </h3>

                <p className="text-xs text-[#343B46] line-clamp-2 leading-relaxed">
                  {n.summary}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[#343B46]/70 font-medium">{n.author}</span>
                <span className="text-[#2854A6] font-semibold flex items-center gap-1">
                  Lire le communiqué <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Galerie Récents Albums Photos & Vidéos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-[#2854A6] tracking-wider uppercase block">
              Vie en Images
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#173567]">
              Derniers Albums Photos & Vidéos
            </h2>
          </div>
          <button
            onClick={() => onNavigate('galerie')}
            className="text-xs font-semibold text-[#2854A6] hover:text-[#173567] flex items-center gap-1 group"
          >
            <span>Toute la galerie</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredAlbums.map((alb) => (
            <div
              key={alb.id}
              onClick={() => onSelectAlbum(alb)}
              className="group relative rounded-2xl overflow-hidden bg-[#173567] aspect-16/10 cursor-pointer shadow-xs border border-slate-200"
            >
              <img
                src={alb.coverImage}
                alt={alb.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173567]/90 via-[#173567]/30 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[11px] font-semibold text-white">
                  {alb.type === 'video' ? 'Vidéo' : alb.type === 'mixte' ? 'Photos & Vidéo' : 'Photos'}
                </span>
                <span className="text-white/80 text-xs">
                  {alb.mediaCount} médias
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs text-white/80 font-medium block mb-1">
                  {alb.category} · {alb.date}
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
                  {alb.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Accès aux Départements & Groupes de l'Église */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-[#2854A6] tracking-wider uppercase block">
              Ministères & Communauté
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#173567]">
              Départements et Groupes
            </h2>
          </div>
          <button
            onClick={() => onNavigate('departements')}
            className="text-xs font-semibold text-[#2854A6] hover:text-[#173567] flex items-center gap-1 group"
          >
            <span>Toutes les structures</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Quick Department Grid with required local structures */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {departments.slice(0, 8).map((dept) => (
            <div
              key={dept.id}
              onClick={() => onSelectDepartment(dept)}
              className="bg-white rounded-xl border border-slate-200 p-4 hover:border-[#2854A6] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-[#F4F6F9] text-[#173567] font-mono text-[10px] font-bold">
                    {dept.code}
                  </span>
                  {!dept.isNameConfirmed && (
                    <span className="text-[10px] text-amber-700 font-medium">
                      À confirmer
                    </span>
                  )}
                </div>
                <h4 className="font-heading font-bold text-sm text-[#173567] line-clamp-1">
                  {dept.name}
                </h4>
                <p className="text-[11px] text-[#343B46]/80 line-clamp-2 mt-1">
                  {dept.tagline}
                </p>
              </div>

              <div className="pt-2.5 mt-2 border-t border-slate-100 text-[11px] text-[#2854A6] font-semibold flex items-center gap-1">
                <span>Découvrir</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Footer Officiel en Bleu Foncé #173567 & Localisation à Anyama */}
      <footer className="bg-[#173567] text-white/90 pt-12 pb-24 lg:pb-12 border-t border-[#2854A6]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1 : Church identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <ChurchLogo logoUrl={logoUrl} size="md" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/70 block">
                  Église Évangélique des Assemblées de Dieu de Côte d’Ivoire
                </span>
                <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                  Anyama, Ran-Extension Résidentiel
                </h3>
              </div>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              Une communauté chrétienne consacrée à la prière, à l’enseignement fidèle des Saintes Écritures et au témoignage vivant de l’Évangile de Jésus-Christ.
            </p>
            <div className="text-[11px] text-white/60">
              Plateforme officielle de communication de l’église d’Anyama, Ran-Extension Résidentiel.
            </div>
          </div>

          {/* Col 2 : Schedules */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Horaires des Rassemblements
            </h4>
            <div className="space-y-2 text-xs">
              {CHURCH_INFO.schedules.map((s, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-white/10">
                  <span className="font-medium text-white/90">{s.day} ({s.name})</span>
                  <span className="text-white font-mono">{s.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 : Contact & Location in Anyama */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Localisation & Contacts
            </h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFFFFF] shrink-0 mt-0.5" />
                <span>{CHURCH_INFO.address}, {CHURCH_INFO.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFFFFF] shrink-0" />
                <span>{CHURCH_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFFFFF] shrink-0" />
                <span>{CHURCH_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenNotifications}
                className="w-full py-2 px-3 rounded-lg bg-[#2854A6] hover:bg-[#1f4489] text-white font-semibold text-xs transition-colors"
              >
                S'abonner aux alertes WhatsApp & Web
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 mt-8 border-t border-white/10 text-center text-xs text-white/60">
          © {new Date().getFullYear()} Église Évangélique des Assemblées de Dieu de Anyama, Ran-Extension Résidentiel (Côte d’Ivoire). Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};
