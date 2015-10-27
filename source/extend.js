export default function extend(destination, ...sources) {
	if (destination && destination.constructor === Object) {
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
	} else if (sources.length) {
		return sources[sources.length - 1];
	} else {
		return destination;
	}
}
