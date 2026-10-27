import React, { useState } from 'react';
import { X, Bell, Check, MessageSquare, Globe, Mail } from 'lucide-react';
import { NotificationPreferences } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    cultes: true,
    evenements: true,
    communiques: true,
    channel: 'whatsapp',
    contactValue: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
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
            <div className="w-8 h-8 rounded-lg bg-[#2854A6]/10 text-[#2854A6] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#173567]">
              Abonnement aux Alertes
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center animate-in zoom-in-95">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-bold text-lg text-[#173567] mb-1">
              Abonnement validé !
            </h4>
            <p className="text-sm text-[#343B46]/80">
              Vous recevrez les prochaines alertes selon vos préférences choisies. Soyez abondamment bénis.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-[#343B46]/80 leading-relaxed">
              Restez informés des résumés de cultes du dimanche, des grandes veillées de prière et des communiqués officiels de l’Église Évangélique des Assemblées de Dieu d’Anyama.
            </p>

            {/* Canal de notification */}
            <div>
              <label className="block text-xs font-semibold text-[#173567] mb-2">
                Canal de réception préféré
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPreferences({ ...preferences, channel: 'whatsapp' })}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    preferences.channel === 'whatsapp'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 mb-1 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreferences({ ...preferences, channel: 'web' })}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    preferences.channel === 'web'
                      ? 'bg-[#2854A6]/10 border-[#2854A6] text-[#173567] shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Globe className="w-4 h-4 mb-1 text-[#2854A6]" />
                  <span>Web Push</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreferences({ ...preferences, channel: 'email' })}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    preferences.channel === 'email'
                      ? 'bg-[#2854A6]/10 border-[#2854A6] text-[#173567] shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Mail className="w-4 h-4 mb-1 text-[#2854A6]" />
                  <span>Email</span>
                </button>
              </div>
            </div>

            {/* Contact input */}
            <div>
              <label className="block text-xs font-semibold text-[#173567] mb-1">
                {preferences.channel === 'whatsapp'
                  ? 'Numéro WhatsApp (avec indicatif +225...)'
                  : preferences.channel === 'email'
                  ? 'Adresse Email'
                  : 'Autorisation du navigateur'}
              </label>

              {preferences.channel !== 'web' ? (
                <input
                  type={preferences.channel === 'email' ? 'email' : 'tel'}
                  required
                  value={preferences.contactValue}
                  onChange={(e) => setPreferences({ ...preferences, contactValue: e.target.value })}
                  placeholder={preferences.channel === 'whatsapp' ? '+225 07 00 00 00 00' : 'votre.email@exemple.ci'}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2854A6]"
                />
              ) : (
                <div className="p-3 bg-[#F4F6F9] border border-slate-200 rounded-xl text-xs text-[#343B46]">
                  La permission de notification sera sollicitée directement sur votre smartphone ou navigateur.
                </div>
              )}
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#2854A6] hover:bg-[#1f4489] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                Confirmer l'abonnement gratuit
              </button>
            </div>

            <p className="text-[10px] text-center text-[#343B46]/60 pt-1">
              Désabonnement possible à tout moment sans engagement.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
