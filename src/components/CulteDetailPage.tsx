import React, { useState } from 'react';
import { Culte } from '../types';
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  Download,
  Share2,
  ThumbsUp,
  Heart,
  Play,
  MessageCircle,
  Flag,
  ShieldAlert,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Pause,
  Volume2,
  Headphones
} from 'lucide-react';

interface CulteDetailPageProps {
  culte: Culte;
  onBack: () => void;
  onOpenShare: (title: string, summary: string) => void;
  onAddReaction: (culteId: string, type: 'likes' | 'hearts' | 'prayers') => void;
  onAddComment: (culteId: string, authorName: string, text: string) => void;
  onReportComment: (commentId: string) => void;
}

export const CulteDetailPage: React.FC<CulteDetailPageProps> = ({
  culte,
  onBack,
  onOpenShare,
  onAddReaction,
  onAddComment,
  onReportComment
}) => {
  const [userReacted, setUserReacted] = useState<{ [key: string]: boolean }>({});
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [antiSpamAnswer, setAntiSpamAnswer] = useState('');
  const [commentFeedback, setCommentFeedback] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'predication' | 'liturgie' | 'galerie' | 'documents'>('predication');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(25);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleReactionClick = (type: 'likes' | 'hearts' | 'prayers') => {
    if (userReacted[type]) return;
    setUserReacted(prev => ({ ...prev, [type]: true }));
    onAddReaction(culte.id, type);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    if (antiSpamAnswer.trim() !== '4' && antiSpamAnswer.trim().toLowerCase() !== 'quatre') {
      setCommentFeedback('Protection anti-spam : veuillez indiquer le nombre d’évangiles (chiffre 4).');
      return;
    }

    onAddComment(culte.id, commentName.trim(), commentText.trim());
    setCommentName('');
    setCommentText('');
    setAntiSpamAnswer('');
    setCommentFeedback('Votre message d’édification a été publié avec succès.');
    setTimeout(() => setCommentFeedback(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-24">
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

      {/* Breadcrumb & Navigation Bar */}
      <nav aria-label="Fil d'Ariane" className="flex items-center justify-between gap-3 text-xs text-[#343B46]/70 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-1.5 truncate">
          <button
            onClick={onBack}
            className="hover:text-[#173567] transition-colors font-medium flex items-center gap-1 shrink-0 text-[#173567]"
          >
            <ArrowLeft className="w-4 h-4 text-[#2854A6]" />
            <span>Retour aux cultes</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate text-slate-400">{culte.title}</span>
          {culte.isDemo && (
            <span className="ml-2 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500 font-medium text-[10px] shrink-0">
              Données de démonstration
            </span>
          )}
        </div>

        <button
          onClick={() => onOpenShare(culte.title, culte.sermonSummary)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F4F6F9] hover:bg-slate-200 text-[#173567] text-xs font-semibold border border-slate-200 transition-colors shrink-0"
        >
          <Share2 className="w-3.5 h-3.5 text-[#2854A6]" />
          <span className="hidden sm:inline">Partager ce culte</span>
          <span className="sm:hidden">Partager</span>
        </button>
      </nav>

      {/* Main Service Card / Container */}
      <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Hero Visual or Integrated Video Player */}
        <div className="relative bg-[#173567] aspect-video max-h-[440px] w-full overflow-hidden">
          {culte.hasVideo && isVideoPlaying ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-black">
              <iframe
                title={`Vidéo du culte - ${culte.title}`}
                className="w-full h-full border-0"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative w-full h-full group">
              <img
                src={culte.coverImage}
                alt={culte.title}
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173567]/90 via-[#173567]/40 to-transparent" />

              {culte.hasVideo && (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform"
                >
                  <div className="w-16 h-16 rounded-full bg-[#2854A6]/95 hover:bg-[#2854A6] text-white flex items-center justify-center shadow-md pl-1">
                    <Play className="w-7 h-7 fill-white" />
                  </div>
                  <span className="text-xs font-semibold text-white drop-shadow-md">
                    Regarder l'enregistrement vidéo ({culte.videoDuration})
                  </span>
                </button>
              )}

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="flex items-center gap-2 text-xs text-white/80 mb-1.5 font-medium">
                  <span>{culte.subtitle || 'Culte Dominical'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{culte.date}</span>
                </div>
                <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-white drop-shadow-xs leading-snug">
                  {culte.title}
                </h1>
              </div>
            </div>
          )}
        </div>

        {/* Info Strip */}
        <div className="bg-[#F4F6F9] border-b border-slate-200 px-5 sm:px-7 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#2854A6] shrink-0" />
              <div>
                <span className="text-[#343B46]/60 block text-[10px] uppercase font-semibold">Date</span>
                <span className="font-medium text-[#173567]">{culte.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#2854A6] shrink-0" />
              <div>
                <span className="text-[#343B46]/60 block text-[10px] uppercase font-semibold">Horaire</span>
                <span className="font-medium text-[#173567]">{culte.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-[#2854A6] shrink-0" />
              <div className="truncate">
                <span className="text-[#343B46]/60 block text-[10px] uppercase font-semibold">Prédicateur</span>
                <span className="font-medium text-[#173567] truncate block">{culte.preacher}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#2854A6] shrink-0" />
              <div className="truncate">
                <span className="text-[#343B46]/60 block text-[10px] uppercase font-semibold">Modérateur</span>
                <span className="font-medium text-[#173567] truncate block">{culte.moderator}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audio Player Bar (Écoute audio faible consommation de données pour mobiles) */}
        <div className="bg-[#173567] text-white p-4 sm:p-5 border-b border-[#2854A6]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsAudioPlaying(!isAudioPlaying);
                if (!isAudioPlaying) {
                  showNotification('Lecture audio démarrée : Prédication pastorale (Anyama).');
                }
              }}
              className="w-11 h-11 rounded-full bg-[#2854A6] hover:bg-[#1f4489] text-white flex items-center justify-center shrink-0 shadow-xs transition-colors"
              title={isAudioPlaying ? 'Mettre en pause' : 'Écouter la prédication'}
            >
              {isAudioPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white pl-0.5" />
              )}
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-semibold text-xs sm:text-sm text-white">
                  Écoute audio du message pastoral
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/20 text-white font-mono text-[10px]">
                  {culte.audioDuration || '44:12'}
                </span>
              </div>
              <p className="text-[11px] text-white/70">
                Format audio compressé à faible consommation de données (recommandé pour connexion mobile)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-72">
            <span className="text-[11px] text-white/70 font-mono">12:30</span>
            <input
              type="range"
              min="0"
              max="100"
              value={audioProgress}
              onChange={(e) => setAudioProgress(Number(e.target.value))}
              className="w-full accent-[#2854A6] cursor-pointer h-1.5 bg-white/20 rounded-lg"
              title="Progression de la prédication"
            />
            <span className="text-[11px] text-white/70 font-mono">
              {culte.audioDuration || '44:12'}
            </span>
            <button
              onClick={() => showNotification('Téléchargement de l’enregistrement audio MP3 de la prédication...')}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              title="Télécharger l'audio (MP3)"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation for Service Details */}
        <div className="border-b border-slate-200 px-5 sm:px-7 bg-white">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5">
            <button
              onClick={() => setActiveTab('predication')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'predication'
                  ? 'bg-[#2854A6] text-white shadow-xs'
                  : 'text-[#343B46] hover:bg-[#F4F6F9]'
              }`}
            >
              Prédication & Message
            </button>
            <button
              onClick={() => setActiveTab('liturgie')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'liturgie'
                  ? 'bg-[#2854A6] text-white shadow-xs'
                  : 'text-[#343B46] hover:bg-[#F4F6F9]'
              }`}
            >
              Déroulement du culte
            </button>
            <button
              onClick={() => setActiveTab('galerie')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'galerie'
                  ? 'bg-[#2854A6] text-white shadow-xs'
                  : 'text-[#343B46] hover:bg-[#F4F6F9]'
              }`}
            >
              Photos & Médias ({culte.photos.length})
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'documents'
                  ? 'bg-[#2854A6] text-white shadow-xs'
                  : 'text-[#343B46] hover:bg-[#F4F6F9]'
              }`}
            >
              Documents & Fiches ({culte.documents.length})
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="p-5 sm:p-8 space-y-6">
          {activeTab === 'predication' && (
            <div className="space-y-6">
              {/* Scripture Passage Card */}
              <div className="p-5 rounded-2xl bg-[#F4F6F9] border-l-4 border-[#2854A6] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2854A6]">
                  <BookOpen className="w-4 h-4 text-[#2854A6]" />
                  <span>PASSAGE BIBLIQUE DE LA PRÉDICATION</span>
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#173567]">
                  {culte.scriptureRef}
                </h3>
                <blockquote className="text-xs sm:text-sm italic text-[#343B46] leading-relaxed font-serif pl-2 my-2">
                  {culte.scripturePassage}
                </blockquote>
              </div>

              {/* Sermon Summary */}
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#173567] mb-2">
                  Résumé de la prédication
                </h3>
                <p className="text-xs sm:text-sm text-[#343B46] leading-relaxed">
                  {culte.sermonSummary}
                </p>
              </div>

              {/* Key points list */}
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#173567] mb-3">
                  Points essentiels à retenir
                </h3>
                <div className="space-y-2.5">
                  {culte.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F4F6F9] border border-slate-200 text-xs sm:text-sm text-[#343B46] leading-relaxed font-medium"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'liturgie' && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#173567]">
                Ordre du culte et déroulement liturgique
              </h3>
              <p className="text-xs text-[#343B46]/70">
                Programme pas à pas de la célébration dominicale.
              </p>

              <div className="space-y-3">
                {culte.liturgy.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:bg-[#F4F6F9] transition-colors"
                  >
                    <div className="px-2.5 py-1 rounded-md bg-[#F4F6F9] text-[#173567] font-mono text-xs font-bold shrink-0">
                      {step.time || `Étape ${idx + 1}`}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <h4 className="font-semibold text-sm text-[#173567]">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#2854A6] font-medium">
                        Intervenant : {step.leader}
                      </p>
                      {step.description && (
                        <p className="text-xs text-[#343B46] mt-1">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'galerie' && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#173567]">
                Photographies du culte
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {culte.photos.map((img, i) => (
                  <div key={i} className="group relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={img}
                      alt={`Photo ${i + 1} du culte`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#173567]">
                Supports de communication & téléchargements
              </h3>
              <p className="text-xs text-[#343B46]/70">
                Téléchargez les bulletins hebdomadaires, fiches d'étude et supports de prédication.
              </p>

              <div className="space-y-2.5">
                {culte.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-[#F4F6F9] hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#2854A6]/10 text-[#2854A6] flex items-center justify-center font-bold text-xs uppercase">
                        {doc.type}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-[#173567]">
                          {doc.title}
                        </h4>
                        <span className="text-[11px] text-[#343B46]/70">
                          Taille : {doc.fileSize}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        showNotification(`Téléchargement de « ${doc.title} » initié.`);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2854A6] text-white text-xs font-semibold hover:bg-[#1f4489] transition-colors shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Télécharger</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reactions bar (No account required) */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F4F6F9] p-4 rounded-xl border border-slate-200">
              <div>
                <h4 className="text-xs font-bold text-[#173567]">
                  Réactions spirituelles (sans compte requis)
                </h4>
                <p className="text-[11px] text-[#343B46]/70">
                  Manifestez votre communion avec l'église d'Anyama
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReactionClick('likes')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    userReacted.likes
                      ? 'bg-[#2854A6] text-white'
                      : 'bg-white border border-slate-200 text-[#343B46] hover:bg-slate-100'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>J'aime</span>
                  <span className="font-mono text-[11px]">{culte.reactions.likes}</span>
                </button>

                <button
                  onClick={() => handleReactionClick('hearts')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    userReacted.hearts
                      ? 'bg-rose-600 text-white'
                      : 'bg-white border border-slate-200 text-[#343B46] hover:bg-rose-50'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Cœur</span>
                  <span className="font-mono text-[11px]">{culte.reactions.hearts}</span>
                </button>

                <button
                  onClick={() => handleReactionClick('prayers')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    userReacted.prayers
                      ? 'bg-[#173567] text-white'
                      : 'bg-white border border-slate-200 text-[#343B46] hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm">🙏</span>
                  <span>Je prie</span>
                  <span className="font-mono text-[11px]">{culte.reactions.prayers}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Comments section under pseudonym */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#2854A6]" />
                <h4 className="font-heading font-bold text-sm text-[#173567]">
                  Commentaires et témoignages des fidèles ({culte.comments.length})
                </h4>
              </div>
              <span className="text-[11px] text-[#343B46]/60">
                Publication sous pseudonyme
              </span>
            </div>

            {culte.comments.length > 0 && (
              <div className="space-y-2.5">
                {culte.comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-xl bg-[#F4F6F9] border border-slate-200 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#173567]">{c.authorName}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-400">{c.date}</span>
                        <button
                          onClick={() => {
                            onReportComment(c.id);
                            showNotification('Commentaire signalé à l’équipe de communication pour modération.');
                          }}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          title="Signaler ce message"
                        >
                          <Flag className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[#343B46] leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Comment form with anti-spam */}
            <form onSubmit={handleCommentSubmit} className="space-y-3 p-4 rounded-xl bg-[#F4F6F9] border border-slate-200">
              <h5 className="text-xs font-semibold text-[#173567]">
                Laisser une parole d’édification ou un témoignage
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Votre pseudonyme (ex: Frère Jean, Sœur Esther)"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2854A6]"
                />

                <input
                  type="text"
                  required
                  placeholder="Anti-spam : Combien y a-t-il d'évangiles ? (chiffre 4)"
                  value={antiSpamAnswer}
                  onChange={(e) => setAntiSpamAnswer(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2854A6]"
                />
              </div>

              <textarea
                required
                rows={3}
                placeholder="Votre message d'encouragement..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2854A6]"
              />

              {commentFeedback && (
                <div className="text-xs text-[#173567] bg-blue-50 p-2.5 rounded-lg border border-blue-200 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-[#2854A6]" />
                  <span>{commentFeedback}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#343B46]/60">
                  Modération anti-spam active.
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#2854A6] text-white text-xs font-semibold hover:bg-[#1f4489] transition-colors"
                >
                  Publier le commentaire
                </button>
              </div>
            </form>
          </div>
        </div>
      </article>
    </div>
  );
};
