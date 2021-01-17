import express from 'express'
import Display from './display'

//const lcd = new Display(1, 63, 16, 2)
const lcd = new Display(1, 63, 20, 4)
const app = express()
const port = 3000

app.get('/info', async (req, res) => {
  res.json(await lcd.getInfo())
})

app.get('/on', async (req, res) => {
  await lcd.on()
  res.send('on')
})

app.get('/off', async (req, res) => {
  await lcd.off()
  res.send('off')
})

app.listen(port, async () => {
  console.log('API listening on port ' + port)
})
