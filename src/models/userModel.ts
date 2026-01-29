import {prisma} from '../config/database';
import { UserCreateType } from '../types/prismaType';

export const registerUser = async (valid:UserCreateType) => {
  return await prisma.users.create({
    data: {
      email: valid.email,
      username: valid.username,
      password: valid.password
    }
  });
};

export const findUserByEmail = async (email:string) => {
  return await prisma.users.findFirst({
    select: {
      email: true
    },
    where: {
      email: email
    }
  });
}
export const findUserByUsername = async (username:string) => {
  return await prisma.users.findFirst({
    select: {
      username: true
    },
    where: {
      username: username
    }
  });
}

export const findByUsernameLogin = async (username: string) => {
  return await prisma.users.findFirst({
    select: {
      idUser:true,
      username: true,
      password: true,
      role:true
    },
    where: {
      username:username
    }
  });
}