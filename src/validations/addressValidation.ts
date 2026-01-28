import * as z from 'zod'

const addressValidation = z.object({
  street: z.string({message: "street is required!"})
    .min(3,{message:'street minimal 3 character!'})
    .max(100,{message:'street maximal 100 character!'}),
  city: z.string({message: "city is required!"})
    .min(2,{message:'city minimal 2 character!'})
    .max(100,{message:'city maximal 100 character!'}),
  zipCode: z.string({message: "postal Code is required!"})
    .min(4,{message:'postal Code minimal 4 character!'})
    .max(20,{message:'postal Code maximal 20 character!'}),
  country: z.string({message: "country is required!"})
    .min(2,{message:'country minimal 2 character!'})
    .max(100,{message:'country maximal 100 character!'}),
}).strict();

const addressIDValidation = z.object({
  id: z.coerce.number({message: "id must be a number!"})
    .positive({message: "id must be positive!"})
}).strict();

export {
  addressValidation,
  addressIDValidation
}