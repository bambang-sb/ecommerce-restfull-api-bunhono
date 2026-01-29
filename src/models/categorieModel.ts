import {prisma} from '../config/database';
import { CategorieType } from '../types/type';

const getAll = async()=>{
  return await prisma.categories.findMany();
}

const getCategorieName = async(name:string)=>{
  return await prisma.categories.findFirst({
    where:{
      name:name
    }
  })
}
const getCategorieNameExceptSelf = async(name:string,id:number)=>{
  return await prisma.categories.findFirst({
    where:{
      name:name,
      NOT:{
        idCategorie:id
      }
    }
  })
}

const getId = async(id:number)=>{
  return await prisma.categories.findFirst({
    select:{
      idCategorie:true,
      name:true
    },
    where:{
      idCategorie:id
    }
  })
}

const create = async(res:CategorieType)=>{
  return await prisma.categories.create({
    data:{
      name:res.name
    }
  })
}

const update = async(res:CategorieType,id:number)=>{
  await prisma.categories.update({
    data:{
      name:res.name
    },
    where:{
      idCategorie:id
    }
  })
}

export default{
  getAll,getId,create,update,getCategorieName,getCategorieNameExceptSelf
}