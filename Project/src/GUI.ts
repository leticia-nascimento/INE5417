import Event from "./Event"
import Crime from "./Crime"

/**
 * The GUI. GUI presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interaction.
 */

interface GUIElements {
    list: HTMLElement,
    delButton: HTMLElement,
    crimeLocal: HTMLElement,
    crimeName: HTMLElement,
    crimeTime: HTMLElement,
    crimeBO: HTMLElement,
    addButton: HTMLElement
}

export default class GUI {
    public listModified: Event;
    public addButtonClicked: Event;
    public delButtonClicked: Event;

    constructor(
        private _elements: GUIElements) {

        this.listModified = new Event(this);
        this.addButtonClicked = new Event(this);
        this.delButtonClicked = new Event(this);

        // ***** Attach Listeners to HTML controls *****
        this._elements.list.change(function (e) {
            this.listModified.notify({ index : e.target.selIndex });
        });
        this._elements.addButton.click = () => {
            this.addButtonClicked.notify();
        };
        this._elements.delButton.click(function () {
            this.delButtonClicked.notify();
        });
    }

    get elements () {
        return this._elements;
    }

    show(crimes: Array<Crime>) {
        this.rebuildList(crimes);
    }

    rebuildList(crimes: Array<Crime>) {
        let list = this._elements.list;
        list.html('');

        for (let key in crimes) {
            if (crimes.hasOwnProperty(key)) {
                list.append($('<option>' + crimes[key].name + '</option>'));
            }
        }
    }
}