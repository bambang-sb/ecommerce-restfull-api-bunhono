import * as z from 'zod'

const orderItemValidation = z.object({
  product: z.number({message:'Product must be number'}).min(1, 'Product must be at last 1'),
  quantity: z.number({message:'Product must be number'}).min(1, 'Quantity must be at least 1'),
  orderAddress:z.string({message:'address is required!'}),
  zipCode:z.number({message:"zip code is required!"}).min(1, 'Product must be at last 1')
})

export default orderItemValidation