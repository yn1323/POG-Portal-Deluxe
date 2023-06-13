'use client'

import { Stack, Button, Box } from '@chakra-ui/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { MailInput } from '@/component/form/MailInput'
import { PasswordInput } from '@/component/form/PasswordInput'
import { useSession } from '@/hooks/useSession'
type FormTypes = {
  email: string
  password: string
}

type Props = {
  isLoading: boolean
  onSubmit: ReturnType<typeof useSession>['handleEmailLogin']
}
export const MailLogin = ({ isLoading, onSubmit }: Props) => {
  const methods = useForm<FormTypes>()

  const submitHandler: SubmitHandler<FormTypes> = async ({
    email,
    password,
  }) => {
    onSubmit(email, password)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>
        <Stack spacing={4} w={300} role="form">
          <MailInput />
          <PasswordInput />
          <Box pt={2} w="100%">
            <Button w="100%" type="submit" isLoading={isLoading}>
              メールアドレスでログイン
            </Button>
          </Box>
        </Stack>
      </form>
    </FormProvider>
  )
}
