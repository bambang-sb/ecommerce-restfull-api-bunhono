import {prisma} from '../config/database';
import { ProductType } from '../types/type';
import { Prisma } from '../../prisma/generated/prisma/client';

const getAll = async()=>{
  return await prisma.products.findMany({
    select:{
      idProduct:true,
      name:true,
      description:true,
      price:true,
      categorie:{
        select:{
          name:true
        }
      }
    }
  });
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
      price:true,
      categorie:{
        select:{
          name:true
        }
      }
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
      price:Number(res.price),
      stock:Number(res.stock),
      categorieId:Number(res.categorie),
      image:res.image.name
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
      price:Number(res.price),
      stock:Number(res.stock),
      categorieId:Number(res.categorie)
    }
  })
}

const getHargaStockByProduct = async(idProduct:number[])=>{
  return await prisma.products.findMany({
    select:{
      idProduct:true,
      price:true,
      stock:true
    },
    where:{
      idProduct:{
        in:idProduct
      }
    }
  })
}

const stockDecrement = async(request:{product:number,quantity:number}[],tx:Prisma.TransactionClient)=>{
  await Promise.all(
    request.map(v=>(
      tx.products.update({
        where:{
          idProduct:v.product
        },
        data:{
          stock:{
            decrement:v.quantity
          }
        }
      })
    ))
  )
  
  
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