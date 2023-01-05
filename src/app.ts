import { Application, Sprite, Texture } from 'pixi.js';
import { SendButton } from './SendButon';
import { loadAssets } from './utils/loadAssets';

const app = new Application({
    width: 800,
    height: 600,
    backgroundColor: 0x4472c4
});

type TilesType = 'bevel' | 'hover' | 'inset';

const tiles = new Map<TilesType, Texture>();

loadAssets().then(() => {
    tiles.set('bevel', Texture.from('bevel'));
    tiles.set('hover', Texture.from('hover'));
    tiles.set('inset', Texture.from('inset'));

    const bevel = Sprite.from(tiles.get('inset'));

    app.stage.addChild(bevel);

});

const button = new SendButton(250, 200, 200, 50);

document.body.appendChild(app.view as HTMLCanvasElement);

app.stage.addChild(button.container);

app.ticker.add(update);


function update(delta: number) {

}

