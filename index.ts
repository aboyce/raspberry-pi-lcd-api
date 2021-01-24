// Libraries
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

// Routers
import appRouter from './src/routers/appRouter'

// Config
import swaggerOptions from './swagger'

const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(cors())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)))

/**
 * @swagger
 * /alive:
 *  get:
 *    tags:
 *      - general
 *    summary: Check the API is running
 */
app.get('/alive', async (req, res, next) => {
  res.send(true)
  next()
})

app.use(appRouter)

app.listen(port, async () => {
  console.log('API listening on port ' + port)
})
