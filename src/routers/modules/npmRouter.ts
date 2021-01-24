// Libraries
import express from 'express'

// Utilities
import Display from '../../domain/Display'
import NpmPackage from '../../domain/NpmPackage'

const router = express.Router()

/**
 * @swagger
 * /module/npm/downloads/weekly:
 *  get:
 *    tags:
 *      - npm
 *    summary: Get weekly downloads for a package
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        required: true
 *        description: The name of the package
 */
router.get('/downloads/weekly', async (req, res, next) => {
  try {
    const npmPackage = new NpmPackage(req.query.name as string)
    const result = await npmPackage.getLastWeekDownloads()
    res.json(result)

    // print out to the display
    const lcd: Display = res.locals.display
    lcd.reset()
    lcd.printLine(0, npmPackage.name)
    lcd.printLine(1, `Weekly: ${result.downloads.toLocaleString()}`)
    if (lcd.hasExtraRows()) {
      lcd.printLine(2, `Start: ${result.start}`)
      lcd.printLine(3, `End: ${result.end}`)
    }
  } catch (error) {
    next(error)
  }

  next()
})

export default router
