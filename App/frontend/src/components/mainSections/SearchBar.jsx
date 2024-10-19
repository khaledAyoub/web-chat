import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "../icons/SearchIcon.jsx";
import { toast } from "sonner";
import axios from "axios";

export default function SearchBar({ changeUser }) {
  const [searchUser, setSearchUser] = useState("");

  const handleClick = async () => {
    if (!searchUser) {
      toast.error("Input is Empty");
      return; // Prevent further execution if input is empty
    }

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/main/getSingleChat/${searchUser}`,
        {},
        { withCredentials: true }
      );

      // Check if the user is found in the response
      if (response.data && response.data.user) {
        console.log(response.data.user.userName);
        changeUser(response.data.user.userName);
      } else {
        toast.error("User Not Found");
      }
    } catch (error) {
      toast.error("User Not Found");
    } finally {
      setSearchUser(""); // Clear the input field
    }
  };

  return (
    <div className="searchbar">
      {/* search input */}
      <input
        type="text"
        placeholder="Search for users"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      />
      <SearchIcon handleClick={handleClick} />
    </div>
  );
}
