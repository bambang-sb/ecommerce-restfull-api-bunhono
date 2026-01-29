import { Context } from "hono";
import {loginServices, registerService} from "../services/userServices";
import { ErrorHandle } from "../errors/errors-handle";
import { createdResponse, successResponse } from "../helpers/response";

export const registerController = async(c:Context)=>{
  let req = await c.req.json();

  if(!req){
    throw new ErrorHandle('invalid request body schema!',400);
  }

  await registerService(req);

  return createdResponse(c, 'registered');
}

export const loginController = async(c:Context)=>{
  let req = await c.req.json();
  if(!req) throw new ErrorHandle('invalid request body schema!',400);

  let token = await loginServices(req);
  let data = {token:token,tokenType:"Bearer"};
  
  return successResponse(c,data,'logged');
}