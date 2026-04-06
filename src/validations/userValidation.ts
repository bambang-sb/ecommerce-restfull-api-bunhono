import * as z from 'zod'

const userLoginValidation = z.object({
  username: z.string().nonempty({message: 'Username cannot be empty'}).min(3,{message:'username minimal 3 character!'}),
  password: z.string({message:'password is required!'})
    .nonempty({message: 'password cannot be empty'})
    .min(3,{message:'password minimal 3 character!'})
    .max(100,{message:'password maximal 100 character!'})
}).strict();
 
const userRegisterValidation = z.object({
  email: z.email({message: "email format failed!"})
      .nonempty({message: 'email cannot be empty'}),
  username: z.string({message: "username is required!"})
      .nonempty({message: 'username cannot be empty'})
      .min(3,{message:'username minimal 3 character!'}),
  password: z.string({message:'password is required!'})
    .nonempty({message: 'password cannot be empty'})
    .min(3,{message:'password minimal 3 character!'})
    .max(100,{message:'password maximal 100 character!'})
}).strict();

export {
  userLoginValidation,
  userRegisterValidation
}