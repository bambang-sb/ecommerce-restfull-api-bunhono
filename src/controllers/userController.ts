import { Context } from "hono";
import {registerService} from "../services/userServices";
import { ErrorHandle } from "../errors/errors-handle";
import { createdResponse } from "../helpers/response";

export const registerController = async(c:Context)=>{
  let req = await c.req.json();

  if(!req){
    throw new ErrorHandle('invalid request body schema!',400);
  }

  await registerService(req);

  return createdResponse(c, 'registered');
}