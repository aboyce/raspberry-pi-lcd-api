// Libraries
import { Request, Response, NextFunction } from 'express'

export abstract class RequestError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export const errorMiddleware = (requestError: RequestError, req: Request, res: Response, next: NextFunction): void => {
  // log the error message
  console.error(requestError.message)

  // log the stack if it has been provided
  requestError.stack && console.error(requestError.stack)

  res.status(requestError.status || 500).json({
    message: requestError.message,
  })

  // call next() to ensure database connections etc. are closed
  return next()
}

export default errorMiddleware
