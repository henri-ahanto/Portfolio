import { supabase } from './supabaseClient'

export const achievementsService = {
  list: async (limit?: number) => {
    let q = supabase.from('achievements').select('*').order('created_at', { ascending: false })
    if (limit) q = q.limit(limit)
    return q
  },
  create: (data: any) => supabase.from('achievements').insert(data),
  update: (id: string, data: any) => supabase.from('achievements').update(data).eq('id', id),
  delete: (id: string) => supabase.from('achievements').delete().eq('id', id),
}
