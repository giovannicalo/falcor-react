export default function extend(destination, ...sources) {
	if (!destination || typeof destination !== "object") {
		destination = {};
	}
	sources.forEach((source) => {
		Object.entries(source || {}).forEach(([key, value]) => {
			if (destination[key] && destination[key].constructor === Object && value.constructor === Object) {
				extend(destination[key], value);
			} else {
				destination[key] = value;
			}
		});
	});
	return destination;
}
