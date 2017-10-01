export default class Date {
	constructor (
		private _day: number,
		private _month: number,
		private _year: number
	) {}

	get day () {
		return this._day;
	}

	get month () {
		return this._month;
	}

	get year () {
		return this._year;
	}
}