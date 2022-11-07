# use-mst-immer

A mobx-state-tree powered [use-immer](https://github.com/immerjs/use-immer).

# Installation

`npm install mobx mobx-state-tree use-mst-immer`

# Usage

## useMstImmer

```javascript
import React from 'react';
import { useMstImmer } from 'use-mst-immer';

function App() {
  const [person, updatePerson] = useMstImmer({
    name: "Kim",
    age: 37,
    dogs: types.array(types.model({ name: types.string }))
  });

  function updateName(name: string) {
    updatePerson((state) => {
      state.name = name;
    });
  }

  function becomeOlder() {
    updatePerson((state) => {
      state.age++;
    });
  }

  return (
    <div className="App">
      <h1>
        Hello {person.name} ({person.age}) with {person.dogs.length} dogs
      </h1>
      <h3>
        <span>Dogs: </span>
        {person.dogs.map((dog, index) => (
          <span key={index}>{dog.name} </span>
        ))}
      </h3>
      <input
        onChange={(e) => {
          updateName(e.target.value);
        }}
        value={person.name}
      />
      <br />
      <button onClick={becomeOlder}>Older</button>
      <br />
      <input
        placeholder={"Add dog (press enter)"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updatePerson((state) => {
              state.dogs.push({ name: e.currentTarget.value });
            });
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
```