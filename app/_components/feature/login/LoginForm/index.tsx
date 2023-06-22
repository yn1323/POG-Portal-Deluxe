'use client'

import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { GoogleLogin } from '@/component/feature/login/LoginForm/GoogleLogin'
import { MailLogin } from '@/component/feature/login/LoginForm/MailLogin'
import { useSession } from '@/hooks/auth/useSession'

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    handleGoogleLogin,
    handleEmailLogin,
    waitForLoginRedirect,
    emailLoginLoading,
  } = useSession()

  return (
    <VStack spacing={4} w={360}>
      <GoogleLogin
        isLoading={isLoading || waitForLoginRedirect || emailLoginLoading}
        handleGoogleLogin={() => {
          setIsLoading(true)
          handleGoogleLogin()
        }}
      />
      <HStack h={10} spacing={4} w="100%">
        <Divider />
        <Box>or</Box>
        <Divider />
      </HStack>
      <MailLogin
        isLoading={isLoading || waitForLoginRedirect || emailLoginLoading}
        onSubmit={handleEmailLogin}
      />
      <VStack alignItems="flex-end" w={300}>
        <Text as="u">
          <Link href="/login/register">
            <Button size="sm" variant="link">
              新規登録
            </Button>
          </Link>
        </Text>
        <Text as="u">
          <Link href="/login/forgotPassword">
            <Button size="sm" variant="link">
              パスワードを忘れた方
            </Button>
          </Link>
        </Text>
      </VStack>
    </VStack>
  )
}
