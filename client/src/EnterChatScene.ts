import { Container, FederatedPointerEvent, Text } from "pixi.js";
import { Button } from "./Button";
import { IScene } from "./Manager";
import { TextInput } from "./TextInut";
import { whitelist } from "./utils/whitelist";

export class EnterChatScene extends Container implements IScene {
    private activeInput: TextInput;
    constructor(
        public usernameInput: TextInput,
        public chatIdInput: TextInput,
        private submitBtn: Button
    ) {
        super();

        this.addUsernameField();
        this.addRoomIdField();

        this.addChild(this.submitBtn);
        this.submitBtn.position.set(400 - this.submitBtn.width / 2, 430);

        this.usernameInput.on('pointerdown', this.onUsernameInputSelection.bind(this));
        this.chatIdInput.on('pointerdown', this.onChatIdInputSelection.bind(this));
        document.addEventListener('keydown', this.onKeydown.bind(this));

        this.on('destroyed', this.removeEvents.bind(this));
    }

    update(dt: number) {

    };

    private onUsernameInputSelection(e: FederatedPointerEvent) {
        this.activeInput = this.usernameInput;
        this.chatIdInput.removeCursorBlink();
    }

    private onChatIdInputSelection(e: FederatedPointerEvent) {
        this.activeInput = this.chatIdInput;
        this.usernameInput.removeCursorBlink();
    }

    private onKeydown(e: KeyboardEvent) {
        let letter = e.key;


        if (letter == 'Backspace') {
            this.activeInput.input = this.activeInput.input.slice(0, this.activeInput.input.length - 1);
        } else if (whitelist.includes(letter)) {
            this.activeInput.input += letter;
        }
    }

    private addUsernameField() {

        const container = new Container();

        const usernameText = new Text('Username', {
            fontFamily: 'Arial',
            fill: 0xffffff
        });

        container.addChild(this.usernameInput);
        container.addChild(usernameText);

        container.position.set(400 - container.width / 2, 200);
        usernameText.position.set(400 - container.width - 30, -30)
        this.addChild(container);

    }

    private addRoomIdField() {
        const container = new Container();
        container.addChild(this.chatIdInput);

        const roomIdText = new Text('Room ID', {
            fontFamily: 'Arial',
            fill: 0xffffff
        });

        container.addChild(roomIdText);

        container.position.set(400 - container.width / 2, 330);
        roomIdText.position.set(400 - container.width - 30, -30)
        this.addChild(container);

    }

    private removeEvents() {
        this.usernameInput.off('pointerdown', this.onUsernameInputSelection);
        this.chatIdInput.off('pointerdown', this.onChatIdInputSelection);
        document.removeEventListener('keydown', this.onKeydown);
    }
}