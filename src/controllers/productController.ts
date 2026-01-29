import { Context } from "hono";
import { ErrorHandle } from "../errors/errors-handle";
import productService from "../services/productService";
import { createdResponse, successResponse, updatedResponse } from "../helpers/response";

const getAll = async(c:Context)=>{

  let res = await productService.getAll();

  return successResponse(c,res)

}

const getId = async(c:Context)=>{
  let id = c.req.param('id');

  let res = await productService.getId(Number(id))

  return successResponse(c,res)
}

const create = async(c:Context)=>{
  let req = await c.req.json();
  if(!req) throw new ErrorHandle('invalid request body schema!',400);

  await productService.create(req);

  return createdResponse(c);
}

const update = async(c:Context)=>{
  let req = await c.req.json();
  let id = c.req.param('id');
  if(!req) throw new ErrorHandle('invalid request body schema!',400);

  let ss =await productService.update(req,Number(id));
  return successResponse(c,ss)
  return updatedResponse(c);
}

export default{
  getAll,getId,create,update
}