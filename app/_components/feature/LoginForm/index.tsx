'use client'

import { VStack } from '@chakra-ui/react'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { useState } from 'react'
import { LoginButton } from '@/component/feature/LoginForm/LoginButton'
import { getFirebaseAuth } from '@/firebase/client'

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const auth = getFirebaseAuth()
  const onCheckHandle = async () => {
    const token = await auth.currentUser?.getIdToken()
    document.cookie = `token=${token}`
  }
  return (
    <VStack w={360} spacing={4}>
      <LoginButton
        handleGoogleLogin={() => {
          setIsLoading(true)
          handleGoogleLogin()
        }}
        isLoading={isLoading}
      />
      <button onClick={onCheckHandle}>click</button>
    </VStack>
  )
}

const handleGoogleLogin = async () => {
  const auth = getFirebaseAuth()
  const provider = new GoogleAuthProvider()
  await signInWithRedirect(auth, provider)
}
