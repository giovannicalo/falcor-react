import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf(() => {
	return [["foo", "bar"]];
})
export default class Leaf extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div />;
	}

}
