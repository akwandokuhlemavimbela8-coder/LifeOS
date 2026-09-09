// Example usage inside any Client Component
'use client'

import { useLifeOSAuth } from '@/hooks/useLifeOSAuth'

export default function Home() {
  const { user, loading } = useLifeOSAuth()

  if (loading) return <div>Loading Life OS...</div>

  return (
    <div>
      {user ? <h1>Welcome back, {user.email}</h1> : <h1>Please sign in</h1>}
    </div>
  )
}
