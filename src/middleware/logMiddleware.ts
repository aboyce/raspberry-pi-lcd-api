// Libraries
import { RequestHandler } from 'express'

export const logMiddleware: RequestHandler = (req, res, next): void => {
  const { method, path, query, body } = req
  console.log(
    `${method} ${path} ${JSON.stringify(query) || 'no query provided'} ${JSON.stringify(body) || '(no body provided)'}`,
  )
  next()
}

export default logMiddleware
