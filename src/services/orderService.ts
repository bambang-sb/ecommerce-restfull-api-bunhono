import { ErrorHandle } from "../errors/errors-handle";
import orderModel from "../models/orderModel";
import productModel from "../models/productModel";
import { OrderItemType } from "../types/type";
import orderItemValidation from "../validations/orderItemValidation";
import { validate } from "../validations/validate";

const createOrder = async(request:OrderItemType,userId:number)=>{
  let valid = validate(request,orderItemValidation);

  //get price stok
  let price = await productModel.getHargaStockByProduct(valid.product);
  if(!price) throw new ErrorHandle('product invalid!',400);

  //cek stok
  let cekStok = price.stock - valid.quantity;
  if(cekStok < 0) throw new ErrorHandle('stock product is low!!',400)

  let totalPrice = valid.quantity * price.price;
  let validOrder = await orderModel.createOrder(request,totalPrice,userId);
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