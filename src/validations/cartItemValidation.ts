import * as z from 'zod'

const cartItemValidation = z.object({
  product: z.number({message:'product must be number'}).min(1, 'Product ID is required'),
  quantity: z.number({message:'product must be number'}).min(1, 'Quantity must be at least 1'),
})

const quantityValidation = z.object({
  quantity:z.number({message:'quantity must be number'}).min(1,'Quantity must be at least 1')
})

export {
  cartItemValidation,
  quantityValidation
}