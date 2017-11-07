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
        this.gui.listModified.attach( (sender: any, args: any) => {
            this.updateSelected(args);
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
        let crime = this.fachada.showCrime(index);
        this.printCrime(crime);
    }

    init() {
        this.gui.show(this.fachada.crimes);
        this.fachada.retrieveDB();
    }

    printConfirmed() {
        alert('Cadastrado com sucesso!');
    }

    printCrime(crime: Crime) {
        let t: any = crime.time;
        let time: string = ("00" + t._hora).slice(-2) + ":" + ("00" + t._minuto).slice(-2);
        let d: any = crime.date;
        let date: string = ("00" + d._day).slice(-2) + "/" + ("00" + d._month).slice(-2);
        let bo = (crime.bo ? 'Sim' : 'Não' );
        this.gui.printCrime(crime.name, crime.local, time, date, bo);
    }
    
    showInfo() {
        console.log("Informações para Denuncias:");
        for(let i = 0; i < this.fachada._informacoes.length; i++) {
            let info = this.fachada.showInfo(i);
            this.printInfo(info);
        }
        console.log("");
    }

    showAeP() {
        console.log("Achados e Perdidos:");
        for(let i = 0; i < this.fachada._aeps.length; i++) {
            let aep = this.fachada.showAeP(i);
            console.log(i);
            this.printAeP(aep);
        }
    }

    printInfo(informacao: Informacao) {
        console.log( (informacao.nome + ": " + informacao.numero));
    }

    printAeP(aep: AeP) {
        console.log("Local:", aep.local);
        console.log("Descrição:", aep.descricao);
    }
}