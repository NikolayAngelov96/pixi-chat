import { Application } from 'pixi.js';
import { Button } from './Button';
import { createPanel, tileTexture } from './utils/createPanel';
import { loadAssets } from './utils/loadAssets';

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

    const textarea = createPanel(insetTiles, 750, 475);
    textarea.position.set(25, 25);
    app.stage.addChild(textarea);

    const textInput = createPanel(insetTiles, 575, 50);
    textInput.position.set(25, 525);
    app.stage.addChild(textInput);

}

function onClick() {
    alert('Button clicked');
}

function update() {

}
