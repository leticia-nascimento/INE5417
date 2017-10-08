import Fachada from "./Fachada"
import GUI from "./GUI"
import Crime from "./Crime"
import Informacao from "./Informacao"
import AeP from "./AeP"
import Time from "./Time"
import Date from "./Date"

/**
 * The HTMLGUI. HTMLGUI responds to user actions and
 * invokes changes on the fachada.
 */

export default class HTMLController {
    constructor(
        public fachada: Fachada,
        public gui: GUI) {

        this.fachada.setHTMLController(this);

        // ***** Attach GUI Listeners *****
        this.gui.listModified.attach(function (sender: any, args: any) {
            this.updateSelected(args.index);
        });

        this.gui.addButtonClicked.attach( () => {
            this.addCrime();
        });

        this.gui.delButtonClicked.attach( () => {
            this.delItem();
        });

        // ***** Attach Fachada Listeners *****
        this.fachada.crimeAdded.attach( () => {
            this.gui.rebuildList(this.fachada.crimes);
        });

        this.fachada.crimeRemoved.attach( () => {
            this.gui.rebuildList(this.fachada.crimes);
        });

        this.init();
    }

    addCrime() {
        let local = (this.gui.elements.crimeLocal as HTMLInputElement).value;
        let name = (this.gui.elements.crimeName as HTMLInputElement).value;
        let t = Time.convertTime((this.gui.elements.crimeTime as HTMLInputElement).value);
        let time = new Time(t.hour, t.min);
        let d = Date.convertDate((this.gui.elements.crimeDate as HTMLInputElement).value);
        let date = new Date(d.day, d.mon, d.year);
        let BO = (this.gui.elements.crimeBO as HTMLInputElement).checked;

        this.fachada.addCrime(local, name, time, date, BO);
        this.printConfirmed();
        this.clearAddCrimeForm();
    }

    clearAddCrimeForm() {
        (this.gui.elements.crimeLocal as HTMLInputElement).value = '';
        (this.gui.elements.crimeName as HTMLInputElement).value = '';
        (this.gui.elements.crimeTime as HTMLInputElement).value = '';
        (this.gui.elements.crimeDate as HTMLInputElement).value = '';
        (this.gui.elements.crimeBO as HTMLInputElement).checked = false;
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

    printConfirmed() {
        alert('Cadastrado com sucesso!');
    }

    printCrime(crime: Crime) {
        alert(crime);
    }
    
    printInfo(informacao: Informacao) {
        alert(informacao);
    }

    printAeP(aep: AeP) {
        alert(aep);
    }
}