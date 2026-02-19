import {Context} from 'hono';
import { successResponsePaginate } from '../../helpers/response';
import productCustomer from '../../services/customer/productCustomerService'

const getProduct = async(c:Context)=>{
  let q = c.req.query();

  let {res,limit,nextCursor}= await productCustomer.getProduct(q);
  
  return successResponsePaginate(c,res,nextCursor,limit)
}

export default {getProduct}