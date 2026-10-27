import React, { useState } from 'react';
import { X, Check, Copy, MessageCircle, Share2, Facebook, Send } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  summary?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url,
  summary
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const shareText = `*${title}*\n${summary ? summary.slice(0, 140) + '...' : ''}\nConsulter sur la plateforme officielle de l'Église des Assemblées de Dieu d'Anyama :`;
  const encodedText = encodeURIComponent(`${shareText} ${url}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: summary,
        url
      }).catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#2854A6]" />
            <h3 className="font-heading font-bold text-lg text-[#173567]">Partager ce contenu</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm font-medium text-[#343B46] mb-4 line-clamp-2">
          {title}
        </p>

        {/* Share buttons grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="text-left overflow-hidden">
              <div className="font-semibold text-xs text-slate-900">WhatsApp</div>
              <div className="text-[11px] text-slate-500 truncate">Groupes & contacts</div>
            </div>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-blue-800 border border-blue-200 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-[#2854A6] text-white flex items-center justify-center shrink-0">
              <Facebook className="w-5 h-5" />
            </div>
            <div className="text-left overflow-hidden">
              <div className="font-semibold text-xs text-slate-900">Facebook</div>
              <div className="text-[11px] text-slate-500 truncate">Partage sur mur</div>
            </div>
          </a>

          {/* SMS Direct */}
          <a
            href={`sms:?body=${encodedText}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-[#173567] text-white flex items-center justify-center shrink-0">
              <Send className="w-4 h-4" />
            </div>
            <div className="text-left overflow-hidden">
              <div className="font-semibold text-xs text-slate-900">SMS / Message</div>
              <div className="text-[11px] text-slate-500 truncate">Message direct</div>
            </div>
          </a>

          {/* Native Share on Android */}
          {typeof navigator !== 'undefined' && 'share' in navigator ? (
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-3 p-3 rounded-xl bg-[#F4F6F9] hover:bg-slate-200 text-[#173567] border border-slate-200 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-[#2854A6] text-white flex items-center justify-center shrink-0">
                <Share2 className="w-4 h-4" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="font-semibold text-xs text-slate-900">Plus d'options</div>
                <div className="text-[11px] text-slate-500 truncate">Partage système</div>
              </div>
            </button>
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 opacity-60">
              <div className="w-9 h-9 rounded-lg bg-slate-300 text-slate-600 flex items-center justify-center shrink-0">
                <Share2 className="w-4 h-4" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="font-semibold text-xs text-slate-700">Partage</div>
                <div className="text-[11px] text-slate-400 truncate">Via copie de lien</div>
              </div>
            </div>
          )}
        </div>

        {/* Copy Link Input Bar */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#343B46]">
            Lien direct vers ce contenu :
          </label>
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 bg-[#F4F6F9]">
            <input
              type="text"
              readOnly
              value={url}
              className="bg-transparent text-xs text-[#343B46] px-2 flex-1 focus:outline-none select-all font-mono"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2854A6] hover:bg-[#1f4489] text-white text-xs font-semibold transition-colors shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-[#343B46]/60">
            Plateforme Officielle des Assemblées de Dieu d'Anyama
          </p>
        </div>
      </div>
    </div>
  );
};
