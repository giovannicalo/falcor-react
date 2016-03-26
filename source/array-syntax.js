import FalcorGraphSyntax from "falcor-graph-syntax";
import FalcorPathSyntax from "falcor-path-syntax";

/**
 * Normalizes a Falcor query to its array syntax
 *
 * @export
 * @param {Array|String} query - A Falcor query in its array, graph or path syntax
 * @returns {Array} The normalized query
 */
export default (query) => {
	let pathSets = query;
	if (typeof query === "string") {
		try {
			pathSets = FalcorGraphSyntax(query);
		} catch (error) {
			pathSets = [FalcorPathSyntax.fromPath(pathSets)];
		}
	} else if (Array.isArray(pathSets)) {
		if (!Array.isArray(pathSets[0])) {
			pathSets = [pathSets];
		}
		let isPath = false;
		pathSets = pathSets.map((pathSet) => {
			return pathSet.map((path) => {
				if (typeof path === "string") {
					const arrayPath = FalcorPathSyntax.fromPath(path);
					if (arrayPath[0] === path) {
						return path;
					} else {
						isPath = true;
						return arrayPath;
					}
				} else {
					return path;
				}
			});
		});
		if (isPath) {
			pathSets = pathSets[0];
		}
	} else {
		pathSets = null;
	}
	return pathSets;
};
