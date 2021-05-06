import React from "react";
import Terminal from "./Terminal";
import "./App.css";

const App = () => (
  <Terminal
    onInput={(value, puts, clear) => {
      const args = value.split(" ");
      if (args.length > 0) {
        switch (args[0]) {
          case "clear":
            clear();
            break;
          case "help":
            puts(`Hi, everyone!!!
            \tHow are you?`);
            break;
          default:
            puts(`${args[0]}: command not found`);
        }
      }
    }}
  />
);

export default App;
