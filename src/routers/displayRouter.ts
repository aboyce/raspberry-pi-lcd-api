// Libraries
import express from 'express'

// Utilities
import Display from '../domain/display'

const router = express.Router()

/**
 * @swagger
 * /display/info:
 *   get:
 *     description: Get basic informaton about the connected display
 */
router.get('/info', async (req, res, next) => {
  const lcd: Display = res.locals.display
  res.json(await lcd.getInfo())
  next()
})

/**
 * @swagger
 * /display/on:
 *   get:
 *     description: Turn the LCD display on
 */
router.get('/on', async (req, res, next) => {
  const lcd: Display = res.locals.display
  await lcd.on()
  res.send('on')
  next()
})

/**
 * @swagger
 * /display/off:
 *   get:
 *     description: Turn the LCD display off
 */
router.get('/off', async (req, res, next) => {
  const lcd: Display = res.locals.display
  await lcd.off()
  res.send('off')
  next()
})

export default router
