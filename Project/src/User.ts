export default class User {
	constructor(
		private _name: string,
		private _pwd: string) {}
		
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