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
  let req = await c.req.formData();
  if(req.getAll('image').length > 1) throw new ErrorHandle('max file upload 1',400);
  let dataJson = {
    name:req.get('name') as string,
    description:req.get('description')as string,
    stock:req.get('stock') as string,
    price:req.get('price') as string,
    categorie:req.get('categorie') as string,
    image:req.get('image') as File
  }
  
  // if(!data) throw new ErrorHandle('invalid request body schema!',400);
  
  await productService.create(dataJson);

  return createdResponse(c);
}

const update = async(c:Context)=>{
  let req = await c.req.json();
  let id = c.req.param('id');
  if(!req) throw new ErrorHandle('invalid request body schema!',400);

  let ss =await productService.update(req,Number(id));
  
  return updatedResponse(c);
}

const updateImage = async(c:Context)=>{
  let req = await c.req.formData();
  if(req.getAll('image').length > 1) throw new ErrorHandle('max file upload 1',400);
  let dataJson = {
    image:req.get('image') as File,
    imageOld:req.get('imageOld') as string
  }
  let idProduct = c.req.param('id');
  
  // if(!data) throw new ErrorHandle('invalid request body schema!',400);
  
  await productService.updateImage(dataJson,idProduct);

  return updatedResponse(c);
}

export default{
  getAll,getId,create,update, updateImage
}