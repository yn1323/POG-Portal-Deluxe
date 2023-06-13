import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useCallback, useLayoutEffect, useState } from 'react'
import { getFirebaseAuth } from '@/firebase/client'

export const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginPending, setLoginPending] = useState(true)

  const router = useRouter()
  const auth = getFirebaseAuth()

  useLayoutEffect(() => {
    auth.onAuthStateChanged(user => {
      window.sessionStorage.removeItem('pending')
      setLoginPending(false)
      if (user) {
        setIsLoggedIn(true)
        user.getIdToken().then(token => {
          document.cookie = `token=${token}`
          router.push('/dashboard')
        })
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [auth, router])

  const logout = useCallback(() => {
    auth.signOut().then(() => {
      document.cookie = 'token=; max-age=0'
      router.push('/')
    })
  }, [auth, router])

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    // リダイレクトしてしまうので、LSでも管理する
    window.sessionStorage.setItem('pending', '1')
    await signInWithRedirect(auth, provider)
  }

  return {
    logout,
    isLoggedIn,
    handleGoogleLogin,
    pendingLogin:
      window.sessionStorage.getItem('pending') === '1' && loginPending,
  }
}
