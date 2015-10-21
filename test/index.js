/* global describe, it */

import Chai from "chai";
import Jsdom from "jsdom";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";

import Root from "./root";

const expect = Chai.expect;

Chai.config.showDiff = true;

global.document = Jsdom.jsdom();
global.window = global.document.defaultView;

const tree = ReactTestUtils.renderIntoDocument(<Root />);
const leaf = ReactTestUtils.findAllInRenderedTree(tree, (component) => {
	return component.constructor.name === "Leaf";
})[0];

describe("Falcor", () => {
	describe("React Integration", () => {
		it("should get data from the model and pass it down to the component", (done) => {
			setTimeout(() => {
				try {
					expect(leaf.props.model.foo.bar).to.equal("foo");
					done();
				} catch (error) {
					done(error);
				}
			});
		});
	});
});
