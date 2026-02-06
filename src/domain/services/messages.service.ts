import { supabase } from './supabaseClient'

export const messagesService = {
  list: () => supabase.from('messages').select('*').order('created_at', { ascending: false }),
  markRead: (id: string) => supabase.from('messages').update({ is_read: true }).eq('id', id),
  delete: (id: string) => supabase.from('messages').delete().eq('id', id),
}
