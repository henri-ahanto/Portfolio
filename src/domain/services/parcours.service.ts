import { supabase } from './supabaseClient'

export const parcoursService = {
  list: async (limit?: number) => {
    let q = supabase.from('parcours').select('*').order('start_date', { ascending: false })
    if (limit) q = q.limit(limit)
    return q
  },

  get: (id: string) =>
    supabase.from('parcours').select('*').eq('id', id).single(),

  create: (data: any) =>
    supabase.from('parcours').insert(data),

  update: (id: string, data: any) =>
    supabase.from('parcours').update(data).eq('id', id),

  delete: (id: string) =>
    supabase.from('parcours').delete().eq('id', id),
}
