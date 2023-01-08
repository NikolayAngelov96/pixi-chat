import { Application } from 'pixi.js';
import { Button } from './Button';
import { Textarea } from './Textarea';
import { TextInput } from './TextInut';
import { createPanel, tileTexture } from './utils/createPanel';
import { loadAssets } from './utils/loadAssets';
import { whitelist } from './utils/whitelist';
import { io } from 'socket.io-client'
import { EnterChatScene } from './EnterChatScene';

const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x4472c4
});

interface SocketMessage {
    username: string;
    message: string;
}

let socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('connected to port 3000');
    main();
})


document.body.appendChild(app.view as HTMLCanvasElement);


// app.ticker.add(update);



async function main() {
    const assets = await loadAssets();

    const buttonTiles = tileTexture(assets.get('bevel'), 25, 105, 25, 105);
    const hoverTiles = tileTexture(assets.get('hover'), 25, 105, 25, 105);
    const insetTiles = tileTexture(assets.get('inset'), 25, 105, 25, 105);

    const enterChatScene = new EnterChatScene(
        new TextInput(createPanel(insetTiles, 350, 50)),
        new TextInput(createPanel(insetTiles, 350, 50)),
        new Button(
            'Submit',
            onEnteringChat,
            createPanel(buttonTiles, 150, 50),
            createPanel(hoverTiles, 150, 50)
        ))

    app.stage.addChild(enterChatScene);

    function onEnteringChat() {
        let username = enterChatScene.usernameInput.input;
        let roomId = enterChatScene.chatIdInput.input;

        if (username == '' || roomId == '') {
            alert('Please fill all fields');
            return
        };

        initChat(username, roomId);
    }

    function initChat(username: string, roomId: string) {

        socket.emit('selectRoom', { username, roomId });

        app.stage.removeChild(enterChatScene);

        // chat scene

        const sendBtn = new Button(
            'Send',
            onMessageSubmit,
            createPanel(buttonTiles, 150, 50),
            createPanel(hoverTiles, 150, 50)
        );

        sendBtn.position.set(625, 525);
        app.stage.addChild(sendBtn);

        const textarea = new Textarea(createPanel(insetTiles, 750, 475));
        textarea.position.set(25, 25);
        app.stage.addChild(textarea);

        const textInput = new TextInput(createPanel(insetTiles, 575, 50));
        textInput.position.set(25, 525);
        app.stage.addChild(textInput);

        document.body.addEventListener('keydown', onKeypress);

        function onKeypress(e: KeyboardEvent) {
            let letter = e.key;

            // TODO: when shift and enter for new row it looks very ugly !!!!

            if (letter == 'Enter') {
                if (e.shiftKey) {
                    console.log('enter with shift pressed');
                    textInput.input += '\n';
                } else {
                    onMessageSubmit();
                }
                // send message
            } else if (letter == 'Backspace') {
                textInput.input = textInput.input.slice(0, textInput.input.length - 1);
            } else if (whitelist.includes(letter)) {
                textInput.input += letter;
            }

        }

        socket.on('message', ({ message, username }: SocketMessage) => {
            textarea.addMessage(`${username}: ${message}`);
        });


        function onMessageSubmit() {
            if (textInput.input !== '') {
                socket.emit('message', textInput.input);
                textInput.input = '';
            }
        }

    }

}

function update() {

}

