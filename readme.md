# Falcor React <br /> [![Build Status](https://travis-ci.org/giovannicalo/falcor-react.svg?branch=master)](https://travis-ci.org/giovannicalo/falcor-react) [![Coverage Status](https://coveralls.io/repos/giovannicalo/falcor-react/badge.svg?branch=master&service=github)](https://coveralls.io/github/giovannicalo/falcor-react?branch=master)

[Falcor](https://github.com/Netflix/falcor) integration for [React](https://github.com/facebook/react).

## Installation

```
npm install falcor-react
```

## Usage

### Initializing the Falcor model

In order to use Falcor in your components, you must decorate the root component of your application (or anyway one that contains all those where you want to use Falcor) with the `Root` decorator.

```
import FalcorReact from "falcor-react";
...
@FalcorReact.Root(model)
class Foo extends React.Component {
	...
}
```

The `Root` decorator takes exactly one argument, an object, that will be passed as is to the `Falcor.Model` constructor as a configuration object.

### Initializing a component

Each component where you intend to use Falcor must be decorated with the `Leaf` decorator.

```
import FalcorReact from "falcor-react";
...
@FalcorReact.Leaf(query)
export default class Foo extends React.Component {
	...
}
```

The `Leaf` decorator takes two arguments, both optional.

The first is an initialization query and it must be either a string...

```
@FalcorReact.Leaf("foo { bar }")
```

... or an array...

```
@FalcorReact.Leaf(["foo", "bar"])
```

... or a function taking the component's props as a parameter and returning either a string or an array.

```
@FalcorReact.Leaf((props) => {
	return `foo(id: ${props.id}) { bar { foo } }`;
})
```

You can also initialize a component without a query...

```
@FalcorReact.Leaf()
```

... and nest queries (e.g. if you need to retrieve data in multiple steps).

```
@FalcorReact.Leaf("foo { bar }")
@FalcorReact.Leaf((props) => {
	return `bar(id: ${props.data.foo.bar}) { foo }`;
})
```

The data retrieved through Falcor will then be available to the decorated component as `this.props.data`.

The regular Falcor methods will also be available as `this.props.call`, `this.props.get` and `this.props.set`.

An additional method, `this.props.reinitialize` will also be available and force the initialization query to be run again when invoked.

The second argument of the `Leaf` decorator is an optional configuration object that slightly changes the behavior of the decorator.

It currently supports two options:

* `defineEmpty` (`boolean`, defaults to `false`): when set to `true`, an empty tree with the same shape as the one returned by Falcor with the given initialization query will always be available to the wrapped component, regardless of the result of the query. Its leaves will have `null` value when no data is available.

* `propsSafety` (`number`, defaults to `1`): changes the properties passed to the decorated component as follows, thus either providing shorthands or avoiding conflicts:

	* `0` (or less): `call`, `falcor`, `get`, `reinitialize`, `set`, plus one per root element of your query, e.g. the query `foo { bar }` will add `foo` to the list.

	* `1`: `call`, `data` (containing root elements), `falcor`, `get`, `reinitialize`, `set`.

	* `2` (or more): `falcor` (containing all the properties above).

#### Supported Query Syntaxes

The following syntaxes are supported out of the box as query languages and allow for either one or multiple paths to be requested.

* [Graph](https://github.com/giovannicalo/falcor-graph-syntax)
```
"foo { bar(id: 1) { foo } }"
```
```
"foo { bar(id: 1) { foo } }, bar(index: 0) { foo }"
```

* [Path](https://github.com/Netflix/falcor-path-syntax)
```
"foo.bar[1].foo"
```
```
["foo.bar[1].foo", "bar[0].foo"]
```

* Array
```
["foo", "bar", 1, "foo"]
```
```
[["foo", "bar", 1, "foo"], ["bar", 0, "foo"]]
```
