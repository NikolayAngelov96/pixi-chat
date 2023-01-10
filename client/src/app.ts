import { Button } from './Button';
import { Textarea } from './Textarea';
import { TextInput } from './TextInut';
import { createPanel, tileTexture } from './utils/createPanel';
import { loadAssets } from './utils/loadAssets';
import { io } from 'socket.io-client'
import { EnterChatScene } from './EnterChatScene';
import { ChatScene } from './ChatScene';
import { Manager } from './Manager';


Manager.initialize(800, 600, 0x4472c4);

interface SocketMessage {
    username: string;
    message: string;
}

let socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('connected to port 3000');
    main();
});

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

    Manager.changeScene(enterChatScene);

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

        const sendBtn = new Button(
            'Send',
            onMessageSubmit,
            createPanel(buttonTiles, 150, 50),
            createPanel(hoverTiles, 150, 50)
        );

        const textarea = new Textarea(createPanel(insetTiles, 750, 475));

        const textInput = new TextInput(createPanel(insetTiles, 575, 50));

        const chatScene = new ChatScene(sendBtn, textarea, textInput, onMessageSubmit);

        Manager.changeScene(chatScene);

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
