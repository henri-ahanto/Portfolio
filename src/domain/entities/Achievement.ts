import { status } from "../const/Achievements";

export type Achievement = {
    id: string;
    title: string;
    description: string; // Contenu HTML provenant de TipTap
    image_url: string;
    demo_link?: string;
    repository_link?: string; // Note: garde l'orthographe de ta DB 'repositoty'
    status: status;
    is_pinned: boolean;
    created_at?: string | Date;
};

// Optionnel : Type pour la création (sans ID ni URL d'image déjà générée)
export type CreateAchievementInput = Omit<Achievement, 'id' | 'image_url' | 'created_at'> & {
    image: File; // Pour le transfert via le service d'upload
};