import Extend from "./extend";

/**
 * Expands a Falcor range object to its equivalent array of keys
 *
 * @param {Object} range - A Falcor range object
 * @returns {Array} The expanded array of keys
 */
const expand = (range) => {
	const { length } = range;
	let { from, to } = range;
	if (length > 0 && from === void 0 && to === void 0) {
		from = 0;
		to = length - 1;
	}
	if (from !== void 0 && to !== void 0) {
		return Array(to - from + 1).fill().map((value, key) => {
			return key + from;
		});
	} else {
		throw new Error(`Range object ${JSON.stringify(range)} is invalid`);
	}
};

/**
 * Normalizes a keys array, a single key or a Falcor range object to an array of keys
 *
 * @param {Array|Number|Object} keys - A keys array, a single key or a Falcor range object
 * @returns {Array} The array of keys
 */
const normalize = (keys) => {
	if (Array.isArray(keys)) {
		return keys;
	} else if (keys && typeof keys === "object") {
		return expand(keys);
	} else {
		return [keys];
	}
};

/**
 * Builds an empty tree from a normalized Falcor path
 *
 * @param {Array} path - A normalized Falcor path
 * @returns {Object} The tree
 */
const build = (path) => {
	const value = path.length && Extend(build(path.slice(1)));
	return normalize(path[0] || []).reduce((object, key) => {
		return {
			...object,
			[key]: Object.keys(value).length ? value : null
		};
	}, {});
};

/**
 * Creates an empty tree from normalized Falcor paths
 *
 * @export
 * @param {Array} paths - An array of normalized Falcor paths
 * @returns {Object} The tree
 */
export default (paths) => {
	const data = {};
	paths.forEach((path) => {
		Object.entries(build(path)).forEach(([key, value]) => {
			data[key] = Extend(data[key], value);
		});
	});
	return data;
};
