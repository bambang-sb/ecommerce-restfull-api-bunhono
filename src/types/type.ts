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
  createdAt?: Date,
  updatedAt?: Date
}