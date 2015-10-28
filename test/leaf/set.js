import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf()
export default class LeafSet extends React.Component {

	constructor(props) {
		super(props);
		this.state = { foo: null };
	}

	async onClick() {
		try {
			const data = await this.props.set({ path: ["foo", "bar", 0, "foo"], value: "foo" });
			if (data) {
				this.setState({ foo: data.json.foo.bar[0].foo });
			}
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return <div onClick={::this.onClick} ref="foo" />;
	}

}
