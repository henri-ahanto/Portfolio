import { supabase } from './supabaseClient'

export const stacksService = {
    list: () => supabase.from('stacks').select('*').order('created_at'),
    update: (id: string, data: any) => supabase.from('stacks').update(data).eq('id', id),
    async create(payload: { name: string; description: string; image: File }) {
        const fileExt = payload.image.name.split('.').pop()
        const filePath = `${crypto.randomUUID()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('assets')
            .upload(filePath, payload.image)

        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('assets').getPublicUrl(filePath)

        const { error } = await supabase.from('stacks').insert({
            name: payload.name,
            description: payload.description,
            logo_url: data.publicUrl,
        })

        if (error) throw error
    },

    async delete(id: string) {
        await supabase.from('stacks').delete().eq('id', id)
    },
}