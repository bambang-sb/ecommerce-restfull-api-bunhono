import {Context} from 'hono';
import { ErrorHandle, ValidationError } from '../errors/errors-handle';
import { JwtTokenExpired, JwtTokenSignatureMismatched } from 'hono/utils/jwt/types';
import { errorResponse,validationErrorResponse } from '../helpers/response';

const errorMiddleware = (err:unknown,c:Context)=>{
  if (err instanceof ErrorHandle) {
    return errorResponse(c, err.message, err.statusCode);
  }

  if(err instanceof SyntaxError){
    return errorResponse(c,'Invalid JSON syntax!', 400);
  }

  if(err instanceof ValidationError){
    return validationErrorResponse(c, err.errors, err.statusCode);
  }

  if(err instanceof JwtTokenSignatureMismatched){
    return errorResponse(c,'invalid token signature!', 401);
  }

  if(err instanceof JwtTokenExpired){
   return errorResponse(c,'token expired!', 401); 
  }

  return c.json(
    {
      message: 'Internal Server Error!!',
      err:String(err),
      nameerr: err instanceof Error ? err.name : 'UnknownError',
    },
    500
  );
}

export default errorMiddleware;