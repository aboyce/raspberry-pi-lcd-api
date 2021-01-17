// Libraries
import express from 'express'

// Utilities
import Display from '../domain/display'

const router = express.Router()

/**
 * @swagger
 * /info:
 *   get:
 *     description: Get basic informaton about the connected display
 */
router.get('/info', async (req, res) => {
  const lcd: Display = res.locals.display
  res.json(await lcd.getInfo())
})

/**
 * @swagger
 * /on:
 *   get:
 *     description: Turn the LCD display on
 */
router.get('/on', async (req, res) => {
  const lcd: Display = res.locals.display
  await lcd.on()
  res.send('on')
})

/**
 * @swagger
 * /off:
 *   get:
 *     description: Turn the LCD display off
 */
router.get('/off', async (req, res) => {
  const lcd: Display = res.locals.display
  await lcd.off()
  res.send('off')
})

export default router
