import React from "react";

import FalcorReact from "../../../source";

@FalcorReact.Leaf("foo.bar[0].foo")
export default class LeafPath extends React.Component {

	render() {
		return <div />;
	}

}
