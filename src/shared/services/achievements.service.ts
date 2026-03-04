import { supabase } from './supabaseClient'

export const achievementsService = {
  // Liste tous les achievements (avec option de limite)
  list: async (limit?: number) => {
    let q = supabase.from('achievements').select('*').order('created_at', { ascending: false })
    if (limit) q = q.limit(limit)
    return q
  },

  // Liste uniquement les achievements épinglés
  listPinned: async () => {
    return supabase.from('achievements')
      .select('*')
      .filter('is_pinned', '=', true)
      .order('created_at', { ascending: false })
      .limit(6);
  },
  
  find: async (id: string) => {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('id', id)
      .single() // Récupère l'objet directement au lieu d'un tableau

    if (error) throw error
    return data
  },
  // Création avec upload d'image (similaire au stacksService)
  async create(payload: {
    title: string;
    description: string;
    image: File;
    demo_link?: string;
    repository_link?: string;
    status?: string;
    is_pinned?: boolean
  }) {
    // 1. Gestion de l'upload de l'image
    const fileExt = payload.image.name.split('.').pop()
    const filePath = `achievements/${crypto.randomUUID()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('assets')
      .upload(filePath, payload.image)

    if (uploadError) throw uploadError

    // 2. Récupération de l'URL publique
    const { data: urlData } = supabase.storage.from('assets').getPublicUrl(filePath)

    // 3. Insertion en base de données
    const { error } = await supabase.from('achievements').insert({
      title: payload.title,
      description: payload.description,
      image_url: urlData.publicUrl,
      demo_link: payload.demo_link,
      repository_link: payload.repository_link,
      status: payload.status || 'start',
      is_pinned: payload.is_pinned ?? false,
    })

    if (error) throw error
  },

  // Mise à jour
  update: (id: string, data: any) => supabase.from('achievements').update(data).eq('id', id),

  // Suppression
  delete: (id: string) => supabase.from('achievements').delete().eq('id', id),
}