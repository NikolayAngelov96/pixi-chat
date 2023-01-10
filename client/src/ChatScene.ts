import { Container } from "pixi.js";
import { Button } from "./Button";
import { IScene } from "./Manager";
import { Textarea } from "./Textarea";
import { TextInput } from "./TextInut";
import { whitelist } from "./utils/whitelist";

export class ChatScene extends Container implements IScene {
    constructor(
        private button: Button,
        public textarea: Textarea,
        public textInput: TextInput,
        private onMessageSubmit: () => void
    ) {
        super();

        this.button.position.set(625, 525);
        this.addChild(this.button);

        this.textarea.position.set(25, 25);
        this.addChild(this.textarea);

        this.textInput.position.set(25, 525);
        this.addChild(this.textInput);

        document.addEventListener('keydown', this.onKeypress.bind(this));

    }

    onKeypress(e: KeyboardEvent) {
        let letter = e.key;

        if (letter == 'Enter') {

            this.onMessageSubmit();

        } else if (letter == 'Backspace') {
            this.textInput.input = this.textInput.input.slice(0, this.textInput.input.length - 1);
        } else if (whitelist.includes(letter)) {
            this.textInput.input += letter;
        }

    }

    update() {

    }
}