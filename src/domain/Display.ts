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

  protected getInstance(): LCD {
    if (this.instance === null) {
      const { busNumber, address, columns, rows } = this
      this.instance = new LCD(busNumber, address, columns, rows)
    }
    if (!this.instance.began) {
      this.instance.beginSync()
    }
    return this.instance
  }
}

export default class Display extends DisplaySingleton {
  constructor(busNumber: number, address: number, columns: number, rows: number) {
    super(busNumber, address, columns, rows)
  }

  hasExtraRows(): boolean {
    return this.rows > 2
  }

  testConnection(): boolean {
    try {
      const lcd = this.getInstance()
      return lcd.began
    } catch (error) {
      throw new DisplayConnectionError()
    }
  }

  on(): void {
    const lcd = this.getInstance()
    lcd.displaySync()
  }

  off(): void {
    const lcd = this.getInstance()
    lcd.noDisplaySync()
  }

  getInfo(): { busNumber: number; address: number; cols: number; rows: number; began: boolean } {
    const { busNumber, address, cols, rows, began } = this.getInstance()
    return {
      busNumber,
      address,
      cols,
      rows,
      began,
    }
  }

  reset(): void {
    const lcd = this.getInstance()
    lcd.clearSync()
    lcd.homeSync()
  }

  clear(): void {
    const lcd = this.getInstance()
    lcd.clearSync()
  }

  home(): void {
    const lcd = this.getInstance()
    lcd.homeSync()
  }

  showBlockCursor(): void {
    const lcd = this.getInstance()
    lcd.cursorSync()
  }

  hideBlockCursor(): void {
    const lcd = this.getInstance()
    lcd.noCursorSync()
  }

  showUnderlineCursor(): void {
    const lcd = this.getInstance()
    lcd.blinkSync()
  }

  hideUnderlineCursor(): void {
    const lcd = this.getInstance()
    lcd.noBlinkSync()
  }

  setCursor(column: number, row: number): void {
    const lcd = this.getInstance()
    lcd.setCursorSync(column, row)
  }

  print(content = ''): void {
    const lcd = this.getInstance()
    lcd.printSync(content)
  }

  printLine(line = 0, content = ''): void {
    const lcd = this.getInstance()
    lcd.printLineSync(line, content)
  }

  close(): void {
    const lcd = this.getInstance()
    lcd.closeSync()
  }
}
