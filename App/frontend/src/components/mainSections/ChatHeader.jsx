import React from "react";
import "./ChatHeader.css";

export default function ChatHeader(currentUser) {
  if (currentUser.user.image) {
    return (
      <div
        className={`currentuserheader ${
          currentUser.cross == "show"
            ? window.width < 1250
              ? "hide"
              : "show"
            : ""
        }`}
      >
        <div className="headerleft">
          <img
            src={currentUser.user.image}
            alt="PFP"
            className="currentuserimage"
            onClick={() => currentUser.setCross("show")}
          />
          <h2>{currentUser.user.userName}</h2>
        </div>
        <div className="headerright"></div>
      </div>
    );
  } else {
    return (
      <div
        className="currentuserheader"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h1>Choose user to show data</h1>
      </div>
    );
  }
}
