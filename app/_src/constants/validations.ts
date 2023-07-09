import { z } from 'zod'

export const userSchemas = z.object({
  email: z
    .string()
    .nonempty('必須入力です')
    .email('メールアドレスの形式で入力してください。'),
  password: z
    .string()
    .nonempty('必須入力です')
    .min(8, '8文字以上16文字以内で入力してください。')
    .max(16, '8文字以上16文字以内で入力してください。'),
  name: z
    .string()
    .nonempty('必須入力です')
    .max(40, '40文字以内で入力してください。'),
  picture: z.string().optional(),
})

export const pogSchemas = z.object({
  pageTitle: z
    .string()
    .nonempty('必須入力です')
    .max(40, '40文字以内で入力してください。'),
  pageUrl: z
    .string()
    .nonempty('必須入力です')
    .max(200, '200文字以内で入力してください。')
    .superRefine((value, ctx) => {
      if (
        !value.includes('https://pogstarion.com/groupuserlist.do?group_num=')
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '指定のページでないか、TOPページではありません。',
        })
      }
    }),
  pageOrder: z.number().nonnegative(),
})
