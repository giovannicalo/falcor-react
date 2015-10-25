/* global describe, it */

import Chai from "chai";
import Jsdom from "jsdom";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";

import FindLeaf from "./find-leaf";
import Root from "./root";

const expect = Chai.expect;

Chai.config.showDiff = true;

global.document = Jsdom.jsdom();
global.window = global.document.defaultView;

const tree = ReactTestUtils.renderIntoDocument(<Root />);

describe("Falcor", () => {
	describe("React Integration", () => {
		it("should initialize a component with data retrieved from a model", (done) => {
			setTimeout(() => {
				try {
					expect(FindLeaf(tree, "Leaf").props.data.foo.bar).to.equal("foo");
					done();
				} catch (error) {
					done(error);
				}
			});
		});
		it("should initialize a component with data retrieved from a model and collapsed on a single property", (done) => {
			setTimeout(() => {
				try {
					expect(FindLeaf(tree, "LeafSafe").props.falcor.data.foo.bar).to.equal("foo");
					done();
				} catch (error) {
					done(error);
				}
			});
		});
		it("should initialize a component with data retrieved from a model and spread on its properties", (done) => {
			setTimeout(() => {
				try {
					expect(FindLeaf(tree, "LeafUnsafe").props.foo.bar).to.equal("foo");
					done();
				} catch (error) {
					done(error);
				}
			});
		});
		it("should reinitialize a component with data retrieved from a model after receiving new properties", async(done) => {
			await FindLeaf(tree, "Root").setState({ foo: "foo" });
			setTimeout(() => {
				try {
					expect(FindLeaf(tree, "LeafWithProps").props.data.foo.foo).to.equal("bar");
					done();
				} catch (error) {
					done(error);
				}
			});
		});
	});
});
