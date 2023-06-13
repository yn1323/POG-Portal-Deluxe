'use client'

import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { FiMail } from 'react-icons/fi'

type Props = {
  disabled?: boolean
}

export const MailInput = ({ disabled }: Props) => {
  const { register } = useFormContext()
  return (
    <FormControl id="email">
      <FormLabel>メールアドレス</FormLabel>
      <InputGroup>
        <InputLeftElement color="gray.300" pointerEvents="none">
          <FiMail />
        </InputLeftElement>
        <Input
          disabled={disabled}
          data-testid="email"
          role="textbox"
          type="email"
          maxLength={64}
          required
          {...register('email', {
            required: true,
          })}
        />
      </InputGroup>
    </FormControl>
  )
}
