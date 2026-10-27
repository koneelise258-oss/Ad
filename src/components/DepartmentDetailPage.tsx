import React from 'react';
import { DepartmentItem } from '../types';
import {
  Phone,
  Share2,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Info
} from 'lucide-react';

interface DepartmentDetailPageProps {
  department: DepartmentItem;
  onBack: () => void;
  onOpenShare: (title: string, summary: string) => void;
}

export const DepartmentDetailPage: React.FC<DepartmentDetailPageProps> = ({
  department,
  onBack,
  onOpenShare
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-24">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Fil d'Ariane" className="flex items-center justify-between gap-3 text-xs text-[#343B46]/70 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-1.5 truncate">
          <button
            onClick={onBack}
            className="hover:text-[#173567] transition-colors font-medium flex items-center gap-1 shrink-0 text-[#173567]"
          >
            <ArrowLeft className="w-4 h-4 text-[#2854A6]" />
            <span>Retour aux départements</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate text-slate-400">{department.name}</span>
        </div>

        <button
          onClick={() => onOpenShare(department.name, department.description)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F6F9] hover:bg-slate-200 text-[#173567] text-xs font-semibold border border-slate-200 transition-colors shrink-0"
        >
          <Share2 className="w-3.5 h-3.5 text-[#2854A6]" />
          <span>Partager</span>
        </button>
      </nav>

      <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Cover Hero */}
        <div className="relative aspect-16/9 max-h-[360px] w-full bg-[#173567] overflow-hidden">
          <img
            src={department.coverImage}
            alt={department.name}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173567]/90 via-[#173567]/30 to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#2854A6] text-white font-mono text-xs font-bold">
              {department.code}
            </span>
            {!department.isNameConfirmed && (
              <span className="px-2.5 py-1 rounded-md bg-amber-500 text-black text-xs font-semibold">
                Nom officiel à confirmer
              </span>
            )}
          </div>

          <div className="absolute bottom-5 left-5 right-5 text-white">
            <span className="text-xs text-white/80 font-medium block mb-1">
              « {department.tagline} »
            </span>
            <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-white leading-tight">
              {department.name}
            </h1>
          </div>
        </div>

        {/* Info Grid */}
        <div className="p-5 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#F4F6F9] border border-slate-200 text-xs">
            <div>
              <span className="text-[#343B46]/60 block text-[10px] uppercase font-semibold">Leadership / Responsable</span>
              <span className="font-semibold text-[#173567] text-sm block mt-0.5">{department.leader}</span>
              <span className="text-[#343B46]/70 text-xs block">{department.leaderRole}</span>
            </div>

            <div>
              <span className="text-[#343B46]/60 block text-[10px] uppercase font-semibold">Horaires & Lieu de Rencontre</span>
              <span className="font-semibold text-[#173567] text-sm block mt-0.5">{department.meetingSchedule}</span>
              <span className="text-[#343B46]/70 text-xs block">{department.meetingLocation}</span>
            </div>
          </div>

          {!department.isNameConfirmed && (
            <div className="p-3.5 bg-[#F4F6F9] border-l-4 border-amber-500 rounded-xl text-xs text-[#343B46] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#173567]">Information :</strong> L'intitulé officiel de cette structure locale est en cours de validation par le Conseil Pastoral de la paroisse d'Anyama. Les informations de contact restent pleinement actives.
              </span>
            </div>
          )}

          <div>
            <h3 className="font-heading font-bold text-base text-[#173567] mb-2">
              Présentation du département
            </h3>
            <p className="text-xs sm:text-sm text-[#343B46] leading-relaxed">
              {department.description}
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-base text-[#173567] mb-3">
              Activités régulières & Engagements
            </h3>
            <div className="space-y-2.5">
              {department.activities.map((act, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-[#F4F6F9] border border-slate-200 text-xs sm:text-sm text-[#343B46] flex items-start gap-3 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2854A6] shrink-0 mt-0.5" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Department photo gallery */}
          {department.galleryImages && department.galleryImages.length > 0 && (
            <div>
              <h3 className="font-heading font-bold text-base text-[#173567] mb-3">
                Photographies de la vie du groupe
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {department.galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
                  >
                    <img
                      src={img}
                      alt={`Photo ${department.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <span className="text-[#343B46]/70">
              Vous souhaitez rejoindre ce ministère ou poser une question ? Venez échanger lors de la prochaine rencontre.
            </span>
            {department.contactPhone && (
              <div className="flex items-center gap-2 font-semibold text-[#173567] shrink-0">
                <Phone className="w-4 h-4 text-[#2854A6]" />
                <span>{department.contactPhone}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};
