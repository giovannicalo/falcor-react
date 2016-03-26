import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf("foo[bar]")
export default class LeafError extends React.Component {

	render() {
		return <div />;
	}

}
