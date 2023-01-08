export class Keyboard {
    public static readonly state: string;
    public static initialize(onKeydownCallback: (e: KeyboardEvent) => void) {
        Keyboard.keyDown = onKeydownCallback;
        document.addEventListener('keydown', Keyboard.keyDown);
    }

    private static keyDown(e: KeyboardEvent) {
        console.log('keyboard pressed', e);
    }

    public static removeEvent() {
        document.removeEventListener('keydown', Keyboard.keyDown);
    }
}