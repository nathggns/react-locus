import React from "react";
import ReactDOM from "react-dom";
import produce from "immer";
import uuid from "uuid/v4";

import { LocusContainer, Locus, useLocus } from "../src/react-locus";

function KeylineItem({ id, add, remove, up, down }) {
  const { position } = useLocus();

  const styles = {
    border: "1px solid",
    borderTopWidth: 1,
    borderBottomWidth: 0,
    display: "flex",
    padding: 20,

    ":last-child": {
      borderBottomWidth: 1
    },
    ":nth-child(even)": {
      backgroundColor: "#eee"
    }
  };

  return (
    <Locus.div style={styles}>
      #{position} ({id.split("-")[0]})
      <div style={{ flex: 1 }} />
      <button onClick={() => add(id)}>+</button>
      <button onClick={() => remove(id)}>-</button>
      <button onClick={() => up(id)}>▲</button>
      <button onClick={() => down(id)}>▼</button>
    </Locus.div>
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

  const up = id =>
    setItems(
      produce(items => {
        const index = items.indexOf(id);

        if (index !== 0) {
          items.splice(index - 1, 2, id, items[index - 1]);
        }
      })
    );
  const down = id =>
    setItems(
      produce(items => {
        const index = items.indexOf(id);

        if (index < items.length - 1) {
          items.splice(index, 2, items[index + 1], id);
        }
      })
    );

  return (
    <LocusContainer>
      {items.map(id => (
        <KeylineItem key={id} {...{ id, up, down, remove, add }} />
      ))}
    </LocusContainer>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
