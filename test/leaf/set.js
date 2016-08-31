import React, { PropTypes } from "react";

import FalcorReact from "../../source";

@FalcorReact.Leaf()
export default class LeafSet extends React.Component {

	static propTypes = {
		set: PropTypes.func
	}

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
			throw new Error(error);
		}
	}

	render() {
		return <div onClick={::this.onClick} ref="foo" />;
	}

}
