import Fachada from "./Fachada"
import GUI from "./GUI"
import Crime from "./Crime"

/**
 * The HTMLGUI. HTMLGUI responds to user actions and
 * invokes changes on the fachada.
 */

export default class HTMLView {
    constructor(
        public fachada: Fachada,
        public gui: GUI) {

        // ***** Attach GUI Listeners *****
        this.gui.listModified.attach(function (sender: any, args: any) {
            this.updateSelected(args.index);
        });

        this.gui.addButtonClicked.attach(function () {
            this.addCrime();
        });

        this.gui.delButtonClicked.attach(function () {
            this.delItem();
        });

        // ***** Attach Fachada Listeners *****
        this.fachada.crimeAdded.attach(function (sender, args) {
            this.gui.rebuildList(this.fachada.crimes);
        });

        this.fachada.crimeRemoved.attach(function (sender, args) {
            this.gui.rebuildList(this.fachada.crimes);
        });

        this.init();
    }

    addCrime() {
        let local = this.gui.elements.crimeLocal.val();
        let name = this.gui.elements.crimeName.val();
        let time = this.gui.elements.crimeTime.val();
        let date = this.gui.elements.crimeDate.val();
        let BO = this.gui.elements.crimeBO.val();

        this.fachada.addCrime(local, name, time, date, BO);
    }

    delItem() {
        let index = this.fachada.selIndex;
        if (index !== -1) {
            this.fachada.removeCrimeAt(index);
        }
    }

    updateSelected(index) {
        this.fachada.selIndex = index;
    }

    init() {
        this.gui.show(this.fachada.crimes);
        this.fachada.retrieveDB();
    }
}