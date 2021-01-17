// Libraries
import express from 'express'

// Middleware
import logMiddleware from '../middleware/logMiddleware'
import errorMiddleware from '../middleware/errorMiddleware'
import displayMiddleware from '../middleware/displayMiddleware'

// Routers
import displayRouter from './displayRouter'

const appRouter = express.Router()

// log every request
appRouter.use(logMiddleware)

// initialise the display
appRouter.use(displayMiddleware)

//routes
appRouter.use('/display', displayRouter)

// apply global error handler
appRouter.use(errorMiddleware)

export default appRouter
