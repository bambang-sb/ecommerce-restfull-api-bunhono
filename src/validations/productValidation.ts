import * as z from 'zod'

const productValidation = z.object({
  name: z.string({message: "name is required!"})
    .min(3,{message:'name minimal 3 character!'})
    .max(100,{message:'name maximal 100 character!'}),
  description: z.string({message: "description is required!"}),
  price: z.coerce.number({message: "price is required!"})
    .positive({message: "price must be positive!"}),
  stock: z.coerce.number({message: "stock is required!"})
    .min(0,{message: "stock must be at least 0!"}),
  categorie: z.coerce.number({message: "category is must be number!"})
    .positive({message: "category must be positive!"}),
  image:z.file({message:"image not choise"}).max(2097152,{message:'max file 2MB'}).mime(["image/png","image/jpeg"])
}).strict();

const productIDValidation = z.object({
  id: z.coerce.number({message: "id must be a number!"})
    .positive({message: "id must be positive!"})
}).strict();


const productImageValidation = z.object({
  image:z.file({message:"image not choise"}).max(2097152,{message:'max file 2MB'}).mime(["image/png","image/jpeg"]),
  imageOld:z.string("image old must be string").max(50,{message:'max 50 character!'}).optional()
}).strict();

export {
  productValidation,
  productIDValidation,
  productImageValidation
}