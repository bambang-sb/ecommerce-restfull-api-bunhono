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

const createOrder = async(request:OrderItemType,totalPrice:number,userId:number)=>{
  let order = await prisma.$transaction(async(tx)=>{
    let ord = await tx.orders.create({
      data:{
        userId:userId,
        totalPrice:totalPrice,
        orderStatus:'pending',
        addressOrdered:request.orderAddress,
        zipCode:String(request.zipCode)
      }
    });

    await tx.orderItems.create({
      data:{
        orderId:ord.idOrder,
        productId:request.product,
        quantity:request.quantity
      }
    })

    //stock decrement
    await productModel.stockDecrement(request.product,request.quantity,tx);

    //delete cart items after order
    await cartModel.removeCartItemsAfterOrder(request.cartItem,tx);

    return ord;
  })
  return order;
}

export default{
  getOrder,
  createOrder
}