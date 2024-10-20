import { apiClient } from "@/lib/api-client";
import { GET_USER_BANNER, GET_USER_IMAGE } from "@/utils/constants";
import axios from "axios";
const storeImages = async (userName) => {
  const imageResponse = await apiClient.post(
    GET_USER_IMAGE,
    { userName: userName },
    {
      withCredentials: true,
      responseType: "blob",
    }
  );
  const imageBase64 = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result); // Base64 string
    };
    reader.readAsDataURL(imageResponse.data); // Convert to Base64
  });
  localStorage.setItem("image", imageBase64);

  const bannerResponse = await apiClient.post(
    GET_USER_BANNER,
    { userName: userName },
    {
      withCredentials: true,
      responseType: "blob",
    }
  );
  const bannerBase64 = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result); // Base64 string
    };
    reader.readAsDataURL(bannerResponse.data); // Convert to Base64
  });
  localStorage.setItem("banner", bannerBase64);
};

export default storeImages;
