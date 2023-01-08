import { Container, DisplayObject, FederatedMouseEvent, Text } from "pixi.js";

export class Button extends Container {
    private _label: string;
    private text: Text;
    constructor(
        label: string,
        private callback: () => void,
        private mainBtn: DisplayObject,
        private hoverBtn: DisplayObject,
    ) {
        super();

        this.addChild(this.mainBtn, this.hoverBtn);
        this.hoverBtn.renderable = false;

        this.text = new Text('', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff
        });

        this.label = label;
        this.text.anchor.set(0.5);
        this.text.position.set(this.width / 2, this.height / 2);
        this.addChild(this.text);

        this.interactive = true;
        this.on('pointerenter', this.onMouseEnter.bind(this));
        this.on('pointerleave', this.onMouseLeave.bind(this));
        this.on('pointertap', this.callback);
    }

    get label() {
        return this._label;
    }

    set label(value: string) {
        this._label = value;
        this.text.text = value;
    }

    private onMouseEnter(e: FederatedMouseEvent) {
        this.mainBtn.renderable = false;
        this.hoverBtn.renderable = true;
    }

    private onMouseLeave(e: FederatedMouseEvent) {
        this.mainBtn.renderable = true;
        this.hoverBtn.renderable = false;
    }


}