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
    beginSync(): void
    /** Closes the interface to the LCD screen. */
    async close(): Promise<void>
    closeSync(): void
    /** Clears the LCD screen and positions the cursor in the upper-left corner. */
    async clear(): Promise<this>
    clearSync(): this
    /** Positions the cursor in the upper-left of the LCD. */
    async home(): Promise<this>
    homeSync(): this
    /** Positions the LCD cursor. */
    async setCursor(col: number, row: number): Promise<void>
    setCursorSync(col: number, row: number): void
    /** Prints text to the LCD. */
    async print(text: string): Promise<void>
    printSync(text: string): void
    /** Prints text to a line on the LCD. */
    async printLine(line: number, text: string): Promise<void>
    printLineSync(line: number, text: string): void
    /** Displays the LCD cursor (underscore line). */
    async cursor(): Promise<void>
    cursorSync(): void
    /** Hides the LCD cursor. */
    async noCursor(): Promise<void>
    noCursorSync(): void
    /** Displays the blinking LCD cursor (white block). */
    async blink(): Promise<void>
    blinkSync(): void
    /** Turns off the blinking LCD cursor. */
    async noBlink(): Promise<void>
    noBlinkSync(): void
    /** Turns on the LCD display. */
    async display(): Promise<void>
    displaySync(): void
    /** Turns off the LCD display. */
    async noDisplay(): Promise<void>
    noDisplaySync(): void
    /** Scrolls the contents of the display (text and cursor) one space to the left. */
    async scrollDisplayLeft(): Promise<void>
    scrollDisplayLeftSync(): void
    /** Scrolls the contents of the display (text and cursor) one space to the right. */
    async scrollDisplayRight(): Promise<void>
    scrollDisplayRightSync(): void
    /** Sets the direction for text written to the LCD to left-to-right, the default. */
    async leftToRight(): Promise<void>
    leftToRightSync(): void
    /** Sets the direction for text written to the LCD to right-to-left. */
    async rightToLeft(): Promise<void>
    rightToLeftSync(): void
    /** Creates a custom character (glyph) for use on the LCD. Up to eight characters of 5x8 pixels are supported (id 0 to 7). The appearance of each custom character is specified by an array of eight bytes, one for each row. The five least significant bits of each byte determine the pixels in that row. To display a custom character on the screen, use print(LCD.getChar(id)). */
    async createChar(id: number, dots: number[]): Promise<void>
    createCharSync(id: number, dots: number[]): void
    /** Returns a custom character previously created at specified id (0 to 7). No async version for this method! */
    async getChar(id: number): Promise<void>
  }
}
