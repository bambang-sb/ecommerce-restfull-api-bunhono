import { ErrorHandle } from "../errors/errors-handle";
import categorieModel from "../models/categorieModel";
import { CategorieType } from "../types/type";
import { categoryIDValidation, categoryValidation } from "../validations/categoryValidation"
import { validate } from "../validations/validate"

const getAll = async()=>{
  return await categorieModel.getAll();
}

const getId = async(id:number)=>{
  let valid = validate({id:id},categoryIDValidation);

  let data = await categorieModel.getId(valid.id);
  if(!data) throw new ErrorHandle('Categorie Not Found!',404);

  return data;
}

const create = async(request:CategorieType)=>{
  let valid = validate(request,categoryValidation);

  //cek duplicate
  let cek = await categorieModel.getCategorieName(valid.name);
  if(cek) throw new ErrorHandle('categorie all ready exist!',409);

  //save
  await categorieModel.create(valid);

}

const update = async(request:[],id:number)=>{
  let valid = validate(request,categoryValidation);
  let validId = validate({id:id},categoryIDValidation);

  //cek duplicate except self
  let cek = await categorieModel.getCategorieNameExceptSelf(valid.name,validId.id);
  if(cek) throw new ErrorHandle('categorie all ready exist!',409);

  //update
  await categorieModel.update(valid,validId.id);

}

export default {
  getAll,getId,create,update
}