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

	public static convertDate(t: string) {
		let date = {day: 0, mon: 0, year: 0};
		date.day = Number(t.slice(0, 2));
		date.mon = Number(t.slice(3, 5));
		date.year = Number(t.slice(6, 8));
		return date;
	}
}