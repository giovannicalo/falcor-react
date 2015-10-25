import ReactTestUtils from "react-addons-test-utils";

export default function(tree, name) {
	const leaf = ReactTestUtils.findAllInRenderedTree(tree, (leaf) => {
		return leaf.constructor.name === name;
	});
	if (Array.isArray(leaf) && leaf.length) {
		return leaf[0];
	} else {
		throw new Error("Leaf " + name + " not found");
	}
}
