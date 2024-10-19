import React from "react";
import { useNavigate } from "react-router-dom";

const MessagesIcon = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chat");
  };

  return (
    <svg
      onClick={handleClick}
      className="icon"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 39C30.941 39 39 30.941 39 21C39 11.0589 30.941 3 21 3C11.0589 3 3 11.0589 3 21C3 23.8795 3.67612 26.6009 4.87823 29.0145C5.19769 29.6558 5.30402 30.389 5.11882 31.0811L4.04672 35.0881C3.58131 36.8274 5.17262 38.4186 6.91203 37.9533L10.9189 36.8812C11.6111 36.696 12.3442 36.8024 12.9856 37.1217C15.3991 38.3239 18.1205 39 21 39Z"
        stroke="white"
        strokeWidth={5}
      />
      <path
        opacity="0.5"
        d="M13.8 21H13.8162M20.9838 21H21M28.1839 21H28.2001"
        stroke="white"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MessagesIcon;
