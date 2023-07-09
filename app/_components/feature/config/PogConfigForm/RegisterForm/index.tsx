'use client'

import {
  VStack,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  Button,
  FormHelperText,
  FormControl,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AiOutlineLink } from 'react-icons/ai'
import { CgWebsite } from 'react-icons/cg'
import { z } from 'zod'
import { pogSchemas } from '@/constants/validations'

const Schema = z.object({
  pageUrl: pogSchemas.shape.pageUrl,
  pageTitle: pogSchemas.shape.pageTitle,
})

type SchemaType = z.infer<typeof Schema>

type Props = {
  onSubmit: (params: SchemaType) => void
}

export const RegisterForm = ({ onSubmit }: Props) => {
  const methods = useForm<SchemaType>({
    resolver: zodResolver(Schema),
  })

  const {
    formState: { errors },
    register,
  } = methods

  const errorMessage = useCallback(
    (key: keyof SchemaType) => errors[key]?.message,
    [errors]
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <VStack gap="4">
          <FormControl id="pageTitle" isInvalid={!!errors.pageTitle}>
            <FormLabel>登録ページ名</FormLabel>
            <InputGroup>
              <InputLeftElement color="gray.300" pointerEvents="none">
                <CgWebsite />
              </InputLeftElement>
              <Input
                data-testid="pageTitle"
                maxLength={200}
                {...register('pageTitle')}
              />
            </InputGroup>
            {errorMessage('pageTitle') && (
              <FormHelperText color="crimson">
                {errorMessage('pageTitle')}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl id="pageUrl" isInvalid={!!errors.pageUrl}>
            <FormLabel>登録ページURL</FormLabel>
            <InputGroup>
              <InputLeftElement color="gray.300" pointerEvents="none">
                <AiOutlineLink />
              </InputLeftElement>
              <Input
                data-testid="pageUrl"
                maxLength={200}
                {...register('pageUrl')}
              />
            </InputGroup>
            {errorMessage('pageUrl') && (
              <FormHelperText color="crimson">
                {errorMessage('pageUrl')}
              </FormHelperText>
            )}
          </FormControl>
        </VStack>

        <VStack py={6} spacing={6}>
          <HStack justifyContent="flex-end" w="100%">
            <Button colorScheme="green" type="submit" w={150}>
              登録
            </Button>
          </HStack>
        </VStack>
      </form>
    </FormProvider>
  )
}
