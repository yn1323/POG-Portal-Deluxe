import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { getFirebaseAuth } from '@/firebase/client'

export const useSession = () => {
  const router = useRouter()
  const auth = getFirebaseAuth()

  auth.onAuthStateChanged(user => {
    if (user) {
      user.getIdToken().then(token => {
        document.cookie = `token=${token}`
        router.push('/dashboard')
      })
    }
  })

  const logout = useCallback(() => {
    auth.signOut().then(() => {
      document.cookie = 'token=; max-age=0'
      router.push('/')
    })
  }, [auth, router])

  return {
    logout,
  }
}
