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

	public static convertTime(t: string) {
		let time = {hour: 0, min: 0};
		time.hour = Number(t.slice(0, 2));
		time.min = Number(t.slice(3, 5));
		return time;
	}
}