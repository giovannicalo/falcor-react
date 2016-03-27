import ReactTestUtils from "react-addons-test-utils";

/**
 * Finds the first leaf with a given name in a React tree
 *
 * @export
 * @param {Object} tree - A React tree
 * @param {String} name - The name of the leaf to find
 * @returns {Object} The leaf
 */
export default (tree, name) => {
	const leaf = ReactTestUtils.findAllInRenderedTree(tree, (leaf) => {
		return leaf.constructor.name === name;
	});
	if (Array.isArray(leaf) && leaf.length) {
		return leaf[0];
	} else {
		throw new Error(`Leaf ${name} not found`);
	}
};
