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

// export const findUserByUsernameWithPassword = async (username: string,password:string) => {
//   return await prisma.users.findUnique({
//     select: {
//       idUser:true,
//       username: true,
//       password: true
//     },
//     where: {
//       username:username,
//       password:password
//     }
//   });
// }