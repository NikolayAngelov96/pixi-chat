import { Application, DisplayObject } from "pixi.js";

export class Manager {
    private constructor() { }

    private static app: Application
    private static currentScene: IScene

    private static _width: number;
    private static _height: number;

    public static get width() {
        return Manager._width;
    }

    public static get height() {
        return Manager._height;
    }

    public static initialize(width: number, height: number, background: number) {
        Manager._width = width;
        Manager._height = height;

        Manager.app = new Application({
            width,
            height,
            backgroundColor: background
        });

        document.body.appendChild(Manager.app.view as HTMLCanvasElement);

        Manager.app.ticker.add(Manager.update);
    }

    public static changeScene(newScene: IScene) {
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        Manager.currentScene = newScene;
        Manager.app.stage.addChild(Manager.currentScene);
    }

    private static update(dt: number) {
        if (Manager.currentScene) {
            Manager.currentScene.update(dt);
        }
    }
}

export interface IScene extends DisplayObject {
    update: (dt: number) => void;
}