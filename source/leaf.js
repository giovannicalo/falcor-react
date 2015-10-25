import React from "react";

export default function(query, config = { propsSafety: 1 }) {
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

			async call(functionPath, args, refSuffixes, thisPaths) {
				try {
					return await this.context.model.call(functionPath, args, refSuffixes, thisPaths);
				} catch (error) {
					console.log(error);
				}
			}

			async get(...pathSets) {
				try {
					return await this.context.model.get(...pathSets);
				} catch (error) {
					console.log(error);
				}
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
					const data = await this.get(...query(props));
					if (data && data.json) {
						this.setState(data.json);
					}
				} catch (error) {
					console.log(error);
				}
			}

			render() {
				return <Component {...this.props} {...this.getChildProps()} />;
			}

			async set(...pathValues) {
				try {
					return await this.context.model.set(...pathValues);
				} catch (error) {
					console.log(error);
				}
			}

		};
	};
}
