class Crime {
	constructor (local, name, time, bo) {
		this._local = local;
		this._name = name;
		this._time = time;
		this._bo = bo;
	}

	get local () {
		return this._local;
	}

	get name () {
		return this._name;
	}

	get time () {
		return this._time;
	}

	get bo () {
		return this._bo;
	}
}