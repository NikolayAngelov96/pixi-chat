import { Application } from 'pixi.js';
import { SendButton } from './SendButon';

const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x4472c4
});

const button = new SendButton(250, 200, 200, 50);

document.body.appendChild(app.view as HTMLCanvasElement);

app.stage.addChild(button.container);