import { supabase } from './supabaseClient'

export const staticTextsService = {
  get: async (key: string) =>
    supabase.from('static_texts').select('value').eq('key', key).single(),

  update: (key: string, value: string) =>
    supabase.from('static_texts').upsert({ key, value }),
}
