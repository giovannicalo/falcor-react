import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf([["foo", "bar", 0, "foo"]], { propsSafety: 0 })
export default class LeafUnsafe extends React.Component {

	render() {
		return <div />;
	}

}
