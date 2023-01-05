import { Assets, BaseTexture } from "pixi.js";
import type { ResolverManifest } from "pixi.js";

type TilesType = 'bevel' | 'hover' | 'inset';

export async function loadAssets() {
    const manifest: ResolverManifest = {
        bundles: [
            {
                name: 'tiles',
                assets: {
                    bevel: 'assets/bevel.png',
                    hover: 'assets/hover.png',
                    inset: 'assets/inset.png',
                }
            }
        ]
    }

    await Assets.init({ manifest: manifest });

    const bundleIds = manifest.bundles.map(bundle => bundle.name);

    const assets = await Assets.loadBundle(bundleIds);
    return mapAssets(assets);
};

export function mapAssets(assets): Map<TilesType, BaseTexture> {
    const map = new Map<TilesType, BaseTexture>();

    map.set('bevel', assets.tiles.bevel);
    map.set('hover', assets.tiles.hover);
    map.set('inset', assets.tiles.inset);

    return map;
}