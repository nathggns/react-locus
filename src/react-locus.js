import React from "react";
import resolveStyles from "./locusStyleResolver";

const LocusContext = React.createContext(null);

function useLocus({ style } = {}) {
  let locus = React.useContext(LocusContext);

  if (!locus) {
    throw new Error(`Cannot use locus outside of a <Locus> component`);
  }

  if (style) {
    locus = { locus, style: resolveStyles(style, locus) };
  }

  return locus;
}

function LocusItem({ children, locusData }) {
  const { position, total } = locusData;
  const first = position === 0;
  const last = position === total - 1;
  const only = first && last;
  const locus = { position, total, first, last, only };
  const child = React.Children.only(children);

  return <LocusContext.Provider value={locus}>{child}</LocusContext.Provider>;
}

function LocusContainer({ children }) {
  const childArr = React.Children.toArray(children);
  const mappedChildren = childArr.map((child, idx) => (
    <LocusItem
      key={idx}
      locusData={{
        position: idx,
        total: childArr.length
      }}
    >
      {child}
    </LocusItem>
  ));

  return <>{mappedChildren}</>;
}

function withLocus(wrapped) {
  function LocusElement({ as = wrapped, style, children, ...props }) {
    const locus = useLocus({ style });
    const Component = as;

    return (
      <Component {...props} style={locus.style}>
        {children}
      </Component>
    );
  }

  LocusElement.displayName = `locus.${
    wrapped.displayName || wrapped.name || typeof wrapped === "string"
      ? wrapped
      : "unknown"
  }`;

  return LocusElement;
}

const Locus = {
  div: withLocus("div"),
  span: withLocus("span"),
  p: withLocus("p")
};

export { useLocus, Locus, LocusContainer };

export default useLocus;
