// Libraries
import express from 'express'
import Display from './display'

// Middleware
import displayMiddleware from './middleware/display'

const app = express()
const port = 3000

app.use(displayMiddleware)

app.get('/info', async (req, res) => {
  const lcd: Display = res.locals.display
  res.json(await lcd.getInfo())
})

app.get('/on', async (req, res) => {
  const lcd: Display = res.locals.display
  await lcd.on()
  res.send('on')
})

app.get('/off', async (req, res) => {
  const lcd: Display = res.locals.display
  await lcd.off()
  res.send('off')
})

app.listen(port, async () => {
  console.log('API listening on port ' + port)
})
