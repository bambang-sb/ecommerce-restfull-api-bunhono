import * as z from 'zod'

const productValidation = z.object({
  name: z.string({message: "name is required!"})
    .min(3,{message:'name minimal 3 character!'})
    .max(100,{message:'name maximal 100 character!'}),
  description: z.string({message: "description is required!"}),
  price: z.number({message: "price is required!"})
    .positive({message: "price must be positive!"}),
  stock: z.number({message: "stock is required!"})
    .min(0,{message: "stock must be at least 0!"}),
  categoryId: z.number({message: "category is required!"})
    .positive({message: "category must be positive!"})
}).strict();

const productIDValidation = z.object({
  id: z.coerce.number({message: "id must be a number!"})
    .positive({message: "id must be positive!"})
}).strict();

export {
  productValidation,
  productIDValidation
}