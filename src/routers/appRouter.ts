// Libraries
import express from 'express'

// Middleware
import logMiddleware from '../middleware/logMiddleware'
import errorMiddleware from '../middleware/errorMiddleware'
import { displayConnectMiddleware, displayDisconnectMiddleware } from '../middleware/displayMiddleware'

// Routers
import displayRouter from './displayRouter'
import npmRouter from './modules/npmRouter'

const appRouter = express.Router()

// log every request
appRouter.use(logMiddleware)

// initialise the display
appRouter.use(displayConnectMiddleware)

// routes
appRouter.use('/display', displayRouter)
// routes - modules
appRouter.use('/module/npm', npmRouter)

// close the connection to the display
appRouter.use(displayDisconnectMiddleware)

// apply global error handler
appRouter.use(errorMiddleware)

export default appRouter
