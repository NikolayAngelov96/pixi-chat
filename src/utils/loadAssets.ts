import { Assets } from "pixi.js";
import type { ResolverManifest } from "pixi.js";

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

    return await Assets.loadBundle(bundleIds);
}