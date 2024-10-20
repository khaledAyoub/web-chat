import React, { useEffect, useState, useRef } from "react";
import "./ChatMessages.css";
import MessageCard from "./MessageCard.jsx";
import PaperClipIcon from "../icons/PaperClipIcon.jsx";
import SendIcon from "../icons/SendIcon.jsx";
import AttatchIcon from "../icons/AttatchIcon.jsx";
import axios from "axios";
import io from "socket.io-client";

var time;

const socket = io.connect("http://localhost:8747", {
  query: {
    myID: localStorage.getItem("myID"),
  },
});

export default function ChatMessages({ user, setcontactCross, mainCross }) {
  useEffect(() => {
    socket.emit("sendInfo", {
      query: {
        myID: localStorage.getItem("myID"),
      },
    });
  }, [localStorage.getItem("myID")]);

  const rerender = (message) => {
    console.log(message);
    socket.emit("sendMessage", {
      query: {
        userID: user.data.userID,
        chatID,
        message: message,
      },
    });
  };

  // for getting chat text input
  const [inputValue, setInputValue] = useState("");
  // for storing the messages and update them and initial them from user
  const [messages, setMessages] = useState(user?.data?.messages || []);

  const [typing, setTyping] = useState(false);
  const [render, setrender] = useState(true);

  const data = user?.data?.user;
  const chatID = user?.data?.chatID;

  // Ref for the messages container
  const messagesEndRef = useRef(null);

  useEffect(() => {
    clearTimeout(time);
    setTyping(false);
    socket.on("render", (socket) => {
      if (socket.query.chatID == chatID) {
        clearTimeout(time);
        setTyping(false);
        setMessages((prevMessages) => [...prevMessages, socket.query.message]);
      }
    });
    return () => {
      socket.off("render");
    };
  }, [chatID]);

  useEffect(() => {
    socket.on("typing", (socket) => {
      if (socket.query.chatID == chatID) {
        clearTimeout(time);
        setTyping(true);
        time = setTimeout(() => {
          setTyping(false);
          console.log("not typing");
        }, 2000);
      }
    });
    return () => {
      socket.off("typing");
    };
  }, [chatID]);

  // Rerender when you chage the user you talking to
  useEffect(() => {
    setMessages(user?.data?.messages || []);
    setrender(false);
  }, [user?.data?.messages]);

  // Scroll to bottom whenever messages change will run every time messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages, typing, render]);

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
      <div
        className={`currentusermain ${mainCross === "show" ? "show1" : "hide"}`}
        style={window.innerWidth < 650 ? { zIndex: "-1" } : { zIndex: "1" }}
      >
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
          <PaperClipIcon
            user={user}
            setMessages={setMessages}
            rerender={rerender}
          />

          <input type="text" placeholder="Message" className="messageinput" />
          <SendIcon />
          <AttatchIcon />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`currentusermain ${mainCross === "show" ? "show1" : "hide"}`}
      onClick={() => {
        setcontactCross("hide");
      }}
    >
      <div className="messagesPart">
        {messages.map((message) => {
          return (
            <MessageCard
              setMessages={setMessages}
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
              text={message.text}
            />
          );
        })}
        {typing ? <MessageCard typeMessage={true} /> : ""}
        <div ref={messagesEndRef} /> {/* Empty div to act as scroll target */}
      </div>

      <div className="messagesending">
        <PaperClipIcon
          user={user}
          setMessages={setMessages}
          rerender={rerender}
        />
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

            socket.emit("typing", {
              query: {
                chatID,
                userID: user.data.userID,
              },
            });
          }}
        />

        <SendIcon clickHandler={send} />
        <AttatchIcon />
      </div>
    </div>
  );
}
