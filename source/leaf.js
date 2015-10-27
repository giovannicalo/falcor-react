import React from "react";

import Extend from "./extend";
import Tree from "./tree";

const defaultConfig = { defineEmpty: false, propsSafety: 1 };

export default function(query, config) {
	config = Extend(Object.assign({}, defaultConfig), config);
	return function(component) {
		const Component = component;
		return class FalcorLeaf extends React.Component {

			constructor(props) {
				super(props);
				this.state = {};
			}

			static contextTypes = {
				model: React.PropTypes.object.isRequired
			};

			componentWillMount() {
				this.initialize();
			}

			componentWillReceiveProps(props) {
				this.initialize(props);
			}

			call(functionPath, args, refSuffixes, thisPaths) {
				return this.context.model.call(functionPath, args, refSuffixes, thisPaths);
			}

			get(...pathSets) {
				return this.context.model.get(...pathSets);
			}

			getChildProps() {
				const props = {
					falcor: {
						call: this.call,
						data: this.state,
						get: this.get,
						set: this.set
					}
				};
				if (config.propsSafety < 2) {
					Object.entries(props.falcor).map(([key, value]) => {
						props[key] = value;
					});
					delete props.falcor;
					if (config.propsSafety < 1) {
						delete props.data;
						Object.entries(this.state).map(([key, value]) => {
							props[key] = value;
						});
					}
				}
				return props;
			}

			async initialize(props = this.props) {
				try {
					let state = null;
					if (config.defineEmpty) {
						state = Tree(query(props));
					}
					const data = await this.get(...query(props));
					if (data && data.json) {
						state = Extend(state, data.json);
					}
					if (state) {
						this.setState(state);
					}
				} catch (error) {
					console.log(error);
				}
			}

			render() {
				return <Component {...this.props} {...this.getChildProps()} />;
			}

			set(...pathValues) {
				return this.context.model.set(...pathValues);
			}

		};
	};
}
