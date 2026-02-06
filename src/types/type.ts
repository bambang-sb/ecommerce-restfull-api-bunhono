export type UserRegisterType ={
  username: string,
  email: string,
  password: string
}

export type CategorieType = {
  name:string
}

export type UserLoginType = {
  username:string,
  password:string
}

export type ProductType = {
  name: string,
  description: string,
  price: string,
  stock:string,
  categorie:string,
  image:File
}

export type AddressType = {
  street:string,
  city:string,
  country:string,
  zipCode:string
}

export type CartItemType = {
  product:number,
  quantity:number
}

export type OrderItemType = {
  orderAddress:string,
  zipCode:number,
  items:CreateOrderItemsType[]
}

type CreateOrderItemsType = {
  cartItem:number,
  product:number,
  quantity:number,
}