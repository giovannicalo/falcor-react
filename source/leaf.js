import React, { PropTypes } from "react";

import ArraySyntax from "./array-syntax";
import Extend from "./extend";
import Tree from "./tree";

const defaultConfig = { defineEmpty: false, propsSafety: 1 };

/**
 * Wraps a React component, passing down Falcor data and logic as props
 *
 * @export
 * @param {Array|String|function} query - A Falcor query to be executed before initializing the component
 * @param {Object} config - A configuration object
 * @returns {function} The wrapped component
 */
export default (query, config) => {
	const finalConfig = Extend(defaultConfig, config);
	return (component) => {
		const Component = component;
		return class FalcorLeaf extends React.Component {

			static propTypes = {
				falcor: PropTypes.object
			}

			constructor(props) {
				super(props);
				this.state = {};
			}

			buildQuery(props) {
				if (typeof query === "function") {
					return ArraySyntax(query(props));
				} else if (typeof query === "string" || Array.isArray(query)) {
					return ArraySyntax(query);
				} else {
					return null;
				}
			}

			call(functionPath, args, refSuffixes, thisPaths) {
				return this.context.model.call(functionPath, args || [], refSuffixes || [], thisPaths || []); // eslint-disable-line prefer-reflect
			}

			get childProps() {
				const props = Extend(this.parentProps, {
					falcor: {
						call: ::this.call,
						config: finalConfig,
						data: this.state,
						get: ::this.get,
						reinitialize: ::this.initialize,
						set: ::this.set
					}
				});
				if (finalConfig.propsSafety < 2) {
					["call", "data", "get", "reinitialize", "set"].forEach((key) => {
						props[key] = props.falcor[key];
						Reflect.deleteProperty(props.falcor, key);
					});
					if (finalConfig.propsSafety < 1) {
						Reflect.deleteProperty(props, "data");
						Object.entries(this.state).forEach(([key, value]) => {
							props[key] = value;
						});
					}
				}
				return props;
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

			static displayName = `Falcor Leaf (${component.displayName || component.name || "Anonymous Component"})`

			get(...pathSets) {
				return this.context.model.get(...pathSets);
			}

			async initialize(props = this.props) {
				try {
					const pathSets = this.buildQuery(props);
					if (pathSets) {
						let state = null;
						if (finalConfig.defineEmpty) {
							state = Tree(pathSets);
						}
						const data = await this.get(...pathSets);
						if (data && data.json) {
							state = Extend(state, data.json);
						}
						if (state) {
							this.setState(state);
						}
					}
				} catch (error) {
					throw new Error(error);
				}
			}

			get parentConfig() {
				return this.props.falcor && this.props.falcor.config;
			}

			get parentProps() {
				const props = Extend(this.props);
				if (this.parentConfig) {
					let object = null;
					if (this.parentConfig.propsSafety > 1) {
						object = props.falcor;
					} else {
						object = props;
						if (this.parentConfig.propsSafety === 1) {
							props.falcor.data = props.data;
						} else {
							props.falcor.data = props;
						}
					}
					["call", "get", "reinitialize", "set"].forEach((key) => {
						if (object) {
							Reflect.deleteProperty(object, key);
						}
					});
				}
				return props;
			}

			render() {
				const query = this.buildQuery(this.props); // FIXME: This will break if given an invalid query
				if (finalConfig.defineEmpty && query && query.length && !Object.keys(this.state).length) {
					return null;
				}
				return <Component {...this.childProps} />;
			}

			set(...pathValues) {
				return this.context.model.set(...pathValues);
			}

		};
	};
};

