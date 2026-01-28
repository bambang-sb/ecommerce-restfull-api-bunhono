import { userRegisterValidation } from "../validations/userValidation";
import { validate } from "../validations/validate";
import { findUserByEmail, registerUser,findUserByUsername } from "../models/userModel";
import { ErrorHandle } from "../errors/errors-handle";
import * as bcrypt from 'bcryptjs';
import { UserRegisterType } from "../types/type";

export const registerService = async (request:UserRegisterType) => {
  const valid = validate(request,userRegisterValidation);
  
  //cek email
  let emailExist = await findUserByEmail(valid.email);
  if(emailExist){
    throw new ErrorHandle('email already exist!',409);
  }

  //cek username
  let usernameExist = await findUserByUsername(valid.username);
  if(usernameExist){
    throw new ErrorHandle('username already exist!',409);
  }

  //hash password
  valid.password = bcrypt.hashSync(valid.password,10);

  //simpan ke db
  // await registerUser(valid);

}