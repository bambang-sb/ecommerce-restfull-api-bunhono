import { ErrorHandle } from "../errors/errors-handle";
import productModel from "../models/productModel";
import { ProductType } from "../types/type";
import { productIDValidation, productValidation,productImageValidation } from "../validations/productValidation"
import { validate } from "../validations/validate"
import {uploadFile} from '../helpers/upload'
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
  let {pathFile,filename} = await uploadFile(valid.image)
  valid.image.name = filename
  
  //save
  // let save = await productModel.create(valid);
  // if(!save)throw new ErrorHandle('Fail save product!',400);
  try{
    //save db
    await productModel.create(valid)
    
  }catch(e){
    if(await fs.exists(pathFile)){
      await fs.unlink(pathFile)
    }
    throw new ErrorHandle('create product fail!'+e,404);
  }
  
}

const updateImage = async(data:{image:File,imageOld:string},idProduct:string)=>{
  let valid = validate(data,productImageValidation);
  let validId = validate({id:Number(idProduct)},productIDValidation)

  //config upload file
  let {pathFile,filename,uploadDir} = await uploadFile(valid.image)
  valid.image.name = filename

  try{
    //save db
    await productModel.updateImage(valid,validId.id)
    await fs.unlink(uploadDir+"/"+valid.imageOld);
  }catch(e){
    if(await fs.exists(pathFile)){
      await fs.unlink(pathFile)
    }
    throw new ErrorHandle('create product fail!'+e,404);
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
  getAll,getId,create,update,updateImage
}