import React, { useEffect, useState } from "react";
import axios from "axios";
import RightIcon from "../icons/RightIcon.jsx";
import "./typing.css";
import image from "../../assets/log.png";
import ReactPlayer from "react-player/youtube";
import { apiClient } from "@/lib/api-client.js";
import { FILE_DOWNLOAD } from "@/utils/constants.js";

export default function MessageCard({
  content,
  time,
  direction,
  typeMessage,
  text,
  setMessages,
}) {
  const [file, setFile] = useState(null); // State to hold the fetched file
  const [fileType, setFileType] = useState(null); // State to store the type of file (image, video, others)
  const classes =
    direction === "right" ? "message recivemessage" : "message sendmessage";

  useEffect(() => {
    if (content && !text) {
      const fetchFile = async () => {
        try {
          const response = await apiClient.post(
            FILE_DOWNLOAD,
            { filepath: content }, // Dynamic content as filepath
            {
              responseType: "blob", // Expect file as blob
              withCredentials: true,
            }
          );

          // Set the fetched file to the state
          setFile(response.data);

          // Extract the content type from the response headers
          const type = response.headers["content-type"];
          if (type) {
            if (type.startsWith("image/")) {
              setFileType("image");
            } else if (type.startsWith("video/")) {
              setFileType("video");
            } else {
              setFileType("other");
            }
          }
        } catch (error) {
          console.error("Error fetching file:", error);
        }
      };

      fetchFile();
    }
  }, [content, text]);

  if (typeMessage) {
    return (
      <div className={classes}>
        <div className="bounce-text">
          <span>T</span>
          <span>y</span>
          <span>p</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
        <div className="status">
          <RightIcon />
        </div>
      </div>
    );
  }

  if (!text) {
    return (
      <div className={classes} style={{ padding: "5px" }}>
        {/* Render file type based on the fetched file */}
        {fileType === "image" && file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Message file"
            style={{ borderRadius: "7px" }}
          />
        )}
        {fileType === "video" && (
          <video controls src={URL.createObjectURL(file)}></video>
        )}
      </div>
    );
  }

  return (
    <div className={classes}>
      <p className="messagecontent">{content}</p>
      <div className="status">
        <p className="time">{time}</p>
        <RightIcon />
      </div>
    </div>
  );
}
