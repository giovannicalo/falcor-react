import React from "react";

import FalcorReact from "../../../source";

@FalcorReact.Leaf([["foo", "bar", 0, "foo"]], { propsSafety: 0 })
@FalcorReact.Leaf([["foo", "bar", 1, "bar"]])
export default class LeafNestedUnsafe extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div />;
	}

}
