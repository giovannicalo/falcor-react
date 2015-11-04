import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf()
export default class LeafGet extends React.Component {

	constructor(props) {
		super(props);
		this.state = { foo: null };
	}

	async onClick() {
		try {
			const data = await this.props.get(["foo", "bar", 0, "foo"]);
			if (data) {
				this.setState({ foo: data.json.foo.bar[0].foo });
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	render() {
		return <div onClick={::this.onClick} ref="foo" />;
	}

}
