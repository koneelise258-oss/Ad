import React, { useState } from 'react';
import { DepartmentItem } from '../types';
import {
  Users,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';

interface DepartementsViewProps {
  departments: DepartmentItem[];
  onSelectDepartment: (dept: DepartmentItem) => void;
  onOpenShare: (title: string, summary: string) => void;
}

export const DepartementsView: React.FC<DepartementsViewProps> = ({
  departments,
  onSelectDepartment
}) => {
  const [filterConfirmed, setFilterConfirmed] = useState<'all' | 'confirmed' | 'to-confirm'>('all');

  const filteredDepts = departments.filter((d) => {
    if (filterConfirmed === 'confirmed') return d.isNameConfirmed;
    if (filterConfirmed === 'to-confirm') return !d.isNameConfirmed;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-24">
      <div>
        <div className="flex items-center gap-2 text-xs text-[#2854A6] font-bold uppercase tracking-wider mb-1">
          <span>Structures & Ministères</span>
          <span>·</span>
          <span>Anyama</span>
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#173567]">
          Départements & Groupes de l'Église
        </h1>
        <p className="text-sm text-[#343B46]/80 mt-1 max-w-2xl">
          Découvrez les structures ministérielles de l'église d'Anyama. Chaque fidèle est encouragé à s'investir selon ses talents et ses dons spirituels.
        </p>

        {/* Note on official naming per instructions */}
        <div className="mt-3 p-3.5 bg-[#F4F6F9] border-l-4 border-[#2854A6] rounded-xl text-xs text-[#343B46] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#2854A6] shrink-0 mt-0.5" />
          <span>
            <strong className="text-[#173567]">Note pour le Conseil :</strong> Les dénominations et intitulés des groupes sont modifiables dans l'Espace Communication selon les décisions pastorales officielles définitives.
          </span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setFilterConfirmed('all')}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
            filterConfirmed === 'all'
              ? 'bg-[#2854A6] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-[#343B46] hover:bg-[#F4F6F9]'
          }`}
        >
          Toutes les structures ({departments.length})
        </button>
        <button
          onClick={() => setFilterConfirmed('confirmed')}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
            filterConfirmed === 'confirmed'
              ? 'bg-[#2854A6] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-[#343B46] hover:bg-[#F4F6F9]'
          }`}
        >
          Appellations confirmées
        </button>
        <button
          onClick={() => setFilterConfirmed('to-confirm')}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition-colors ${
            filterConfirmed === 'to-confirm'
              ? 'bg-[#2854A6] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-[#343B46] hover:bg-[#F4F6F9]'
          }`}
        >
          À confirmer par le bureau
        </button>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDepts.map((dept) => (
          <div
            key={dept.id}
            onClick={() => onSelectDepartment(dept)}
            className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#2854A6] transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-16/9 bg-[#173567] overflow-hidden">
              <img
                src={dept.coverImage}
                alt={dept.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173567]/90 via-[#173567]/20 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white font-mono text-[10px] font-bold">
                  {dept.code}
                </span>
                {!dept.isNameConfirmed && (
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-black text-[10px] font-semibold">
                    À confirmer
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] text-white/80 font-medium block truncate">
                  « {dept.tagline} »
                </span>
                <h3 className="font-heading font-bold text-base text-white leading-tight">
                  {dept.name}
                </h3>
              </div>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <p className="text-xs text-[#343B46] line-clamp-2 leading-relaxed">
                  {dept.description}
                </p>

                <div className="pt-2 text-[11px] text-[#343B46]/70 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#2854A6]" />
                  <span>{dept.meetingSchedule}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[#343B46]/70 truncate max-w-[170px]">
                  <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{dept.leader}</span>
                </div>

                <span className="text-[#2854A6] font-semibold flex items-center gap-1">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
