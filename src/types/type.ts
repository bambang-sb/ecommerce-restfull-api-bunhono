export interface UserType {
  username: string;
  email: string;
  password: string;
}

export interface ProductType {
  id?: number;
  name: string;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}