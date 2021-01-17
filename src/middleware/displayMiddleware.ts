// Libraries
import { RequestHandler } from 'express'

// Domain Models
import Display from '../domain/display'

//const lcd = new Display(1, 63, 16, 2)
//const lcd = new Display(1, 63, 20, 4)

export const displayMiddleware: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const display = new Display(1, 63, 20, 4)
    await display.isConnected()
    res.locals.display = display
  } catch (error) {
    next(error)
  }
  next()
}

export default displayMiddleware
