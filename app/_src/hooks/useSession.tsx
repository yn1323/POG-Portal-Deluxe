import { useToast } from '@chakra-ui/react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useCallback, useLayoutEffect, useState } from 'react'
import { getFirebaseAuth } from '@/firebase/client'

export const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginPending, setLoginPending] = useState(true)
  const [emailLoginLoading, setEmailLoginLoading] = useState(false)
  const toast = useToast()

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

  const handleEmailLogin = (email: string, password: string) => {
    window.sessionStorage.setItem('pending', '1')
    setEmailLoginLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.sessionStorage.removeItem('pending')
        router.push('/dashboard')
      })
      .catch(error => {
        console.error(error)
        setEmailLoginLoading(false)
        toast({
          title: 'ログインエラー',
          description: 'アカウントが存在しないかパスワードが間違っています。',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        })
      })
  }

  const handleEmailRegister = (email: string, password: string) => {
    setEmailLoginLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        handleEmailLogin(email, password)
      })
      .catch(error => {
        console.error(error)
        setEmailLoginLoading(false)
        toast({
          description: 'しばらく経ってから再度お試しください。',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        })
      })
  }

  const handleSendPasswordResetMail = (email: string) => {
    setEmailLoginLoading(true)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        router.push('/')
        toast({
          description:
            'パスワードリセットのメールを送信しました。メールに記載のURLにアクセスしてください。',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch(error => {
        console.error(error)
        setEmailLoginLoading(false)
        toast({
          description: 'メール',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        })
      })
  }

  return {
    logout,
    isLoggedIn,
    handleGoogleLogin,
    handleEmailLogin,
    handleEmailRegister,
    handleSendPasswordResetMail,
    emailLoginLoading,
    pendingLogin:
      window.sessionStorage.getItem('pending') === '1' && loginPending,
  }
}
