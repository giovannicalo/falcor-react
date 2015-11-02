/* global describe, it */

import Chai from "chai";
import Jsdom from "jsdom";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";

import Extend from "../source/extend";
import FindLeaf from "./find-leaf";
import Root from "./root";
import Tree from "../source/tree";

const expect = Chai.expect;

Chai.config.showDiff = true;

global.document = Jsdom.jsdom();
global.window = global.document.defaultView;

const tree = ReactTestUtils.renderIntoDocument(<Root />);

describe("Extend", () => {
	it("should extend a destination object given a source", () => {
		expect(Extend({
			bar: "foo",
			foo: { bar: "foo" }
		}, {
			bar: "bar",
			foo: { foo: "bar" }
		})).to.deep.equal({
			bar: "bar",
			foo: { bar: "foo", foo: "bar" }
		});
	});
	it("should extend a destination object given multiple sources", () => {
		expect(Extend({
			bar: "foo",
			foo: { bar: "foo" }
		}, {
			bar: "bar",
			foo: { foo: "bar" }
		}, {
			bar: { foo: "bar" },
			foo: { bar: { foo: "bar" } }
		})).to.deep.equal({
			bar: { foo: "bar" },
			foo: { bar: { foo: "bar" }, foo: "bar" }
		});
	});
	it("should extend an empty object if the destination is not an object", () => {
		expect(Extend(null)).to.deep.equal({});
		expect(Extend("foo")).to.deep.equal({});
		expect(Extend("foo", null)).to.deep.equal({});
		expect(Extend(null, "bar")).to.deep.equal({});
		expect(Extend(null, { bar: "foo" })).to.deep.equal({ bar: "foo" });
	});
	it("should return the destination object if no source is provided", () => {
		expect(Extend({ foo: "bar" })).to.deep.equal({ foo: "bar" });
	});
});

describe("Falcor", () => {
	describe("React Integration", () => {
		it("should initialize a component with data retrieved from a model", (done) => {
			setTimeout(() => {
				try {
					expect(FindLeaf(tree, "Leaf").props.data.foo.bar[0].foo).to.equal("bar");
					done();
				} catch (error) {
					done(error);
				}
			});
		});
		it("should initialize a component with data retrieved from a model and collapsed on a single property", (done) => {
			setTimeout(() => {
				try {
					expect(FindLeaf(tree, "LeafSafe").props.falcor.data.foo.bar[0].foo).to.equal("bar");
					done();
				} catch (error) {
					done(error);
				}
			});
		});
		it("should initialize a component with data retrieved from a model and spread on its properties", (done) => {
			setTimeout(() => {
				try {
					expect(FindLeaf(tree, "LeafUnsafe").props.foo.bar[0].foo).to.equal("bar");
					done();
				} catch (error) {
					done(error);
				}
			});
		});
		it("should initialize a component with data retrieved from a model through multiple nested queries", (done) => {
			setTimeout(() => {
				try {
					expect(FindLeaf(tree, "LeafNested").props.data.foo.bar[0].foo).to.equal("bar");
					expect(FindLeaf(tree, "LeafNested").props.data.foo.bar[1].bar).to.equal("foo");
					done();
				} catch (error) {
					done(error);
				}
			});
		});
		it("should initialize a component with data retrieved from a model through multiple nested queries and collapsed on a single property", (done) => {
			setTimeout(() => {
				try {
					expect(FindLeaf(tree, "LeafNestedSafe").props.data.foo.bar[0].foo).to.equal("bar");
					expect(FindLeaf(tree, "LeafNestedSafe").props.data.foo.bar[1].bar).to.equal("foo");
					done();
				} catch (error) {
					done(error);
				}
			});
		});
		it("should initialize a component with data retrieved from a model through multiple nested queries and spread on its properties", (done) => {
			setTimeout(() => {
				try {
					expect(FindLeaf(tree, "LeafNestedUnsafe").props.data.foo.bar[0].foo).to.equal("bar");
					expect(FindLeaf(tree, "LeafNestedUnsafe").props.data.foo.bar[1].bar).to.equal("foo");
					done();
				} catch (error) {
					done(error);
				}
			});
		});
		it("should initialize a component with data retrieved from a model and retrieve even undefined variables", (done) => {
			setTimeout(() => {
				try {
					expect(FindLeaf(tree, "LeafDefinedEmpty").props.data.foo.bar[3].foo).to.equal(null);
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
					expect(FindLeaf(tree, "LeafWithProps").props.data.foo.bar[0].foo).to.equal("bar");
					done();
				} catch (error) {
					done(error);
				}
			});
		});
		it("should perform a call on the model", (done) => {
			setTimeout(() => {
				try {
					ReactTestUtils.Simulate.click(FindLeaf(tree, "LeafCall").refs.foo);
					setTimeout(() => {
						expect(FindLeaf(tree, "LeafCall").state.foo).to.equal("foo");
						done();
					});
				} catch (error) {
					done(error);
				}
			});
		});
		it("should perform a get on the model", (done) => {
			setTimeout(() => {
				try {
					ReactTestUtils.Simulate.click(FindLeaf(tree, "LeafGet").refs.foo);
					setTimeout(() => {
						expect(FindLeaf(tree, "LeafGet").state.foo).to.equal("bar");
						done();
					});
				} catch (error) {
					done(error);
				}
			});
		});
		it("should perform a set on the model", (done) => {
			setTimeout(() => {
				try {
					ReactTestUtils.Simulate.click(FindLeaf(tree, "LeafSet").refs.foo);
					setTimeout(() => {
						expect(FindLeaf(tree, "LeafSet").state.foo).to.equal("foo");
						done();
					});
				} catch (error) {
					done(error);
				}
			});
		});
	});
	describe("Tree Builder", () => {
		it("should convert paths to an empty tree", () => {
			expect(Tree([
				["bar", "foo", 1, ["bar", "foo"]],
				["bar", "foo", { length: 5 }, "bar"],
				["foo", "bar", 1, "foo"],
				["foo", "bar", 2, "bar"],
				["foo", "bar", { from: 3, to: 5 }, ["bar", "foo"]]
			])).to.deep.equal({
				bar: {
					foo: {
						0: { bar: null },
						1: { bar: null, foo: null },
						2: { bar: null },
						3: { bar: null },
						4: { bar: null }
					}
				},
				foo: {
					bar: {
						1: { foo: null },
						2: { bar: null },
						3: { bar: null, foo: null },
						4: { bar: null, foo: null },
						5: { bar: null, foo: null }
					}
				}
			});
		});
		it("should throw an error upon receiving an invalid range object", () => {
			expect(() => {
				Tree([["foo", { bar: "foo" }, "bar"]]);
			}).to.throw(Error, "Range object {\"bar\":\"foo\"} is invalid");
		});
	});
});
