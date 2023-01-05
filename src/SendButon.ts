import { Container, FederatedMouseEvent, Sprite, Text } from "pixi.js";
import { tiles } from "./app";

export class SendButton extends Container {
    public container: Container;
    private blueBtn: Sprite;
    private orangeBtn: Sprite;
    private text: Text;

    constructor(x: number, y: number, width: number, height: number) {
        super();

        this.container = new Container();
        this.container.position.set(x, y);

        this.generateButtons(width, height);

        this.container.addChild(this.blueBtn);

        this.generateText();

        this.container.addChild(this.text);

        this.container.interactive = true;
        this.container.on('mouseenter', this.onHover.bind(this));
        this.container.on('mouseleave', this.onHover.bind(this));
    }

    private generateButtons(width: number, height: number): void {
        this.blueBtn = Sprite.from(tiles.get('bevel'));
        this.blueBtn.width = width;
        this.blueBtn.height = height;

        this.orangeBtn = Sprite.from(tiles.get('hover'));
        this.orangeBtn.width = width;
        this.orangeBtn.height = height;
    }

    private generateText() {
        this.text = new Text('Send', {
            fill: 'white'
        });

        this.text.anchor.set(0.5);
        this.text.x = this.blueBtn.width / 2;
        this.text.y = this.blueBtn.height / 2;
    }

    private onHover(e: FederatedMouseEvent) {

        const isEntering = this.container.children.find(child => child == this.blueBtn);

        if (isEntering) {
            this.container.removeChild(this.blueBtn);
            this.container.addChild(this.orangeBtn);
        } else {
            this.container.removeChild(this.orangeBtn);
            this.container.addChild(this.blueBtn);
        }
        this.container.addChild(this.text);
    }
}