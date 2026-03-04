'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/shared/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (password: string) => {
    const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL!
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    await cookieStore.set('sb-access-token', data.session.access_token);
    router.push('/dashboard')
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const resetPassword = async () => {
    const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL!
    const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })

    if (error) throw error
  }

  return { user, loading, login, logout, resetPassword }
}
