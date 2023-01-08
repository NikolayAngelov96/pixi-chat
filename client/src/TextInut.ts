import { Container, DisplayObject, Graphics, Text } from "pixi.js";

export class TextInput extends Container {

    public _input: string;
    private text: Text;
    public cursorLine: Graphics;
    private blinkInterval: NodeJS.Timer;

    constructor(
        private area: DisplayObject,
    ) {
        super();

        this.addChild(this.area);

        this.text = new Text('', {
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 0xffffff
        });
        this.text.position.set(this.x + 20, this.height / 2 - this.text.height / 2);
        this.addChild(this.text);

        this.createCursor();
        this.addChild(this.cursorLine);

        this.input = '';

        this.interactive = true;

        this.on('pointerdown', this.cursorBlink.bind(this));
        this.cursor = 'pointer';
    }

    get input() {
        return this._input
    }

    set input(value: string) {
        this._input = value;
        this.text.text = value;
        this.cursorLine.x = this.text.width + 1
    }

    private cursorBlink() {
        this.blinkInterval = setInterval(() => {
            this.cursorLine.renderable = !this.cursorLine.renderable
        }, 500)
    }

    public removeCursorBlink() {
        clearInterval(this.blinkInterval);
        this.cursorLine.renderable = false;
    }

    private createCursor() {
        this.cursorLine = new Graphics();
        this.cursorLine.pivot.set(0.5);
        this.cursorLine.beginFill(0xcccccc);
        this.cursorLine.drawRect(this.x + 20, this.y + 11, 3, this.height - 25);
        this.cursorLine.endFill();
        this.cursorLine.renderable = false;
    }
}
