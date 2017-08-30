class User {
	constructor(name, pwd) {
		this._name = name;
		this._pwd = pwd;
	}

	get name() {
		return this._name;
	}

	set name (name) {
		this._name = name;
	}

	get pwd() {
		return this._pwd;
	}

	set pwd(pwd) {
		this._pwd = pwd;
	}
}