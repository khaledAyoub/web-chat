import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import SearchBar from "./SearchBar.jsx";
import ChatsContainer from "./ChatsContainer.jsx";
import ChatHeader from "./ChatHeader.jsx";
import ChatMessages from "./ChatMessages.jsx";
import ContactInfo from "./ContactInfo.jsx";

export default function Main() {
  const [currentUser, setCurrentUser] = useState({});
  const [cross, setCross] = useState("hide");

  const handleOnClick = async (userName) => {
    if (currentUser !== userName) {
      try {
        // Fetch chat data
        const response = await axios.post(
          `http://localhost:8747/api/main/getSingleChat/${userName}`,
          {},
          { withCredentials: true }
        );

        // Fetch user image as a Blob
        const imageResponse = await axios.post(
          `http://localhost:8747/api/main/getUserImage`,
          { userName },
          {
            withCredentials: true,
            responseType: "blob", // Important for receiving binary data
          }
        );
        const image = URL.createObjectURL(imageResponse.data);

        // Fetch user banner as a Blob
        const bannerResponse = await axios.post(
          `http://localhost:8747/api/main/getUserBanner`,
          { userName },
          {
            withCredentials: true,
            responseType: "blob", // Important for receiving binary data
          }
        );
        const banner = URL.createObjectURL(bannerResponse.data);

        // Log and set state with response data
        setCurrentUser({
          data: response.data,
          userName,
          image,
          banner,
        });
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    }
  };

  return (
    <div className="body">
      <main>
        <SideBar />
        <SearchBar changeUser={handleOnClick} />
        <ChatsContainer changeUser={handleOnClick} user={currentUser} />
        <ChatHeader user={currentUser} cross={cross} setCross={setCross} />
        <ChatMessages user={currentUser} cross={cross} setCross={setCross} />
        <ContactInfo user={currentUser} cross={cross} setCross={setCross} />
      </main>
    </div>
  );
}
