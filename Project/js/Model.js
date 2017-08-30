/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */
class Model {
    constructor(crimes) {
        this._crimes = crimes;
        this._selIndex = -1;
        
        this.crimeAdded = new Event(this);
        this.crimeRemoved = new Event(this);
        this.selIndexChanged = new Event(this);
    }

    get crimes () {
        return [].concat(this._crimes);
    }

    addCrime(crime) {
        this._crimes.push(crime);
        this.crimeAdded.notify({ crime: crime });
        this.saveDB();
    }

    removeCrimeAt(index) {
        let crime = this._crimes[index];
        this._crimes.splice(index, 1);
        this.crimeRemoved.notify({ crime : crime });
        if (index === this._selIndex) {
            this._selIndex = -1;
        }
        this.saveDB();
    }

    get selIndex () {
        return this._selIndex;
    }

    set selIndex (index) {
        let prevIndex = this._selIndex;

        this._selIndex = index;
        this.selIndexChanged.notify({ previous : prevIndex });
    }

    saveDB() {
        let record = { crimes: this._crimes };
        window.localStorage.IlhaDoCrime = JSON.stringify(record);
    }

    retrieveDB() {
        if (window.localStorage.IlhaDoCrime != undefined) {
            console.log("entrou");
            let record = JSON.parse(window.localStorage.IlhaDoCrime);
            let crimes = record.crimes;
            for (let key in crimes) {
                let crime = crimes[key];
                this.addCrime(new Crime(crime._local, crime._name, crime._time, crime._bo));
            }
        }
    }
}