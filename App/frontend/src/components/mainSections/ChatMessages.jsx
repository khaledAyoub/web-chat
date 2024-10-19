import React, { useEffect, useState, useRef } from "react";
import "./ChatMessages.css";
import MessageCard from "./MessageCard.jsx";
import PaperClipIcon from "../icons/PaperClipIcon.jsx";
import SendIcon from "../icons/SendIcon.jsx";
import AttatchIcon from "../icons/AttatchIcon.jsx";
import axios from "axios";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8747", {
  query: {
    myID: localStorage.getItem("myID"),
  },
});

export default function ChatMessages({ user, setCross }) {
  useEffect(() => {
    socket.emit("sendInfo", {
      query: {
        myID: localStorage.getItem("myID"),
      },
    });
  }, [localStorage.getItem("myID")]);
  // for getting chat text input
  const [inputValue, setInputValue] = useState("");
  // for storing the messages and update them and initial them from user
  const [messages, setMessages] = useState(user?.data?.messages || []);

  // Safely destructure to prevent errors
  const data = user?.data?.user;
  const chatID = user?.data?.chatID;

  // Ref for the messages container
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("render", (socket) => {
      if (socket.query.chatID == chatID) {
        setMessages((prevMessages) => [...prevMessages, socket.query.message]);
      }
    });
    return () => {
      socket.off("render");
    };
  }, [chatID]);

  // Rerender when you chage the user you talking to
  useEffect(() => {
    setMessages(user?.data?.messages || []);
  }, [user?.data?.messages]);

  // Scroll to bottom whenever messages change will run every time messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  const send = async () => {
    if (!inputValue) {
      console.log("Message can't be empty");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8747/api/main/sendMessage",
        { content: inputValue, chatID },
        { withCredentials: true }
      );

      if (response.data && response.data.message) {
        setMessages((prevMessages) => [...prevMessages, response.data.message]);
      }

      socket.emit("sendMessage", {
        query: {
          userID: user.data.userID,
          chatID,
          message: response.data.message,
        },
      });

      setInputValue("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // If user data is not available, show the placeholder
  if (!data) {
    return (
      <div className="currentusermain">
        <div
          className="messagesPart"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1
            style={{ color: "white", fontSize: "1.2rem", textAlign: "center" }}
          >
            Select a User to start chatting
          </h1>
        </div>
        <div className="messagesending" style={{ pointerEvents: "none" }}>
          <PaperClipIcon />
          <input type="text" placeholder="Message" className="messageinput" />
          <SendIcon />
          <AttatchIcon />
        </div>
      </div>
    );
  }

  return (
    <div
      className="currentusermain"
      onClick={() => {
        setCross("hide");
      }}
    >
      <div className="messagesPart">
        {messages.map((message) => {
          return (
            <MessageCard
              key={message._id}
              direction={
                message.senderId === user.data.userID ? "left" : "right"
              }
              time={new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              content={message.content}
              sent={message.sent}
              seen={message.seen}
            />
          );
        })}
        <div ref={messagesEndRef} /> {/* Empty div to act as scroll target */}
      </div>

      <div className="messagesending">
        <PaperClipIcon />
        <input
          type="text"
          placeholder="Message"
          className="messageinput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              send();
            }
          }}
        />
        <SendIcon clickHandler={send} />
        <AttatchIcon />
      </div>
    </div>
  );
}
