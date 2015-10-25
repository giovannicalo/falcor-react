import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf(() => {
	return [["foo", "bar"]];
}, {
	propsSafety: 0
})
export default class LeafUnsafe extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div />;
	}

}
