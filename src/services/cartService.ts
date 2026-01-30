import cartModel from "../models/cartModel"
import { CartItemType } from "../types/type";
import {cartItemValidation, quantityValidation} from "../validations/cartItemValidation";
import { validate } from "../validations/validate";

const getCartItem = async(userId:number)=>{
  let res = await cartModel.getCartItems(userId);

  return res;
}

const createCartItem = async(request:CartItemType,userId:number)=>{
  let valid = validate(request,cartItemValidation)

  //cek cart
  let cart = await cartModel.getCart(userId);
  if(cart == null){
    //create cart adn cart items
    await createCartAndCartItem(valid,userId);
    return;
  }

  //cek cart item
  let existProduct = await cartModel.getCartItemByProduct(cart.idCart,valid.product)
  if(existProduct != null){
    // update quantity
    await cartModel.updateQuatity(valid.quantity,cart.idCart,valid.product);
    return;
  }

  //create cart item
  await cartModel.createCartItem(valid,cart.idCart);
  
}

const createCartAndCartItem = async(request:CartItemType,userId:number)=>{
  await cartModel.createCartAndCartItem(request,userId);
  
}

const updateCartItemQuantity = async(request:CartItemType,cartItemId:number)=>{
  let valid = validate(request,quantityValidation);

  await cartModel.updateCartItemQuantity(valid,cartItemId);
}

const deleteCartItem = async(cartItemId:number)=>{

  await cartModel.deleteCartItem(cartItemId);
}

export default{
  getCartItem,
  createCartItem,
  updateCartItemQuantity,
  deleteCartItem
}