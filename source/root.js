import Falcor from "falcor";
import React from "react";

export default function(config) {
	return function(component) {
		const Component = component;
		return class FalcorRoot extends React.Component {

			constructor(props) {
				super(props);
				if (typeof config === "function") {
					config = config();
				}
				this.state = { model: new Falcor.Model(config) };
			}

			static childContextTypes = {
				model: React.PropTypes.object.isRequired
			};

			getChildContext() {
				return { model: this.state.model };
			}

			render() {
				return <Component {...this.props} />;
			}

		};
	};
}
