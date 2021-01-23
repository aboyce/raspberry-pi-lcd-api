// Libraries
import { RequestHandler } from 'express'

// Domain Models
import Display from '../domain/display'

//const lcd = new Display(1, 63, 16, 2)
//const lcd = new Display(1, 63, 20, 4)

export const displayConnectMiddleware: RequestHandler = (req, res, next): void => {
  try {
    const display = new Display(1, 63, 20, 4)
    display.testConnection()
    console.log('Middleware: Connected to Display')
    res.locals.display = display
  } catch (error) {
    next(error)
  }
  next()
}

export const displayDisconnectMiddleware: RequestHandler = (req, res, next): void => {
  try {
    const lcd: Display = res.locals.display
    lcd.close()
    console.log('Middleware: Closed connection to Display')
  } catch (error) {
    next(error)
  }
  next()
}
