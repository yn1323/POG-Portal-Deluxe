'use client'

import { VStack, Button, Flex } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { action } from '@/component/feature/userConfig/UserConfigForm/action'
import { UserNameInput } from '@/component/form/UserNameInput'
import { commonSchemas } from '@/constants/validations'
import { useCustomToast } from '@/hooks/ui/useCustomToast'

const Schema = z.object({
  name: commonSchemas.shape.name,
})

export type SchemaType = z.infer<typeof Schema>

type Props = {
  uid: string
  defaultValues?: Partial<SchemaType>
}

export const UserConfigForm = ({ uid, defaultValues = {} }: Props) => {
  const [isPending, startTransition] = useTransition()
  const { successToast, errorToast } = useCustomToast()
  const methods = useForm<SchemaType>({
    defaultValues,
    resolver: zodResolver(Schema),
  })

  const submitHandler: SubmitHandler<SchemaType> = async data => {
    startTransition(async () => {
      const result = await action(data, { uid })
      if (result) {
        successToast({ title: '変更しました' })
      } else {
        errorToast({ title: '変更に失敗しました' })
      }
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>
        <VStack w={360} spacing={6}>
          <UserNameInput />
          <Flex justifyContent="flex-end" w="100%">
            <Button w={150} type="submit" isLoading={isPending}>
              変更する
            </Button>
          </Flex>
        </VStack>
      </form>
    </FormProvider>
  )
}
