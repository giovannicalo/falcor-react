import Extend from "./extend";

export default class Tree {

	constructor(paths) {
		this.data = {};
		paths.forEach((path) => {
			Object.entries(this.build(path)).forEach(([key, value]) => {
				this.data[key] = Extend(this.data[key], value);
			});
		});
		return this.data;
	}

	build(path) {
		let object = null;
		if (path.length) {
			object = {};
			let keys = path.shift();
			if (!Array.isArray(keys)) {
				if (keys.constructor === Object) {
					keys = this.expand(keys);
				} else {
					keys = [keys];
				}
			}
			keys.forEach((key) => {
				object[key] = Extend(object[key], this.build(Array.from(path)));
			});
		}
		return object;
	}

	expand(range) {
		const expanded = [];
		if (range.length > 0 && range.from === void 0 && range.to === void 0) {
			range.from = 0;
			range.to = range.length - 1;
			delete range.length;
		}
		if (range.length === void 0 && range.from !== void 0 && range.to !== void 0) {
			for (let i = range.from; i <= range.to; i++) {
				expanded.push(i);
			}
		} else {
			throw new Error("Range object " + JSON.stringify(range) + " is invalid");
		}
		return expanded;
	}

}
