// Libraries
import { RequestHandler } from 'express'

export const logMiddleware: RequestHandler = (req, res, next): void => {
  console.log(`${req.method} ${req.path} ${JSON.stringify(req.body) || '(no body provided)'}`)
  next()
}

export default logMiddleware
