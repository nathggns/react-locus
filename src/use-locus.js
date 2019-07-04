import React, { useContext, useEffect, useState } from "react";
import uuid from "uuid/v4";

import { LocusProviderContext } from "./locus-provider";

function useLocus() {
  const [ref] = useState(uuid);
  const [ready, setReady] = useState(null);
  const contextValue = useContext(LocusProviderContext);

  if (!contextValue) {
    throw new Error("Cannot use `useLocus` outside of a `LocusProvider`");
  }

  const { register, unregister, items } = contextValue;

  useEffect(() => {
    register(ref);
    setReady(true);

    return () => {
      unregister(ref);
      setReady(false);
    };
  }, [ref, setReady, register, unregister]);

  const position = items.indexOf(ref);
  const total = items.length;
  const first = position === 0;
  const last = position === total - 1;
  const only = first && last;

  return { ready, position, total, first, last, only };
}

export default useLocus;
