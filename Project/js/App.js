$(function () {
	let firstCrime = new Crime('Florianópolis', 'Roubo', '23:30', true);
    let model = new Model([firstCrime]);
    let view = new View({
            'list' : $('#last-crimes-list'),
            'delButton' : $('#del-crime-button'),
            'crimeLocal' : $('#crime-local'),
            'crimeName' : $('#crime-name'),
            'crimeTime' : $('#crime-time'),
            'crimeBO' : $('#crime-bo'),
            'addButton' : $('#add-crime-button')
        });
    let controller = new Controller(model, view);
});