import * as z from 'zod'

const orderItemValidation = z.object({
  product: z.number({message:'Product must be number'}).min(1, 'Product must be at last 1'),
  quantity: z.number({message:'Product must be number'}).min(1, 'Quantity must be at least 1'),
  cartItem: z.number({message:'Item must be number'}).min(1, 'Item must be at least 1')
});

const orderValidation = z.object({
  orderAddress:z.string({message:'address is required!'}),
  zipCode:z.number({message:"zip code is number!"}).min(1, 'Product must be at last 1'),
  items:z.array(orderItemValidation).min(1,"item cannot be null!")
});

export default orderValidation