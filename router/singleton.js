export default class Singleton
{
	constructor() {
		if (!Singleton._instance) {
			Singleton._instance = this;
		}
		return Singleton._instance;
	}

	static getInstance() {
		return this._instance;
	}
}