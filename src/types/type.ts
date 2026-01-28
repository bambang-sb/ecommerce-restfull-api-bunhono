export type UserType ={
  username: string;
  email: string;
  password: string;
}

export type ProductType = {
  id?: number;
  name: string;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}