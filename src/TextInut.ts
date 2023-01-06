import { Container, DisplayObject, Text } from "pixi.js";

export class TextInput extends Container {

    public _input: string;
    private text: Text;
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

        this.input = '';
    }

    get input() {
        return this._input
    }

    set input(value: string) {
        this._input = value;
        this.text.text = value;
    }
}