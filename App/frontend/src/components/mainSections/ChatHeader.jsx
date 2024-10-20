import React from "react";
import "./ChatHeader.css";
import CrossIconDup from "../icons/CrossIconDup.jsx";

export default function ChatHeader(currentUser) {
  if (currentUser.user.image) {
    return (
      <div
        className={`currentuserheader ${
          currentUser.mainCross === "show" ? "show1" : "hide"
        }`}
      >
        <div className="headerleft">
          <img
            src={currentUser.user.image}
            alt="PFP"
            className="currentuserimage"
            onClick={() => currentUser.setcontactCross("show3")}
          />
          <h2>{currentUser.user.userName}</h2>
        </div>
        <div className="headerright">
          <CrossIconDup
            contactCross={currentUser.contactCross}
            setcontactCross={currentUser.setcontactCross}
            mainCross={currentUser.mainCross}
            setMainCross={currentUser.setMainCross}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="currentuserheader"
        style={
          window.innerWidth < 650
            ? { display: "flex", justifyContent: "center", zIndex: "-1" }
            : { display: "flex", justifyContent: "center", zIndex: "1" }
        }
      >
        <h1>Choose user to show data</h1>
      </div>
    );
  }
}
