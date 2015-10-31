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
	const object = {};
	if (path.length) {
		let keys = path.shift();
		if (!Array.isArray(keys)) {
			if (keys && typeof keys === "object") {
				keys = expand(keys);
			} else {
				keys = [keys];
			}
		}
		keys.forEach((key) => {
			const value = Extend({}, build(Array.from(path)));
			object[key] = Object.keys(value).length ? value : null;
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
