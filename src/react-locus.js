import React from "react";

const LocusContext = React.createContext(null);

export function useLocus() {
  const locus = React.useContext(LocusContext);

  if (!locus) {
    throw new Error(`Cannot use locus outside of a <Locus> component`);
  }

  return locus;
}

function LocusItem({ children, locusData }) {
  const { position, total } = locusData;
  const first = position === 0;
  const last = position === total - 1;
  const only = first && last;
  const locus = { position, total, first, last, only };

  return (
    <LocusContext.Provider value={locus}>{children}</LocusContext.Provider>
  );
}

function Locus({ children }) {
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

export default Locus;
