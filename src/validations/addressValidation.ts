import * as z from 'zod'

const addressValidation = z.object({
  street: z.string({message: "street is required!"})
    .nonempty({message: 'street cannot be empty'})
    .min(3,{message:'street minimal 3 character!'})
    .max(100,{message:'street maximal 100 character!'}),
  city: z.string({message: "city is required!"})
    .nonempty({message: 'city cannot be empty'})
    .min(2,{message:'city minimal 2 character!'})
    .max(100,{message:'city maximal 100 character!'}),
  zipCode: z.string({message: "zip Code is required!"})
    .nonempty({message: 'zip Code cannot be empty'})
    .min(4,{message:'zip Code minimal 4 character!'})
    .max(20,{message:'zip Code maximal 20 character!'}),
  country: z.string({message: "country is required!"})
    .nonempty({message: 'country cannot be empty'})
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