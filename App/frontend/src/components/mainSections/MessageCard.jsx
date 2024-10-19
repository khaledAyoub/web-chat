import React from "react";
import RightIcon from "../icons/RightIcon.jsx";

export default function MessageCard({ content, time, direction }) {
  const classes =
    direction == "right" ? "message recivemessage" : "message sendmessage";
  return (
    <div className={classes}>
      <p className="messagecontent">{content}</p>
      <div className="status">
        <p className="time">{time}</p>
        <RightIcon />
      </div>
    </div>
  );
}
