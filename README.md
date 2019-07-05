# react-locus (EXPERIMENTAL)

**This is an extremely experimental library. Do not use it in your projects. It
is unstable, untested, and the performance is known to be terrible. Please, do
not use this tool.**

`react-locus` provides contextual information about your React components and
their location in relation to its siblings.

You can use it to emulate the CSS selectors `:first-child`, `:nth-child`, and
`:last-child` in a platform agnostic way (if you're targeting both web and
`react-native`)

## Usage

`react-locus` works by tracking which sibling tree you're in compared to the
nearest `LocusContainer`. You must wrap any components making use of
`react-locus` in a `LocusContainer`.

`react-locus` provides a general `useLocus` hook which provides information
about where in the tree the current component is.

That information looks as follows

```ts
{
  position: number; // your position in the sibling list, starting at 0
  total: number; // the total number of elements in the sibling list
  first: boolean; // is this the first element in the sibling list
  last: boolean; // is this the last element in the sibling list
  only: boolean; // is this the only element in the sibling list
}
```

However, you may not even need to use the hook provided you're only applying
styles, as we provide a `withLocus` function to wrap your component so that
styles automatically resolve css selectors based on position.

We also provide some pre-wrapped components including `Locus.div`.

```js
import { Locus, LocusContainer } from "react-locus";

function Item() {
  return (
    <Locus
      style={{
        ":nth-child(2n+1)": {
          backgroundColor: "#eee"
        }
      }}
    >
      Item
    </Locus>
  );
}

function Items() {
  return (
    <LocusContainer>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </LocusContainer>
  );
}
```
