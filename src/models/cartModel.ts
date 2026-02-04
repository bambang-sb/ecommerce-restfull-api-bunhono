import { Prisma } from '../../prisma/generated/prisma/client';
import {prisma} from '../config/database';
import { CartItemType } from '../types/type';

const getCartBeforeCreate = async(userId:number)=>{
  return await prisma.carts.findFirst({
    select:{
      userId:true,
      idCart:true
    },
    where:{
      userId:userId
    }
  })
}
const getCart = async(userId:number)=>{
  let res = await prisma.carts.findFirst({
    select:{
      idCart:true,
      userId:true,
      cartItems:{
        select:{
          quantity:true
        },
        include:{
          product:{
            select:{
              name:true,
              price:true,
              stock:true,
            }
          }
        }
      }
    },
    where:{
      userId:userId
    }
  })

  return res;
}

const getCartItems = async(userId:number)=>{
  let res = await prisma.cartItems.findMany({
    select:{
      idCartItem:true,
      quantity:true,
      product:{
        select:{
          name:true,
          price:true
        }
      }
    },
    
    where:{
      cart:{
        userId:userId
      }
    }
  })

  return res;
}

const getCartItemByProduct = async(cartId:number,productId:number)=>{
  let res = await prisma.cartItems.findFirst({
    where:{
      cartId:cartId,
      productId:productId
    }
  })

  return res;
}

const createCartAndCartItem = async(request:CartItemType,userId:number)=>{
  await prisma.$transaction(async(tx)=>{
    let cart = await tx.carts.create({
      data:{
        userId:userId
      }
    });

    await tx.cartItems.create({
      data:{
        cartId:cart.idCart,
        productId:request.product,
        quantity:request.quantity
      }
    })
  })
}

const createCartItem = async(request:CartItemType,cartId:number)=>{
  await prisma.cartItems.create({
    data:{
      cartId:cartId,
        productId:request.product,
        quantity:request.quantity
    }
  })
}

const updateCartItemQuantity = async(request:CartItemType,idCartItem:number)=>{
  await prisma.cartItems.update({
    where:{
      idCartItem:idCartItem
    },
    data:{
      quantity:request.quantity
    }
  });
}

const updateQuatity = async(qty:number,idCart:number,productid:number)=>{
  await prisma.cartItems.updateMany({
    where:{
      cartId:idCart,
      productId:productid
    },
    data:{
      quantity:{
        increment:qty
      }
    }
  })
}

const deleteCartItem = async(cartItemId:number)=>{
  await prisma.cartItems.delete({
    where:{
      idCartItem:cartItemId
    }
  })
}

const removeCartItemsAfterOrder = async(cartItemId:number[],tx:Prisma.TransactionClient)=>{

  await  tx.cartItems.deleteMany({
      where:{
        idCartItem:{
          in:cartItemId
        }
      }
    })
  
}

export default{
  getCartBeforeCreate,
  getCart,
  getCartItems,
  getCartItemByProduct,
  createCartAndCartItem,
  createCartItem,
  updateCartItemQuantity,
  updateQuatity,
  deleteCartItem,
  removeCartItemsAfterOrder
}