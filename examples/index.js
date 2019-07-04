import React from "react";
import ReactDOM from "react-dom";
import produce from "immer";
import uuid from "uuid/v4";

import { useLocus, LocusProvider } from "../src/react-locus";

function KeylineItem({ id, add, remove }) {
  const { ready, position, last } = useLocus();

  return (
    ready && (
      <div
        style={{
          border: "1px solid",
          borderTopWidth: 1,
          borderBottomWidth: last ? 1 : 0,
          display: "flex",
          padding: 20
        }}
      >
        #{position} ({id.split("-")[0]})
        <div style={{ flex: 1 }} />
        <button onClick={() => add(id)}>+</button>
        <button onClick={() => remove(id)}>-</button>
      </div>
    )
  );
}

function App() {
  const [items, setItems] = React.useState(() =>
    new Array(3).fill(0).map(() => uuid())
  );

  const add = id => {
    setItems(
      produce(draft => {
        draft.splice(draft.indexOf(id) + 1, 0, uuid());
      })
    );
  };

  const remove = id => setItems(items => items.filter(item => item !== id));

  return (
    <LocusProvider>
      {items.map((id, idx) => (
        <KeylineItem key={idx} id={id} remove={remove} add={add} />
      ))}
    </LocusProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
