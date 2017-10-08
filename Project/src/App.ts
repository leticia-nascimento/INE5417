import Fachada from "./Fachada"
import GUI from "./GUI"
import HTMLController from "./HTMLController"

let fachada = new Fachada();
let gui = new GUI({
    'list' : document.getElementById('last-crimes-list'),
    'delButton' : document.getElementById('del-crime-button'),
    'crimeLocal' : document.getElementById('crime-local'),
    'crimeName' : document.getElementById('crime-name'),
    'crimeTime' : document.getElementById('crime-time'),
    'crimeDate' : document.getElementById('crime-date'),
    'crimeBO' : document.getElementById('crime-bo'),
    'addButton' : document.getElementById('add-crime-button')
});
let htmlcontroller = new HTMLController(fachada, gui);
console.log("fachada:", fachada);
console.log("gui:", gui);
console.log("htmlcontroller:", htmlcontroller)