import { Context } from "hono";
import { ErrorHandle } from "../errors/errors-handle";
import cartService from "../services/cartService";
import { createdResponse, successResponse, updatedResponse } from "../helpers/response";

const getCart = async(c:Context)=>{
  let {user} = c.get('jwtPayload');

  let res = await cartService.getCartItem(user.idUser);

  return successResponse(c,res);
}

const createCartItem = async(c:Context)=>{
  let {user} = c.get('jwtPayload');
  let req = await c.req.json();

  if(!req) throw new ErrorHandle('invalid request body schema!',400);

  await cartService.createCartItem(req,user.idUser)
  
  return createdResponse(c);
}

const updateCartItemQuantity = async(c:Context)=>{
  let idCartItem = c.req.param('idCartItem');
  let req = await c.req.json();

  if(!req) throw new ErrorHandle('invalid request body schema!',400);

  await cartService.updateCartItemQuantity(req,Number(idCartItem));

  return updatedResponse(c);
}

const deleteCartItem = async(c:Context)=>{
  let idCartItem = c.req.param('idCartItem');

  await cartService.deleteCartItem(Number(idCartItem));

  return updatedResponse(c,'deleted');
}

export default{
  getCart,
  createCartItem,
  updateCartItemQuantity,
  deleteCartItem
}