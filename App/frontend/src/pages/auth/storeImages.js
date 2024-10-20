import axios from "axios";
const storeImages = async (userName) => {
  const imageResponse = await axios.post(
    `http://localhost:8747/api/main/getUserImage`,
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

  const bannerResponse = await axios.post(
    `http://localhost:8747/api/main/getUserBanner`,
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
