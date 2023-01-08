import { BaseTexture, Container, Rectangle, Sprite, Texture } from "pixi.js";

export type TileTexture = [
    [Texture, Texture, Texture,],
    [Texture, Texture, Texture,],
    [Texture, Texture, Texture,],
];

export function tileTexture(baseTexture: BaseTexture, left: number, right: number, top: number, bottom: number): TileTexture {

    const lw = left;
    const cw = right - left;
    const rw = baseTexture.width - right;

    const th = top;
    const ch = bottom - top;
    const bh = baseTexture.height - bottom;

    return [
        [
            slice(baseTexture, 0, 0, lw, th),
            slice(baseTexture, left, 0, cw, th),
            slice(baseTexture, right, 0, rw, th)
        ],
        [
            slice(baseTexture, 0, top, lw, ch),
            slice(baseTexture, left, top, cw, ch),
            slice(baseTexture, right, top, rw, ch),
        ],
        [
            slice(baseTexture, 0, bottom, lw, bh),
            slice(baseTexture, left, bottom, cw, bh),
            slice(baseTexture, right, bottom, rw, bh),
        ]
    ]
}

export function createPanel(tiles: TileTexture, width: number, height: number): Container {
    const container = new Container();

    const tl = new Sprite(tiles[0][0]);
    const tr = new Sprite(tiles[0][2]);
    const bl = new Sprite(tiles[2][0]);
    const br = new Sprite(tiles[2][2]);

    const t = new Sprite(tiles[0][1]);
    const b = new Sprite(tiles[2][1]);

    const l = new Sprite(tiles[1][0]);
    const r = new Sprite(tiles[1][2]);

    container.addChild(tl, tr, bl, br);

    if (width < (tl.width + tr.width)) {
        const half = width / 2;
        tl.width = half;
        tr.width = half;
        bl.width = half;
        br.width = half;
        l.width = half;
        r.width = half
    }

    if (height < (tl.height + bl.height)) {
        const half = height / 2;
        tl.width = half;
        tr.width = half;
        bl.width = half;
        br.width = half;
        t.width = half;
        b.width = half;
    }

    tl.position.set(0, 0);
    tr.position.set(width - tr.width, 0);
    bl.position.set(0, height - bl.height);
    br.position.set(width - br.width, height - br.height);

    if (width > (tl.width + tr.width)) {
        t.width = width - (tl.width + tr.width);
        b.width = width - (bl.width + br.width);

        t.position.set(tl.width, 0);
        b.position.set(bl.width, height - b.height);

        container.addChild(t, b);
    }

    if (height > (tl.height + bl.height)) {
        l.height = height - (tl.height + bl.height);
        r.height = height - (tr.height + br.height);

        l.position.set(0, tl.height);
        r.position.set(width - r.width, tr.height);

        container.addChild(l, r);
    }

    if ((width > (tl.width + tr.width)) && (height > (tl.height + bl.height))) {
        const c = new Sprite(tiles[1][1]);
        c.width = width - (tl.width + tr.width);
        c.height = height - (tl.height + bl.height);

        c.position.set(tl.width, tl.height);

        container.addChild(c);
    }

    return container;
}

function slice(baseTexture: BaseTexture, x: number, y: number, width: number, height: number) {
    return new Texture(baseTexture, new Rectangle(x, y, width, height));
}