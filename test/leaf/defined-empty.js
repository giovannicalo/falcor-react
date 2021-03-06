import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf([
	["bar", { from: 0, to: 9 }, "bar"],
	["bar", 3, "foo"],
	["foo", "bar", { length: 10 }, ["bar", "foo"]]
], { defineEmpty: true })
export default class LeafDefinedEmpty extends React.Component {

	render() {
		return <div />;
	}

}
