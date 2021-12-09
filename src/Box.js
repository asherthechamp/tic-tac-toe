import React from "react";

function Box(props) {
  return (
    <div onClick={props.onClick} className="box">
      {props.value}
    </div>
  );
}

export default Box;
