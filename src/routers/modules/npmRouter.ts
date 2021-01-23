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
  const npmPackage = new NpmPackage(req.query.name as string)
  const result = await npmPackage.getLastWeekDownloads()
  const lcd: Display = res.locals.display

  // print out to the display
  lcd.reset()
  lcd.printLine(0, npmPackage.name)
  lcd.printLine(1, `Weekly: ${result.downloads}`)
  if (lcd.hasExtraRows()) {
    lcd.printLine(2, `Start: ${result.start}`)
    lcd.printLine(3, `End: ${result.end}`)
  }

  res.json(result)
  next()
})

export default router
