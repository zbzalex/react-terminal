import React, { useState, useEffect } from "react";
import "./Terminal.css";

const parseText = (text) => {
  text = text.replace(/\n/g, "<br />");
  text = text.replace(/\t/g, "&nbsp;&nbsp;");
  text = text.replace(/</g, "&lt;");
  text = text.replace(/>/g, "&gt;");
  return text;
};

const Terminal = (props) => {
  const [history, setHistory] = useState([]);
  const [value, setValue] = useState("");
  const [prompt, setPrompt] = useState(
    props.prompt ? props.prompt : "root@localhost"
  );

  const [cursor, setCursor] = useState(props.cursor ? props.cursor : "_");
  const [cursorPosition, setCursorPosition] = useState(0);

  const puts = (value, prompt) => {
    var tmp = history;
    tmp.push({
      value,
      prompt
    });
    setHistory(tmp);
  };

  const clear = () => {
    setHistory([]);
  };

  const onInput = props.onInput ? props.onInput : (value, puts, clear) => {};

  document.onkeydown = (event) => {
    if (event.keyCode === 8 && cursorPosition > 0) {
      setValue(
        cursorPosition < value.length
          ? value.substr(0, Math.max(0, cursorPosition - 1)) +
              value.substr(cursorPosition)
          : value.substr(0, Math.max(0, value.length - 1))
      );
      setCursorPosition(cursorPosition - 1);
    } else if (event.keyCode === 13) {
      if (value.trim().length > 0) {
        if (history.length >= 10) {
          clear();
        }

        puts(value, prompt);
        onInput(value, puts, clear);
        setValue("");
        setCursorPosition(0);
      }
    } else {
      if (
        (event.keyCode >= 65 && event.keyCode <= 90) ||
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        event.keyCode === 32 ||
        event.keyCode === 192 ||
        event.keyCode === 189 ||
        event.keyCode === 187 ||
        event.keyCode === 219 ||
        event.keyCode === 221 ||
        event.keyCode === 191 ||
        event.keyCode === 190 || // >
        event.keyCode === 188 || // <
        event.keyCode === 186 ||
        event.keyCode === 222 ||
        event.keyCode === 220
      ) {
        setValue(
          cursorPosition < value.length
            ? value.substr(0, cursorPosition) +
                event.key +
                value.substr(cursorPosition)
            : value + event.key
        );

        setCursorPosition(cursorPosition + 1);
      } else if (event.keyCode === 37 && cursorPosition > 0) {
        setCursorPosition(cursorPosition - 1);
      } else if (event.keyCode === 39 && cursorPosition < value.length) {
        setCursorPosition(cursorPosition + 1);
      }
    }
  };

  return (
    <div className="Terminal">
      {history &&
        history.map((item, index) => (
          <div className="Terminal__Line" key={index}>
            {item.prompt ? (
              <span>
                <span className="Terminal__Line-prompt">{item.prompt}</span>
                <span> $ </span>
              </span>
            ) : (
              ""
            )}
            <span
              dangerouslySetInnerHTML={{
                __html: parseText(item.value)
              }}
            ></span>
          </div>
        ))}

      <div className="Terminal__Line">
        <span className="Terminal__Line-prompt">{prompt}</span>
        <span> $ </span>
        <span>
          {cursorPosition < value.length
            ? value.substr(0, cursorPosition)
            : value}
        </span>
        <span>{cursor}</span>
        {cursorPosition < value.length ? value.substr(cursorPosition) : null}
      </div>
    </div>
  );
};

export default Terminal;
