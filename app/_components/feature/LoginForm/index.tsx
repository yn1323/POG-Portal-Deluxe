'use client'

import { VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { LoginButton } from '@/component/feature/LoginForm/LoginButton'
import { useSession } from '@/hooks/useSession'

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { handleGoogleLogin, pendingLogin } = useSession()

  return (
    <VStack w={360} spacing={4}>
      <LoginButton
        handleGoogleLogin={() => {
          setIsLoading(true)
          handleGoogleLogin()
        }}
        isLoading={isLoading || pendingLogin}
      />
    </VStack>
  )
}
