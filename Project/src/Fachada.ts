import HTMLController from "./HTMLController"
import Event from "./Event"
import Crime from "./Crime"
import User from "./User"
import AeP from "./AeP"
import Informacao from "./Informacao"
import Time from "./Time"
import Date from "./Date"

/**
 * The Fachada. Fachada stores items and notifies
 * observers about changes.
 */
export default class Fachada {
    public crimeAdded: Event;
    public crimeRemoved: Event;
    public selIndexChanged: Event;
    public aepAdded: Event;
    public _htmlcontroller: HTMLController;

    constructor(
        public _crimes: Array<Crime> = [],
        public _users: Array<User> = [],
        public _aeps: Array<AeP> = [],
        public _informacoes: Array<Informacao> = [],
        public _selIndex: number = -1
        ) {
        this.crimeAdded = new Event(this);
        this.crimeRemoved = new Event(this);
        this.selIndexChanged = new Event(this);
        this.aepAdded = new Event(this);
    }

    setHTMLController(htmlcontroller: HTMLController) {
        this._htmlcontroller = htmlcontroller;
    }

    get crimes () {
        return [].concat(this._crimes);
    }

    addCrime(local: string, name: string, time: Time, date: Date, BO: boolean) {
        let crime = new Crime(local, name, time, date, BO);
        this._crimes.push(crime);
        this.saveDB();
        this.crimeAdded.notify();
    }

    registerAeP(local: string, descricao: string) {
        let aep = new AeP(local, descricao);
        this._aeps.push(aep);
        this.saveDB();
        return true;
    }

    showCrime(id: number) {
        let crime = this._crimes[id];
        return crime;

    }

    showAeP(id) {
        return this._aeps[id];
    }

    showInfo(id: number) {
        return this._informacoes[id];
    }

    removeCrimeAt(index: number) {
        let crime = this._crimes[index];
        this._crimes.splice(index, 1);
        if (index === this._selIndex) {
            this._selIndex = -1;
        }
        this.saveDB();
        this.crimeRemoved.notify();
    }

    get selIndex () {
        return this._selIndex;
    }

    set selIndex (index: number) {
        let prevIndex = this._selIndex;

        this._selIndex = index;
        this.selIndexChanged.notify({ previous : prevIndex });
    }

    saveDB() {
        let record = {
            crimes: this._crimes,
            aeps: this._aeps,
            users: this._users
        };
        window.localStorage.IlhaDoCrime = JSON.stringify(record);
    }

    retrieveDB() {
        if (window.localStorage.IlhaDoCrime != undefined) {
            let record = JSON.parse(window.localStorage.IlhaDoCrime);
            let { crimes, users } = record;
            for (let key in crimes) {
                let crime = crimes[key];
                this.addCrime(crime._local, crime._name, crime._time, crime._date, crime._bo);
            }
            for (let key in users) {
                let user = users[key];
                this._users.push(new User(user._name, user._pwd));
            }
        }
    }
}