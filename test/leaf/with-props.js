import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf((props) => {
	return [["foo", props.foo]];
})
export default class LeafWithProps extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div />;
	}

}
