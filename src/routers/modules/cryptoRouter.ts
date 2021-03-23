// Libraries
import express from 'express'

// Utilities
import Display from '../../domain/Display'
import Crypto from '../../domain/Crypto'

const router = express.Router()

/**
 * @swagger
 * /module/crypto/summary:
 *  get:
 *    tags:
 *      - crypto
 *    summary: Get summary for a specific cryptocurrency
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: The name of the cryptocurrency
 */
router.get('/summary', async (req, res, next) => {
  try {
    if (!req.query.name) {
      res.status(400).json({
        message: 'A cryptocurrency name is required.',
      })
    }
    const crypto = new Crypto(req.query.name as string)
    const result = await crypto.getSummary()
    res.json(result)

    // print out to the display
    const lcd: Display = res.locals.display
    lcd.reset()
    lcd.printLine(0, `${result.name} (${result.symbol})`)
    lcd.printLine(1, `Price: ${result.price}`)
    if (lcd.hasExtraRows()) {
      lcd.printLine(2, `24h: ${result.percentChange24h}`)
      lcd.printLine(3, `7d: ${result.percentChange7d}`)
    }
  } catch (error) {
    next(error)
  }

  next()
})

export default router
