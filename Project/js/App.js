$(function () {
	let model = new CrimeModel();
	let view = new CrimeView(model);
	let controller = new CrimeController(model, view);
});