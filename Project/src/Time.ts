export default class Time {
	constructor (
		private _hora: number,
		private _minuto: number
	) {}

	get hora () {
		return this._hora;
	}

	get minuto () {
		return this._minuto;
	}
}