import Falcor from "falcor";
import FalcorRouter from "falcor-router";

export default new FalcorRouter([{
	get() {
		return {
			jsonGraph: {
				bar: {
					1: { bar: "foo", foo: "bar" },
					2: { bar: "foo", foo: "bar" },
					3: { bar: "foo", foo: "bar" }
				}
			}
		};
	},
	route: "bar[{integers}][\"bar\", \"foo\"]",
	set(jsonGraph) {
		return { jsonGraph };
	}
}, {
	get() {
		return {
			jsonGraph: {
				foo: {
					bar: {
						0: Falcor.Model.ref(["bar", 1]),
						1: Falcor.Model.ref(["bar", 2]),
						2: Falcor.Model.ref(["bar", 3])
					}
				}
			}
		};
	},
	route: "foo.bar[{integers}]",
	set(jsonGraph) {
		return { jsonGraph };
	}
}, {
	call(path, parameters) {
		return [{
			path: ["bar", 4, "foo"],
			value: parameters && parameters[0]
		}, {
			path: ["foo", "bar", 3],
			value: Falcor.Model.ref(["bar", 4])
		}];
	},
	route: "foo.foo"
}]);
