import productModel from "../../models/productModel";

type PaginateType ={
  limit?:number|undefined,
  cursor?:number|undefined
}

const getProduct = async(q:PaginateType)=>{
  let limit = q.limit ? q.limit:2;
  let cursor = q.cursor ? q.cursor:undefined;

  let res = await productModel.getProductCustomer(Number(cursor),Number(limit));
  let nextCursor = res.length === Number(limit)?res[res.length - 1].idProduct:null
  return {res,limit,nextCursor}
}

export default {
  getProduct
};