/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */

class Controller {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        let _this = this;

        // ***** Attach View Listeners *****
        this._view.listModified.attach(function (sender, args) {
            _this.updateSelected(args.index);
        });

        this._view.addButtonClicked.attach(function () {
            _this.addCrime();
        });

        this._view.delButtonClicked.attach(function () {
            _this.delItem();
        });

        // ***** Attach Model Listeners *****
        this._model.crimeAdded.attach(function (sender, args) {
            _this._view.rebuildList(_this._model.crimes);
        });

        this._model.crimeRemoved.attach(function (sender, args) {
            _this._view.rebuildList(_this._model.crimes);
        });

        this.init();
    }

    addCrime() {
        let local = this._view.elements.crimeLocal.val();
        let name = this._view.elements.crimeName.val();
        let time = this._view.elements.crimeTime.val();
        let BO = this._view.elements.crimeBO.val();

        let crime = new Crime(local, name, time, BO);
        if (crime) {
            this._model.addCrime(crime);
        }
    }

    delItem() {
        let index = this._model.selIndex;
        if (index !== -1) {
            this._model.removeItemAt(index);
        }
    }

    updateSelected(index) {
        this._model.selIndex = index;
    }

    init() {
        this._view.show(this._model.crimes);
    }
}