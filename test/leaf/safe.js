import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf(() => {
	return [["foo", "bar", 0, "foo"]];
}, {
	propsSafety: 2
})
export default class LeafSafe extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div />;
	}

}
