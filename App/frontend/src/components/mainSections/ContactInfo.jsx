import CrossIcon from "../icons/CrossIcon.jsx";
import "./ContactInfo.css";

import React from "react";

export default function ContactInfo(currentUser) {
  try {
    const data = currentUser.user.data.user;

    return (
      <div className={`contactinfo ${currentUser.contactCross}`}>
        <img src={currentUser.user.banner} alt="Banner" className="banner" />
        <div className="pfpnameabout">
          <img
            src={currentUser.user.image}
            alt="PFP"
            className="contactinfoimage"
          />
          <h2>{data.userName}</h2>
          <h4>{data.about}</h4>
        </div>
        <div className="contactpersonalinfo">
          <h3>Email</h3>
          <p>{data.email}</p>
          {data.phone != "" && (
            <>
              <h3>Phone</h3>
              <p>{data.phone}</p>
            </>
          )}
        </div>
        <div className="media">
          <h2>Media</h2>
          <div className="mediacard">
            <h3>Photos</h3>
            <p>10</p>
          </div>
          <div className="mediacard">
            <h3>Videos</h3>
            <p>10</p>
          </div>
          <div className="mediacard">
            <h3>Documents</h3>
            <p>10</p>
          </div>
        </div>
        <button className="blockbtn">Block</button>
        <CrossIcon
          setcontactCross={currentUser.setcontactCross}
          contactCross={currentUser.contactCross}
        />
      </div>
    );
  } catch (err) {
    return (
      <div
        className="contactinfo"
        style={{
          display: "felx",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "white" }}>Choose chat to show data</h1>
      </div>
    );
  }
}
