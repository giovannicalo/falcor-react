import Extend from "./extend";

const expand = (range) => {
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
};

const build = (path) => {
	let object = null;
	if (path.length) {
		object = {};
		let keys = path.shift();
		if (!Array.isArray(keys)) {
			if (keys.constructor === Object) {
				keys = expand(keys);
			} else {
				keys = [keys];
			}
		}
		keys.forEach((key) => {
			object[key] = Extend(object[key], build(Array.from(path)));
		});
	}
	return object;
};

export default (paths) => {
	const data = {};
	paths.forEach((path) => {
		Object.entries(build(path)).forEach(([key, value]) => {
			data[key] = Extend(data[key], value);
		});
	});
	return data;
};
