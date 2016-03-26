import React from "react";

import FalcorReact from "../../../source";

@FalcorReact.Leaf([["foo", "bar", 0, "foo"]])
@FalcorReact.Leaf([["foo", "bar", 1, "bar"]])
export default class LeafNested extends React.Component {

	render() {
		return <div />;
	}

}
