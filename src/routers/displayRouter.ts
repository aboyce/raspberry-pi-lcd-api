// Libraries
import express from 'express'

// Utilities
import Display from '../domain/display'

const router = express.Router()

/**
 * @swagger
 * /display/on:
 *  get:
 *    summary: Turn on the LCD display
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
 *  get:
 *    summary: Turn off the LCD display
 */
router.get('/off', async (req, res, next) => {
  const lcd: Display = res.locals.display
  await lcd.off()
  res.send('off')
  next()
})

/**
 * @swagger
 * /display/info:
 *  get:
 *    summary: Get basic informaton about the connected LCD display
 *
 */
router.get('/info', async (req, res, next) => {
  const lcd: Display = res.locals.display
  res.json(await lcd.getInfo())
  next()
})

/**
 * @swagger
 * /display/clear:
 *  get:
 *    summary: Clear the LCD display
 */
router.get('/clear', async (req, res, next) => {
  const lcd: Display = res.locals.display
  await lcd.clear()
  res.send('clear')
  next()
})

/**
 * @swagger
 * /display/home:
 *  get:
 *    summary: Position the cursor to the top-left
 */
router.get('/home', async (req, res, next) => {
  const lcd: Display = res.locals.display
  await lcd.home()
  res.send('home')
  next()
})

/**
 * @swagger
 * /display/cursor/block/show:
 *  get:
 *    summary: Show the block cursor
 */
router.get('/cursor/block/show', async (req, res, next) => {
  const lcd: Display = res.locals.display
  await lcd.showBlockCursor()
  res.send('/cursor/block/show')
  next()
})

/**
 * @swagger
 * /display/cursor/block/hide:
 *  get:
 *    summary: Hide the block cursor
 */
router.get('/cursor/block/hide', async (req, res, next) => {
  const lcd: Display = res.locals.display
  await lcd.hideBlockCursor()
  res.send('/cursor/block/hide')
  next()
})

/**
 * @swagger
 * /display/cursor/line/show:
 *  get:
 *    summary: Show the underline cursor
 */
router.get('/cursor/line/show', async (req, res, next) => {
  const lcd: Display = res.locals.display
  await lcd.showUnderlineCursor()
  res.send('/cursor/line/show')
  next()
})

/**
 * @swagger
 * /display/cursor/line/hide:
 *  get:
 *    summary: Hide the underline cursor
 */
router.get('/cursor/line/hide', async (req, res, next) => {
  const lcd: Display = res.locals.display
  await lcd.hideUnderlineCursor()
  res.send('/cursor/line/hide')
  next()
})

/**
 * @swagger
 * /display/cursor:
 *  post:
 *    summary: Positions the cursor
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              column:
 *                type: integer
 *                minimum: 0
 *                maximum: 20
 *              row:
 *                type: integer
 *                minimum: 0
 *                maximum: 20
 */
router.post('/cursor', async (req, res, next) => {
  const lcd: Display = res.locals.display
  const { column, row } = req.body
  await lcd.setCursor(column, row)
  res.send('cursor')
  next()
})

/**
 * @swagger
 * /display/print:
 *  get:
 *    summary: Print content to the LCD display
 */
router.get('/print', async (req, res, next) => {
  const lcd: Display = res.locals.display
  await lcd.print('Hello API')
  res.send('print')
  next()
})

export default router
