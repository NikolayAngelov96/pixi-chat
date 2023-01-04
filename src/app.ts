import { Application } from 'pixi.js';

const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x4472c4
});

document.body.appendChild(app.view as HTMLCanvasElement);