'use client'

import { VStack, Button, HStack, Divider, Text, Box } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { userConfigFormAction } from '@/component/feature/config/UserConfigForm/action'
import { UserNameInput } from '@/component/form/UserNameInput'
import { UserPictureInput } from '@/component/form/UserPictureInput'
import { CenterBox } from '@/component/layout/CenterBox'
import { userSchemas } from '@/constants/validations'
import { useSession } from '@/hooks/auth/useSession'
import { useCustomToast } from '@/hooks/ui/useCustomToast'

const Schema = z.object({
  name: userSchemas.shape.name,
  picture: userSchemas.shape.picture,
})

export type SchemaType = z.infer<typeof Schema>

type Props = {
  uid: string
  email: string
  defaultValues?: Partial<SchemaType>
  onSubmit: typeof userConfigFormAction
}

export const UserConfigForm = ({
  uid,
  email,
  defaultValues = {},
  onSubmit,
}: Props) => {
  const { handleSendPasswordUpdateMail } = useSession()
  const [isPending, startTransition] = useTransition()
  const { successToast, errorToast } = useCustomToast()
  const methods = useForm<SchemaType>({
    defaultValues,
    resolver: zodResolver(Schema),
  })

  const submitHandler: SubmitHandler<SchemaType> = async data => {
    startTransition(async () => {
      const result = await onSubmit(data, { uid })
      if (result) {
        successToast({ title: '変更しました' })
      } else {
        errorToast({
          title: '変更に失敗しました。しらばく経ってから再度試してください。',
        })
      }
    })
  }

  return (
    <CenterBox>
      <FormProvider {...methods}>
        <Box pb={4}>
          <Text fontSize="xl" textAlign="center">
            ユーザー設定
          </Text>
          <form onSubmit={methods.handleSubmit(submitHandler)}>
            <VStack py={6} spacing={6} w={360}>
              <UserPictureInput url={defaultValues.picture ?? ''} />
              <UserNameInput />
              <HStack justifyContent="flex-end" w="100%">
                <Button
                  colorScheme="green"
                  isLoading={isPending}
                  type="submit"
                  w={150}
                >
                  変更する
                </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
        <Divider />
        <Box pt={4}>
          <Text fontSize="xl" textAlign="center">
            パスワード変更
          </Text>
          <Box p={6}>
            <Button
              colorScheme="green"
              onClick={() => handleSendPasswordUpdateMail(email)}
            >
              パスワード変更メールを送る
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </CenterBox>
  )
}
