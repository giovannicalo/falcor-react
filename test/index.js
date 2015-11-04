/* global describe, it */

import Chai from "chai";
import ChaiAsPromised from "chai-as-promised";
import Jsdom from "jsdom";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";

import ArraySyntax from "../source/array-syntax";
import Extend from "../source/extend";
import FindLeaf from "./find-leaf";
import Root from "./root";
import Tree from "../source/tree";

Chai.config.showDiff = true;
Chai.use(ChaiAsPromised);

const expect = Chai.expect;

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
		describe("Initialization Query", () => {
			describe("Array Syntax and Property Safety", () => {
				it("should initialize a component with data retrieved from a model", () => {
					expect(FindLeaf(tree, "Leaf").props.data.foo.bar[0].foo).to.equal("bar");
				});
				it("should initialize a component with data retrieved from a model and collapsed on a single property", () => {
					expect(FindLeaf(tree, "LeafSafe").props.falcor.data.foo.bar[0].foo).to.equal("bar");
				});
				it("should initialize a component with data retrieved from a model and spread on its properties", () => {
					expect(FindLeaf(tree, "LeafUnsafe").props.foo.bar[0].foo).to.equal("bar");
				});
			});
			describe("Graph Syntax", () => {
				it("should initialize a component with data retrieved from a model using graph syntax", () => {
					expect(FindLeaf(tree, "LeafGraph").props.data.foo.bar[0].foo).to.equal("bar");
				});
			});
			describe("Path Syntax", () => {
				it("should initialize a component with data retrieved from a model using path syntax", () => {
					expect(FindLeaf(tree, "LeafPath").props.data.foo.bar[0].foo).to.equal("bar");
				});
				it("should initialize a component with data retrieved from a model using path syntax and multiple paths", () => {
					expect(FindLeaf(tree, "LeafPathArray").props.data.foo.bar[0].foo).to.equal("bar");
				});
			});
			describe("Nested", () => {
				it("should initialize a component with data retrieved from a model through multiple nested queries", () => {
					expect(FindLeaf(tree, "LeafNested").props.data.foo.bar[0].foo).to.equal("bar");
					expect(FindLeaf(tree, "LeafNested").props.data.foo.bar[1].bar).to.equal("foo");
				});
				it("should initialize a component with data retrieved from a model through multiple nested queries and collapsed on a single property", () => {
					expect(FindLeaf(tree, "LeafNestedSafe").props.data.foo.bar[0].foo).to.equal("bar");
					expect(FindLeaf(tree, "LeafNestedSafe").props.data.foo.bar[1].bar).to.equal("foo");
				});
				it("should initialize a component with data retrieved from a model through multiple nested queries and spread on its properties", () => {
					expect(FindLeaf(tree, "LeafNestedUnsafe").props.data.foo.bar[0].foo).to.equal("bar");
					expect(FindLeaf(tree, "LeafNestedUnsafe").props.data.foo.bar[1].bar).to.equal("foo");
				});
			});
			describe("Defined Empty", () => {
				it("should initialize a component with data retrieved from a model and retrieve even undefined variables", () => {
					expect(FindLeaf(tree, "LeafDefinedEmpty").props.data.foo.bar[3].foo).to.equal(null);
				});
			});
			describe("Reinitialization", () => {
				it("should reinitialize a component with data retrieved from a model after receiving new properties", async(done) => {
					try {
						await FindLeaf(tree, "Root").setState({ foo: "foo" });
						setTimeout(() => {
							expect(FindLeaf(tree, "LeafWithProps").props.data.foo.bar[0].foo).to.equal("bar");
							done();
						});
					} catch (error) {
						done(error);
					}
				});
			});
			describe("Error", () => {
				it("should try to initialize a component with data retrieved from a model and throw an error", async() => {
					return expect(FindLeaf(tree, "LeafError").props.reinitialize()).to.be.rejectedWith(Error, "Error: unquoted indexers must be numeric. -- foo[bar");
				});
			});
		});
		describe("Falcor methods", () => {
			it("should perform a call on the model", (done) => {
				ReactTestUtils.Simulate.click(FindLeaf(tree, "LeafCall").refs.foo);
				setTimeout(() => {
					expect(FindLeaf(tree, "LeafCall").state.foo).to.equal("foo");
					done();
				});
			});
			it("should perform a get on the model", (done) => {
				ReactTestUtils.Simulate.click(FindLeaf(tree, "LeafGet").refs.foo);
				setTimeout(() => {
					expect(FindLeaf(tree, "LeafGet").state.foo).to.equal("bar");
					done();
				});
			});
			it("should perform a set on the model", (done) => {
				ReactTestUtils.Simulate.click(FindLeaf(tree, "LeafSet").refs.foo);
				setTimeout(() => {
					expect(FindLeaf(tree, "LeafSet").state.foo).to.equal("foo");
					done();
				});
			});
		});
	});
	describe("Array Syntax Converter", () => {
		it("should return null when given an invalid input", () => {
			expect(ArraySyntax(null)).to.equal(null);
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
