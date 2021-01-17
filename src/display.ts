import LCD from 'raspberrypi-liquid-crystal'

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

  async clear(): Promise<void> {
    ;(await this.getInstance()).clear()
  }

  async on(): Promise<void> {
    ;(await this.getInstance()).display()
  }

  async off(): Promise<void> {
    ;(await this.getInstance()).noDisplay()
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
