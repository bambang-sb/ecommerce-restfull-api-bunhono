import * as z from 'zod'

const categoryValidation = z.object({
  name: z.string({message: "name is required!"})
    .min(3,{message:'name minimal 3 character!'})
    .max(100,{message:'name maximal 100 character!'})
}).strict();

const categoryIDValidation = z.object({
  id: z.coerce.number({message: "id must be a number!"})
    .positive({message: "id must be positive!"})
}).strict();

export {
  categoryValidation,
  categoryIDValidation
}