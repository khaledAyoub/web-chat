import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import SearchBar from "./SearchBar.jsx";
import ChatsContainer from "./ChatsContainer.jsx";
import ChatHeader from "./ChatHeader.jsx";
import ChatMessages from "./ChatMessages.jsx";
import ContactInfo from "./ContactInfo.jsx";
import { apiClient } from "@/lib/api-client";
import {
  GET_SINGLE_CHAT,
  GET_USER_BANNER,
  GET_USER_IMAGE,
} from "@/utils/constants";

export default function Main() {
  const [currentUser, setCurrentUser] = useState({});
  const [contactCross, setcontactCross] = useState("hide");
  const [mainCross, setMainCross] = useState("hide");

  const handleOnClick = async (userName) => {
    if (currentUser !== userName) {
      try {
        // Fetch chat data
        console.log(`${GET_SINGLE_CHAT}/${userName}`);

        const response = await apiClient.post(
          `${GET_SINGLE_CHAT}/${userName}`,
          {},
          { withCredentials: true }
        );

        // Fetch user image as a Blob
        const imageResponse = await apiClient.post(
          GET_USER_IMAGE,
          { userName },
          {
            withCredentials: true,
            responseType: "blob",
          }
        );
        const image = URL.createObjectURL(imageResponse.data);

        // Fetch user banner as a Blob
        const bannerResponse = await apiClient.post(
          GET_USER_BANNER,
          { userName },
          {
            withCredentials: true,
            responseType: "blob",
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
        <ChatsContainer
          changeUser={handleOnClick}
          user={currentUser}
          setMainCross={setMainCross}
        />
        <ChatHeader
          user={currentUser}
          contactCross={contactCross}
          setcontactCross={setcontactCross}
          mainCross={mainCross}
          setMainCross={setMainCross}
        />
        <ChatMessages
          mainCross={mainCross}
          user={currentUser}
          contactCross={contactCross}
          setcontactCross={setcontactCross}
        />
        <ContactInfo
          user={currentUser}
          contactCross={contactCross}
          setcontactCross={setcontactCross}
        />
      </main>
    </div>
  );
}
