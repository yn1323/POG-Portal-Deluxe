'use client'

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { FC, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { RiLockPasswordLine } from 'react-icons/ri'

export const PasswordInput: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{ password: string }>()

  const errorMessage = useMemo(
    () => errors.password?.message,
    [errors.password?.message]
  )

  return (
    <FormControl id="password" isInvalid={!!errors.password}>
      <FormLabel>パスワード</FormLabel>
      <InputGroup>
        <InputLeftElement color="gray.300" pointerEvents="none">
          <RiLockPasswordLine />
        </InputLeftElement>
        <Input
          autoComplete="current-password"
          data-testid="password"
          maxLength={16}
          role="textbox"
          type="password"
          {...register('password')}
        />
      </InputGroup>
      {errorMessage && (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
