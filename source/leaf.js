import FalcorGraphSyntax from "falcor-graph-syntax";
import FalcorPathSyntax from "falcor-path-syntax";
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

			buildQuery(props) {
				let pathSets = [];
				if (typeof query === "function") {
					pathSets = query(props);
				} else if (typeof query === "string" || Array.isArray(query)) {
					pathSets = query;
				}
				if (typeof pathSets === "string") {
					try {
						pathSets = FalcorGraphSyntax(pathSets);
					} catch (error) {
						pathSets = [FalcorPathSyntax.fromPath(pathSets)];
					}
				} else if (Array.isArray(pathSets)) {
					if (!Array.isArray(pathSets[0])) {
						pathSets = [pathSets];
					}
					let isPath = false;
					pathSets = pathSets.map((pathSet) => {
						return pathSet.map((path) => {
							if (typeof path === "string") {
								const arrayPath = FalcorPathSyntax.fromPath(path);
								if (arrayPath[0] === path) {
									return path;
								} else {
									isPath = true;
									return arrayPath;
								}
							} else {
								return path;
							}
						});
					});
					if (isPath) {
						pathSets = pathSets[0];
					}
				}
				return pathSets;
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
						call: ::this.call,
						data: this.state,
						get: ::this.get,
						set: ::this.set
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
					const pathSets = this.buildQuery(props);
					if (pathSets) {
						let state = null;
						if (config.defineEmpty) {
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
