import React from "react";

import FalcorReact from "../../../source";

@FalcorReact.Leaf(["foo.bar[0].foo", "foo.bar[1].bar"])
export default class LeafPathArray extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div />;
	}

}
