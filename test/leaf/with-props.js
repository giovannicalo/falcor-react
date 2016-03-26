import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf((props) => {
	return [["foo", "bar", 0, props.foo]];
})
export default class LeafWithProps extends React.Component {

	render() {
		return <div />;
	}

}
