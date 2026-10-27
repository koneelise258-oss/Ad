export type PageView =
  | 'accueil'
  | 'cultes'
  | 'culte-detail'
  | 'evenements'
  | 'evenement-detail'
  | 'galerie'
  | 'album-detail'
  | 'actualites'
  | 'actualite-detail'
  | 'departements'
  | 'departement-detail'
  | 'admin';

export type AdminSubPage =
  | 'dashboard'
  | 'cultes'
  | 'cultes-creer'
  | 'evenements'
  | 'evenements-creer'
  | 'actualites'
  | 'actualites-creer'
  | 'galerie'
  | 'galerie-creer'
  | 'departements'
  | 'commentaires'
  | 'parametres';

export interface ChurchSettings {
  logoUrl: string | null;
  parishName: string;
  denomination: string;
  city: string;
  address: string;
  phone: string;
  email: string;
}

export interface ServiceLiturgicalStep {
  time?: string;
  title: string;
  leader: string;
  description?: string;
}

export interface CulteReaction {
  likes: number;
  hearts: number;
  prayers: number;
}

export interface CulteComment {
  id: string;
  culteId: string;
  authorName: string;
  text: string;
  date: string;
  reported?: boolean;
}

export interface CulteDocument {
  title: string;
  fileSize: string;
  type: 'pdf' | 'notes' | 'diapo';
  downloadUrl: string;
}

export interface Culte {
  id: string;
  title: string;
  subtitle?: string;
  date: string; // ISO date YYYY-MM-DD
  time: string;
  preacher: string;
  preacherRole: string;
  moderator: string;
  scriptureRef: string;
  scripturePassage: string;
  sermonSummary: string;
  keyPoints: string[];
  liturgy: ServiceLiturgicalStep[];
  coverImage: string;
  photos: string[];
  videoUrl?: string;
  videoDuration?: string;
  hasVideo: boolean;
  audioUrl?: string;
  audioDuration?: string;
  documents: CulteDocument[];
  reactions: CulteReaction;
  comments: CulteComment[];
  status: 'publie' | 'programme' | 'brouillon';
  isDemo?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Culte spécial' | 'Conférence' | 'Jeunesse' | 'Prière' | 'Femmes' | 'Évangélisation';
  date: string;
  time: string;
  location: string;
  description: string;
  speaker?: string;
  coverImage: string;
  attendeesCount: number;
  isRegistered?: boolean;
  isDemo?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Communiqué officiel' | 'Vie de l’église' | 'Avis de décès' | 'Événement';
  date: string;
  author: string;
  authorRole: string;
  summary: string;
  fullContent: string;
  coverImage?: string;
  isUrgent?: boolean;
  readsCount: number;
  isDemo?: boolean;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  caption?: string;
  duration?: string;
}

export interface AlbumItem {
  id: string;
  title: string;
  category: 'Cultes' | 'Jeunesse' | 'Événements' | 'Chorale & Louange' | 'Femmes MIFA';
  type: 'photo' | 'video' | 'mixte';
  date: string;
  coverImage: string;
  mediaCount: number;
  items: MediaItem[];
  description: string;
  isDemo?: boolean;
}

export interface DepartmentItem {
  id: string;
  code: string;
  name: string;
  isNameConfirmed: boolean;
  tagline: string;
  description: string;
  leader: string;
  leaderRole: string;
  meetingSchedule: string;
  meetingLocation: string;
  activities: string[];
  coverImage: string;
  galleryImages: string[];
  contactEmail?: string;
  contactPhone?: string;
}

export interface NotificationPreferences {
  cultes: boolean;
  evenements: boolean;
  communiques: boolean;
  channel: 'whatsapp' | 'web' | 'email';
  contactValue: string;
}
