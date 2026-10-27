import React from 'react';
import { PageView } from '../types';
import { Home, BookOpen, Calendar, Image as ImageIcon, Users } from 'lucide-react';

interface MobileBottomNavProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePage,
  onNavigate
}) => {
  const isCulteActive = activePage === 'cultes' || activePage === 'culte-detail';
  const isDeptActive = activePage === 'departements' || activePage === 'departement-detail';

  return (
    <nav
      aria-label="Navigation principale mobile"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-sm px-2 pb-safe"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto">
        {/* Accueil */}
        <button
          onClick={() => onNavigate('accueil')}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] rounded-lg transition-colors ${
            activePage === 'accueil' ? 'text-[#2854A6] font-bold' : 'text-[#343B46]/70 hover:text-[#173567]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight whitespace-nowrap">Accueil</span>
        </button>

        {/* Cultes */}
        <button
          onClick={() => onNavigate('cultes')}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] rounded-lg transition-colors ${
            isCulteActive ? 'text-[#2854A6] font-bold' : 'text-[#343B46]/70 hover:text-[#173567]'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight whitespace-nowrap">Cultes</span>
        </button>

        {/* Événements */}
        <button
          onClick={() => onNavigate('evenements')}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] rounded-lg transition-colors ${
            activePage === 'evenements' ? 'text-[#2854A6] font-bold' : 'text-[#343B46]/70 hover:text-[#173567]'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight whitespace-nowrap">Événements</span>
        </button>

        {/* Galerie */}
        <button
          onClick={() => onNavigate('galerie')}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] rounded-lg transition-colors ${
            activePage === 'galerie' ? 'text-[#2854A6] font-bold' : 'text-[#343B46]/70 hover:text-[#173567]'
          }`}
        >
          <ImageIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight whitespace-nowrap">Galerie</span>
        </button>

        {/* Départements */}
        <button
          onClick={() => onNavigate('departements')}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] rounded-lg transition-colors ${
            isDeptActive ? 'text-[#2854A6] font-bold' : 'text-[#343B46]/70 hover:text-[#173567]'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight whitespace-nowrap">Groupes</span>
        </button>
      </div>
    </nav>
  );
};
