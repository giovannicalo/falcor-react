import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf([["foo", "bar", 0, "foo"]])
export default class Leaf extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div />;
	}

}
