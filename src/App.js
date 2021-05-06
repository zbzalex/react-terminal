import React from "react";
import Terminal from "./Terminal";
import "./App.css";
import pkg from "../package.json";

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
            puts(`Help:
------------------------------
Command         Description
clear           To clear terminal
help            To read help
version         To see terminal current version
------------------------------`);
            break;
          case "version":
            puts(`Terminal version: ${pkg.version}`);
            break;
          default:
            puts(`${args[0]}: command not found`);
        }
      }
    }}
  />
);

export default App;
