import { prisma } from '../config/database';
import {AddressType} from '../types/type';

const getUserAddress = async(userid:number)=>{
  return await prisma.addresses.findFirst({
    select:{
      street:true,
      city:true,
      country:true,
      zipCode:true
    },
    where:{
      userId:userid
    }
  })
}

const createUserAddress = async(data:AddressType,userId:number)=>{
  await prisma.addresses.create({
    data:{
      userId:userId,
      street:data.street,
      city:data.city,
      country:data.country,
      zipCode:data.zipCode
    }
  })
}

const updateUserAddress = async(data:AddressType,userId:number)=>{
  await prisma.addresses.update({
    data:{
      street:data.street,
      city:data.city,
      country:data.country,
      zipCode:data.zipCode
    },
    where:{
      userId:userId
    }
  })
}

export default{
  getUserAddress,
  createUserAddress,
  updateUserAddress
}