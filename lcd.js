import lcd from 'raspberrypi-liquid-crystal'

export default class LCD {

  instance = null

  constructor(busNumber, address, columns, rows) {
    this.busNumber = busNumber
    this.address = address
    this.columns = columns
    this.rows = rows
  }

  async getInstance() {
    if (this.instance === null) {
      const { busNumber, address, columns, rows } = this
      this.instance = new lcd(busNumber, address, columns, rows)
    }
    if (!this.instance.began) {
      await this.instance.begin()
    }
    return this.instance
  }

  async clear() {
    (await this.getInstance()).clear()
  }

  async on() {
    (await this.getInstance()).display()
  }

  async off() {
    (await this.getInstance()).noDisplay()
  }

  async printLn(line = 0, content = '') {
    const lcd = await this.getInstance()
    await lcd.printLine(line, content)
  }

  async getInfo() {
    const { _busNumber, _address, _cols, _rows, _blinking, _cursor, _began } = await this.getInstance()
    return {
      busNumber: _busNumber,
      address: _address,
      cols: _cols,
      rows: _rows,
      blinking: _blinking,
      cursor: _cursor,
      began: _began,
    }
  }
}