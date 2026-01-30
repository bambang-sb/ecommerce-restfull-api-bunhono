import { userLoginValidation, userRegisterValidation } from "../validations/userValidation";
import { validate } from "../validations/validate";
import { findUserByEmail, registerUser,findUserByUsername, findByUsernameLogin } from "../models/userModel";
import { ErrorHandle } from "../errors/errors-handle";
import * as bcrypt from 'bcryptjs';
import { UserLoginType, UserRegisterType } from "../types/type";
import {sign} from 'hono/jwt';

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
  await registerUser(valid);

}

export const loginServices = async(request:UserLoginType)=>{
  let valid = validate(request,userLoginValidation);

  //cek username
  let user= await findByUsernameLogin(valid.username);
  if(!user) throw new ErrorHandle('username or password wrong!',401)
  
  //cek password
  let userPass = await bcrypt.compare(valid.password,user.password)
  if(!userPass) throw new ErrorHandle('username or password wrong!',401);
  
  //create jwt
  let payload = {
    user:user,
    exp:Math.floor(Date.now() / 1000) + 60 * 30 // 5 menit
  }
  const token = await sign(payload,Bun.env.TOKEN_SECRET || "default secret")

  return token;

  //
}