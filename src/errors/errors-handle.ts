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

  constructor(message: string, errors: Record<string,string[]>,statusCode: StatusCode) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}