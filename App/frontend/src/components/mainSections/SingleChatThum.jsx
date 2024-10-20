import React from "react";
import "./SingleChatThum.css";
import imag from "../../assets/log.png";

export default function SingleChatThum({
  selected = false,
  image = imag,
  userName,
  about,
  missedMessages,
  changeUser,
  setMainCross,
}) {
  // Corrected classes assignment
  const classes = selected == "true" ? "singlechat selectedchat" : "singlechat";

  return (
    <div
      className={classes}
      onClick={() => {
        setMainCross("show");
        changeUser(userName);
      }}
    >
      <img src={image} alt="Profile" className="chatimage" />
      <div className="chatinfo">
        <h2>{userName}</h2>
        <p>{about}</p>
      </div>
      {missedMessages > 0 && (
        <h3 className="missedmessages">{missedMessages}</h3>
      )}
    </div>
  );
}
