import addressModel from "../models/addressModel";
import { AddressType } from "../types/type";
import { addressValidation } from "../validations/addressValidation";
import { validate } from "../validations/validate";

const getAddressUser = async(userId:number)=>{
  let res = await addressModel.getUserAddress(userId);
  
  return res;
}

const createOrUpdateAddressUser = async(request:AddressType,userId:number)=>{
  let valid = validate(request,addressValidation);

  let cekUserAddress = await addressModel.getUserAddress(userId);
  if(cekUserAddress){
    //update
    await updateAddressUser(valid,userId);
  
    return false;
  }

  //create address user
  await addressModel.createUserAddress(valid,userId);
  return true;
}

const updateAddressUser = async(request:AddressType,userId:number)=>{
  let valid = validate(request,addressValidation);

  await addressModel.updateUserAddress(valid,userId);

}

export default{
  getAddressUser,
  createOrUpdateAddressUser
}