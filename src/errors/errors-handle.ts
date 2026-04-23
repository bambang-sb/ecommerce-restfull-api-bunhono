// import {HTTPException} from 'hono/http-exception'
import type { StatusCode } from 'hono/utils/http-status';

export class ErrorHandle extends Error {
  
  statusCode: StatusCode;

  constructor(message: string, statusCode: StatusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ValidationError extends Error {

  statusCode: StatusCode;
  errors: Record<string, string[]>;

  constructor(errors: Record<string,string[]>,message: string="Validation Fail!", ) {
    super(message);
    this.statusCode = 422;
    this.errors = errors;
  }
}