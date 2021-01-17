// Libraries
import LCD from 'raspberrypi-liquid-crystal'

// Errors
import { RequestError } from '../middleware/errorMiddleware'

export class DisplayConnectionError extends RequestError {
  constructor() {
    super(503, 'Could not connect to the LCD display')
  }
}

class DisplaySingleton {
  private instance: LCD | null = null

  constructor(
    protected readonly busNumber: number,
    protected readonly address: number,
    protected readonly columns: number,
    protected readonly rows: number,
  ) {}

  protected async getInstance(): Promise<LCD> {
    if (this.instance === null) {
      const { busNumber, address, columns, rows } = this
      this.instance = new LCD(busNumber, address, columns, rows)
    }
    if (!this.instance.began) {
      await this.instance.begin()
    }
    return this.instance
  }
}

export default class Display extends DisplaySingleton {
  constructor(busNumber: number, address: number, columns: number, rows: number) {
    super(busNumber, address, columns, rows)
  }

  async isConnected(): Promise<boolean> {
    try {
      const lcd = await this.getInstance()
      return lcd.began
    } catch (error) {
      throw new DisplayConnectionError()
    }
  }

  async on(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.display()
  }

  async off(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.noDisplay()
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

  async clear(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.clear()
  }

  async home(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.home()
  }

  async showBlockCursor(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.cursor()
  }

  async hideBlockCursor(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.noCursor()
  }

  async showUnderlineCursor(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.blink()
  }

  async hideUnderlineCursor(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.noBlink()
  }

  async setCursor(column: number, row: number): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.setCursor(column, row)
  }

  async print(content = ''): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.print(content)
  }

  async printLn(line = 0, content = ''): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.printLine(line, content)
  }

  async close(): Promise<void> {
    const lcd = await this.getInstance()
    await lcd.close()
  }
}
