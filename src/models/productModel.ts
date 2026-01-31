import {prisma} from '../config/database';
import { ProductType } from '../types/type';
import { Prisma } from '../../prisma/generated/prisma/client';

const getAll = async()=>{
  return await prisma.products.findMany();
}

const getProductNameExceptSelf = async(name:string,id:number)=>{
  return await prisma.products.findFirst({
    where:{
      name:name,
      NOT:{
        idProduct:id
      }
    }
  })
}

const getId = async(id:number)=>{
  return await prisma.products.findFirst({
    select:{
      idProduct:true,
      name:true,
      description:true,
      price:true
    },
    where:{
      idProduct:id
    }
  })
}

const create = async(res:ProductType)=>{
  return await prisma.products.create({
    data:{
      name:res.name,
      description:res.description,
      price:res.price,
      stock:res.stock,
      categorieId:res.categorie
    }
  })
}

const update = async(res:ProductType,id:number)=>{
  await prisma.products.update({
    where:{
      idProduct:id
    },
    data:{
      name:res.name,
      description:res.description,
      price:res.price,
      stock:res.stock,
      categorieId:res.categorie
    }
  })
}

const getHargaStockByProduct = async(idProduct:number)=>{
  return await prisma.products.findFirst({
    select:{
      price:true,
      stock:true
    },
    where:{
      idProduct:idProduct
    }
  })
}

const stockDecrement = async(idProduct:number,qty:number,tx:Prisma.TransactionClient)=>{
  await tx.products.update({
    where:{
      idProduct:idProduct
    },
    data:{
      stock:{
        decrement:qty
      }
    }
  })
}

export default{
  getAll,
  getId,
  create,
  update,
  getProductNameExceptSelf,
  getHargaStockByProduct,
  stockDecrement
}