import Falcor from "falcor";
import React from "react";

/**
 * Wraps a React component and binds it to a Falcor model
 *
 * @export
 * @param {Object} config - A Falcor model configuration object
 * @returns {function} The wrapped component
 */
export default (config) => {
	return (component) => {
		const Component = component;
		return class FalcorRoot extends React.Component {

			constructor(props) {
				super(props);
				this.state = { model: new Falcor.Model(config) };
			}

			static childContextTypes = {
				model: React.PropTypes.object.isRequired
			};

			static displayName = `Falcor Root (${component.displayName || component.name || "Anonymous Component"})`

			getChildContext() {
				return { model: this.state.model };
			}

			render() {
				return <Component {...this.props} />;
			}

		};
	};
};
