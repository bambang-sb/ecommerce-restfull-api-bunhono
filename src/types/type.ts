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
  price: number,
  stock:number,
  categorie:number
}

export type AddressType = {
  street:string,
  city:string,
  country:string,
  zipCode:string
}

export type CartItemType = {
  cart?:number,
  product:number,
  quantity:number
}

export type OrderItemType = {
  cartItem:number
  product:number,
  quantity:number,
  orderAddress:string,
  zipCode:number
}