import { NextResponse } from 'next/server'
import { supabase } from '@/shared/services/supabaseClient'

export async function GET() {
  const { data } = await supabase.from('static_texts').select('*')
  return NextResponse.json({ data })
}
