import Event from "./Event"
import Crime from "./Crime"
import Time from "./Time"
import Date from "./Date"

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
    crimeDate: HTMLElement,
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
        this._elements.addButton.onclick = () => {
            this.addButtonClicked.notify();
        };
        this._elements.list.onchange = (evt) => {
            this.listModified.notify((evt.target as HTMLSelectElement).selectedIndex);
            document.getElementById('crime-details-modal').style.display = 'block';
        };
        this._elements.delButton.onclick = () => {
            this.delButtonClicked.notify();
        };

        document.getElementById('close-button').onclick = () => {
            document.getElementById('crime-details-modal').style.display = 'none';
        }
    }

    get elements () {
        return this._elements;
    }

    show(crimes: Array<Crime>) {
        this.rebuildList(crimes);
    }

    rebuildList(crimes: Array<Crime>) {
        let list = this._elements.list;
        list.innerHTML = '';

        for (let key in crimes) {
            if (crimes.hasOwnProperty(key)) {
                let op = document.createElement('option');
                op.innerText = crimes[key].name;
                list.appendChild(op);
            }
        }
    }

    printCrime(name: string, local: string, time: string, date: string, bo: string) {
        document.getElementById('crime-infos').children[0].innerHTML = name;
        document.getElementById('crime-infos').children[1].innerHTML = local;
        document.getElementById('crime-infos').children[2].innerHTML = time;
        document.getElementById('crime-infos').children[3].innerHTML = date;
        document.getElementById('crime-infos').children[4].innerHTML = bo;
    }
}