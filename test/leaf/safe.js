import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf([["foo", "bar", 0, "foo"]], { propsSafety: 2 })
export default class LeafSafe extends React.Component {

	render() {
		return <div />;
	}

}
