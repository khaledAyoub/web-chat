import React from "react";

export const SearchIcon = (props) => {
  return (
    <svg
      onClick={props.handleClick}
      className="searchicon"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5945 20.5824L30 30M23.7778 12.8889C23.7778 18.9027 18.9027 23.7778 12.8889 23.7778C6.87513 23.7778 2 18.9027 2 12.8889C2 6.87513 6.87513 2 12.8889 2C18.9027 2 23.7778 6.87513 23.7778 12.8889Z"
        stroke="#AAAAAA"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
