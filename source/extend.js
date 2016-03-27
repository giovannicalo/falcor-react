/**
 * Extends an object with one or more others
 *
 * @export
 * @param {...Object} sources - One or more objects to extend
 * @returns {Object} The extended object
 */
const extend = (...sources) => {
	let destination = {};
	if (sources[0] && typeof sources[0] === "object" && !Array.isArray(sources[0])) {
		destination = { ...sources[0] };
	}
	sources.slice(1).forEach((source) => {
		if (source && typeof source === "object" && !Array.isArray(source)) {
			Object.entries(source).forEach(([key, value]) => {
				if (destination[key] && typeof destination[key] === "object" && !Array.isArray(destination[key]) && value && typeof value === "object" && !Array.isArray(value)) {
					destination[key] = extend(destination[key], value);
				} else {
					destination[key] = value;
				}
			});
		}
	});
	return destination;
};

export default extend;
