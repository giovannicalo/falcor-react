export default function extend(destination, ...sources) {
	if (!destination || typeof destination !== "object") {
		destination = {};
	}
	sources.forEach((source) => {
		if (source && typeof source === "object") {
			Object.entries(source).forEach(([key, value]) => {
				if (destination[key] && typeof destination[key] === "object" && value && typeof value === "object") {
					extend(destination[key], extend({}, value));
				} else {
					destination[key] = value;
				}
			});
		}
	});
	return destination;
}
