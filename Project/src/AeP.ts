// AeP: Achados e Perdidos
export default class AeP {
	static _id: number = 0;

	constructor (
		private _local: string,
		private _descricao: string
	) {
		AeP._id++;
	}

	get local () {
		return this._local;
	}

	get id () {
		return AeP._id;
	}

	get descricao () {
		return this._descricao;
	}

}