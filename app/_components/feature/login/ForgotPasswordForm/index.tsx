'use client'

import { Stack, Button, Box, Link, VStack, Text } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { MailInput } from '@/component/form/MailInput'
import { useSession } from '@/hooks/useSession'
type FormTypes = {
  email: string
}
export const ForgotPasswordForm = () => {
  const methods = useForm<FormTypes>()
  const { handleSendPasswordResetMail, emailLoginLoading } = useSession()

  const onSubmit: SubmitHandler<FormTypes> = async ({ email }) => {
    handleSendPasswordResetMail(email)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={4} w={300} role="form">
          <MailInput />
          <Box pt={2} w="100%">
            <Button w="100%" type="submit" isLoading={emailLoginLoading}>
              パスワードリセット
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
