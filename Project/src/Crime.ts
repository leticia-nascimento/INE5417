import Time from "./Time"
import Date from "./Date"

export default class Crime {
	constructor (
		private _local: string,
		private _name: string,
		private _time: Time,
		private _date: Date,
		private _bo: boolean
	) {}

	get local () {
		return this._local;
	}

	get name () {
		return this._name;
	}

	get time () {
		return this._time;
	}

	get date () {
		return this._date;
	}

	get bo () {
		return this._bo;
	}
}