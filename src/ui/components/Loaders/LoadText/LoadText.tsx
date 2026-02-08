'use client'

import { supabase } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function LoadText({ children, keyName }: { keyName: string; children?: any }) {
  const [value, setValue] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('static_contents')
      .select('value')
      .eq('key', keyName)
      .single()
      .then(({ data }) => setValue(data?.value ?? null))
  }, [keyName])

  if (!value) return children || null
  return <>{value}</>
}
