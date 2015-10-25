import React from "react";

import FalcorReact from "../source";
import Leaf from "./leaf";
import LeafSafe from "./leaf/safe";
import LeafUnsafe from "./leaf/unsafe";
import LeafWithProps from "./leaf/with-props";

@FalcorReact.Root(() => {
	return { cache: { foo: { bar: "foo", foo: "bar" } } };
})
export default class Root extends React.Component {

	constructor(props) {
		super(props);
		this.state = { foo: "bar" };
	}

	render() {
		return <div>
			<Leaf />
			<LeafSafe />
			<LeafUnsafe />
			<LeafWithProps foo={this.state.foo} />
		</div>;
	}

}
