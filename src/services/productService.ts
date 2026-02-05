import { ErrorHandle } from "../errors/errors-handle";
import productModel from "../models/productModel";
import { ProductType } from "../types/type";
import { productIDValidation, productValidation } from "../validations/productValidation"
import { validate } from "../validations/validate"
import path from 'path'
import fs from 'fs/promises'

const getAll = async()=>{
  return await productModel.getAll();
}

const getId = async(id:number)=>{
  let valid = validate({id:id},productIDValidation);

  let data = await productModel.getId(valid.id);
  if(!data) throw new ErrorHandle('Product Not Found!',404);

  return data;
}

const create = async(request:ProductType)=>{
  let valid = validate(request,productValidation);
  
  //config upload file
  const buffer = Buffer.from(await valid.image.arrayBuffer())
  const filename = `${Date.now()}-${valid.image.name}`
  let uploadDir = path.join(process.cwd(),"/uploads");
  const filePath = path.join(uploadDir, filename)
  valid.image.name = filename
  
  //save
  // let save = await productModel.create(valid);
  // if(!save)throw new ErrorHandle('Fail save product!',400);
  try{
    //upload file
    await fs.writeFile(filePath, buffer)

    //save db
    await productModel.create(valid)
    
  }catch(e){
    if(await fs.exists(filePath)){
      await fs.unlink(filePath)
    }
    throw new ErrorHandle('create product fail!',404);
  }
  
}

const update = async(request:ProductType,id:number)=>{
  let valid = validate(request,productValidation);
  let validId = validate({id:id},productIDValidation);

  //cek product id
  let data = await productModel.getId(valid.id);
  if(!data) throw new ErrorHandle('Product Not Found!',404);

  //update
  await productModel.update(valid,validId.id);
  return validId.id
}

export default {
  getAll,getId,create,update
}