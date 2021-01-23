// Libraries
import express from 'express'

// Utilities
import Display from '../domain/Display'

const router = express.Router()

/**
 * @swagger
 * /display/on:
 *  get:
 *    summary: Turn on the LCD display
 */
router.get('/on', (req, res, next) => {
  const lcd: Display = res.locals.display
  lcd.on()
  res.send('on')
  next()
})

/**
 * @swagger
 * /display/off:
 *  get:
 *    summary: Turn off the LCD display
 */
router.get('/off', (req, res, next) => {
  const lcd: Display = res.locals.display
  lcd.off()
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
router.get('/info', (req, res, next) => {
  const lcd: Display = res.locals.display
  res.json(lcd.getInfo())
  next()
})

/**
 * @swagger
 * /display/clear:
 *  get:
 *    summary: Clear the LCD display
 */
router.get('/clear', (req, res, next) => {
  const lcd: Display = res.locals.display
  lcd.clear()
  res.send('clear')
  next()
})

/**
 * @swagger
 * /display/reset:
 *  get:
 *    summary: Reset the LCD display
 */
router.get('/reset', (req, res, next) => {
  const lcd: Display = res.locals.display
  lcd.reset()
  res.send('reset')
  next()
})

/**
 * @swagger
 * /display/home:
 *  get:
 *    summary: Position the cursor to the top-left
 */
router.get('/home', (req, res, next) => {
  const lcd: Display = res.locals.display
  lcd.home()
  res.send('home')
  next()
})

/**
 * @swagger
 * /display/cursor/block/show:
 *  get:
 *    summary: Show the block cursor
 */
router.get('/cursor/block/show', (req, res, next) => {
  const lcd: Display = res.locals.display
  lcd.showBlockCursor()
  res.send('/cursor/block/show')
  next()
})

/**
 * @swagger
 * /display/cursor/block/hide:
 *  get:
 *    summary: Hide the block cursor
 */
router.get('/cursor/block/hide', (req, res, next) => {
  const lcd: Display = res.locals.display
  lcd.hideBlockCursor()
  res.send('/cursor/block/hide')
  next()
})

/**
 * @swagger
 * /display/cursor/line/show:
 *  get:
 *    summary: Show the underline cursor
 */
router.get('/cursor/line/show', (req, res, next) => {
  const lcd: Display = res.locals.display
  lcd.showUnderlineCursor()
  res.send('/cursor/line/show')
  next()
})

/**
 * @swagger
 * /display/cursor/line/hide:
 *  get:
 *    summary: Hide the underline cursor
 */
router.get('/cursor/line/hide', (req, res, next) => {
  const lcd: Display = res.locals.display
  lcd.hideUnderlineCursor()
  res.send('/cursor/line/hide')
  next()
})

/**
 * @swagger
 * /display/cursor:
 *  get:
 *    summary: Positions the cursor
 *    parameters:
 *      - in: query
 *        name: column
 *        schema:
 *          type: integer
 *        required: true
 *        description: The column to move the cursor to
 *      - in: query
 *        name: row
 *        schema:
 *          type: integer
 *        required: true
 *        description: The row to move the cursor to
 */
router.get('/cursor', (req, res, next) => {
  const lcd: Display = res.locals.display
  const { column, row } = req.query
  lcd.setCursor(+(column as string), +(row as string))
  res.send('cursor')
  next()
})

/**
 * @swagger
 * /display/print:
 *  get:
 *    summary: Print content to the LCD display
 */
router.get('/print', (req, res, next) => {
  const lcd: Display = res.locals.display
  lcd.print('Hello World')
  res.send('print')
  next()
})

/**
 * @swagger
 * /display/print/line:
 *  get:
 *    summary: Print a line of content to the LCD display
 *    parameters:
 *      - in: query
 *        name: line
 *        schema:
 *          type: integer
 *        required: true
 *        description: The line number to print content to
 *      - in: query
 *        name: content
 *        schema:
 *          type: string
 *        required: true
 *        description: The content to print out
 */
router.get('/print/line', (req, res, next) => {
  const lcd: Display = res.locals.display
  const { line, content } = req.query
  lcd.printLine(+(line as string), content as string)
  res.send('print/line')
  next()
})

export default router
