import React from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf()
export default class LeafCall extends React.Component {

	constructor(props) {
		super(props);
		this.state = { foo: null };
	}

	async onClick() {
		try {
			const data = await this.props.call("foo.foo", ["foo"]);
			if (data) {
				this.setState({ foo: data.json.bar[4].foo });
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	render() {
		return <div onClick={::this.onClick} ref="foo" />;
	}

}
