declare module 'raspberrypi-liquid-crystal' {
  export default class LCD {
    constructor(busNumber: number, address: number, cols: number, rows: number)
    /** The bus number declared when instantiating the LCD object. */
    busNumber: number
    /** The i2c address declared when instantiating the LCD object. */
    address: number
    /** The number of characters width declared when instantiating the LCD object. */
    cols: number
    /** The number of lines declared when instantiating the LCD object. */
    rows: number
    /** True if the LCD has been initialized, false if not. */
    began: boolean

    /** Initializes the interface to the LCD screen. Has to be called before any command. */
    async begin(): Promise<void>
    /** Closes the interface to the LCD screen. */
    async close(): Promise<void>
    /** Clears the LCD screen and positions the cursor in the upper-left corner. */
    async clear(): Promise<this>
    /** Positions the cursor in the upper-left of the LCD. */
    async home(): Promise<this>
    /** Positions the LCD cursor. */
    async setCursor(col: number, row: number): Promise<void>
    /** Prints text to the LCD. */
    async print(text: string): Promise<void>
    /** Prints text to a line on the LCD. */
    async printLine(line: number, text: string): Promise<void>
    /** Displays the LCD cursor (underscore line). */
    async cursor(): Promise<void>
    /** Hides the LCD cursor. */
    async noCursor(): Promise<void>
    /** Displays the blinking LCD cursor (white block). */
    async blink(): Promise<void>
    /** Turns off the blinking LCD cursor. */
    async noBlink(): Promise<void>
    /** Turns on the LCD display. */
    async display(): Promise<void>
    /** Turns off the LCD display. */
    async noDisplay(): Promise<void>
    /** Scrolls the contents of the display (text and cursor) one space to the left. */
    async scrollDisplayLeft(): Promise<void>
    /** Scrolls the contents of the display (text and cursor) one space to the right. */
    async scrollDisplayRight(): Promise<void>
    /** Sets the direction for text written to the LCD to left-to-right, the default. */
    async leftToRight(): Promise<void>
    /** Sets the direction for text written to the LCD to right-to-left. */
    async rightToLeft(): Promise<void>
    /** Creates a custom character (glyph) for use on the LCD. Up to eight characters of 5x8 pixels are supported (id 0 to 7). The appearance of each custom character is specified by an array of eight bytes, one for each row. The five least significant bits of each byte determine the pixels in that row. To display a custom character on the screen, use print(LCD.getChar(id)). */
    async createChar(id: number, dots: number[]): Promise<void>
    /** Returns a custom character previously created at specified id (0 to 7). No async version for this method! */
    async getChar(id: number): Promise<void>
  }
}
