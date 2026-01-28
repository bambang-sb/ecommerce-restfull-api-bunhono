import {prisma} from '../config/database';
import { UserType } from '../types/type';

export const registerUser = async (valid:UserType) => {
  return await prisma.users.create({
    data: {
      email: valid.email,
      username: valid.username,
      password: valid.password
    }
  });
};

export const findUserByEmail = async (valid: UserType) => {
  return await prisma.users.findFirst({
    select: {
      email: true
    },
    where: {
      email: valid.email
    }
  });
}
export const findUserByUsername = async (valid: UserType) => {
  return await prisma.users.findFirst({
    select: {
      username: true
    },
    where: {
      username: valid.username
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