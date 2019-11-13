import React from "react";

function Flash(props) {
  return <div className={`notification slide-in ${props.type}`}>{props.message}</div>
}

export default Flash;













