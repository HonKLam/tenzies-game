import React from "react";

export default function Dice({ value, saveValue, id, style }) {
  return (
    <button className="die" onClick={() => saveValue(id)} style={style}>
      {value}
    </button>
  );
}
