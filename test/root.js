import React from "react";

import DataSource from "./data-source";
import FalcorReact from "../source";
import Leaf from "./leaf";
import LeafCall from "./leaf/call";
import LeafDefinedEmpty from "./leaf/defined-empty";
import LeafError from "./leaf/error";
import LeafGet from "./leaf/get";
import LeafGraph from "./leaf/graph";
import LeafNested from "./leaf/nested";
import LeafNestedSafe from "./leaf/nested/safe";
import LeafNestedUnsafe from "./leaf/nested/unsafe";
import LeafPath from "./leaf/path";
import LeafPathArray from "./leaf/path/array";
import LeafSafe from "./leaf/safe";
import LeafSet from "./leaf/set";
import LeafUnsafe from "./leaf/unsafe";
import LeafWithProps from "./leaf/with-props";

@FalcorReact.Root({ source: new DataSource() })
export default class Root extends React.Component {

	constructor(props) {
		super(props);
		this.state = { foo: "bar" };
	}

	render() {
		return <div>
			<Leaf />
			<LeafCall />
			<LeafDefinedEmpty />
			<LeafError />
			<LeafGet />
			<LeafGraph />
			<LeafNested />
			<LeafNestedSafe />
			<LeafNestedUnsafe />
			<LeafPath />
			<LeafPathArray />
			<LeafSafe />
			<LeafSet />
			<LeafUnsafe />
			<LeafWithProps foo={this.state.foo} />
		</div>;
	}

}
