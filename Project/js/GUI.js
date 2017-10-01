/**
 * The GUI. GUI presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interaction.
 */

class GUI {
    constructor(elements) {
        this._elements = elements;

        this.listModified = new Event(this);
        this.addButtonClicked = new Event(this);
        this.delButtonClicked = new Event(this);

        let _this = this;

        // ***** Attach Listeners to HTML controls *****
        this._elements.list.change(function (e) {
            _this.listModified.notify({ index : e.target.selIndex });
        });
        this._elements.addButton.click(function () {
            _this.addButtonClicked.notify();
        });
        this._elements.delButton.click(function () {
            _this.delButtonClicked.notify();
        });
    }

    get elements () {
        return this._elements;
    }

    show(crimes) {
        this.rebuildList(crimes);
    }

    rebuildList(crimes) {
        let list = this._elements.list;
        list.html('');

        for (let key in crimes) {
            if (crimes.hasOwnProperty(key)) {
                list.append($('<option>' + crimes[key].name + '</option>'));
            }
        }
    }
}