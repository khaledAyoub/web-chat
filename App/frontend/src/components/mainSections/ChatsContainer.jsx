import "./ChatsContainer.css";
import React, { useEffect, useState } from "react";
import SingleChatThum from "./SingleChatThum.jsx";
import axios from "axios";
import { apiClient } from "@/lib/api-client";
import { GET_PEOPLE, GET_USER_IMAGE } from "@/utils/constants";

const req = async () => {
  const response = await apiClient.get(GET_PEOPLE, {
    withCredentials: true, // Include cookies in the request
  });
  return response.data.friends; // Return friends data
};

// Function to fetch user image
const fetchUserImage = async (userName) => {
  const imageResponse = await apiClient.post(
    GET_USER_IMAGE,
    { userName },
    {
      withCredentials: true,
      responseType: "blob",
    }
  );
  return URL.createObjectURL(imageResponse.data); // Convert blob to object URL
};

export default function ChatsContainer({ changeUser, user, setMainCross }) {
  const [chats, setChats] = useState([]); // State to hold the chat data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatData = await req(); // Fetch the chat data
        // Fetch images for each chat
        const chatsWithImages = await Promise.all(
          chatData.map(async (chat) => {
            const image = await fetchUserImage(chat.userName); // Fetch the image for each chat
            return { ...chat, image }; // Return chat data along with the image
          })
        );
        setChats(chatsWithImages); // Update state with the fetched data
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchChats(); // Call the fetch function
  }, [user]); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Render loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Render error state
  }

  return (
    <div className="chatcontainer">
      {chats.map((chat) => {
        return (
          <SingleChatThum
            changeUser={changeUser}
            key={chat._id}
            selected={chat.selected ? "true" : "false"}
            image={chat.image} // Use the fetched image for the chat
            userName={chat.userName}
            about={chat.about}
            missedMessages={chat.missedMessages || 0} // Default to 0 if not available
            setMainCross={setMainCross}
          />
        );
      })}
    </div>
  );
}
