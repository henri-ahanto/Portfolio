'use client'

import { getStaticContentByKey } from '@/shared/hooks/useStaticContent/action'
import { useEffect, useState } from 'react'

export function LoadText({ children, keyName }: { keyName: string; children?: React.ReactNode }) {
  const [value, setValue] = useState<string | null>(null)

  useEffect(() => {
    getStaticContentByKey(keyName)
      .then((data) => setValue(data?.value ?? null))
      .catch((error) => {
        console.error(`[LoadText] Error loading content for key: ${keyName}`, error)
      })
  }, [keyName])

  if (!value) return <>{children || null}</>
  return <>{value}</>
}
