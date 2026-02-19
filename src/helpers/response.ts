import { Context, } from 'hono';
import { ContentfulStatusCode,StatusCode } from 'hono/utils/http-status';

// T untuk object ataupun array object
export const successResponse = <T>(c:Context,data: T, msg = 'Success') => {
  return c.json({
    statusCode:200,
    message:msg,
    data:data,
  },200);
};

export const successResponsePaginate = <T>(c:Context,data: T, cursor:number|null,limit:number, msg = 'Success') => {
  return c.json({
    statusCode:200,
    message:msg,
    data:data,
    meta:{
      nextCursor:cursor,
      limit:limit
    }
  },200);
};

export const createdResponse = (c:Context, msg = 'created') => {
  return c.json({
    statusCode:201,
    message:msg,
  },201);
}

export const updatedResponse = (c:Context, msg = 'updated') => {
  return c.json({
    statusCode:200,
    message:msg,
  },200);
  // atau
  // return c.json(204);
}

export const errorResponse = (c:Context, msg = 'Error', statusCode:StatusCode = 400) => {
  return c.json({
    statusCode:statusCode,
    message:msg,
  },statusCode as unknown as ContentfulStatusCode);
};

export const validationErrorResponse = (c:Context, errors: Record<string,string[]>, statusCode:StatusCode = 422) => {
  return c.json({
    statusCode:statusCode,
    message:'validation error!',
    errors:errors,
  },statusCode as unknown as ContentfulStatusCode);
}