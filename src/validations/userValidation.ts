import * as z from 'zod'

const userLoginValidation = z.object({
  email: z.string({message: "email is required!"})
    .email({message: "invalid email format!"}),
  username: z.string({message: "username is required!"}),
  password: z.string({message:'password is required!'})
    .min(3,{message:'password minimal 3 character!'})
    .max(100,{message:'password maximal 100 character!'})
}).strict();

const userRegisterValidation = z.object({
  email: z.string({message: "email is required!"})
    .email({message: "invalid email format!"}),
  password: z.string({message:'password is required!'})
    .min(3,{message:'password minimal 3 character!'})
    .max(100,{message:'password maximal 100 character!'})
}).strict();

export {
  userLoginValidation,
  userRegisterValidation
}