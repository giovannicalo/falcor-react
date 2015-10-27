import Falcor from "falcor";
import React from "react";

import FalcorReact from "../source";
import Leaf from "./leaf";
import LeafDefinedEmpty from "./leaf/defined-empty";
import LeafSafe from "./leaf/safe";
import LeafUnsafe from "./leaf/unsafe";
import LeafWithProps from "./leaf/with-props";

@FalcorReact.Root(() => {
	return {
		cache: {
			bar: {
				1: { bar: "foo", foo: "bar" },
				2: { bar: "foo", foo: "bar" },
				3: { bar: "foo", foo: "bar" }
			},
			foo: {
				bar: {
					0: Falcor.Model.ref(["bar", 1]),
					1: Falcor.Model.ref(["bar", 2]),
					2: Falcor.Model.ref(["bar", 3])
				},
				foo: "bar"
			}
		}
	};
})
export default class Root extends React.Component {

	constructor(props) {
		super(props);
		this.state = { foo: "bar" };
	}

	render() {
		return <div>
			<Leaf />
			<LeafDefinedEmpty />
			<LeafSafe />
			<LeafUnsafe />
			<LeafWithProps foo={this.state.foo} />
		</div>;
	}

}
