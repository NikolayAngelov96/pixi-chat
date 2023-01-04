import { Container, Graphics, Text } from "pixi.js";

export class SendButton extends Container {
    public container: Container;
    private rectangle: Graphics;
    private text: Text;

    private borderRadius: number = 8;

    constructor(x: number, y: number, width: number, height: number) {
        super();

        this.container = new Container();
        this.container.position.set(x, y);

        this.rectangle = new Graphics();
        this.rectangle.beginFill();
        this.rectangle.drawRoundedRect(0, 0, width, height, this.borderRadius);
        this.rectangle.endFill();

        this.container.addChild(this.rectangle);

        this.text = new Text('Send', {
            fill: 'white'
        });

        this.text.anchor.set(0.5);
        this.text.x = this.rectangle.width / 2;
        this.text.y = this.rectangle.height / 2;

        this.container.addChild(this.text);
    }
}