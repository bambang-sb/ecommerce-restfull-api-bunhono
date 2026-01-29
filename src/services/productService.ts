import { ErrorHandle } from "../errors/errors-handle";
import productModel from "../models/productModel";
import { ProductType } from "../types/type";
import { productIDValidation, productValidation } from "../validations/productValidation"
import { validate } from "../validations/validate"

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
  
  //save
  await productModel.create(valid);

}

const update = async(request:ProductType,id:number)=>{
  let valid = validate(request,productValidation);
  let validId = validate({id:id},productIDValidation);

  //update
  await productModel.update(valid,validId.id);
  return validId.id
}

export default {
  getAll,getId,create,update
}