import React from "react";
import RightIcon from "../icons/RightIcon.jsx";
import "./typing.css";
export default function MessageCard({ content, time, direction, typeMessage }) {
  const classes =
    direction == "right" ? "message recivemessage" : "message sendmessage";
  if (typeMessage) {
    return (
      <div className={classes}>
        <div className="bounce-text">
          <span>T</span>
          <span>y</span>
          <span>p</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
        <div className="status">
          <RightIcon />
        </div>
      </div>
    );
  }
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
