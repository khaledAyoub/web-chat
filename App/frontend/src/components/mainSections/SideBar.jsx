import React from "react";
import Logo from "../icons/Logo.jsx";
import MessagesIcon from "../icons/MessagesIcon.jsx";
import GroupsIcon from "../icons/GroupsIcon.jsx";
import PhoneIcon from "../icons/PhoneIcon.jsx";

import "./SideBar.css";
import SettingIcon from "../icons/SettingIcon.jsx";
import LogOutIcon from "../icons/LogOutIcon.jsx";

const Sidebar = () => (
  <div className="sidebar">
    <Logo />
    <div className="icons">
      <div className="groupone">
        <MessagesIcon />
        <GroupsIcon />
        <PhoneIcon />
      </div>
      <div className="grouptwo">
        <SettingIcon />
        <LogOutIcon />
      </div>
    </div>
  </div>
);

export default Sidebar;
