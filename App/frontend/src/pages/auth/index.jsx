import Background from "@/assets/login2.png";
import Nar from "@/assets/nar.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client.js";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import axios from "axios";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required");
      return false;
    }
    if (password != confirmPassword) {
      toast.error("Password is not equal to confirm password");
      return false;
    }

    return true;
  };

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

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.user.id) {
        localStorage.setItem("myID", response.data.user.id);

        localStorage.setItem("userData", JSON.stringify(response.data.user));

        storeImages(response.data.user.userName);
        console.log(response.data);

        setUserInfo(response.data.user);
        console.log(userInfo);

        if (response.data.user.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
      console.log({ response });
    }
  };

  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      console.log("signup");
      if (response.status === 201) {
        setUserInfo(response.data.user);

        localStorage.setItem("userData", JSON.stringify(response.data.user));
        localStorage.setItem("myID", response.data.user.id);

        navigate("/profile");
      }
      console.log({ response });
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Nar} alt="Vic Emoji" className="h-[50px]" />
            </div>
            <p className="font-medium text-center">
              Fill in details to get started with the best chat-app!!
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                >
                  Signup
                </TabsTrigger>
              </TabsList>

              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5 mt-10" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="background login" className="h-[700px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
