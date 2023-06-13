'use client'

import { Stack, Button, Box, Link, VStack, Text } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { MailInput } from '@/component/form/MailInput'
import { PasswordInput } from '@/component/form/PasswordInput'
import { useSession } from '@/hooks/useSession'
type FormTypes = {
  email: string
  password: string
}
export const RegisterForm = () => {
  const methods = useForm<FormTypes>()
  const { handleEmailRegister, emailLoginLoading } = useSession()

  const onSubmit: SubmitHandler<FormTypes> = async ({ email, password }) => {
    handleEmailRegister(email, password)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={4} w={300} role="form">
          <MailInput />
          <PasswordInput />
          <Box pt={2} w="100%">
            <Button w="100%" type="submit" isLoading={emailLoginLoading}>
              登録する
            </Button>
          </Box>
          <VStack alignItems="flex-end" w={300}>
            <Text as="u">
              <Link href="/">
                <Button variant="link" size="sm">
                  ログイン画面に戻る
                </Button>
              </Link>
            </Text>
          </VStack>
        </Stack>
      </form>
    </FormProvider>
  )
}
