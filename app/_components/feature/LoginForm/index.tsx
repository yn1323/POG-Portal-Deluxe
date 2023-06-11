'use client'

import { VStack } from '@chakra-ui/react'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { LoginButton } from '@/component/feature/LoginForm/LoginButton'
import { getFirebaseAuth } from '@/firebase/client'

export const LoginForm = () => {
  return (
    <VStack w={360} spacing={4}>
      <LoginButton handleGoogleLogin={handleGoogleLogin} />
    </VStack>
  )
}

const handleGoogleLogin = () => {
  const auth = getFirebaseAuth()
  const provider = new GoogleAuthProvider()
  signInWithRedirect(auth, provider)
}
