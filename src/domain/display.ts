// Libraries
import LCD from 'raspberrypi-liquid-crystal'

// Errors
import { RequestError } from '../middleware/errorMiddleware'

export class DisplayConnectionError extends RequestError {
  constructor() {
    super(503, 'Could not connect to the LCD display')
  }
}

export default class Display {
  instance: LCD | null = null

  constructor(
    private readonly busNumber: number,
    private readonly address: number,
    private readonly columns: number,
    private readonly rows: number,
  ) {}

  async getInstance(): Promise<LCD> {
    if (this.instance === null) {
      const { busNumber, address, columns, rows } = this
      this.instance = new LCD(busNumber, address, columns, rows)
    }
    if (!this.instance.began) {
      await this.instance.begin()
    }
    return this.instance
  }

  async isConnected(): Promise<boolean> {
    try {
      const lcd = await this.getInstance()
      return lcd.began
    } catch (error) {
      throw new DisplayConnectionError()
    }
  }

  async clear(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.clear()
  }

  async close(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.close()
  }

  async on(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.display()
  }

  async off(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.noDisplay()
  }

  async printLn(line = 0, content = ''): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.printLine(line, content)
  }

  async getInfo(): Promise<{ busNumber: number; address: number; cols: number; rows: number; began: boolean }> {
    const { busNumber, address, cols, rows, began } = await this.getInstance()
    return {
      busNumber,
      address,
      cols,
      rows,
      began,
    }
  }
}
