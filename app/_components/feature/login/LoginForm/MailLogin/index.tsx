'use client'

import { Stack, Button, Box } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { MailInput } from '@/component/form/MailInput'
import { PasswordInput } from '@/component/form/PasswordInput'
import { userSchemas } from '@/constants/validations'
import { useSession } from '@/hooks/auth/useSession'

const Schema = z.object({
  email: userSchemas.shape.email,
  password: userSchemas.shape.password,
})

type SchemaType = z.infer<typeof Schema>

type Props = {
  isLoading: boolean
  onSubmit: ReturnType<typeof useSession>['handleEmailLogin']
}
export const MailLogin = ({ isLoading, onSubmit }: Props) => {
  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
  })

  const submitHandler: SubmitHandler<SchemaType> = async ({
    email,
    password,
  }) => {
    onSubmit(email, password)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>
        <Stack role="form" spacing={4} w={300}>
          <MailInput />
          <PasswordInput />
          <Box pt={2} w="100%">
            <Button
              colorScheme="green"
              isLoading={isLoading}
              type="submit"
              w="100%"
            >
              メールアドレスでログイン
            </Button>
          </Box>
        </Stack>
      </form>
    </FormProvider>
  )
}
