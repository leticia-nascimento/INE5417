import Fachada from "./Fachada"
import GUI from "./GUI"
import HTMLController from "./HTMLController"
import Informacao from "./Informacao"
import AeP from "./AeP"

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


// Teste Informações e AchadosEPerdidos
fachada._informacoes.push(new Informacao("Policia", "190"));
fachada._informacoes.push(new Informacao("Bombeiros", "911"));

fachada.registerAeP("CTC - UFSC", "Perdi minha carteirinha do RU. Contato: 9964-3502");
fachada.registerAeP("BU", "Perdi uma chave com chaveiro dos Star Wars próximo a BU na segunda-feira de manhã.");

htmlcontroller.showInfo();
htmlcontroller.showAeP();
