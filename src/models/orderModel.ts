import { Prisma } from "../../prisma/generated/prisma/client"
import { prisma } from "../config/database"
import { OrderItemType } from "../types/type"
import cartModel from "./cartModel"
import productModel from "./productModel"

const getOrder = async(userId:number)=>{
  return await prisma.orders.findMany({
    select:{
      totalPrice:true,
      orderStatus:true,
      addressOrdered:true,
      zipCode:true,
      orderItems:{
        select:{
          quantity:true,
          product:{
            select:{
              name:true,
              price:true
              
            }
          }
        }
      }
    },
    where:{
      userId:userId
    }
  })
}

const createOrder = async(request:OrderItemType,totalPrice:number,userId:number,cartItemId:number[],tx:Prisma.TransactionClient)=>{
  
    let ord = await tx.orders.create({
      data:{
        userId:userId,
        totalPrice:totalPrice,
        orderStatus:'pending',
        addressOrdered:request.orderAddress,
        zipCode:String(request.zipCode)
      }
    });

    return ord;
  
}

const createOrderItem = async(tx:Prisma.TransactionClient,request:OrderItemType,orderId:number)=>{
  let dataItems = request.items.map(v=>(
      {
        orderId:orderId,
        productId:v.product,
        quantity:v.quantity
      }
  ));

    await tx.orderItems.createMany({
      data:dataItems
    });
}

export default{
  getOrder,
  createOrder,
  createOrderItem
}