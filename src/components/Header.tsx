import React from 'react';
import { PageView } from '../types';
import { ChurchLogo } from './ChurchLogo';
import { Bell, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenNotifications: () => void;
  logoUrl?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onOpenNotifications,
  logoUrl
}) => {
  const isCulteActive = activePage === 'cultes' || activePage === 'culte-detail';
  const isEventActive = activePage === 'evenements' || activePage === 'evenement-detail';
  const isGalerieActive = activePage === 'galerie' || activePage === 'album-detail';
  const isNewsActive = activePage === 'actualites' || activePage === 'actualite-detail';
  const isDeptActive = activePage === 'departements' || activePage === 'departement-detail';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top minimal strip in Deep Navy #173567 */}
      <div className="bg-[#173567] text-[#F4F6F9] px-4 py-1.5 text-[11px] font-medium flex items-center justify-between border-b border-[#2854A6]/40">
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <span className="text-[#FFFFFF] bg-[#2854A6] px-2 py-0.5 rounded font-semibold uppercase tracking-wider text-[10px]">
            Site Officiel
          </span>
          <span className="text-white/40">·</span>
          <span className="truncate text-white/90">
            Église Évangélique des Assemblées de Dieu de Côte d’Ivoire
          </span>
          <span className="text-white/40 hidden sm:inline">·</span>
          <span className="text-white/80 hidden sm:inline">
            Anyama, Ran-Extension Résidentiel
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('admin')}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#2854A6] hover:bg-[#1f4489] text-white transition-colors text-[11px] font-medium"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Espace Com</span>
          </button>
        </div>
      </div>

      {/* Main Top Bar in White #FFFFFF */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <button
          onClick={() => onNavigate('accueil')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2854A6] rounded-lg p-1"
        >
          <ChurchLogo logoUrl={logoUrl} size="md" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#2854A6] leading-none mb-0.5">
              Église Évangélique des Assemblées de Dieu
            </span>
            <span className="font-heading font-bold text-sm sm:text-base text-[#173567] tracking-tight leading-tight group-hover:text-[#2854A6] transition-colors">
              Anyama, Ran-Extension Résidentiel
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#343B46]">
          <button
            onClick={() => onNavigate('accueil')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#173567] pb-0.5 ${
              activePage === 'accueil' ? 'text-[#2854A6] font-bold border-b-2 border-[#2854A6]' : ''
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => {
              if (activePage !== 'accueil') {
                onNavigate('accueil');
                setTimeout(() => {
                  const el = document.getElementById('horaires');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                const el = document.getElementById('horaires');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-[#173567] pb-0.5 text-[#343B46]"
          >
            Horaires
          </button>
          <button
            onClick={() => onNavigate('cultes')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#173567] pb-0.5 ${
              isCulteActive ? 'text-[#2854A6] font-bold border-b-2 border-[#2854A6]' : ''
            }`}
          >
            Cultes & Prédications
          </button>
          <button
            onClick={() => onNavigate('evenements')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#173567] pb-0.5 ${
              isEventActive ? 'text-[#2854A6] font-bold border-b-2 border-[#2854A6]' : ''
            }`}
          >
            Événements
          </button>
          <button
            onClick={() => onNavigate('galerie')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#173567] pb-0.5 ${
              isGalerieActive ? 'text-[#2854A6] font-bold border-b-2 border-[#2854A6]' : ''
            }`}
          >
            Galerie Photos & Vidéos
          </button>
          <button
            onClick={() => onNavigate('actualites')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#173567] pb-0.5 ${
              isNewsActive ? 'text-[#2854A6] font-bold border-b-2 border-[#2854A6]' : ''
            }`}
          >
            Actualités
          </button>
          <button
            onClick={() => onNavigate('departements')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#173567] pb-0.5 ${
              isDeptActive ? 'text-[#2854A6] font-bold border-b-2 border-[#2854A6]' : ''
            }`}
          >
            Départements
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenNotifications}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#173567] bg-[#F4F6F9] hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 whitespace-nowrap shrink-0 min-h-[40px]"
          >
            <Bell className="w-3.5 h-3.5 text-[#2854A6]" />
            <span className="hidden sm:inline">Recevoir les alertes</span>
            <span className="sm:hidden">Alertes</span>
          </button>
        </div>
      </div>
    </header>
  );
};
