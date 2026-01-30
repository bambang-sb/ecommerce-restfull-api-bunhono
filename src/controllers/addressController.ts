import { Context } from "hono";
import { createdResponse, successResponse, updatedResponse } from "../helpers/response";
import addressService from "../services/addressService";
import { ErrorHandle } from "../errors/errors-handle";

const getUserAddress = async(c:Context)=>{
  let jwtPayload = c.get('jwtPayload');
  let res = await addressService.getAddressUser(jwtPayload.user.idUser);
  return successResponse(c,res);
}

const createOrUpdateUserAddress = async(c:Context)=>{
  let jwtPayload = c.get('jwtPayload');
  let req = await c.req.json();
  if(!req) throw new ErrorHandle('invalid request body schema!',400);

  let info = await addressService.createOrUpdateAddressUser(req,jwtPayload.user.idUser);
  if(info) return createdResponse(c);
  
  return updatedResponse(c);
  
}

export default{
  getUserAddress,
  createOrUpdateUserAddress
}