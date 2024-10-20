import React from "react";
import { toast } from "sonner";
import axios from "axios"; // Import axios
import { FILE_UPLOAD_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";

export default function PaperClipIcon({ user, setMessages, rerender }) {
  // Function to handle file upload
  const handelFileUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file"; // Allows any file type
    fileInput.accept = "image/*"; // Optional: Restrict to images

    fileInput.onchange = async (event) => {
      const file = event.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append("file-uploads", file);
        formData.append("chatID", user.data.chatID);

        try {
          console.log(FILE_UPLOAD_ROUTE);

          const response = await apiClient.post(FILE_UPLOAD_ROUTE, formData, {
            withCredentials: true,
          });

          if (response.status === 200) {
            // Handle successful upload response
            toast.success("File Sent Successfully");

            rerender(response.data);

            setMessages((prevMessages) => [...prevMessages, response.data]);
          }
        } catch (error) {
          console.log(error);
          toast.error("Failed to upload file");
        }
      }
    };

    fileInput.click(); // Trigger file input click
  };

  return (
    <svg
      onClick={handelFileUpload}
      className="messageicon"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_26_376)">
        <path
          d="M6.4089 37.392C4.79865 37.392 3.25134 36.7258 2.01871 35.492C-0.713723 32.7501 -0.713723 28.291 2.01753 25.5502L23.3284 2.92006C26.6534 -0.409693 31.7466 -0.111631 35.4635 3.61118C37.1283 5.27962 38.0629 7.68549 38.0285 10.2125C37.994 12.7146 37.0167 15.1086 35.3459 16.7806L19.2398 33.9269C18.7922 34.4066 18.0393 34.4292 17.5619 33.9791C17.0845 33.5291 17.062 32.775 17.5108 32.2964L33.6418 15.124C34.9041 13.8593 35.6273 12.0662 35.6546 10.1792C35.682 8.29231 34.9991 6.50987 33.7855 5.29387C31.5055 3.00912 27.7934 1.81212 25.0336 4.57899L3.72396 27.2092C1.89165 29.0462 1.89284 31.9972 3.70021 33.8093C4.54809 34.6584 5.55509 35.0716 6.62621 35.0063C7.68665 34.941 8.77678 34.3983 9.6959 33.4768L26.6522 15.4292C27.2661 14.8141 28.5023 13.3036 27.2448 12.0436C26.5335 11.3299 26.0335 11.3751 25.8685 11.3881C25.3994 11.4297 24.8496 11.7551 24.2808 12.3262L11.5175 25.8994C11.0663 26.3791 10.3146 26.4017 9.8384 25.9504C9.36103 25.5004 9.33846 24.7463 9.78853 24.2689L22.5743 10.6697C23.579 9.65912 24.6073 9.11168 25.6535 9.01787C26.4705 8.94543 27.6842 9.11881 28.9227 10.3609C30.761 12.2027 30.5318 14.9043 28.3563 17.0857L11.4 35.1322C10.0462 36.4907 8.41103 37.2792 6.77109 37.3801C6.65115 37.3884 6.52884 37.392 6.4089 37.392Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_26_376">
          <rect width={38} height={38} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
