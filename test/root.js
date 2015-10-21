import React from "react";

import FalcorReact from "../source";
import Leaf from "./leaf";

@FalcorReact.Root(() => {
	return { cache: { foo: { bar: "foo" } } };
})
export default class Root extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <Leaf />;
	}

}
