import React from "react";

const toDatetimeLocal = function(datetime) {
  let now = datetime ? new Date(datetime) : new Date();

  const year = now.getFullYear();
  const month =
    now.getMonth().toString().length === 1 && now.getMonth() !== 9
      ? "0" + (now.getMonth() + 1).toString()
      : now.getMonth() + 1;
  const date =
    now.getDate().toString().length === 1
      ? "0" + now.getDate().toString()
      : now.getDate();
  const hours =
    now.getHours().toString().length === 1
      ? "0" + now.getHours().toString()
      : now.getHours();
  const minutes =
    now.getMinutes().toString().length === 1
      ? "0" + now.getMinutes().toString()
      : now.getMinutes();

  const formattedDateTime =
    year + "-" + month + "-" + date + "T" + hours + ":" + minutes;

  return formattedDateTime;
};

const getHighlightedText = function(text, higlight) {
  let parts = text.split(new RegExp(`(${higlight})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === higlight.toLowerCase()
              ? { color: "red" }
              : {}
          }>
          {part}
        </span>
      ))}{" "}
    </span>
  );
};

export { toDatetimeLocal, getHighlightedText };
