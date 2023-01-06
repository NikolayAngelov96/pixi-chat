import { Application } from 'pixi.js';
import { Button } from './Button';
import { Textarea } from './Textarea';
import { TextInput } from './TextInut';
import { createPanel, tileTexture } from './utils/createPanel';
import { loadAssets } from './utils/loadAssets';
import { whitelist } from './utils/whitelist';

const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x4472c4
});

document.body.appendChild(app.view as HTMLCanvasElement);

app.ticker.add(update);

main();

async function main() {
    const assets = await loadAssets();

    const buttonTiles = tileTexture(assets.get('bevel'), 25, 105, 25, 105);
    const hoverTiles = tileTexture(assets.get('hover'), 25, 105, 25, 105);
    const insetTiles = tileTexture(assets.get('inset'), 25, 105, 25, 105);

    const sendBtn = new Button(
        'Send',
        onClick,
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
                onClick();
            }
            // send message
        } else if (letter == 'Backspace') {
            textInput.input = textInput.input.slice(0, textInput.input.length - 1);
        } else if (whitelist.includes(letter)) {
            textInput.input += letter;
        }


    }

    function onClick() {
        if (textInput.input !== '') {
            textarea.addMessage(textInput.input);
            textInput.input = '';
        }
    }

}

function update() {

}
