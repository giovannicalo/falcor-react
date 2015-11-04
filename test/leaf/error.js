import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf("foo[bar]")
export default class LeafError extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div />;
	}

}
