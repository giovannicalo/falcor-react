import React from "react";

export default function(query) {
	return function(component) {
		const Component = component;
		return class FalcorLeaf extends React.Component {

			constructor(props) {
				super(props);
				this.state = { data: null };
			}

			static contextTypes = {
				model: React.PropTypes.object.isRequired
			};

			componentWillMount() {
				this.executeQuery();
			}

			componentWillReceiveProps() {
				this.executeQuery();
			}

			async executeQuery() {
				try {
					const data = await this.context.model.get(...query());
					this.setState({ data: data && data.json });
				} catch (error) {
					console.log(error);
				}
			}

			render() {
				return <Component model={this.state.data} />;
			}

		};
	};
}
