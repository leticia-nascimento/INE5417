export default class Event {
    constructor(private sender: any,
        public _listeners: Array<Function> = []) {
    }

    attach(listener: Function) {
        this._listeners.push(listener);
    }

    notify(args: any) {
        for (let i = 0; i < this._listeners.length; i++) {
            this._listeners[i](this._sender, args);
        }
    }
}