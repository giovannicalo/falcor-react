import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf("foo { bar(id: 0) { foo } }")
export default class LeafGraph extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div />;
	}

}
