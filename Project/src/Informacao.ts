export default class Informacao {
	constructor (
		private _nome: string,
		private _numero: string
	) {}

	get nome () {
		return this._nome;
	}

	get numero () {
		return this._numero;
	}
}