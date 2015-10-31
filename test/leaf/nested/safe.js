import React from "react";

import FalcorReact from "../../../source";

@FalcorReact.Leaf([["foo", "bar", 0, "foo"]], { propsSafety: 2 })
@FalcorReact.Leaf([["foo", "bar", 1, "bar"]])
export default class LeafNestedSafe extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div />;
	}

}
