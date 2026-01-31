import { Context } from "hono";
import orderService from "../services/orderService";
import { createdResponse, successResponse } from "../helpers/response";
import { ErrorHandle } from "../errors/errors-handle";

const getOrder = async(c:Context)=>{
  let {user} = c.get('jwtPayload');

  let res = await orderService.getOrder(user.idUser);

  return successResponse(c,res);
}

const createOrder = async(c:Context)=>{
  let req = await c.req.json();
  let {user} = c.get('jwtPayload');

   if(!req) throw new ErrorHandle('invalid request body schema!',400);

  await orderService.createOrder(req,user.idUser)
  return createdResponse(c)
}

export default{
  getOrder,
  createOrder
}