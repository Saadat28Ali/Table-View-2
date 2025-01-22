class CSVReader {

    #cursorPos: number = 0;
    text: string = "";
    textLength: number = 0;
    linesCount: number = 0;

    constructor(text: string) {
        this.#cursorPos = 0;
        this.text = text;
        this.textLength = text.length;
        this.linesCount = this.getRowsCount();
    }

    setPos(index: number) {
        if (index < this.textLength && index > -1) {
            this.#cursorPos = index;
            return 0;
        } else return 1;
    }
    getPos() {return this.#cursorPos;}

    setText(text: string) {
        this.text = text;
        this.#cursorPos = 0;
        this.textLength = text.length;
    }
    getText() {return this.text;}

    isWhitespace(s: string) {
        return s.match(RegExp("^ *|\t*$"));
    }

    getRowsCount() {
        // let linesCount: number = 0;
        // for (let index = 0; index < this.textLength; index++) {
        //     if (this.text[index] === "\n" || this.text[index] === "\r") linesCount++;
        // }
        let linesCount: number = 0;
        while (this.#cursorPos < this.textLength) {
            if (this.text[this.#cursorPos] === "\n" || this.text[this.#cursorPos] === "\r") linesCount++;
            this.#cursorPos++;
        }
        this.#cursorPos = 0;
        return linesCount;
    }
}