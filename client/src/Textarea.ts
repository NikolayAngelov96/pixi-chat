import { Container, DisplayObject, Text } from "pixi.js";
import { ScrollBar } from "./Scrollbar";

export class Textarea extends Container {
    private messages: string[];
    private text: Text;
    private scrollbar: ScrollBar;

    constructor(
        private area: DisplayObject
    ) {
        super();

        this.addChild(this.area);

        this.messages = [];

        this.text = new Text('', {
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 0xffffff
        });
        this.text.position.set(this.x + 20, this.y + 20);
        this.addChild(this.text);

    }

    addMessage(message: string) {
        this.messages.push(message);
        this.text.text = this.messages.join('\n');
    }


}