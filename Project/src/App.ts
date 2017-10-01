import Fachada from "./Fachada"
import GUI from "./GUI"
import HTMLView from "./HTMLView"

$(function () {
    let fachada = new Fachada();
    let gui = new GUI({
            'list' : $('#last-crimes-list'),
            'delButton' : $('#del-crime-button'),
            'crimeLocal' : $('#crime-local'),
            'crimeName' : $('#crime-name'),
            'crimeTime' : $('#crime-time'),
            'crimeBO' : $('#crime-bo'),
            'addButton' : $('#add-crime-button')
        });
    let htmlview = new HTMLView(fachada, gui);
});