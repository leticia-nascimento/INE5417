/**
 * The HTMLGUI. HTMLGUI responds to user actions and
 * invokes changes on the fachada.
 */

class HTMLView {
    constructor(fachada, gui) {
        this._fachada = fachada;
        this._gui = gui;

        let _this = this;

        // ***** Attach GUI Listeners *****
        this._gui.listModified.attach(function (sender, args) {
            _this.updateSelected(args.index);
        });

        this._gui.addButtonClicked.attach(function () {
            _this.addCrime();
        });

        this._gui.delButtonClicked.attach(function () {
            _this.delItem();
        });

        // ***** Attach Fachada Listeners *****
        this._fachada.crimeAdded.attach(function (sender, args) {
            _this._gui.rebuildList(_this._fachada.crimes);
        });

        this._fachada.crimeRemoved.attach(function (sender, args) {
            _this._gui.rebuildList(_this._fachada.crimes);
        });

        this.init();
    }

    addCrime() {
        let local = this._gui.elements.crimeLocal.val();
        let name = this._gui.elements.crimeName.val();
        let time = this._gui.elements.crimeTime.val();
        let BO = this._gui.elements.crimeBO.val();

        let crime = new Crime(local, name, time, BO);
        if (crime) {
            this._fachada.addCrime(crime);
        }
    }

    delItem() {
        let index = this._fachada.selIndex;
        if (index !== -1) {
            this._fachada.removeCrimeAt(index);
        }
    }

    updateSelected(index) {
        this._fachada.selIndex = index;
    }

    init() {
        this._gui.show(this._fachada.crimes);
        this._fachada.retrieveDB();
    }
}