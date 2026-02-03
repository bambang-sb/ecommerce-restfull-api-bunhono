import { ErrorHandle } from "../errors/errors-handle";
import orderModel from "../models/orderModel";
import productModel from "../models/productModel";
import { OrderItemType } from "../types/type";
import orderItemValidation from "../validations/orderItemValidation";
import { validate } from "../validations/validate";

const createOrder = async(request:OrderItemType,userId:number)=>{
  let valid:OrderItemType = validate(request,orderItemValidation);

  //get productID
  const productId = valid.items.map(val=>val.product);

  //get cartItem ID
  const cartItemId = valid.items.map(val=>val.cartItem);

  //get stock and price
  let price = await productModel.getHargaStockByProduct(productId);
  if(!price) throw new ErrorHandle('product invalid!',400);

  //cek stok
  let stok = valid.items.map((v,i)=>Number(price[i].stock) - Number(v.quantity));
  if(stok.some(v=>v < 1)) throw new ErrorHandle('Stock Product is low!',400);

  //total price
  let totalPrice = valid.items.map((v,i)=>v.quantity * price[i].price);
  let sumPrice = totalPrice.reduce((acc,cur)=>acc+cur,0);

  //create order
  let validOrder = await orderModel.createOrder(request,sumPrice,userId,cartItemId);
  if(!validOrder) throw new ErrorHandle('create order fail!',400)

}

const getOrder = async(userId:number)=>{
  let res = await orderModel.getOrder(userId);
  return res;
}

export default{
  createOrder,
  getOrder
}