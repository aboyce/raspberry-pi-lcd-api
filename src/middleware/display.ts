// Libraries
import { RequestHandler } from 'express'
import Display from '../display'

//const lcd = new Display(1, 63, 16, 2)
//const lcd = new Display(1, 63, 20, 4)

export const displayMiddleware: RequestHandler = (req, res, next): void => {
  res.locals.display = new Display(1, 63, 20, 4)
  next()
}

export default displayMiddleware
