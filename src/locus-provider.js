import React, { useCallback, useMemo, useState } from "react";
import produce from "immer";

export const LocusProviderContext = React.createContext(null);

function LocusProvider({ children }) {
  const [items, setItems] = useState([]);

  const register = useCallback(
    ref => {
      setItems(
        produce(items => {
          if (!items.includes(ref)) {
            items.push(ref);
          }
        })
      );
    },
    [setItems]
  );

  const unregister = useCallback(
    ref => {
      setItems(items => items.filter(item => item !== ref));
    },
    [setItems]
  );

  const value = useMemo(() => ({ register, unregister, items }), [
    register,
    unregister,
    items
  ]);

  return (
    <LocusProviderContext.Provider value={value}>
      {children}
    </LocusProviderContext.Provider>
  );
}

export default LocusProvider;
